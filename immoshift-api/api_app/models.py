from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.forms import ValidationError as FormValidationError
from django.db.models import JSONField
from django.contrib import messages
import os
import shutil

class Author(models.Model):
    """Model for content authors that can be reused across multiple articles."""
    name = models.CharField(max_length=100, verbose_name="Nom")
    picture = models.ImageField(upload_to='authors/', verbose_name="Photo", blank=True, null=True)
    bio = models.TextField(verbose_name="Biographie", blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Auteur"
        verbose_name_plural = "Auteurs"

class Testimonial(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nom")
    role = models.CharField(max_length=100, verbose_name="Rôle")
    avatar = models.ImageField(upload_to='testimonials/', verbose_name="Avatar")
    quote = models.TextField(verbose_name="Citation")
    rating = models.IntegerField(
        verbose_name="Note", 
        choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')],
        default=5
    )
    
    def __str__(self):
        return f"Témoignage de {self.name}"
    
    class Meta:
        verbose_name = "Témoignage"
        verbose_name_plural = "Témoignages"


class Training(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(unique=True, verbose_name="Slug URL")
    short_description = models.TextField(verbose_name="Description courte")
    duration = models.CharField(max_length=50, verbose_name="Durée", blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Prix", blank=True, null=True)
    show_price = models.BooleanField(default=True, verbose_name="Afficher le prix")
    image = models.ImageField(upload_to='trainings/', verbose_name="Image")
    video_url = models.URLField(blank=True, null=True, verbose_name="URL Vidéo")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    position = models.PositiveIntegerField(default=0, verbose_name="Position d'affichage")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Formation"
        verbose_name_plural = "Formations"
        ordering = ['position', 'id']

class Article(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(unique=True, verbose_name="Slug URL")
    excerpt = models.TextField(verbose_name="Extrait")
    image = models.ImageField(upload_to='articles/', verbose_name="Image principale", blank=True, null=True)
    author = models.ForeignKey(
        Author, 
        on_delete=models.SET_NULL, 
        related_name="articles", 
        verbose_name="Auteur",
        blank=True, 
        null=True
    )
    source_url = models.URLField(
        verbose_name="URL de la source", 
        blank=True, 
        null=True,
        help_text="URL du site d'origine si l'article est repris d'ailleurs"
    )
    is_published = models.BooleanField(default=True, verbose_name="Publié")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    published_at = models.DateTimeField(default=timezone.now, verbose_name="Date de publication")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ['-published_at']

class Paragraph(models.Model):
    """Model for paragraphs that can be attached to Articles or Trainings with optional images or videos."""
    title = models.CharField(max_length=200, verbose_name="Titre", blank=True, null=True)
    content = models.TextField(verbose_name="Contenu du paragraphe", blank=True, null=True)
    
    # Media type selector
    MEDIA_CHOICES = [
        ('none', 'Aucun média'),
        ('image', 'Image'),
        ('video_url', 'Lien vidéo externe'),
        ('video_file', 'Fichier vidéo'),
    ]
    media_type = models.CharField(
        max_length=10,
        choices=MEDIA_CHOICES,
        default='none',
        verbose_name="Type de média"
    )
    
    # Media fields
    image = models.ImageField(upload_to='paragraphs/', verbose_name="Image", blank=True, null=True)
    video_url = models.URLField(verbose_name="URL Vidéo", help_text="YouTube ou Vimeo URL", blank=True, null=True)
    video_file = models.FileField(upload_to='paragraph_videos/', blank=True, null=True, verbose_name="Fichier Vidéo",
                                 help_text="Téléchargez directement un fichier vidéo (recommandé < 100 MB)")
    thumbnail = models.ImageField(upload_to='paragraph_thumbnails/', blank=True, null=True, 
                                  verbose_name="Miniature vidéo", help_text="Obligatoire pour les fichiers vidéo")
    file_size_mb = models.FloatField(blank=True, null=True, editable=False, verbose_name="Taille du fichier (MB)")
    
    position = models.PositiveIntegerField(default=0, verbose_name="Position")
    
    # Foreign keys - only one should be populated
    article = models.ForeignKey(
        Article, 
        on_delete=models.CASCADE, 
        related_name="paragraphs", 
        verbose_name="Article",
        blank=True, 
        null=True
    )
    training = models.ForeignKey(
        Training, 
        on_delete=models.CASCADE, 
        related_name="paragraphs", 
        verbose_name="Formation",
        blank=True, 
        null=True
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    def clean(self):
        if self.article and self.training:
            raise ValidationError("Un paragraphe ne peut être associé qu'à un article ou une formation, pas les deux.")
        if not self.article and not self.training:
            raise ValidationError("Le paragraphe doit être associé à un article ou une formation.")
        
        has_media = self.media_type != 'none' and (
            (self.media_type == 'image' and self.image) or
            (self.media_type == 'video_url' and self.video_url) or
            (self.media_type == 'video_file' and self.video_file)
        )
        
        if not self.content and not has_media:
            raise ValidationError("Le paragraphe doit contenir du texte et/ou un média.")
        
        if self.media_type == 'image' and not self.image:
            raise ValidationError("Veuillez sélectionner une image.")
        elif self.media_type == 'video_url' and not self.video_url:
            raise ValidationError("Veuillez fournir une URL vidéo.")
        elif self.media_type == 'video_file':
            if not self.video_file:
                raise ValidationError("Veuillez sélectionner un fichier vidéo.")
            if not self.thumbnail:
                raise ValidationError("Veuillez fournir une miniature pour le fichier vidéo.")
        
        if self.media_type != 'image':
            self.image = None
        if self.media_type != 'video_url':
            self.video_url = None
        if self.media_type != 'video_file':
            self.video_file = None
            self.thumbnail = None
            self.file_size_mb = None
            
        if self.video_file:
            try:
                self.file_size_mb = self.video_file.size / (1024 * 1024)
            except:
                self.file_size_mb = None
    
    def save(self, *args, **kwargs):
        if self.video_file and not self.file_size_mb:
            try:
                self.file_size_mb = self.video_file.size / (1024 * 1024)
            except:
                pass
        super().save(*args, **kwargs)
    
    def __str__(self):
        parent = self.article if self.article else self.training
        parent_type = "article" if self.article else "formation"
        title_display = f" - {self.title}" if self.title else ""
        return f"Paragraphe {self.position} de {parent_type}: {parent.title}{title_display}"
    
    class Meta:
        verbose_name = "Paragraphe"
        verbose_name_plural = "Paragraphes"
        ordering = ['position']

class Ebook(models.Model):
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(unique=True, verbose_name="Slug URL")
    description = models.TextField(verbose_name="Description")
    cover_image = models.ImageField(upload_to='ebooks/covers/', verbose_name="Image de couverture")
    file = models.FileField(upload_to='ebooks/files/', verbose_name="Fichier PDF")
    is_active = models.BooleanField(default=True, verbose_name="Actif")
    position = models.PositiveIntegerField(default=0, verbose_name="Position d'affichage")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = "E-book"
        verbose_name_plural = "E-books"
        ordering = ['position', 'id']

class EbookDownload(models.Model):
    ebook = models.ForeignKey(Ebook, on_delete=models.CASCADE, related_name="downloads", verbose_name="E-book")
    first_name = models.CharField(max_length=100, verbose_name="Prénom")
    last_name = models.CharField(max_length=100, verbose_name="Nom")
    email = models.EmailField(verbose_name="Email")
    phone = models.CharField(max_length=20, blank=True, null=True, verbose_name="Téléphone")
    consent_mailing = models.BooleanField(default=False, verbose_name="Consent pour emailing")
    download_date = models.DateTimeField(auto_now_add=True, verbose_name="Date de téléchargement")
    ip_address = models.GenericIPAddressField(blank=True, null=True, verbose_name="Adresse IP")
    
    def __str__(self):
        return f"{self.email} - {self.ebook.title}"
    
    class Meta:
        verbose_name = "Téléchargement E-book"
        verbose_name_plural = "Téléchargements E-books"


class RGPDContent(models.Model):
    owner_name = models.CharField(max_length=150, default="Audrey Antonini", verbose_name="Nom de la responsable")
    trade_name = models.CharField(max_length=150, default="ImmoShift", verbose_name="Nom commercial")
    legal_status = models.CharField(max_length=150, default="Entreprise individuelle", verbose_name="Statut")
    siret = models.CharField(max_length=20, default="503 425 027 00045", verbose_name="SIRET")
    address = models.CharField(max_length=255, default="12 les 4 canaux, 34250 Palavas-les-Flots", verbose_name="Adresse")
    email = models.EmailField(default="immoshift.business@gmail.com", verbose_name="Email")
    phone = models.CharField(max_length=20, default="0609093075", verbose_name="Téléphone")

    host_name = models.CharField(max_length=200, blank=True, default="o2switch", verbose_name="Nom de l'hébergeur")
    host_address = models.CharField(max_length=255, blank=True, default="Chemin des Pardiaux, 63000 Clermont-Ferrand, France", verbose_name="Adresse de l'hébergeur")
    host_contact = models.CharField(max_length=255, blank=True, default="https://www.o2switch.fr/support-hebergeur/", verbose_name="Contact de l'hébergeur")

    personal_data_text = models.TextField(
        default=(
            "Les données personnelles collectées via le formulaire de contact et le formulaire de téléchargement "
            "des e-books (nom, prénom, email, téléphone) sont utilisées uniquement dans le cadre de la relation "
            "commerciale avec ImmoShift.\n\n"
            "Les prises de rendez-vous via Calendly sont gérées par ce service tiers et soumises à sa propre "
            "politique de confidentialité.\n\n"
            "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos "
            "données. Vous pouvez exercer ce droit en écrivant à immoshift.business@gmail.com."
        ),
        verbose_name="Texte données personnelles",
    )
    cookies_text = models.TextField(
        default="Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement. Aucun cookie de suivi publicitaire n'est déposé.",
        verbose_name="Texte cookies",
    )
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière mise à jour")

    def __str__(self):
        return "Mentions légales et RGPD"

    class Meta:
        verbose_name = "RGPD"
        verbose_name_plural = "RGPD"

class SiteConfiguration(models.Model):
    # Company info
    company_name = models.CharField(max_length=150, default="ImmoShift", verbose_name="Nom de l'entreprise")
    company_description = models.TextField(
        default="Formation pour agents immobiliers. Structurez votre activité, maéetrisez vos méthodes et performez durablement.",
        verbose_name="Description de l'entreprise"
    )
    contact_email = models.EmailField(default="immoshift.business@gmail.com", verbose_name="Email de contact")
    contact_address = models.CharField(max_length=255, default="Palavas-les-Flots, 34250, France", verbose_name="Adresse")
    contact_city = models.CharField(max_length=150, default="Palavas-les-Flots", verbose_name="Ville")
    
    # Logos
    logo = models.ImageField(upload_to="site_images/", blank=True, null=True, verbose_name="Logo principal")
    transparent_logo = models.ImageField(upload_to="site_images/", blank=True, null=True, verbose_name="Logo transparent (pour header)")
    
    # Social Media
    linkedin_url = models.URLField(default="https://www.linkedin.com/in/audrey-a-26baa3205", verbose_name="URL LinkedIn")
    facebook_url = models.URLField(blank=True, default="", verbose_name="URL Facebook")
    twitter_url = models.URLField(blank=True, default="", verbose_name="URL Twitter/X")
    instagram_url = models.URLField(blank=True, default="", verbose_name="URL Instagram")
    
    
    # Calendly
    calendly_url = models.URLField(
        default="https://calendly.com/audreyantonini13/45-minutes-pour-faire-le-point", 
        verbose_name="URL Calendly"
    )
    calendly_title = models.CharField(
        max_length=200, 
        default="Réserver un appel découverte de 45 minutes", 
        verbose_name="Titre Calendly"
    )
    calendly_description = models.TextField(
        default=(
            "Cet appel 45 minutes est un rendez-vous professionnel de découverte et d'échange.\n"
            "Il s'adresse aux agents immobiliers qui veulent prendre de la hauteur sur leur activité \u2014 que ce soit pour corriger ce qui coince, structurer ce qui grandit trop vite, ou optimiser ce qui fonctionne déjà.\n"
            "On parle de ton fonctionnement, de tes priorités, de tes points de friction ou de progression.\n"
            "Je t'écoute, je t'oriente.\n"
            "Et si je peux t'apporter de la valeur, je t'explique comment je peux t'accompagner.\n"
            "Ce n'est pas une sênce de coaching offerte, mais un premier contact cadré, pour poser les bases d'un accompagnement sur mesure."
        ),
        verbose_name="Description détaillée Calendly"
    )
    calendly_description_short = models.TextField(
        default="Réserver un rendez-vous de 45 minutes pour discuter de vos besoins en formation immobilière.",
        verbose_name="Description courte Calendly"
    )
    calendly_button_text = models.CharField(max_length=50, default="Réserver Maintenant", verbose_name="Texte du bouton Calendly")
    
    # Hero Section Content
    hero_title = models.CharField(max_length=200, default="ImmoShift", verbose_name="Titre principal")
    hero_subtitle = models.CharField(max_length=255, default="VISION - POSTURE BUSINESS", verbose_name="Sous-titre")
    hero_description_1 = models.TextField(
        default="Des formations professionnelles, à distance ou en présentiel, pour replacer l'agent immobilier à son juste rang : celui d'un référent qu'on ne met plus en concurrence, parce qu'il tient une maéetrise visible et une conduite de vente sans flottement, du premier échange jusqu'à la signature.",
        verbose_name="Description Paragraphe 1"
    )
    hero_description_2 = models.TextField(
        default="L'objectif : faire passer l'agent du statut \"interchangeable\" au statut d'évidence avec une tenue commerciale solide, une parole qui engage, et une manière de mener chaque dossier qui amène vendeurs et acheteurs à s'aligner sur une stratégie claire, sans test permanent, sans perte d'ascendant, et sans dilution du rôle.",
        verbose_name="Description Paragraphe 2"
    )
    hero_catchphrase = models.CharField(max_length=200, default="Méthode. Discipline. Exécution.", verbose_name="Phrase d'accroche")
    
    # Hero Image
    hero_image = models.ImageField(upload_to="site_images/", blank=True, null=True, verbose_name="Image de présentation (ex: Audrey)")

    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière mise à jour")

    def __str__(self):
        return "Configuration du Site"

    class Meta:
        verbose_name = "Configuration du Site"
        verbose_name_plural = "Configurations du Site"

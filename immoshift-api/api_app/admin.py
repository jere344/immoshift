from django.contrib import admin
from django.utils.html import format_html
from django.contrib import messages
from django import forms
from django.http import HttpResponse
import csv
from datetime import datetime
from django.shortcuts import render, redirect
from django.urls import path
from django.utils.text import slugify
from django.db import transaction
from .models import (
    Testimonial, Article, Training, Paragraph, Ebook, EbookDownload, Author
)
from .forms import LinkedInPostImportForm
from .utils.linkedin_scraper import scrape_linkedin_post, download_image_from_url

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_picture')
    search_fields = ('name', 'bio')
    
    def display_picture(self, obj):
        if obj.picture:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.picture.url)
        return "Aucune image"
    display_picture.short_description = "Photo"

class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating', 'display_avatar')
    search_fields = ('name', 'role', 'quote')
    list_filter = ('rating',)
    
    def display_avatar(self, obj):
        if obj.avatar:
            return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.avatar.url)
        return "Aucune image"
    display_avatar.short_description = "Avatar"

class ParagraphInline(admin.StackedInline):
    model = Paragraph
    extra = 1
    fieldsets = (
        (None, {
            'fields': ('position', 'title', 'content')
        }),
        ('Média', {
            'fields': ('media_type', 'image', 'video_url', ('video_file', 'thumbnail')),
            'description': 'Sélectionnez un type de média et remplissez les champs correspondants.',
        }),
    )

    class Media:
        css = {
            'all': ('admin/css/forms.css', 'css/admin_paragraphs.css',)
        }
        js = ('js/paragraph_admin.js',)
    

class ArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published', 'published_at', 'display_image')
    list_filter = ('is_published', 'published_at', 'author')
    search_fields = ('title', 'content', 'author__name')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_at'
    inlines = [ParagraphInline]
    autocomplete_fields = ['author']
    actions = ['import_from_linkedin']
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "Aucune image"
    display_image.short_description = "Image"
    
    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-linkedin/', self.admin_site.admin_view(self.import_linkedin_view), name='article_import_linkedin'),
        ]
        return my_urls + urls
    
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context['import_linkedin_url'] = 'admin:article_import_linkedin'
        return super().changelist_view(request, extra_context=extra_context)
    
    def import_linkedin_view(self, request):
        if request.method == 'POST':
            form = LinkedInPostImportForm(request.POST)
            if form.is_valid():
                return self.process_linkedin_import(request, form.cleaned_data['linkedin_url'])
        else:
            form = LinkedInPostImportForm()
        
        return render(
            request,
            'admin/import_linkedin.html',
            {'form': form, 'title': 'Importer depuis LinkedIn'}
        )
    
    def import_from_linkedin(self, request, queryset):
        return redirect('admin:article_import_linkedin')
    import_from_linkedin.short_description = "Importer depuis LinkedIn"
    
    def process_linkedin_import(self, request, linkedin_url):
        # Clean the URL by removing tracking parameters
        clean_url = linkedin_url.split('?')[0] if '?' in linkedin_url else linkedin_url
        
        scraped_data = scrape_linkedin_post(clean_url)
        
        if 'error' in scraped_data:
            messages.error(request, f"Erreur lors de l'importation: {scraped_data['error']}")
            return redirect('admin:article_import_linkedin')
        
        try:
            with transaction.atomic():
                # Use the LinkedIn author information if available
                author_name = scraped_data.get('author_name', 'Unknown Author')
                if author_name == 'Unknown Author':
                    # Fallback to ImmoShift if no author found
                    try:
                        author = Author.objects.get(name="ImmoShift")
                    except Author.DoesNotExist:
                        author = Author.objects.create(name="ImmoShift", bio="Contenu importé de LinkedIn")
                else:
                    # Try to find existing author by name
                    try:
                        author = Author.objects.get(name=author_name)
                    except Author.DoesNotExist:
                        # Create new author with LinkedIn data
                        author = Author(
                            name=author_name,
                            bio=scraped_data.get('author_headline', f"Auteur importé depuis LinkedIn")
                        )
                        
                        # Download and attach author image if available
                        if scraped_data.get('author_image_url'):
                            author_img = download_image_from_url(scraped_data['author_image_url'])
                            if author_img:
                                author.picture = author_img
                        
                        author.save()
                
                # Create slug and truncate to 50 characters
                title_slug = slugify(scraped_data['title'])
                if len(title_slug) > 50:
                    title_slug = title_slug[:50].rstrip('-')
                
                # Create the article
                article = Article(
                    title=scraped_data['title'],
                    slug=title_slug,
                    excerpt=scraped_data['excerpt'],
                    author=author,
                    is_published=True,
                    source_url=clean_url,
                    published_at=scraped_data['published_at']
                )
                
                # Download and attach image if available
                if scraped_data.get('image_url'):
                    image_file = download_image_from_url(scraped_data['image_url'])
                    if image_file:
                        article.image = image_file
                
                article.save()
                
                # Create paragraph with the full content
                Paragraph.objects.create(
                    article=article,
                    position=1,
                    title=None,  # No title for the first paragraph
                    content=scraped_data['content'],
                    media_type='none'  # No media in the paragraph as we already have the main image
                )
                
                messages.success(request, f"Article '{article.title}' créé avec succès depuis le post LinkedIn de {author.name}.")
                return redirect('admin:api_app_article_change', article.id)
                
        except Exception as e:
            messages.error(request, f"Erreur lors de la création de l'article: {str(e)}")
            return redirect('admin:article_import_linkedin')

class TrainingAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'price', 'show_price', 'position', 'display_image')
    list_filter = ('is_active', 'show_price')
    search_fields = ('title', 'short_description', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('position', 'is_active', 'show_price')
    inlines = [ParagraphInline]
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "Aucune image"
    display_image.short_description = "Image"

class ParagraphAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'position', 'get_media_type')
    list_filter = ('article', 'training', 'media_type')
    search_fields = ('title', 'content',)
    list_editable = ('position',)
    fieldsets = (
        (None, {
            'fields': ('article', 'training', 'position', 'title', 'content')
        }),
        ('Média', {
            'fields': ('media_type', 'image', 'video_url', ('video_file', 'thumbnail')),
            'description': 'Sélectionnez un type de média et remplissez les champs correspondants.',
        }),
    )
    
    class Media:
        css = {
            'all': ('admin/css/forms.css', 'css/admin_paragraphs.css',)
        }
        js = ('js/paragraph_admin.js',)
    
    def get_media_type(self, obj):
        if obj.media_type == 'image' and obj.image:
            return format_html('<img src="{}" width="50" height="50" /> Image', obj.image.url)
        elif obj.media_type == 'video_url' and obj.video_url:
            return format_html('<a href="{}" target="_blank">URL Vidéo</a>', obj.video_url)
        elif obj.media_type == 'video_file' and obj.video_file:
            return format_html('<img src="{}" width="50" height="50" /> Fichier Vidéo', 
                              obj.thumbnail.url if obj.thumbnail else '')
        return "Aucun média"
    get_media_type.short_description = "Média"
    
    def save_model(self, request, obj, form, change):
        # Ensure file_size_mb is calculated and saved
        if obj.video_file and not obj.file_size_mb:
            try:
                obj.file_size_mb = obj.video_file.size / (1024 * 1024)
            except:
                obj.file_size_mb = None
        super().save_model(request, obj, form, change)

class EbookAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_active', 'position', 'display_cover', 'download_count')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('position', 'is_active')
    
    def display_cover(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" width="100" />', obj.cover_image.url)
        return "Aucune image"
    display_cover.short_description = "Couverture"
    
    def download_count(self, obj):
        return obj.downloads.count()
    download_count.short_description = "Téléchargements"

class EbookDownloadAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'ebook', 'download_date', 'consent_mailing')
    list_filter = ('ebook', 'download_date', 'consent_mailing')
    search_fields = ('email', 'first_name', 'last_name')
    date_hierarchy = 'download_date'
    readonly_fields = ('download_date', 'ip_address')
    actions = ['export_all_emails', 'export_consented_emails']
    
    def export_all_emails(self, request, queryset):
        return self.export_emails(request, queryset, include_only_consented=False)
    export_all_emails.short_description = "Exporter tous les emails sélectionnés"
    
    def export_consented_emails(self, request, queryset):
        return self.export_emails(request, queryset, include_only_consented=True)
    export_consented_emails.short_description = "Exporter les emails avec consentement sélectionnés"
    
    def export_emails(self, request, queryset, include_only_consented=False):
        if include_only_consented:
            queryset = queryset.filter(consent_mailing=True)
            
        response = HttpResponse(content_type='text/csv')
        timestamp = datetime.now().strftime('%Y%m%d-%H%M%S')
        consent_status = 'consented' if include_only_consented else 'all'
        response['Content-Disposition'] = f'attachment; filename="email_list_{consent_status}_{timestamp}.csv"'
        
        writer = csv.writer(response)
        # CSV Header
        writer.writerow(['Email', 'Prénom', 'Nom', 'Consentement', 'Date'])
        
        # CSV data
        for obj in queryset:
            writer.writerow([
                obj.email,
                obj.first_name,
                obj.last_name,
                'Oui' if obj.consent_mailing else 'Non',
                obj.download_date.strftime('%Y-%m-%d %H:%M')
            ])
        
        count = queryset.count()
        messages.success(request, f'{count} email(s) exporté(s) avec succès.')
        return response

# Register all models with their admin classes
admin.site.register(Author, AuthorAdmin)
admin.site.register(Testimonial, TestimonialAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Training, TrainingAdmin)
admin.site.register(Paragraph, ParagraphAdmin)
admin.site.register(Ebook, EbookAdmin)
admin.site.register(EbookDownload, EbookDownloadAdmin)

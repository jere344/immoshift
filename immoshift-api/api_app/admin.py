from django.contrib import admin
from django.utils.html import format_html
from django.contrib import messages
from django import forms
from django.http import HttpResponse
import csv
from datetime import datetime
from .models import (
    Testimonial, Article, Training, Paragraph, Ebook, EbookDownload, Author
)

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
    
    def display_image(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" />', obj.image.url)
        return "Aucune image"
    display_image.short_description = "Image"

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

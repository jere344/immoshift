from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Article, Training, Ebook

class ArticleSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # Only include published articles
        return Article.objects.filter(is_published=True).order_by('-published_at')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f"/articles/{obj.slug}/"

class TrainingSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.9

    def items(self):
        # Only include active trainings, ordered by position
        return Training.objects.filter(is_active=True).order_by('position', 'id')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f"/training/{obj.slug}/"

class EbookSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.7

    def items(self):
        # Only include active ebooks, ordered by position
        return Ebook.objects.filter(is_active=True).order_by('position', 'id')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def location(self, obj):
        return f"/ebooks/{obj.slug}/"

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = "monthly"

    def items(self):
        return ['homepage']
    
    def location(self, item):
        if item == 'homepage':
            return '/'
        return '/'

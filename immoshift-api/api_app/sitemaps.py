from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Article, Training, Ebook
from django.conf import settings # Ensure SITE_URL is defined in settings.py

class ArticleSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # Only include published articles
        return Article.objects.filter(is_published=True).order_by('-published_at')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def get_urls(self, site=None, **kwargs):
        # Override get_urls to yield dictionaries with the full frontend URL
        site_url = getattr(settings, 'SITE_URL', '') # Get frontend URL from settings
        for item in self.items():
            yield {
                'location': f"{site_url}/articles/{item.slug}/",
                'lastmod': self.lastmod(item),
                'changefreq': self.changefreq,
                'priority': self.priority,
            }

class TrainingSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.9

    def items(self):
        # Only include active trainings, ordered by position
        return Training.objects.filter(is_active=True).order_by('position', 'id')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def get_urls(self, site=None, **kwargs):
        site_url = getattr(settings, 'SITE_URL', '')
        for item in self.items():
            yield {
                'location': f"{site_url}/trainings/{item.slug}/",
                'lastmod': self.lastmod(item),
                'changefreq': self.changefreq,
                'priority': self.priority,
            }

class EbookSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.7

    def items(self):
        # Only include active ebooks, ordered by position
        return Ebook.objects.filter(is_active=True).order_by('position', 'id')
    
    def lastmod(self, obj):
        return obj.updated_at
    
    def get_urls(self, site=None, **kwargs):
        site_url = getattr(settings, 'SITE_URL', '')
        for item in self.items():
            yield {
                'location': f"{site_url}/ebooks/{item.slug}/",
                'lastmod': self.lastmod(item),
                'changefreq': self.changefreq,
                'priority': self.priority,
            }

class StaticViewSitemap(Sitemap):
    priority = 0.5
    changefreq = "monthly"

    def items(self):
        return ['homepage']
    
    def get_urls(self, site=None, **kwargs):
        site_url = getattr(settings, 'SITE_URL', '')
        for item in self.items():
            loc = f"{site_url}/" if item == 'homepage' else f"{site_url}/" # Adjust if other static pages exist
            yield {
                'location': loc,
                # 'lastmod': # Add lastmod if applicable for static pages
                'changefreq': self.changefreq,
                'priority': self.priority,
            }

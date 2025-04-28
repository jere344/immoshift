from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.contrib.sitemaps.views import sitemap
from . import views
from .sitemaps import ArticleSitemap, TrainingSitemap, EbookSitemap, StaticViewSitemap

# Configure the REST Framework router
router = DefaultRouter()
router.register(r'testimonials', views.TestimonialViewSet)
router.register(r'articles', views.ArticleViewSet)
router.register(r'trainings', views.TrainingViewSet)
router.register(r'ebooks', views.EbookViewSet)
router.register(r'paragraphs', views.ParagraphViewSet)

# Configure the sitemap
sitemaps = {
    'articles': ArticleSitemap(),
    'trainings': TrainingSitemap(),
    'ebooks': EbookSitemap(),
    'static': StaticViewSitemap(),
}

urlpatterns = [
    # API base routes
    path('', include(router.urls)),
    
    # Home page data route - all content will be fetched here
    path('home/', views.get_home_page_data, name='home_page_data'),
    
    # Specific article, training and ebook routes for detail pages
    path('article/<slug:slug>/', views.article_detail, name='article_detail'),
    path('training/<slug:slug>/', views.training_detail, name='training_detail'),
    path('ebook/<slug:slug>/', views.ebook_detail, name='ebook_detail'),
    
    # Ebook download route
    path('download-ebook/', views.download_ebook, name='download_ebook'),
    
    # Sitemap configuration
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('sitemap-<section>.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
]
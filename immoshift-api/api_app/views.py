from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.conf import settings
from django.db.models import Q
from django.http import FileResponse
import os
from .models import Testimonial, Article, Training, Paragraph, Ebook, EbookDownload
from .serializers import (
    TestimonialSerializer, ArticleListSerializer, ArticleDetailSerializer,
    TrainingListSerializer, TrainingDetailSerializer, ParagraphSerializer,
    EbookSerializer, EbookDetailSerializer, EbookDownloadCreateSerializer
)
from .utils.email_utils import send_ebook_confirmation_email, send_admin_ebook_download_notification

# ViewSets for models
class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for listing testimonials"""
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for listing and retrieving articles"""
    queryset = Article.objects.filter(is_published=True).order_by('-published_at')
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleListSerializer
        return ArticleDetailSerializer

class TrainingViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for listing and retrieving trainings"""
    queryset = Training.objects.filter(is_active=True).order_by('position', 'id')
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TrainingListSerializer
        return TrainingDetailSerializer

class EbookViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for listing and retrieving ebooks"""
    queryset = Ebook.objects.filter(is_active=True).order_by('position', 'id')
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        if self.action == 'list':
            return EbookSerializer
        return EbookDetailSerializer

class ParagraphViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for retrieving paragraphs (not typically used directly)"""
    queryset = Paragraph.objects.all().order_by('position')
    serializer_class = ParagraphSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([AllowAny])
def get_home_page_data(request):
    """
    API endpoint for retrieving all home page content:
    - Articles
    - Testimonials
    - Trainings
    - Ebooks
    """
    # Get all published articles
    published_articles = Article.objects.filter(is_published=True).order_by('-published_at')
    
    # Get all active testimonials
    testimonials = Testimonial.objects.all()
    
    # Get all active trainings ordered by position
    trainings = Training.objects.filter(is_active=True).order_by('position', 'id')
    
    # Get all active ebooks ordered by position
    ebooks = Ebook.objects.filter(is_active=True).order_by('position', 'id')
    
    # Serialize the data
    articles_data = ArticleListSerializer(published_articles, many=True).data
    testimonials_data = TestimonialSerializer(testimonials, many=True).data
    trainings_data = TrainingListSerializer(trainings, many=True).data
    ebooks_data = EbookSerializer(ebooks, many=True).data
    
    # Return the combined data
    return Response({
        'articles': articles_data,
        'testimonials': testimonials_data,
        'trainings': trainings_data,
        'ebooks': ebooks_data,
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def article_detail(request, slug):
    """API endpoint for retrieving a specific article by its slug"""
    article = get_object_or_404(Article, slug=slug, is_published=True)
    serializer = ArticleDetailSerializer(article)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def training_detail(request, slug):
    """API endpoint for retrieving a specific training by its slug"""
    training = get_object_or_404(Training, slug=slug, is_active=True)
    serializer = TrainingDetailSerializer(training)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def ebook_detail(request, slug):
    """API endpoint for retrieving a specific ebook by its slug"""
    ebook = get_object_or_404(Ebook, slug=slug, is_active=True)
    serializer = EbookDetailSerializer(ebook)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def download_ebook(request):
    """
    API endpoint for downloading an ebook.
    Requires form data with user information.
    Records download information and returns the file URL.
    Sends a confirmation email to the user using a template.
    """
    serializer = EbookDownloadCreateSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        # Save download record
        ebook_download = serializer.save()
        ebook = ebook_download.ebook
        
        # Send admin notification
        send_admin_ebook_download_notification(ebook_download)
        
        # Send user confirmation email
        send_ebook_confirmation_email(
            ebook_download.email,
            ebook_download.first_name,
            ebook.title
        )
        
        # Prepare download URL response
        download_url = request.build_absolute_uri(ebook.file.url)
        
        # Ensure the URL is valid and has the correct protocol
        if not download_url.startswith('http'):
            if download_url.startswith('//'):
                download_url = 'https:' + download_url
            else:
                # Assuming HTTPS if no protocol is present
                download_url = 'https://' + request.get_host() + ebook.file.url

        # Return the success response with download URL
        return Response({
            'success': True,
            'message': 'Téléchargement enregistré avec succès. Un email de confirmation vous a été envoyé.',
            'download_url': download_url,
            'ebook_id': ebook.id,
            'ebook_title': ebook.title
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

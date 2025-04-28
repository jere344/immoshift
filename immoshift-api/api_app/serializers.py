from rest_framework import serializers
from .models import (
    Testimonial, Training, Article, Paragraph, Ebook, EbookDownload, Author
)

class AuthorSerializer(serializers.ModelSerializer):
    """Serializer for Author model"""
    class Meta:
        model = Author
        fields = ['id', 'name', 'picture', 'bio']

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'avatar', 'quote', 'rating']

class ParagraphSerializer(serializers.ModelSerializer):
    """Serializer for Paragraph model, used with Article and Training"""
    class Meta:
        model = Paragraph
        fields = [
            'id', 'title', 'content', 'image', 'video_url', 'video_file', 
            'thumbnail', 'position', 'file_size_mb', 'media_type'
        ]

class ArticleListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing articles on the homepage"""
    author_name = serializers.StringRelatedField(source='author.name', read_only=True)
    author_picture = serializers.ImageField(source='author.picture', read_only=True)
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'image', 'published_at', 
                 'author_name', 'author_picture', 'source_url']

class ArticleDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for article pages with related paragraphs"""
    paragraphs = ParagraphSerializer(many=True, read_only=True)
    author = AuthorSerializer(read_only=True)
    
    class Meta:
        model = Article
        fields = [
            'id', 'title', 'slug', 'excerpt', 'image', 
            'author', 'source_url', 'is_published', 'created_at', 
            'published_at', 'updated_at', 'paragraphs'
        ]

class TrainingListSerializer(serializers.ModelSerializer):
    """Simplified serializer for listing trainings on the homepage"""
    class Meta:
        model = Training
        fields = [
            'id', 'title', 'slug', 'short_description', 'image', 
            'duration', 'price', 'show_price', 'position'
        ]

class TrainingDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for training pages with related paragraphs"""
    paragraphs = ParagraphSerializer(many=True, read_only=True)
    
    class Meta:
        model = Training
        fields = [
            'id', 'title', 'slug', 'short_description', 
            'duration', 'price', 'show_price', 'image', 'video_url', 'is_active',
            'created_at', 'updated_at', 'paragraphs', 'position'
        ]

class EbookSerializer(serializers.ModelSerializer):
    """Serializer for Ebooks without the file field for listing"""
    class Meta:
        model = Ebook
        fields = [
            'id', 'title', 'slug', 'description', 'cover_image', 
            'is_active', 'position'
        ]

class EbookDetailSerializer(serializers.ModelSerializer):
    """Serializer for Ebook detail pages including file field for download"""
    class Meta:
        model = Ebook
        fields = [
            'id', 'title', 'slug', 'description', 'cover_image', 
            'file', 'is_active', 'created_at', 'position'
        ]

class EbookDownloadCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating ebook download records when users fill form"""
    class Meta:
        model = EbookDownload
        fields = ['ebook', 'first_name', 'last_name', 'email', 'phone', 'consent_mailing']
        
    def create(self, validated_data):
        # Get IP address from request if available
        request = self.context.get('request')
        if request and hasattr(request, 'META'):
            validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
        return super().create(validated_data)

class EbookDownloadAdminSerializer(serializers.ModelSerializer):
    """Full serializer for admin operations"""
    ebook_title = serializers.StringRelatedField(source='ebook.title', read_only=True)
    
    class Meta:
        model = EbookDownload
        fields = [
            'id', 'ebook', 'ebook_title', 'first_name', 'last_name', 
            'email', 'phone', 'consent_mailing', 'download_date', 'ip_address'
        ]

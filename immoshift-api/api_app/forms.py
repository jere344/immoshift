from django import forms
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from .utils.linkedin_scraper import is_linkedin_post_url

class LinkedInPostImportForm(forms.Form):
    linkedin_url = forms.URLField(
        label="URL du post LinkedIn", 
        max_length=500,
        widget=forms.URLInput(attrs={'size': '100'}),
        help_text="Collez l'URL d'un post LinkedIn pour créer automatiquement un article.",
        validators=[URLValidator()]
    )
    
    def clean_linkedin_url(self):
        url = self.cleaned_data['linkedin_url']
        if not is_linkedin_post_url(url):
            raise ValidationError("L'URL doit être celle d'un post LinkedIn (https://www.linkedin.com/posts/...).")
        return url

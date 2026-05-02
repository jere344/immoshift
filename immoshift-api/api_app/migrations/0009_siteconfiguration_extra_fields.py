# Generated manually for adding extra fields to SiteConfiguration

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0008_siteconfiguration_remove_article_content_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='siteconfiguration',
            name='logo',
            field=models.ImageField(blank=True, null=True, upload_to='site_images/', verbose_name='Logo principal'),
        ),
        migrations.AddField(
            model_name='siteconfiguration',
            name='transparent_logo',
            field=models.ImageField(blank=True, null=True, upload_to='site_images/', verbose_name='Logo transparent (pour header)'),
        ),
        migrations.AddField(
            model_name='siteconfiguration',
            name='facebook_url',
            field=models.URLField(blank=True, default='', verbose_name='URL Facebook'),
        ),
        migrations.AddField(
            model_name='siteconfiguration',
            name='twitter_url',
            field=models.URLField(blank=True, default='', verbose_name='URL Twitter/X'),
        ),
        migrations.AddField(
            model_name='siteconfiguration',
            name='instagram_url',
            field=models.URLField(blank=True, default='', verbose_name='URL Instagram'),
        ),
        migrations.AddField(
            model_name='siteconfiguration',
            name='navigation_links',
            field=models.JSONField(blank=True, default=list, help_text='Ex: [{"name": "Accueil", "path": "/", "home": true}, {"name": "Formations", "path": "/#trainings"}]', verbose_name='Liens de navigation'),
        ),
    ]

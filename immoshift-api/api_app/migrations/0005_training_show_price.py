# Generated by Django 5.1.7 on 2025-04-28 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api_app", "0004_paragraph_title"),
    ]

    operations = [
        migrations.AddField(
            model_name="training",
            name="show_price",
            field=models.BooleanField(default=True, verbose_name="Afficher le prix"),
        ),
    ]

# Generated by Django 4.2.7 on 2023-11-11 13:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jira', '0001_initial'),
        ('profile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='jira',
            field=models.ManyToManyField(related_name='profile', to='jira.jira'),
        ),
    ]

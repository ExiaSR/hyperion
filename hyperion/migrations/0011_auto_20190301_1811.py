# Generated by Django 2.1.7 on 2019-03-01 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hyperion', '0010_auto_20190228_0601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content_type',
            field=models.CharField(choices=[('text/plain', 'text/plain'), ('text/markdown', 'text/markdown'), ('image/png;base64', 'image/png;base64'), ('image/jpeg;base64', 'image/jpeg;base64'), ('application/base64', 'application/base64')], default='text/plain', max_length=20),
        ),
    ]

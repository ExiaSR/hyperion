# Generated by Django 2.1.5 on 2019-02-28 06:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hyperion', '0009_auto_20190228_0302'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='unlisted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='content_type',
            field=models.CharField(choices=[('text/plain', 'text/plain'), ('text/markdown', 'text/markdown'), ('image/png;base64', 'image/png;base64'), ('image/jpeg;base64', 'image/jpeg;base64'), ('application/base64', 'application/base64')], default='ext/plain', max_length=20),
        ),
        migrations.AlterField(
            model_name='post',
            name='visibility',
            field=models.CharField(choices=[('PUBLIC', 'PUBLIC'), ('FOAF', 'FOAF'), ('FRIENDS', 'FRIENDS'), ('PRIVATE', 'PRIVATE'), ('SERVERONLY', 'SERVERONLY')], default='PUBLIC', max_length=20),
        ),
    ]
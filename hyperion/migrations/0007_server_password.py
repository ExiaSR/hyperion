# Generated by Django 2.1.5 on 2019-02-20 06:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hyperion', '0006_auto_20190218_2251'),
    ]

    operations = [
        migrations.AddField(
            model_name='server',
            name='password',
            field=models.CharField(max_length=20, null=True),
        ),
    ]

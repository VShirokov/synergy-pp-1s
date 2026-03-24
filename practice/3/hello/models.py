from django.db import models

class UserName(models.Model):
    name = models.CharField(max_length=100)


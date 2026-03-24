from django import forms
from .models import UserName
from django.core.validators import MinLengthValidator, MaxLengthValidator

class NameForm(forms.ModelForm):
    class Meta:
        model = UserName
        fields = ['name']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Введите ваше имя',
                'maxlength': '100',
                'autofocus': 'true'
            })
        }

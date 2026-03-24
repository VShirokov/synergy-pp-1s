from django.shortcuts import render, redirect
from .forms import NameForm
from .models import UserName

def index(request):
    if request.method == 'POST':
        form = NameForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = NameForm()
    

    last_name = UserName.objects.last()
    greeting = f"Привет, {last_name.name}!" if last_name else "Привет, гость!"
    
    return render(request, 'hello/index.html', {
        'form': form,
        'greeting': greeting,
    })

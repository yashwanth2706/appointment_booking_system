from django.urls import path
from appointments import views

urlpatterns = [
    path('',views.index, name='index')
]

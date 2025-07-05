from django.urls import path
from .views import create_project, update_project, delete_project, project_list

urlpatterns = [
    path('projects/', project_list, name='project-list'),
    path('create/', create_project, name='create-project'),
    path('<int:pk>/', update_project, name='project-detail'),
    path('<int:pk>/delete/', delete_project, name='project-delete'),
]


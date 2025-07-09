from django.urls import path
from .views import create_project, update_project, delete_project, project_list, search_projects, project_detail

urlpatterns = [
    path('projects/', project_list, name='project-list'),
    path('create/', create_project, name='create-project'),
    path('projects/<int:pk>/', project_detail, name='project-detail'),
    path('<int:pk>/', update_project, name='project-update'),
    path('<int:pk>/delete/', delete_project, name='project-delete'),
    path('search/', search_projects, name='search-projects'),
]


from django.urls import path
from .views import CreateProjectView, ProjectListView

urlpatterns = [
    path('create/', CreateProjectView.as_view(), name='create-project'),
    path('', ProjectListView.as_view(), name='project-list'),
]
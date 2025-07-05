from django.urls import path
from .views import CreateProjectView, ProjectDetailView

urlpatterns = [
    path('create/', CreateProjectView.as_view(), name='create-project'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
]
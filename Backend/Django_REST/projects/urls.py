from django.urls import path
from .views import CreateProjectView, ProjectDetailView , ProjectListView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('create/', CreateProjectView.as_view(), name='create-project'),
    path('<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('<int:pk>/delete/', ProjectDetailView.as_view(), name='project-delete'),

]


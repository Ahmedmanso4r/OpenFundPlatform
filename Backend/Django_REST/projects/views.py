from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Project
from .serializers import ProjectSerializer

def get_object(pk):
    try:
        return Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return None

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_project(request):
    serializer = ProjectSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_project(request, pk):
    project = get_object(pk)
    if not project:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    if project.owner != request.user:
        return Response({'error': 'You do not have permission to update this project.'}, status=status.HTTP_403_FORBIDDEN)
    serializer = ProjectSerializer(project, data=request.data, partial=False)
    if serializer.is_valid():
        serializer.save(owner=request.user) 
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_project(request, pk):
    project = get_object(pk)
    if not project:
        return Response({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
    if project.owner != request.user:
        return Response({'error': 'You do not have permission to delete this project.'}, status=status.HTTP_403_FORBIDDEN)
    project.delete()
    return Response({'message': 'Project deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def project_list(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True) 
    return Response(serializer.data, status=status.HTTP_200_OK)

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FacultyViewSet, StudentViewSet, ProjectViewSet, ApplicationViewSet

# Router will automatically generate API routes for us
router = DefaultRouter()
router.register(r'faculty', FacultyViewSet)
router.register(r'students', StudentViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

from django.db import models
from django.contrib.auth.models import User

# Faculty model (extends default User)
class Faculty(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    department = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username


# Student model (extends default User)
class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=20, unique=True)
    course = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username


# Project model
class Project(models.Model):
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name="projects")
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_approved = models.BooleanField(default=False)

    def __str__(self):
        return self.title


# Application model (student applies for project)
class Application(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="applications")
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("accepted", "Accepted"), ("rejected", "Rejected")],
        default="pending"
    )

    def __str__(self):
        return f"{self.student.user.username} -> {self.project.title} ({self.status})"


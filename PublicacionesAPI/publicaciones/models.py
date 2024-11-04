from django.db import models

class Publications(models.Model):
    user = models.IntegerField()
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    username = models.CharField()

    def __str__(self):
        return self.title



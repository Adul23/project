from django.db import models

# Create your models here.
class Budget(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=255, decimal_places=2)
    def __str__(self):
        return self.name

class Expense(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=255, decimal_places=2)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Income(models.Model):
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=255, decimal_places=2)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
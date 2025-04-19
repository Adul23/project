from rest_framework import serializers
from .models import Budget, Expense

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'name', 'amount']

class ExpenseSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    amount = serializers.FloatField()
    budget = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all())
    
    def create(self, validated_data):
        return Expense.objects.create(**validated_data)
    def update(self, instance, validated_data, budget_id):
        instance.name = validated_data.get('name', instance.name)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.budget = budget_id
        instance.save()
        return instance



class IncomeSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    amount = serializers.FloatField()
    budget = serializers.PrimaryKeyRelatedField(queryset=Budget.objects.all())
    
    def create(self, validated_data):
        return Expense.objects.create(**validated_data)
    def update(self, instance, validated_data, budget_id):
        instance.name = validated_data.get('name', instance.name)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.budget = budget_id
        instance.save()
        return instance
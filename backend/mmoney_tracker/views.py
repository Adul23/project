from rest_framework import generics
from .models import Budget, Expense, Income
from .serializers import BudgetSerializer, ExpenseSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


class BudgetListView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer

@api_view(['GET', 'POST'])    
def listExpensesbyBudget(request, budget_id):
    if request.method == 'GET':
        expenses = Expense.objects.filter(budget=budget_id)
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data) 
    if request.method == 'POST':
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            expense = serializer.save()
            return Response(ExpenseSerializer(expense).data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])    
def listExpenses(request):
    if request.method == 'GET':
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data) 
    if request.method == 'POST':
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            expense = serializer.save()
            return Response(ExpenseSerializer(expense).data, status=201)
        return Response(serializer.errors, status=400)


class IncomeListView(generics.ListCreateAPIView):
    queryset = Income.objects.all()
    serializer_class = BudgetSerializer

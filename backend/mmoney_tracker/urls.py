from django.urls import path
from .views import BudgetListView, listExpenses, listExpensesbyBudget

urlpatterns = [
    path('api/budgets/', BudgetListView.as_view(), name='budget-list'),
    path('api/expenses/', listExpenses, name='budget-expenses'),
    path('api/budgets/<int:budget_id>/expenses/', listExpensesbyBudget, name='budget-expenses'),

]

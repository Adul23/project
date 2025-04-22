from django.urls import path
from .views import (
    register_user,
    login_user,
    ExpenseListCreateAPIView,
    ExpenseDetailAPIView,
    CategoryListCreateView,
    CurrencyListCreateView,
    listExpensesbyCategory,
    deleteExpense,
)

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('expenses/', ExpenseListCreateAPIView.as_view(), name='expense-list'),
    path('expenses/<int:pk>/', ExpenseDetailAPIView.as_view(), name='expense-detail'),
    path('categories/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('currencies/', CurrencyListCreateView.as_view(), name='currency-list-create'),
    path('categories/<int:category_id>/expenses/', listExpensesbyCategory, name='budget-expenses'),
    path('categories/<int:category_id>/expenses/<int:expense_id>', deleteExpense, name='delete-expenses'),

]
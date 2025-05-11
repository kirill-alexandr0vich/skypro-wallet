import { createEvent, createStore, sample, StoreWritable } from 'effector';
import { addExpenseFn } from '../New';
import { $categoryList } from 'src/pages/MyExpenses/children/New/children/Categories';
import { appStarted } from 'src/shared/config/init';
import {
  $availableCategoriesForFilteringList,
  $selectedCategoriesForFilteringList
} from 'src/pages/MyExpenses/children/Table/children/Filters/children/Category';

export type Expense = {
  id: string;
  desc: string;
  category: string;
  date: string;
  amount: string;
};

const deleteExpenseByIdFn = createEvent<string>();

const $expenseList: StoreWritable<Expense[]> = createStore([]);
const $filteredExpenseList: StoreWritable<Expense[]> = createStore([]);

const $columnNamesList = createStore<string[]>(['Описание', 'Категория', 'Дата', 'Сумма']);

$expenseList
  .on(addExpenseFn, (list, newExpense) => [...list, { ...newExpense }])
  .on(deleteExpenseByIdFn, (list, id) => list.filter((expense) => expense.id !== id));

sample({
  clock: [appStarted, addExpenseFn, deleteExpenseByIdFn],
  source: { expenses: $expenseList, categories: $categoryList },
  fn: ({ expenses, categories }) => {
    const usedCategories = new Set(expenses.map((e) => e.category));
    return categories.filter((cat) => usedCategories.has(cat.name));
  },
  target: $availableCategoriesForFilteringList
});

sample({
  clock: [$expenseList, $selectedCategoriesForFilteringList],
  source: {
    expenses: $expenseList,
    selected: $selectedCategoriesForFilteringList
  },
  fn: ({ expenses, selected }) => {
    const selectedNames = new Set(selected.map((c) => c.name));
    return expenses.filter((exp) => selectedNames.has(exp.category));
  },
  target: $filteredExpenseList
});

export { $expenseList, $filteredExpenseList, deleteExpenseByIdFn, $columnNamesList };

import { createStore, createEvent, sample } from 'effector';
import { $filteredExpenseList, deleteExpenseByIdFn } from 'src/pages/MyExpenses/children/Table';
import { addExpenseFn } from 'src/pages/MyExpenses/children/New';
import { Expense } from 'src/pages/MyExpenses/children/Table/model';
import {
  $selectedCategoriesForFilteringList
} from 'src/pages/MyExpenses/children/Table/children/Filters/children/Category';

type SortOrder = 'asc' | 'desc' | null;

const toggleSortOrder = createEvent();

const $sortOrder = createStore<SortOrder>(null).on(toggleSortOrder, (prev) => {
  if (prev === null) return 'asc';
  if (prev === 'asc') return 'desc';
  return null;
});

const parseDate = (str: string) => {
  const [d, m, y] = str.split('.').map(Number);
  return new Date(y, m - 1, d);
};

sample({
  clock: [toggleSortOrder, deleteExpenseByIdFn, addExpenseFn, $selectedCategoriesForFilteringList],
  source: [$filteredExpenseList, $sortOrder],
  fn: ([list, order]: [Expense[], SortOrder]) => {
    if (order === null) return list;
    return [...list].sort((a, b) => {
      const da = parseDate(a.date).getTime();
      const db = parseDate(b.date).getTime();
      return order === 'asc' ? da - db : db - da;
    });
  },
  target: $filteredExpenseList
});

export { toggleSortOrder, $sortOrder };

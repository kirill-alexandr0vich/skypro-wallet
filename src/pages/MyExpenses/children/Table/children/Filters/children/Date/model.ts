import { createStore, createEvent, sample } from 'effector';
import { $filteredExpenseList } from 'src/pages/MyExpenses/children/Table';

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

const $sortedExpenseList = sample({
  source: {
    list: $filteredExpenseList,
    order: $sortOrder
  },
  fn: ({ list, order }) => {
    if (order === null) return list;
    return [...list].sort((a, b) => {
      const da = parseDate(a.date).getTime();
      const db = parseDate(b.date).getTime();
      return order === 'asc' ? da - db : db - da;
    });
  }
});

export { toggleSortOrder, $sortOrder, $sortedExpenseList };

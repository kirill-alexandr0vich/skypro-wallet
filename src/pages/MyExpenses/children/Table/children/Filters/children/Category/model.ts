import { createEvent, createStore, sample, StoreWritable } from 'effector';
import { $categoryList, Category } from 'src/pages/MyExpenses/children/New/children/Categories/model';
import { addExpenseFn } from 'src/pages/MyExpenses/children/New';
import { appStarted } from 'src/shared/config/init';

const selectCategoriesForFilteringFn = createEvent<Category[]>();

const $availableCategoriesForFilteringList: StoreWritable<Category[]> = createStore([]);
const $selectedCategoriesForFilteringList: StoreWritable<Category[]> = createStore([]);

$selectedCategoriesForFilteringList.on(selectCategoriesForFilteringFn, (_, categories) => categories);

sample({
  clock: appStarted,
  source: $availableCategoriesForFilteringList,
  fn: (available) => [...available],
  target: $selectedCategoriesForFilteringList
});

sample({
  clock: addExpenseFn,
  source: {
    selected: $selectedCategoriesForFilteringList,
    available: $availableCategoriesForFilteringList,
    allCategories: $categoryList
  },
  fn: ({ selected, available, allCategories }, newExpense) => {
    if (available.some((c) => c.name === newExpense.category)) {
      return selected;
    }

    const newCategory = allCategories.find((c) => c.name === newExpense.category);
    return newCategory ? [...selected, newCategory] : selected;
  },
  target: $selectedCategoriesForFilteringList
});

export { $availableCategoriesForFilteringList, $selectedCategoriesForFilteringList, selectCategoriesForFilteringFn };

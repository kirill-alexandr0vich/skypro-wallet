import { CategoryFilter, DateSorting } from './children';

export const Filters = () => {
  return (
    <div className="flex gap-24 text-xs">
      <CategoryFilter />
      <DateSorting />
    </div>
  );
};

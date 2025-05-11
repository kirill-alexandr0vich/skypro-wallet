import { useUnit } from 'effector-react';
import { SortingAsc, SortingDesc } from 'src/shared/ui/images';
import { $sortOrder, toggleSortOrder } from './model';

export const DateSorting = () => {
  const [toggleSort, sortOrder] = useUnit([toggleSortOrder, $sortOrder]);

  const getIcon = () => {
    if (!sortOrder) {
      return <SortingAsc />;
    }
    if (sortOrder === 'asc') {
      return <SortingAsc className="text-green" />;
    }
    if (sortOrder === 'desc') {
      return <SortingDesc className="text-green" />;
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleSort} className="flex items-center gap-8 cursor-pointer">
        Сортировать по дате
        <div className="transition">{getIcon()}</div>
      </button>
    </div>
  );
};

import { useUnit } from 'effector-react';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from 'src/shared/ui/images';
import { Category } from 'src/pages/MyExpenses/children/New/children/Categories/model';
import { useClickOutside } from 'src/shared/hooks/useClickOutside';
import {
  $availableCategoriesForFilteringList,
  $selectedCategoriesForFilteringList,
  selectCategoriesForFilteringFn
} from './model';

export const CategoryFilter = () => {
  const [selectedCategories, selectCategories, availableCategories] = useUnit([
    $selectedCategoriesForFilteringList,
    selectCategoriesForFilteringFn,
    $availableCategoriesForFilteringList
  ]);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Category[]>([]);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const select = (currentCategory: Category) => {
    const categoryExists = selected.some((cat) => cat.id === currentCategory.id);
    if (categoryExists) {
      return setSelected((prevState) => prevState.filter((item) => item.id !== currentCategory.id));
    } else {
      return setSelected((prevState) => [...prevState, currentCategory]);
    }
  };

  const apply = () => {
    selectCategories(selected);
    close();
  };

  useEffect(() => {
    setSelected(selectedCategories);

    if (!selectedCategories.length) {
      close();
    }
  }, [selectedCategories]);

  const filterRef = useRef<HTMLDivElement>(null);

  const closeOutside = () => {
    setSelected(selectedCategories);
    setOpen(false)
  }

  useClickOutside(filterRef, closeOutside);

  return (
    <div className="relative" ref={filterRef}>
      <button onClick={!isOpen ? open : close} className="flex items-center gap-8 cursor-pointer">
        Фильтровать по категории{' '}
        <div className={`rotate-${!isOpen ? 0 : 180} transition`}>
          <Arrow />
        </div>
      </button>
      {isOpen && (
        <div className="absolute flex flex-col gap-8 bg-white top-20 w-[-webkit-fill-available] shadow-[0px_3px_10px_0px_#00000021] p-10 rounded-md">
          {availableCategories.length ? (
            <>
              <ul className="space-y-4">
                {availableCategories.map((category) => (
                  <li key={category.id} className="select-none">
                    <label htmlFor={category.id} className="flex items-center gap-4 cursor-pointer">
                      <input
                        type="checkbox"
                        id={category.id}
                        checked={selected.some((c) => c.id === category.id)}
                        onChange={() => select(category)}
                        className="accent-green"
                      />
                      <span className="text-xs">{category.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button
                onClick={apply}
                className="px-12 py-6 bg-green rounded-md text-white font-semibold text-xs/15 cursor-pointer disabled:bg-gray"
              >
                Применить
              </button>
            </>
          ) : (
            <div>Нет доступных категорий</div>
          )}
        </div>
      )}
    </div>
  );
};

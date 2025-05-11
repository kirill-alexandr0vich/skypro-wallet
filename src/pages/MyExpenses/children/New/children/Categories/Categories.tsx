import { Education, Entertainments, Food, Housing, Other, Transport } from 'src/shared/ui/images';
import { useUnit } from 'effector-react';
import { $categoryList } from './model';

const iconsMap = {
  food: <Food />,
  transport: <Transport />,
  housing: <Housing />,
  entertainments: <Entertainments />,
  education: <Education />,
  other: <Other />
};

type CategoriesType = {
  onChange: (v: string) => string;
  value: string;
};

export const Categories = (props: CategoriesType) => {
  const [categoryList] = useUnit([$categoryList]);

  return (
    <div className="flex flex-wrap gap-6">
      {categoryList.map((category) => {
        return (
          <button
            key={category.id}
            onClick={() => props.onChange(category.name)}
            className={`${props.value === category.name ? 'border-green text-green' : 'border-transparent'} flex items-center gap-12 py-8 px-20 rounded-[30px] bg-light-gray border text-xs/15 cursor-pointer hover:text-green`}
            type="button"
          >
            {iconsMap[category.id]}
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

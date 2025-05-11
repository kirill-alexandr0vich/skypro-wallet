import { createStore, StoreWritable } from 'effector';

export type Category = {
  name: string;
  id: string;
};

const $categoryList: StoreWritable<Category[]> = createStore([
  { name: 'Еда', id: 'food' },
  { name: 'Транспорт', id: 'transport' },
  { name: 'Жилье', id: 'housing' },
  { name: 'Развлечения', id: 'entertainments' },
  { name: 'Образование', id: 'education' },
  { name: 'Другое', id: 'other' }
]);

export { $categoryList };

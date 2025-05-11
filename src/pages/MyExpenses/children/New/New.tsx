import { Input } from 'src/shared/ui/components';
import { Categories } from 'src/pages/MyExpenses/children/New/children/Categories/Categories';
import { useForm } from 'effector-forms';
import { addingExpensesForm } from './model';
import { FormEvent, RefObject, useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

const Block = (props: { title: string; children: JSX.Element }) => (
  <div className="flex flex-col gap-16">
    <h3 className="font-semibold text-base/20">{props.title}</h3>
    {props.children}
  </div>
);

export const New = (props: { formRef: RefObject<HTMLFormElement> }) => {
  const { fields, isValid, submit } = useForm(addingExpensesForm);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  useEffect(() => {
    submit();
  }, []);

  return (
    <form
      ref={props.formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-24 bg-white p-32 rounded-[30px] shadow-[0px_20px_67px_-12px_#00000021]"
    >
      <h2 className="text-2xl font-bold">Новый расход</h2>

      <Block title={'Описание'}>
        <Input field={fields.desc} placeholder="Введите описание" />
      </Block>

      <Block title={'Категория'}>
        <Categories value={fields.category.value} onChange={fields.category.onChange} />
      </Block>

      <Block title={'Дата'}>
        <Input field={fields.date} placeholder="дд.мм.гггг" />
      </Block>

      <Block title={'Сумма'}>
        <Input field={fields.amount} placeholder="Введите сумму" />
      </Block>

      <button
        disabled={!isValid}
        className="py-12 bg-green rounded-md text-white font-semibold text-xs/15 cursor-pointer disabled:bg-gray"
      >
        Добавить новый расход
      </button>
    </form>
  );
};

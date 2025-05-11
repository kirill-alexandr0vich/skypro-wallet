import { useList } from 'effector-react';
import { $columnNamesList, $expenseList, $filteredExpenseList, deleteExpenseByIdFn } from './model';
import { Filters } from './children/Filters/Filters';
import { Delete, Edit } from 'src/shared/ui/images';
import { useUnit } from 'effector-react/compat';
import { $sortedExpenseList } from 'src/pages/MyExpenses/children/Table/children/Filters/children/Date';

export const Table = (props: { height: number }) => {
  const [expenseList, filteredExpenseList] = useUnit([$expenseList, $filteredExpenseList]);

  const expenses = useList($sortedExpenseList, (expense) => (
    <tr className="grid grid-cols-4 gap-x-32 justify-items-start">
      <td className="w-full truncate" scope="row">
        {expense.desc}
      </td>
      <td>{expense.category}</td>
      <td>{expense.date}</td>
      <td className="flex justify-between w-full">
        <div className="truncate">{expense.amount}</div>
        <div className="flex gap-12">
          <Edit />
          <button onClick={deleteExpenseByIdFn.prepend(() => expense.id)} className="h-min cursor-pointer">
            <Delete />
          </button>
        </div>
      </td>
    </tr>
  ));

  const columnNames = useList($columnNamesList, (columnName) => (
    <th className="font-normal text-gray" scope="col">
      {columnName}
    </th>
  ));

  const tableContent = () => {
    if (expenseList.length) {
      if (filteredExpenseList.length) {
        return expenses;
      }
      return (
        <tr className="flex justify-center">
          <td>По вашим параметрам ничего не нашлось. Попробуйте изменить фильтр.</td>
        </tr>
      );
    }
    return (
      <tr className="flex justify-center">
        <td>Записей пока нет</td>
      </tr>
    );
  };

  return (
    <section
      style={{ maxHeight: props.height || 'auto' }}
      className="no-scroll-arrows flex flex-col gap-32 bg-white p-32 pb-0 rounded-[30px] shadow-[0px_20px_67px_-12px_#00000021] overflow-auto scrollbar-custom"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Таблица расходов</h2>
        <Filters />
      </div>
      <table className="flex flex-col gap-18 w-full text-xs">
        <thead className="flex flex-col gap-6">
          <tr className="grid grid-cols-4 gap-x-32 justify-items-start">{columnNames}</tr>
          <tr className="w-[calc(100%+64px)] -ml-32 border-b border-gray"></tr>
        </thead>
        <tbody className="flex flex-col gap-14 pb-16">{tableContent()}</tbody>
      </table>
    </section>
  );
};

import { createForm } from 'effector-forms';
import { createEvent, sample } from 'effector';
import { Expense } from 'src/pages/MyExpenses/children/Table/model';
import { rules } from 'src/shared/lib/rules';

const addingExpensesForm = createForm({
  fields: {
    desc: {
      init: '',
      rules: [rules.required()]
    },
    category: {
      init: '',
      rules: [rules.required()]
    },
    date: {
      init: '',
      rules: [rules.required(), rules.date()]
    },
    amount: {
      init: '',
      rules: [rules.required(), rules.number()]
    }
  },
  validateOn: ['submit', 'blur', 'change']
});

const addExpenseFn = createEvent<Expense>();

sample({
  clock: addingExpensesForm.formValidated,
  source: addingExpensesForm.$values,
  fn: (values: Omit<Expense, 'id'>) => {
    return {
      ...values,
      amount: `${values.amount} ₽`,
      id: crypto.randomUUID()
    };
  },
  target: addExpenseFn
});

sample({
  // @ts-ignore
  clock: addExpenseFn,
  target: addingExpensesForm.reset
});

export { addingExpensesForm, addExpenseFn };

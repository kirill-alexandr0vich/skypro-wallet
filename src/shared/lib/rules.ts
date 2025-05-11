const numberPattern = /^\d+$/;
export const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})$/;

export const rules = {
  required: () => ({
    name: 'required',
    validator: (value: string) => ({
      isValid: value.length > 0
    })
  }),
  date: () => ({
    name: 'date',
    validator: (value: string) => ({
      isValid: datePattern.test(value)
    })
  }),
  number: () => ({
    name: 'number',
    validator: (value: string) => ({
      isValid: numberPattern.test(value)
    })
  })
};

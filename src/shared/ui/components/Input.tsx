import { ChangeEvent, ClassAttributes, InputHTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { ConnectedField } from 'effector-forms';

type InputProps = {
  field: ConnectedField<any>;
} & JSX.IntrinsicAttributes &
  ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  const value = () => props.field.value;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => props.field.onChange(e.target.value);
  const onBlur = () => props.field.onBlur();

  return (
    <input
      value={value()}
      onChange={onChange}
      onBlur={onBlur}
      className="p-12 border border-gray rounded-md focus:outline-green"
      type="text"
      {...props}
    />
  );
};

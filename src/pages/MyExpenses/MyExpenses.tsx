import { Header } from 'src/shared/ui/components';
import { Table } from 'src/pages/MyExpenses/children/Table/Table';
import { New } from 'src/pages/MyExpenses/children/New/New';
import { useEffect, useRef, useState } from 'react';

export const MyExpenses = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formHeight, setFormHeight] = useState<number>(0);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="px-120">
        <h1 className="mt-36 mb-32 text-[32px] font-bold">Мои расходы</h1>
        <div className="grid grid-cols-[66%_1fr] gap-34">
          <Table height={formHeight} />
          <New formRef={formRef} />
        </div>
      </div>
    </>
  );
};

import { useEffect } from 'react';
import { appStarted } from 'src/shared/config/init';
import { MyExpenses } from 'src/pages/MyExpenses/MyExpenses';

function App() {
  useEffect(() => {
    appStarted();
  }, []);

  return (
    <main>
      <MyExpenses />
    </main>
  );
}

export default App;

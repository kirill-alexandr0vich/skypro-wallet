import { Logo } from 'src/shared/ui/images';

export const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white px-120 py-20 text-sm/24">
      <Logo />
      <nav className="flex gap-48">
        <button className="text-green font-semibold border-b">Мои расходы</button>
        <button>Анализ расходов</button>
      </nav>
      <button className="font-semibold">Выйти</button>
    </header>
  );
};

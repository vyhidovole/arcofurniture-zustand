import React, { useEffect } from "react";
import Link from "next/link";
import { useLoading } from '@/context/LoadingContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import DropdownBaby from "@/components/ui/Dropdown/DropdownBaby";
import DropdownBedroom from "@/components/ui/Dropdown/DropdownBedroom";
import DropdownCouch from "@/components/ui/Dropdown/DropdownCouch";
import DropdownCupboard from "@/components/ui/Dropdown/DropdownCupboard";
import DropdownLiving from "@/components/ui/Dropdown/DropdownLiving";
import DropdownLobby from "@/components/ui/Dropdown/DropdownLobby";
/**
 * Компонент MenuBar отображает меню навигации с выпадающими списками.
 * Он использует контекст загрузки для отображения индикатора загрузки
 * во время получения данных.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий меню навигации.
 *
 * @example
 * <MenuBar />
 */

const MenuBar = () => {
  const { loading, setLoading } = useLoading(); // Получаем состояние загрузки

  // Пример эффекта для имитации загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Имитация задержки для загрузки данных
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 секунды
      setLoading(false);
    };

    fetchData();
  }, [setLoading]);

  return (
    <div className="hidden lg:flex justify-around w-full h-14 bg-teal-500 py-4 my-2 font-bold relative mb-6">
        {loading ? (
            // Если данные загружаются, показываем скелетон для всего контейнера
            <Skeleton height={56} width="100%" />
        ) : (
            // Если данные загружены, показываем компоненты Dropdown
            <div className="flex justify-around w-3/4">
                <Dropdown />
                <DropdownBaby />
                <DropdownBedroom />
                <DropdownCouch />
                <DropdownCupboard />
                <DropdownLiving />
                <DropdownLobby />
                <Link href="/" className="text-lg font-bold">каталог</Link>
               </div>
        )}
    </div>
);
};


export default MenuBar;
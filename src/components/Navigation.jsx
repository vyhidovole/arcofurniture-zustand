import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";//Ипортируем секлетон
import { useLoading } from "@/context/LoadingContext";//Импортируем хук useSkeleton
import 'react-loading-skeleton/dist/skeleton.css';//Импортируем стили скелетона
import { useTheme } from '@/context/ThemeContext';
import '@/components/Header.css';

/*пункты меню в шапке*/
const navItems = [
    { name: "Главная", path: "/" },
    { name: "Акции", path: "/actions" },
    { name: "Сборка", path: "/assembling" },
    { name: "Оплата", path: "/payment" },
    { name: "Доставка", path: "/delivery" },
    { name: "Наши рабты", path: "/work" },
    { name: "Контакты", path: "/contacts" },
];
/**
 * Компонент Navigation отображает навигационное меню с пунктами,
 * а также переключатель темы. Он использует контексты для управления
 * состоянием загрузки и темы.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий навигационное меню.
 *
 * @example
 * <Navigation />
 */

const Navigation = () => {

    const { isDarkMode, toggleTheme } = useTheme(); // Получаем доступ к теме
    const { loading, setLoading } = useLoading(); // Получаем состояние загрузки
    // состояние (стейт) для активного пункта меню
    const [activeLink, setActiveLink] = useState("Главная");
  
    const router = useRouter();
    useEffect(() => {
      const currentPath = router.pathname;
      const activeItem = navItems.find(item => item.path === currentPath);
      if (activeItem) {
        setActiveLink(activeItem.name);
      }
    }, [router.pathname]);
  
    // клик по активному пункту меню
    const onClickHandler = (link, path) => {
      if (link !== activeLink) {
        setLoading(true); // Устанавливаем состояние загрузки
        router.push(path).then(() => {
          setLoading(false); // Отключаем состояние загрузки после перехода
        });
        setActiveLink(link);
      }
      console.log(activeLink)
    };
  
    return (
      <div className="container_nav">
<header className={` shadow ${isDarkMode ? 'bg-black' : 'bg-white'} h-16 flex items-center`}>
        <div className="container  flex justify-between">
          {/* Левая часть с первыми пятью пунктами меню */}
          <nav className="flex items-center gap-5">
            {loading ? (
              // Отображаем скелетон, пока данные загружаются
              Array(5).fill().map((_, index) => (
                <Skeleton key={index} width={100} height={20} />
              ))
            ) : (
              navItems.slice(0, 5).map((item) => (
                <a
                  onClick={() => onClickHandler(item.name, item.path)}//передаем путь
                  className={`nav-link cursor-pointer
                   ${item.name === activeLink ?
                      "text-sky-500  underline-animation " : "text-gray-800"
                    }${isDarkMode ? 'dark:text-sky-500' : 'text-gray-800'} `}
                  key={item.path}
                >
                  {item.name}
                </a>
              ))
            )}
          </nav>
  
          {/* Правая часть с последними двумя пунктами меню */}
  
          <nav className="flex items-center gap-5">
            {loading ? (
              // Отображаем скелетон для правой части меню
              Array(2).fill().map((_, index) => (
                <Skeleton key={index} width={80} height={20} />
              ))
            ) : (
              navItems.slice(5).map((item) => (
                <a
                  onClick={() => onClickHandler(item.name, item.path)}
                  className={`nav-link cursor-pointer 
                  ${item.name === activeLink ? "text-sky-500 underline-animation " : "text-gray-800"
                    }${isDarkMode ? 'dark:text-sky-500' : 'text-gray-800'}`}
                  key={item.path}
                >
                  {item.name}
                </a>
              ))
            )}
            {/* Переключатель темы */}
            <fieldset className="relative inline-block w-16 h-8">
              <input
                type="checkbox"
                className="switch opacity-0 w-0 h-0"
                id="theme-toggle"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <label
                htmlFor="theme-toggle"
                className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition duration-300
                   ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              ></label>
              <span onClick={toggleTheme} 
              className={`absolute left-1 top-1 block w-6 h-6
                 bg-white rounded-full transition-transform duration-300
                  ${isDarkMode ? 'translate-x-8' : ''}`}>
              </span>
            </fieldset>
          </nav>
        </div>
      </header>
      </div>
      
    );
  };
  
  export default Navigation;
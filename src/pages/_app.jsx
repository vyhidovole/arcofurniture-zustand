import React, { useEffect } from "react";
import "@/styles/globals.css";
import MainLayout from "@/Layouts/MainLayout";
import { LoadingProvider } from '@/context/LoadingContext';
import MenuBar from "@/components/ui/MenuBar";
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import useCatalogueStore from '@/store/CatalogueStore';
// import { CartProvider } from '@/context/CartContext';

/**
 * Компонент для управления темой приложения.
 */
const ThemeManager = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return null; // Этот компонент ничего не рендерит
};


/**
 * Корневой элемент страницы.
 * Этот компонент оборачивает все страницы приложения в необходимые провайдеры
 * и предоставляет общий макет для всех страниц.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ElementType} props.Component - Компонент страницы, который будет рендериться.
 * @param {Object} props.pageProps - Свойства, передаваемые компоненту страницы.
 * @returns {JSX.Element} Элемент, представляющий корневой компонент приложения.
 *
 * @example
 * <App Component={MyPage} pageProps={myPageProps} />
 */
const App = ({ Component, pageProps }) => {
  const initializeBasket = useCatalogueStore((state) => state.initializeBasket);

  useEffect(() => {
    initializeBasket();  // Инициализируем сразу при монтировании App
  }, [initializeBasket]);

  return (
    <LoadingProvider>
      <ThemeProvider>
        <ThemeManager />
        <MainLayout>
          <MenuBar />
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </LoadingProvider>

  );
};

export default App;

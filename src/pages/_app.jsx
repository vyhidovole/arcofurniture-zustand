import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { LoadingProvider } from '@/context/LoadingContext';
import { ThemeProvider } from '@/context/ThemeContext'; 
import { CartProvider } from '@/context/CartContext';
import "@/styles/globals.css";

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
  return (
    <LoadingProvider>
      <ThemeProvider>
      <CartProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        </CartProvider>
      </ThemeProvider>
    </LoadingProvider>

  );
};

export default App;

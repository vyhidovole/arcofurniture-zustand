import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { LoadingProvider } from '@/context/LoadingContext';
import { ThemeProvider } from '@/context/ThemeContext'; 
import { CartProvider } from '@/context/CartContext';
import "@/styles/globals.css";

/* Корневой элемент страницы */
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

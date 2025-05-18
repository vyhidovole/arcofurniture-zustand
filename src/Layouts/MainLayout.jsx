import React from "react";
import { useTheme } from '@/context/ThemeContext';
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/* Обертка контента основной страницы */
const MainLayout = ({children}) => {
   const { isDarkMode } = useTheme(); // Получаем доступ к теме
  return (
    <main>
      <Navigation />
      <Header/>
      <div className={`container p-4  ${isDarkMode ? 'bg-gray-800' : 'bg-gray-400'}`}>{children}</div>
      <Footer/>
    </main>
  );
};

export default MainLayout;

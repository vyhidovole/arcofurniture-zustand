import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
/* Обертка контента основной страницы */
const MainLayout = ({children}) => {
  return (
    <main>
      <Navigation />
      <div className="container p-4 bg-slate-400">{children}</div>
      <Footer/>
    </main>
  );
};

export default MainLayout;

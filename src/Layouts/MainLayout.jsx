import React from "react";
import Navigation from "@/components/Navigation";

/* Обертка контента основной страницы */
const MainLayout = () => {
  return (
    <main>
      <Navigation />
      <div className="container p-4 bg-slate-400">This is main page</div>
    </main>
  );
};

export default MainLayout;

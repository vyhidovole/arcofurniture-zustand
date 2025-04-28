import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import { LoadingProvider } from '@/context/LoadingContext';

import "@/styles/globals.css";

/* Корневой элемент страницы */
const App = ({ Component, pageProps }) => {
  return (
    <LoadingProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </LoadingProvider>

  );
};

export default App;

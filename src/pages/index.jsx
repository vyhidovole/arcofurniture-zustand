import Head from "next/head";
import React from "react";
import Catalogue from "@/components/Catalogue";

/* Домашнаяя страница */
const Home = () => (
  <>
  <Head>
    <title>Arcofurniture</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <Catalogue/>
  </>
  
);

export default Home;

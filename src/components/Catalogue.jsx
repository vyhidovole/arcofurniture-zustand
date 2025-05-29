import React, { useEffect } from "react";
import Link from "next/link";
import useCatalogueStore from "@/store/CatalogueStore"
import { useLoading } from '@/context/LoadingContext'; // Импортируйте хук контекста загрузки
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Компонент Catalogue отображает список продуктов.
 *
 * Этот компонент использует Zustand для управления состоянием продуктов
 * и контекст загрузки для отображения состояния загрузки во время
 * получения данных с сервера.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий каталог продуктов.
 *
 * @example
 * <Catalogue />
 */

const Catalogue = () => {
  const catalogueStore = useCatalogueStore();
  const { loading, setLoading } = useLoading(); //  хук для управления загрузкой


  useEffect(() => {
    const url = '/CatalogueProducts'; // ваш URL
    setLoading(true);
    catalogueStore.getProducts(url).finally(() => {
      setLoading(false);
    });
  }, [setLoading, catalogueStore]); // зависимости для useEffect

  // Соответствия между названиями и URL
  const productLinks = {
    "кухни": "/kitchen",
    "гостиные": "/drawing-room",
    "детские": "/nursery",
    "спальни": "/bedroom",
    "диваны": "/couch",
    "прихожие": "/hallway",
    "шкафы-купе": "/cupboard",
    "столы и стулья": "/tables-and-chairs",

  };
  // Итерация по данным и отрисовка карточек
  const renderData =
    catalogueStore.products.length > 0 &&
    catalogueStore.products.map((item) => (
      <div key={item.id} className='relative border-2 border-blue-500 rounded-lg w-[250px] h-[185px] overflow-hidden
       '>

        <img
          src={item.imgSrc || '/path/to/default-image.jpg'}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <Link href={productLinks[item.name.toLowerCase()] || '/default'} passHref>
          <button
            className="text-white bg-sky-800 absolute px-6 py-1 rounded-sm bottom-0 left-0">
            {item.name}
          </button>
        </Link>

      </div>
    ))


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        // Отображение Skeleton, пока данные загружаются
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='relative border-2 border-blue-500 rounded-lg w-[250px] h-[185px] overflow-hidden'>
            <Skeleton height="100%" />
          </div>
        ))
      ) : (
        renderData
      )}

    </div>
  );
}

export default Catalogue;
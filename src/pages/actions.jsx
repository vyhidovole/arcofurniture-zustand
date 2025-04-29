import React, { useEffect, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import Slider from "@/components/ui/Slider/Slider";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Компонент для отображения акций.
 * Загружает данные о продуктах и отображает их в виде слайдера.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий акции.
 *
 * @example
 * return (
 *   <Actions />
 * );
 */
const Actions = () => {
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [data, setData] = useState([]); // Состояние для данных

  useEffect(() => {
     /**
     * Функция для загрузки данных о продуктах.
     * Загружает данные из локального JSON-файла и обновляет состояние компонента.
     *
     * @async
     * @function fetchData
     * @returns {Promise<void>} Возвращает промис, который разрешается после загрузки данных.
     */
    const fetchData = async () => {
      try {
        // Имитация загрузки данных из db.json
        const response = await fetch('http://localhost:3000/Products'); 
        const result = await response.json();
        setData(result); // Устанавливаем загруженные данные
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false); // Устанавливаем состояние загрузки в false после завершения загрузки
      }
    };

    fetchData(); // Вызываем функцию для загрузки данных
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании компонента
  
  return (
    <>
      {loading ? (
        // Если данные загружаются, показываем скелетон
        <div className="mb-6">
          <Skeleton height={60} width={160} className="mb-4" />
          <Skeleton height={200} count={3} />
        </div>
      ) : (
        // Если данные загружены, показываем заголовок и слайдер
        <>
          <div className="bg-gray-400 w-40 p-4 font-medium text-lg text-white rounded-md flex justify-around mb-6">
            <CiGrid41 />
            <h2 className="text-base">Акции</h2>
          </div>
          <Slider data={data} loading={loading} /> {/* Передаем состояние загрузки */}
        </>
      )}
    </>
  );
 };

export default Actions;

import React, { useEffect } from "react";
import { VscTrash } from "react-icons/vsc";
import useCatalogueStore from "@/store/CatalogueStore";
import { useCart } from '@/context/CartContext';


const Product = ({ item }) => {
  const catalogueStore = useCatalogueStore();

  const { addToCart, removeFromCart, deleteProduct } = useCart(); // Используем контекст
  useEffect(() => {
    catalogueStore.initializeBasket(); // Инициализация корзины после монтирования
  }, []);

  const { name, category, color, price, imgSrc, id, quantity } = item;

  const handleIncrement = () => {
    catalogueStore.incrementProductQuantity(item.id, item.category); // Увеличиваем количество в store
    addToCart()
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      catalogueStore.decrementProductQuantity(item.id, item.category); // Уменьшаем количество в store
      removeFromCart()
    }
  };
  const handleDeleteProduct = () => {
    deleteProduct(quantity); // Вызываем deleteProduct из контекста
    catalogueStore.clearProduct(item.id, item.category); // Также вызываем метод из store для удаления товара
  };
  const numericPrice = parseFloat(price); // Преобразуем в число

  const total = (numericPrice * catalogueStore.basket.find(product => product.id === id)?.quantity || 0).toFixed(2);

  return (
    <div className="flex mb-4"> {/* Основной контейнер */}
      <img width="100" src={imgSrc} alt={name} className="mr-4 object-contain" /> {/* Изображение с отступом справа */}
      <div className="flex flex-col"> {/* Информация о продукте занимает оставшееся пространство */}
        <h2 className="text-sm font-semibold">{name}</h2>
        <p className="text-xs">Категория: {category}</p>
        <div className='inline-flex'>
          {Array.isArray(color) ? (
            color.map((c, index) => ( // Используем c вместо item.color
              <div
                key={index}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: c,
                  borderRadius: '10%', 
                }}
              ></div>
            ))
          ) : (
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: color,
                borderRadius: '10%',
              }}
            ></div>
          )}
        </div>
        <p className="text-xs">Цена: {numericPrice.toFixed(2)}</p> {/* Отображаем цену с двумя знаками после запятой */}
        <p className="text-xs font-semibold">Всего: {total}</p> {/* Отображаем общую стоимость */}
      </div>
      <div className="flex flex-col items-center ml-4"> {/* Контейнер для кнопок */}
        <div className="product-buttons flex items-center w-18 mx-auto"> {/* Flex для кнопок увеличения/уменьшения */}
          <button
            className="product-sub bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 disabled:bg-gray-300"
            onClick={handleDecrement}// Вызываем функцию удаления продукта
            disabled={quantity === 1}
          >
            -
          </button>
          <h3 className="product-count mx-2 w-8 text-center">{quantity}</h3> {/* Отступ между кнопками и счетчиком */}
          <button className="product-add bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600"

            onClick={handleIncrement} // Вызываем функцию прибавления продукта
          >
            +
          </button>
        </div>
        <button
          className="mt-2 bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded hover:bg-gray-400" // Отступ сверху для кнопки удаления
          // onClick={() => catalogueStore.clearProduct(id)}
          onClick={handleDeleteProduct}
        >
          <VscTrash />
        </button>
      </div>
    </div>
  );
};

export default Product;

// import React from "react";
// import { VscTrash } from "react-icons/vsc";
// import useCatalogueStore from "@/store/CatalogueStore";


// const Product = ({ item }) => {
//   const catalogueStore = useCatalogueStore();

  

//   const { name, category, color, price, imgSrc, id, quantity } = item;

//   const handleIncrement = () => {
//     catalogueStore.incrementProductQuantity(item.id, item.category); // Увеличиваем количество в store
    
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       catalogueStore.decrementProductQuantity(item.id, item.category); // Уменьшаем количество в store
     
//     }
//   };
//   const handleDeleteProduct = () => {
   
//     catalogueStore.clearProduct(item.id, item.category); // Также вызываем метод из store для удаления товара
//   };
//   const numericPrice = parseFloat(price); // Преобразуем в число

//   const total = (numericPrice * catalogueStore.basket.find(product => product.id === id)?.quantity || 0).toFixed(2);// Преобразуем в строку

//   return (
//     <div className="flex mb-4"> {/* Основной контейнер */}
//       <img width="100" src={imgSrc} alt={name} className="mr-4 object-contain" /> {/* Изображение с отступом справа */}
//       <div className="flex flex-col"> {/* Информация о продукте занимает оставшееся пространство */}
//         <h2 className="text-sm font-semibold">{name}</h2>
//         <p className="text-xs">Категория: {category}</p>
//         <div className='inline-flex'>
//           {Array.isArray(color) ? (
//             color.map((c, index) => ( // Используем c вместо item.color
//               <div
//                 key={index}
//                 style={{
//                   width: '20px',
//                   height: '20px',
//                   backgroundColor: c,
//                   borderRadius: '10%', 
//                 }}
//               ></div>
//             ))
//           ) : (
//             <div
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 backgroundColor: color,
//                 borderRadius: '10%',
//               }}
//             ></div>
//           )}
//         </div>
//         <p className="text-xs">Цена: {numericPrice.toFixed(2)}</p> {/* Отображаем цену с двумя знаками после запятой */}
//         <p className="text-xs font-semibold">Всего: {total}</p> {/* Отображаем общую стоимость */}
//       </div>
//       <div className="flex flex-col items-center ml-4"> {/* Контейнер для кнопок */}
//         <div className="product-buttons flex items-center w-18 mx-auto"> {/* Flex для кнопок увеличения/уменьшения */}
//           <button
//             className="product-sub bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 disabled:bg-gray-300"
//             onClick={handleDecrement}// Вызываем функцию уменьшения продукта
//             disabled={quantity === 1}
//           >
//             -
//           </button>
//           <h3 className="product-count mx-2 w-8 text-center">{quantity}</h3> {/* Отступ между кнопками и счетчиком */}
//           <button className="product-add bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600"

//             onClick={handleIncrement} // Вызываем функцию прибавления продукта
//           >
//             +
//           </button>
//         </div>
//         <button
//           className="mt-2 bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded hover:bg-gray-400" // Отступ сверху для кнопки удаления
//           // onClick={() => catalogueStore.clearProduct(id)}
//           onClick={handleDeleteProduct}
//         >
//           <VscTrash />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Product;
import React, { useMemo } from "react";
import { VscTrash } from "react-icons/vsc";
import useCatalogueStore from "@/store/CatalogueStore";

const Product = ({ item }) => {
  const catalogueStore = useCatalogueStore();

  // Деструктурируем свойства из props (item из db.json через стор)
  const { name, category, color, price, imgSrc, id, quantity: initialQuantity } = item; // Переименовали quantity для ясности

  // Актуальное количество из корзины (вместо initialQuantity из props)
  const currentQuantity = catalogueStore.basket.find(product => product.id === id)?.quantity || initialQuantity || 1;

  const handleIncrement = () => {
    catalogueStore.incrementProductQuantity(id, category); // Увеличиваем количество в store
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) { // Используем актуальное количество
      catalogueStore.decrementProductQuantity(id, category); // Уменьшаем количество в store
    } else {
      // Опционально: авто-удаление при 0, но disabled уже блокирует
      catalogueStore.clearProduct(id, category);
    }
  };

  const handleDeleteProduct = () => {
    catalogueStore.clearProduct(id, category); // Удаляем товар из корзины
  };

  const numericPrice = useMemo(() => parseFloat(price), [price]); // Кэшируем число

  // Подробный расчёт total 
  const total = useMemo(() => 
    (numericPrice * (catalogueStore.basket.find(product => product.id === id)?.quantity || 0)).toFixed(2), 
    [numericPrice, catalogueStore.basket, id]
  );

  return (
    <div className="flex mb-4"> {/* Основной контейнер для карточки товара */}
      <img width="100" src={imgSrc} alt={name} className="mr-4 object-contain" /> {/* Изображение товара с отступом справа */}
      <div className="flex flex-col flex-1"> {/* Информация о продукте (flex-1 для заполнения пространства) */}
        <h2 className="text-sm font-semibold">{name}</h2>
        <p className="text-xs">Категория: {category}</p>
        <div className="inline-flex gap-1"> {/* Добавили gap для отступов между цветами */}
          {Array.isArray(color) ? (
            color.map((c, index) => ( // Отображаем несколько цветов как кружки
              <div
                key={index}
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: c,
                  borderRadius: "10%",
                  border: "1px solid #ccc", // Опционально: рамка для видимости
                }}
                title={c} // Tooltip с цветом
              />
            ))
          ) : (
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: color,
                borderRadius: "10%",
                border: "1px solid #ccc",
              }}
              title={color}
            />
          )}
        </div>
        <p className="text-xs">Цена: {numericPrice?.toFixed(2) || '0.00'}</p> {/* Цена с fallback */}
        <p className="text-xs font-semibold">Всего: {total}</p> {/* Общая стоимость (цена × количество) */}
      </div>
      <div className="flex flex-col items-center ml-4"> {/* Контейнер для кнопок управления */}
        <div className="product-buttons flex items-center w-18 mx-auto"> {/* Flex-контейнер для счётчика */}
          <button
            className="product-sub bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={handleDecrement} // Уменьшить количество
            disabled={currentQuantity <= 1} // Блокируем, если 1 или меньше
            aria-label="Уменьшить количество"
          >
            -
          </button>
          <h3 className="product-count mx-2 w-8 text-center font-bold">{currentQuantity}</h3> {/* Актуальное количество */}
          <button
            className="product-add bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600"
            onClick={handleIncrement} // Увеличить количество
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
        <button
          className="mt-2 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600" // Красный для удаления (был gray)
          onClick={handleDeleteProduct} // Удалить весь товар
          aria-label="Удалить товар"
        >
          <VscTrash />
        </button>
      </div>
    </div>
  );
};

export default Product;

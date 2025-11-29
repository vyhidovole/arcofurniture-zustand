import React, { useEffect } from "react";
import Product from "./Product/Product";
import useCatalogueStore from "@/store/CatalogueStore";

/**
 * Компонент для отображения корзины покупок.
 *
 * Этот компонент использует Zustand для управления состоянием корзины.
 * При монтировании компонента корзина инициализируется, загружаются
 * сохраненные товары из localStorage, а также корзина сохраняется
 * в localStorage при изменении.
 *
 * @component
 * @returns {JSX.Element} Элемент корзины покупок.
 *
 * @example
 * return <Basket />;
 */

const Basket = () => {
    const catalogueStore = useCatalogueStore();

  return (
    <div>
      {catalogueStore.basket.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div >
          <ul >
            {catalogueStore.basket.map((item) => (
             
              <Product key={`${item.id}-${item.category}`} item ={item}/>
            ))}
          </ul>

        </div>
      )

      }
    </div>

  );
};

export default Basket;

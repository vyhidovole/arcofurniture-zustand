import React, { createContext, useContext, useState } from 'react';


// Создаём контекст
const CartContext = createContext();
/**
 * Провайдер для контекста корзины.
 * Оборачивает дочерние компоненты и предоставляет им доступ к состоянию корзины.
 *
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты, которые будут иметь доступ к контексту.
 * @returns {JSX.Element} Элемент, представляющий провайдер контекста.
 *
 * @example
 * <CartProvider>
 *   <YourComponent />
 * </CartProvider>
 */

// Провайдер для контекста
export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0); // Состояние для количества товаров в корзине
    
   /**
     * Увеличивает количество товаров в корзине на 1.
     */
    const addToCart = () => {
        setCount(prevCount => prevCount + 1); // Увеличиваем количество товаров
    };

    /**
     * Уменьшает количество товаров в корзине на 1.
     * Количество не может быть меньше 0.
     */
    const removeFromCart = () => {
        setCount(prevCount => Math.max(prevCount - 1, 0)); // Уменьшаем количество товаров, не меньше 0
    };
    /**
         * Уменьшает количество товаров в корзине на указанное значение.
         * Количество не может быть меньше 0.
         *
         * @param {number} quantity - Количество товаров для удаления из корзины.
         */
    const deleteProduct = (quantity) => { // Переименовали clearProduct в deleteProduct
        setCount(prevCount => Math.max(prevCount - quantity, 0));
    };

    return (
        <CartContext.Provider value={{ count, addToCart, removeFromCart, deleteProduct }}>
            {children}
        </CartContext.Provider>
    );
};
/**
 * Хук для использования контекста корзины.
 *
 * @returns {Object} Объект с состоянием корзины и методами для управления ею.
 * @returns {number} count - Количество товаров в корзине.
 * @returns {Function} addToCart - Метод для добавления товара в корзину.
 * @returns {Function} removeFromCart - Метод для удаления товара из корзины.
 * @returns {Function} deleteProduct - Метод для удаления указанного количества товаров из корзины.
 *
 * @example
 * const { count, addToCart, removeFromCart } = useCart();
 */

export const useCart = () => {
    return useContext(CartContext);
};

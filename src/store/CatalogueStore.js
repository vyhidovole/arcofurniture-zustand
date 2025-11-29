import { create } from 'zustand'

// Создаем хранилище Zustand с помощью функции create, которая возвращает хук использования
const useCatalogueStore = create((set, get) => ({
    baseUrl: "http://localhost:3000",
    // Массив товаров, изначально пустой
    products: [], // Инициализируем массив товаров
    // Массив работы, изначально пустой
    workItems: [], // Инициализируем массив работ
    // Корзина для выбранных товаров, изначально пустая
    basket: [], // Корзина
    // Количество выбранных товаров
    quantity: 0,


    /**
 * Асинхронная функция для получения данных о продуктах по указанному URL.
 *
 * @async
 * @function getProducts
 * @param {string} url - Путь к ресурсу, по которому будет отправлен запрос для получения данных о продуктах.
 * @throws {Error} Выбрасывает ошибку, если запрос не удался или если сервер вернул ошибку HTTP.
 *
 * @returns {Promise<void>} Возвращает промис, который разрешается после обновления состояния с полученными данными о продуктах.
 */
    getProducts: async (url) => {
        try {
            // Посылаем запрос на сервер, используя базовый URL из состояния и переданный путь
            const response = await fetch(`${useCatalogueStore.getState().baseUrl}${url}`);
            // Проверка, успешно ли прошел запрос
            if (!response.ok) {
                // Если есть ошибка, выбрасываем исключение с информацией о статусе
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            // Получаем данные в формате JSON
            const data = await response.json();
            // Обновляем состояние, присваивая массив полученных продуктов
            set({ products: data });
        } catch (error) {
            // В случае ошибки выводим сообщение в консоль
            console.error("Ошибка при загрузке продуктов:", error);
        }
    },
    // Базовый URL для API-запросов, по умолчанию установлен Localhost
    // baseUrl: "http://localhost:3000",

    getWorkItems: async (url) => {
        try {
            const response = await fetch(`${useCatalogueStore.getState().baseUrl}${url}`);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const data = await response.json();
            set({ workItems: data });
        } catch (error) {
            console.error("Ошибка при загруазке работ:", error)
        }
    },
    // Базовый URL для API-запросов, по умолчанию установлен Localhost
    /**
 * Добавляет продукт в корзину. Если продукт уже есть в корзине, увеличивает его количество.
 *
 * @function addProductToBasket
 * @param {Object} item - Объект продукта, который нужно добавить в корзину.
 * @param {number} item.id - Уникальный идентификатор продукта.
 * @param {string} item.name - Название продукта.
 * @param {number} item.price - Цена продукта.
 * @throws {Error} Если переданный объект не содержит необходимую информацию.
 * 
 * @returns {void} Не возвращает значения.
 */
    addProductToBasket: (item) => {
        const { basket } = get();
        console.log("Добавляем продукт в корзину:", item);
        const existingProductIndex = basket.findIndex(product => product.id === item.id && item.category === product.category);
        let newBasket;

        if (existingProductIndex !== -1) {
            // Если продукт уже есть в корзине, увеличиваем его количество
            newBasket = [...basket];
            newBasket[existingProductIndex] = {
                ...newBasket[existingProductIndex],
                quantity: newBasket[existingProductIndex].quantity + 1,
            };
            console.log(`Увеличиваем количество для ${item.name}: ${newBasket[existingProductIndex].quantity}`);
        } else {
            // Если продукта нет в корзине, добавляем его
            newBasket = [...basket, { ...item, quantity: 1 }];
            console.log(`Товар ${item.name} добавлен в корзину с количеством 1`);
        }
        // Вычисляем quantity сразу на основе newBasket
        const newQuantity = newBasket.reduce((total, product) => total + product.quantity, 0);
        // Обновляем состояние корзины
        set({ basket: newBasket, 
             quantity: newQuantity  // Обновляем синхронно!
        });
        // Обновляем количество уникальных товаров
       
        get().saveToLocalStorage();
    },

    loadFromLocalStorage: () => {
        const data = localStorage.getItem('basket');
        if (data) {
            const parsedBasket = JSON.parse(data);
            set({ basket: parsedBasket });
            // Пересчитываем quantity из basket
            const newQuantity = parsedBasket.reduce((total, product) => total + product.quantity, 0);
            set({ quantity: newQuantity });
        }
    },

    // Метод для установки начального состояния корзины
    /**
 /**
 * Устанавливает начальное состояние корзины на основе сохраненных данных.
 *
 * @function setBasket
 * @param {Array<Object>} savedBasket - Массив объектов продуктов, представляющих сохраненное состояние корзины.
 * @param {number} savedBasket.id - Уникальный идентификатор продукта.
 * @param {string} savedBasket.name - Название продукта.
 * @param {number} savedBasket.quantity - Количество продукта в корзине.
 * 
 * @returns {Object} Возвращает объект с обновленным состоянием корзины и счетчиком.
 * @returns {Array<Object>} return.basket - Обновленный массив продуктов в корзине.
 * @returns {number} return.count - Общее количество продуктов в корзине.
 */
    setBasket: (savedBasket) => {
        const newQuantity = savedBasket.reduce((sum, product) => sum + product.quantity, 0);
        set({ 
            basket: savedBasket,
            quantity: newQuantity  // Обновляем сразу
        });
        console.log("Установка корзины:", savedBasket);
        get().saveToLocalStorage();
    },


    // Метод для увеличения количества товара
    /**
 * Увеличивает количество товара в корзине на 1.
 *
 * Этот метод принимает идентификатор товара и обновляет его количество в корзине.
 * Если товар с указанным идентификатором не найден, корзина остается без изменений.
 *
 * @param {string} productId - Идентификатор товара, количество которого нужно увеличить.
 *@returns {{ basket: Array }} - Возвращает обновленный объект состояния с новым массивом корзины.
 *
 * @example
 * // Увеличить количество товара с идентификатором '123'
 * incrementProductQuantity('123');
 */
     incrementProductQuantity: (productId, productCategory) => {
         set((state) => {
            const newBasket = state.basket.map(item => {
                if (item.id === productId && item.category === productCategory) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            // Вычисляем quantity сразу
            const newQuantity = newBasket.reduce((total, product) => total + product.quantity, 0);
           
            return { 
                basket: newBasket,
                quantity: newQuantity
            };
        })
        get().saveToLocalStorage(); 

     },
       
    /**
     * Удаляет товар из корзины по его ID.
     * @param {string} productId - ID товара, который нужно удалить.
     */
    deleteProductFromBasket: (productId, productCategory) => {
        set((state) => {
            const newBasket = state.basket.filter(item => !(item.id === productId && item.category === productCategory));
            const newQuantity = newBasket.reduce((total, product) => total + product.quantity, 0);
            return { 
                basket: newBasket,
                quantity: newQuantity
            };
        });
        get().saveToLocalStorage();
    },

    // Метод для уменьшения количества товара
    /**
 * Уменьшает количество товара в корзине по заданному идентификатору продукта.
 * Если количество товара становится равным нулю, товар удаляется из корзины.
 *
 * @function decrementProductQuantity
 * @param {number} productId - Уникальный идентификатор продукта, количество которого нужно уменьшить.
 * 
 * @returns {Object} Возвращает объект с обновленным состоянием корзины.
 * @returns {Array<Object>} return.basket - Обновленный массив продуктов в корзине.
 */
    decrementProductQuantity: (productId, productCategory) => {
        set((state) => {
            const productIndex = state.basket.findIndex(item => item.id === productId && item.category === productCategory);
            if (productIndex !== -1) {
                const product = state.basket[productIndex];
                if (product.quantity > 1) {
                    const newBasket = [...state.basket];
                    newBasket[productIndex] = { ...product, quantity: product.quantity - 1 };
                    const newQuantity = newBasket.reduce((total, prod) => total + prod.quantity, 0);
                    return { 
                        basket: newBasket,
                        quantity: newQuantity
                    };
                } else {
                    const newBasket = state.basket.filter(item => !(item.id === productId && item.category === productCategory));
                    const newQuantity = newBasket.reduce((total, prod) => total + prod.quantity, 0);
                    return { 
                        basket: newBasket,
                        quantity: newQuantity
                    };
                }
            }
            return state;
        });
        // После set вызываем save — теперь с фигурными скобками!
        get().saveToLocalStorage();
    },


    // Обновление количества товаров в корзине
    // Упрощенный updateCount — теперь редко нужен, но оставляем для совместимости
    updateCount: () => {
        const { basket } = get();
        const totalQuantity = basket.reduce((total, product) => total + product.quantity, 0);
        set({ quantity: totalQuantity });
        console.log("Обновлено quantity:", totalQuantity);
    },
    // Сохраняет корзину и количество товаров в localStorage
     saveToLocalStorage: () => {
        try {
            if (typeof window !== 'undefined') {
                const { basket } = get();
                localStorage.setItem("basket", JSON.stringify(basket));
               
                console.log("Сохранено в localStorage:", { basket });
            }
        } catch (error) {
            console.error("Ошибка при сохранении в localStorage:", error);
        }
    },

    // Инициализация корзины из localStorage
     initializeBasket: () => {
        if (typeof window !== 'undefined') {
            const savedBasket = localStorage.getItem("basket");
            if (savedBasket) {
                const parsedBasket = JSON.parse(savedBasket);
                // Всегда пересчитываем quantity для consistency
                const totalQuantity = parsedBasket.reduce((total, product) => total + (product.quantity || 0), 0);
                set({ 
                    basket: parsedBasket,
                    quantity: totalQuantity 
                });
                console.log("Корзина инициализирована с пересчетом quantity:", { basket: parsedBasket, quantity: totalQuantity });
            } else {
                set({ basket: [], quantity: 0 });
            }
        } else {
            console.warn("localStorage недоступен");
        }
        localStorage.removeItem("quantity")
    },

    // Удаление товара по id
      clearProduct: (productId, productCategory) => {
        const { basket } = get();
        const newBasket = basket.filter(item => !(item.id === productId && item.category === productCategory));
        const newQuantity = newBasket.reduce((total, product) => total + product.quantity, 0);
        set({ 
            basket: newBasket,
            quantity: newQuantity 
        });
        get().saveToLocalStorage(); 
        console.log("Товар удален из корзины");
    },
}));




export default useCatalogueStore
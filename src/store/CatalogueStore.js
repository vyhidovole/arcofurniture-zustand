import { create } from 'zustand'

// Создаем хранилище Zustand с помощью функции create, которая возвращает хук использования
const useCatalogueStore = create((set, get) => ({
    // Массив товаров, изначально пустой
    products: [], // Инициализируем массив товаров
    // Массив работы, изначально пустой
    workItems: [], // Инициализируем массив работ
    // Корзина для выбранных товаров, изначально пустая
    basket: [], // Корзина
    // Количество выбранных товаров
    quantity: 0,
    // Асинхронная функция для получения данных о продуктах по URL
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
    baseUrl: "http://localhost:3000",

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
    baseUrl: "http://localhost:3000",
    addProductToBasket: (item) => {
        const { basket } = get();
        console.log("Добавляем продукт в корзину:", item);
        const existingProductIndex = basket.findIndex(product => product.id === item.id);
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

        // Обновляем состояние корзины
        set({ basket: newBasket });
        // Обновляем количество уникальных товаров
        get().updateCount();
        get().saveToLocalStorage();
    },
   
    loadFromLocalStorage: () => {
        const data = localStorage.getItem('basket');
        if (data) {
            set({ basket: JSON.parse(data) });
            get().updateCount();
        }
    },// И затем в компоненте используйте хук таким образом:

    // const addProductToBasket = useBasketStore((state) => state.addProductToBasket);
    // Метод для установки начального состояния корзины
    setBasket: (savedBasket) => {
        // Обновляем состояние корзины и счетчик
        set((state) => {
            console.log("Установка корзины:", savedBasket); // Отладочное сообщение
            return {
                basket: savedBasket,
                count: savedBasket.reduce((sum, product) => sum + product.quantity, 0),
            };
        });
    },
    // Метод для увеличения количества товара
    incrementProductQuantity: (productId) => set((state) => {
        const basket = state.basket.map(item => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        // Обновляем состояние с новым массивом корзины
        return { basket, count: updateCount() }
    }),

    /**
     * Удаляет товар из корзины по его ID.
     * @param {string} itemId - ID товара, который нужно удалить.
     */
    deleteProductFromBasket: (productId) => {
        set(state => {
            const updatedBasket = state.basket.filter(item => item.id !== productId);
            return { basket: updatedBasket };
        });
        get().updateCount();
        console.log("Товар удален из корзины");
    },

    // Метод для уменьшения количества товара
    decrementProductQuantity: (productId) => {
        set((state) => {
            const productIndex = state.basket.findIndex(item => item.id === productId);
            if (productIndex !== -1) {
                const product = state.basket[productIndex];
                if (product.quantity > 1) {
                    const updatedBasket = [...state.basket];
                    updatedBasket[productIndex] = {
                        ...product,
                        quantity: product.quantity - 1,
                    };
                    return { basket: updatedBasket };
                } else if (product.quantity === 1) {
                    // Удаляем товар, если его количество равно 1
                    const updatedBasket = state.basket.filter(item => item.id !== productId);
                    return { basket: updatedBasket };
                }
            }
            return {};
        });
        get().updateCount();
        console.log("Количество товара уменьшено");
    },
    // Обновление количества товаров в корзине
  updateCount: () => {
    const totalQuantity = get().basket.reduce((total, product) => total + product.quantity, 0);
    set({ quantity: totalQuantity });
    console.log("Обновлено количество товаров в корзине:", totalQuantity);
  },

  // Сохраняет корзину и количество товаров в localStorage
  saveToLocalStorage: () => {
    try {
      if (typeof window !== 'undefined') {
        const { basket, quantity } = get();
        localStorage.setItem("basket", JSON.stringify(basket));
        localStorage.setItem("quantity", quantity.toString());
        console.log("Сохранено в localStorage:", basket, quantity);
      }
    } catch (error) {
      console.error("Ошибка при сохранении в localStorage:", error);
    }
  },
   // Инициализация корзины из localStorage
   initializeBasket: () => {
    if (typeof window !== 'undefined') { // Проверяем, что код выполняется в браузере
      const savedBasket = JSON.parse(localStorage.getItem("basket")) || [];
      set({ basket: savedBasket });
      get().updateCount();
      console.log("Корзина инициализирована:", savedBasket); // Отладочное сообщение
    } else {
      console.warn("localStorage недоступен, инициализация корзины не выполнена.");
    }
  },
   // Удаление товара по id
   clearProduct: (id) => {
    const newBasket = get().basket.filter(item => item.id !== id);
    set({ basket: newBasket });
    get().updateCount();
    console.log("Корзина очищена");
    // Также можно обновлять localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("basket", JSON.stringify(newBasket));
    }
    

  }
  
}))



export default useCatalogueStore
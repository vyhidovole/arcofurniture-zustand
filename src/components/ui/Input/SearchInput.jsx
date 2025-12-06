import React, { useState } from 'react';
import Link from "next/link";
import Skeleton from 'react-loading-skeleton'; // Импортируем Skeleton для индикации загрузки
import 'react-loading-skeleton/dist/skeleton.css'; // Импортируем стили для Skeleton
import { useLoading } from '@/context/LoadingContext'; // Импорт кастомного хука
import{useTheme} from '@/context/ThemeContext';

/**
 * Компонент поля поиска для каталога товаров.
 *
 * Этот компонент позволяет пользователю вводить текст для поиска
 * по доступным категориям товаров. При загрузке отображается индикатор загрузки.
 *
 * @component
 * @returns {JSX.Element} Элемент поля поиска с возможностью фильтрации категорий.
 *
 * @example
 * return (
 *   <SearchInput />
 * );
 */
const SearchInput = () => {
    const {isDarkMode} = useTheme()
    // Инициализируем состояние для хранения введённого текста в поле поиска
    const [searchTerm, setSearchTerm] = useState('');
    const { loading } = useLoading(); // Получаем состояние загрузки из useLoading

    // Массив объектов, содержащих названия и пути к страницам
    const items = [
        { name: 'кухни', path: '/kitchen' },
        { name: 'гостиные', path: '/drawing-room' },
        { name: 'спальни', path: '/bedroom' },
        { name: 'прихожие', path: '/hallway' },
        { name: 'шкафы-купе', path: '/cupboard' },
        { name: 'детские', path: '/nursery' },
        { name: 'диваны', path: '/couch' },
        { name: 'столы и стулья', path: '/tables-and-chairs' },
    ];

    // Обработчик изменения поля ввода
    const handleChange = (event) => {
        // Обновляем состояние searchTerm с новым значением из поля ввода
        setSearchTerm(event.target.value);
    };
    // Функция для очистки поля поиска
    const reSetSearch = () => setSearchTerm("")

    // Фильтруем элементы на основе введённого текста
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Сравниваем с учетом регистра
    );

    return (
        <div className="relative"> {/* Обёртка для позиционирования */}
            {loading ? (
                <Skeleton count={1} height={40} width="100%" /> 
            ) : (
                <>
                    <input
                        type="text"
                        value={searchTerm} // Значение поля ввода связано с состоянием
                        onChange={handleChange} // Устанавливаем обработчик изменения
                        placeholder="Поиск по каталогу"
                        className="hidden lg:block lg:border rounded p-1 w-full"
                    />
                    {searchTerm && ( // Показываем список только если есть текст в поле поиска
    <ul className="lg:absolute left-0 right-0 border border-gray-300 z-10 mt-1 rounded shadow-lg">
        {filteredItems.length > 0 ? ( // Проверяем, есть ли отфильтрованные элементы
            filteredItems.map((item, index) => ( // Проходим по отфильтрованным элементам
                <li key={index} className={`p-2 cursor-pointer ${isDarkMode ? 'search-item-dark' : 'search-item-light'}`}> {/* Убираем hover:bg-gray-200 и text-black; добавляем условный класс для темы */}
                    <Link href={item.path} className="block w-full h-full" onClick={reSetSearch}> {/* Ссылка на страницу по пути */}
                        {item.name} {/* Название элемента */}
                    </Link>
                </li>
            ))
        ) : (
            <li className={`p-2 ${isDarkMode ? 'search-item-dark' : 'search-item-light'}`}> {/* Применяем тот же условный класс для всего листа, чтобы цвет текста и фона адаптировался к теме */}
                Ничего не найдено
            </li>
        )}
    </ul>
)}

                </>
            )}
        </div>
    );
};

export default SearchInput;

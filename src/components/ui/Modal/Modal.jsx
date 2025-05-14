import React, { useEffect } from "react";
import Image from "next/image";
import { useTheme } from '@/context/ThemeContext';
/**
 * Модальное окно для отображения схемы проезда. 
 * 
 * Этот компонент отображает модальное окно с информащией о местоположении и изображением схемы проезда. 
 * 
 * @component
 * @param {boolean} isOpen -Определяет, открыто ли модальное окно. 
 * @param {function} onClose - Функция, вызываемая для закрытия модального окна.
 */

const Modal = ({ isOpen, onClose }) => {
     const { isDarkMode } = useTheme(); // Получаем доступ к теме
    if (!isOpen) return null;// Если модальное окно закрыто, ни чего не рендерим. 
    const handleClickOutside = (event) => {
        // Проверяем что клик был по фону модального окна
        if (event.target.classList.contains('bg-black/50')) {
            return onClose()
        }
    };

    useEffect(() => {
        //Добавляет обработчик события
        document.addEventListener('mousedown', handleClickOutside);
        //Удаляем обработчик события при размонтировании
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);//Пустой массив зависимостей, что бы эффект выполнялся только при монтировании и размонтиовании

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-10">
            <div className={` p-4 rounded shadow-lg w-3/4 h-5/6 flex flex-col ${isDarkMode?'dark-mode bg-gray-800':'light-mode bg-white'}`}>
                {/* Заголовок модального окна */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Схема проезда</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 focuse:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-between">
                    <h2>
                        Краснодар,<br />Московская 144 <br />корпус-1 <br />+7961-525-9191
                    </h2>
                    {/*Добавляем изображение */}
                    <Image
                        src={"/images/route.jpg"}
                        width={808} height={100}
                        alt="map"
                        priority={true}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Указывает размеры для различных экранов
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;
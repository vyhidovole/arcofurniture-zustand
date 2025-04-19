import React, { useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
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
    if (!isOpen) return null;// Если модальное окно закрыто, ни чего не рендерим. 
    const handleClickOutside = (event) => {
        // Проверяем что клик был по фону модального окна
        if (event.target.classList.contains('bg-black')) {
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className=" bg-white p-4 rounded shadow-lg w-3/4 h-5/6 flex flex-col ">
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
                    />
                </div>
            </div>
        </div>
    );
};

export default Modal;
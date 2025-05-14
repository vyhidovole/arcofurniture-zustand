import React, { useState, } from "react"
import Link from "next/link";
import ModalPrivetOffice from "@/components/ui/Modal/ModalPrivetOffice";
/**
 * Компонент для отображения страницы личного кабинета.
 * Содержит ссылки на главную страницу и страницу личного кабинета, 
 * а также модальное окно для авторизации пользователя.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий страницу личного кабинета.
 *
 * @example
 * return <PrivetOffice />;
 */
const PrivetOffice = () => {
    const [isEntryModalOpen, setEntryModalOpen] = useState(true); // Состояние для ModalPrivetOffice
    const [userData, setUserData] = useState(null); // Хранение данных пользователя


    const closeEntryDialog = () => {
        setEntryModalOpen(false); // Закрываем модальное окно для входа
    };
    const handleSetUserData = (data) => {
        setUserData(data); // Обновляем состояние с данными пользователя
        console.log("Данные пользователя:", data); // Логируем данные
    };
    return (
        <>
        <div className="flex mt-6 ">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
                -
                <Link href="/privetofficepage" className="text-base hover:underline ml-1 mr-1">Личный кабинет</Link>
                -
                <p className="text-base ml-1">Авторизация</p>

            </div>
            
            <ModalPrivetOffice 
            show={isEntryModalOpen} 
            onClose={closeEntryDialog}
            setNewState={handleSetUserData} 
             />{/* Добавляем форму */}

        </>

    );
}

export default PrivetOffice
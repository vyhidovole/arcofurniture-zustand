import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { GoMail } from "react-icons/go";
import { useLoading } from '@/context/LoadingContext'; // Импортируем контекст загрузки
import Skeleton from 'react-loading-skeleton'; // Импортируем скелетон
import 'react-loading-skeleton/dist/skeleton.css'; // Импортируем стили для скелетона

/**
 * Компонент для отображения контактной информации.
 * Загружает и отображает информацию о компании, включая адрес, время работы, телефон и email.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий контактную информацию.
 *
 * @example
 * return (
 *   <Contacts />
 * );
 */
const Contacts = () => {
    const { loading, setLoading } = useLoading(); // Получаем состояние загрузки
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // Здесь  можно добавить логику загрузки данных
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Имитация загрузки
            setLoading(false);
        };

        fetchData();
    }, [setLoading]);
    return (
        <>
            {loading ? (
                <Skeleton height={400} width="100%" /> // Скелетон для логотипа
            ) : (<div>
                <h2 className="text-5xl">Связаться с нами</h2>
                <div className="container flex justify-around items-center" style={{ marginTop: '5rem' }}>
                    <div className="flex items-center">
                        <div className="p-3 hover:bg-emerald-300 rounded-md"><CiLocationOn /></div>

                        <div className="ml-2">
                            <p>Адрес:</p>
                            <p>ул. Московская 144 корп. - 1</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 hover:bg-emerald-300 rounded-md"><CiClock2 /></div>

                        <div className="ml-2">
                            <p>Время работы:</p>
                            <p>с 10:00 до 19:00</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 hover:bg-emerald-300 rounded-md"> <LuPhone /></div>

                        <div className="ml-2">
                            <p>Телефон:</p>
                            <p>+7(961)5259191</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 hover:bg-emerald-300 rounded-md"><GoMail /></div>

                        <div className="ml-2">
                            <p>Email:</p>
                            <p>mebelarco@mail.ru</p>
                        </div>
                    </div>

                </div>
                <h3 className="text-4xl mt-10 mb-5">Наши адреса</h3>
                <p>Краснодар,ул. Московская 144 корп. - 1</p>
                <div className="flex items-center">
                    <CiClock2 />

                    <div className="ml-2">

                        <p>с 10:00 до 19:00</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <LuPhone />

                    <div className="ml-2">

                        <p>+7(961)5259191</p>
                    </div>
                </div>
            </div>

            )}
        </>

    )
}

export default Contacts;
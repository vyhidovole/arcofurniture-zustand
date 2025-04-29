import React from 'react';
import { CiCreditCard1, CiBank } from 'react-icons/ci'; // Импортируем иконки для оплаты картой и через банк
import { TbCash } from 'react-icons/tb'; // Импортируем иконку для наличной оплаты
import Skeleton from 'react-loading-skeleton'; // Импортируем Skeleton для индикации загрузки
import 'react-loading-skeleton/dist/skeleton.css'; // Импортируем стили для Skeleton
import { useLoading } from '@/context/LoadingContext'; // Импорт вашего кастомного хука
/**
 * Компонент для отображения способов оплаты.
 * Загружает состояние и отображает доступные варианты оплаты.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий способы оплаты.
 *
 * @example
 * return <Payment />;
 */
const Payment = () => {
    const { loading } = useLoading(); // Получаем состояние загрузки из useLoading

    return (
        <div className="container mx-auto p-5">
            {loading ? (
                <Skeleton count={5} />
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Способы оплаты</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <CiCreditCard1 className="mr-2 text-2xl" /> Картой
                        </h2>
                        <p className="ml-6">Visa / Mastercard</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <TbCash className="mr-2 text-2xl" /> Оплата наличными
                        </h2>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold flex items-center">
                            <CiBank className="mr-2 text-2xl" /> Оплата через банк онлайн
                        </h2>
                        <p className="ml-6">Вы можете произвести оплату через интернет-банк, используя реквизиты, указанные в вашем заказе.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Payment;

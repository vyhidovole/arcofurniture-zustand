import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLoading } from '@/context/LoadingContext'; // Импорт вашего кастомного хука
/**
 * Компонент для отображения информации о доставке и оплате.
 * Загружает состояние из контекста загрузки и отображает либо скелетон, либо информацию о доставке.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий информацию о доставке и оплате.
 *
 * @example
 * return <Delivery />;
 */
const Delivery = () => {
    const { loading } = useLoading(); // Получаем состояние загрузки из useLoading

    return (
        <div className="container mx-auto p-5">
            {loading ? (
                <Skeleton count={10} />
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Доставка и оплата</h1>
                    <h2 className="text-xl font-semibold mb-2">При заказе мебели предоплата составляет 30% от общей суммы по договору, остаток оплачивается уже после получения и приемки товара.</h2>
                    <p className="mb-4">Сборка оплачивается отдельно.</p>

                    <h3 className="text-lg font-semibold mb-2">Стоимость услуг</h3>
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Услуга</th>
                                <th className="border border-gray-300 p-2">Стоимость</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">Доставка по городу до подъезда</td>
                                <td className="border border-gray-300 p-2">800 руб</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Доставка по городу с подъемом</td>
                                <td className="border border-gray-300 p-2">от 1200 руб</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Доставка за город</td>
                                <td className="border border-gray-300 p-2">45 руб/км</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Поэтажный подъем столешниц 3 метра и меньше (в лифт не входит)</td>
                                <td className="border border-gray-300 p-2">300 руб/этаж</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">Для столешниц более 3х метров - услуга поэтажного подъема не предоставляется</td>
                                <td className="border border-gray-300 p-2"></td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="mt-4">
                        Доставка по городу с заносом в помещение осуществляется при возможности подъезда грузового автомобиля ко входу или подъезду на расстоянии не более 10 метров, а также при работающем грузовом лифте, в который помещаются все позиции заказа. В иных случаях стоимость рассчитывается и согласовывается с сотрудниками доставки, в зависимости от расстояний и объема заказа.
                    </p>
                </>
            )}
        </div>
    );
};

export default Delivery;

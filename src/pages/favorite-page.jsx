import React from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

/**
 * Компонент страницы избранного.
 * Отображает заголовок и навигацию для пользователя.
 *
 * @component
 * @returns {JSX.Element} Элемент, представляющий страницу избранных заметок.
 *
 * @example
 * return <FavoritePage />;
 */
const FavoritePage = () => {
    const router = useRouter();
    // Проверка, что router определён
  
    return (
        <>
       

            <h2 className="text-3xl font-semibold ">Мои заметки</h2>
            <div className="flex mt-6 ">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
                -
                <Link href="/privetofficepage" className="text-base hover:underline ml-1 mr-1">Личный кабинет</Link>
                -
                <p className="text-base ml-1">Мои заметки</p>

            </div>
        </>

    );
}

export default FavoritePage;
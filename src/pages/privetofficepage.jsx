// import React, { useState, } from "react"
// import Link from "next/link";

// /**
//  * Компонент для отображения страницы личного кабинета.
//  * Содержит ссылки на главную страницу и страницу личного кабинета, 
//  * а также модальное окно для авторизации пользователя.
//  *
//  * @component
//  * @returns {JSX.Element} Элемент, представляющий страницу личного кабинета.
//  *
//  * @example
//  * return <PrivetOffice />;
//  */
// const PrivetOffice = () => {
   
//     const [userData, setUserData] = useState(null); // Хранение данных пользователя


    
//     const handleSetUserData = (data) => {
//         setUserData(data); // Обновляем состояние с данными пользователя
//         console.log("Данные пользователя:", data); // Логируем данные
//     };
//     return (
//         <>
//         <div className="flex mt-6 ">
//                 <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
//                 -
//                 <Link href="/privetofficepage" className="text-base hover:underline ml-1 mr-1">Личный кабинет</Link>
//                 -
//                 <p className="text-base ml-1">Авторизация</p>

//             </div>
            
//             <form onSubmit={handleFormSubmit} method="dialog" >
//             <div className="${isDarkMode ? 'bg-gray-800' : 'bg-white'}p-4  shadow-lg w-72 h-96 flex flex-col mt-6 " >
//                 {/* Заголовок Модального окна */}
//                 <div className=" bottom-4 text-4xl ml-16">
//                     <h1 className="font-bold ">Войти</h1>
//                 </div>
//                 <Input
//                     className={errors.name ? "border-red-500" : ""}
//                     label="Name"
//                     type="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     error={errors.name}
//                 />


//                 <Input
//                     className={errors.email ? "border-red-500" : ""}
//                     label="Email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     error={errors.email}
//                 />
//                 <Input
//                     className={errors.password ? "border-red-500" : ""}
//                     label="Password"
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     error={errors.password}
//                 />

//                 <Link href="/forgot-password" className="m-6 cursor-pointer"><p>Забыли пароль?</p>
//                 </Link>
//                 <Button
//                     type="submit"
//                     variant="secondary"
//                     className="mt-6"
//                     isLoading={isLoading} // Передаём состояние загрузки
//                 >Отправить
//                 </Button>

//                 <div className=" flex justify-between  items-center">
//                     <p className="text-base text-center mt-10 ">Нет аккаунта?</p>
//                     <Link href="/account-page" className="mt-10 cursor-pointer">
//                         <p >Создать</p>
//                     </Link>

//                 </div>

               
//             </div>

//         </form>

//         </>

//     );
// }

// export default PrivetOffice
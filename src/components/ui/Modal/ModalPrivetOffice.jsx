import React, { useState } from "react";
import Link from "next/link";
import Alert from "../Alert/Alert";
import useForm from "@/hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";

/**
 * Модальное окно для регистрации пользователя в Личном кабинете.
 *
 * Этот компонент отображает модальное окно, где пользователь может ввести свои данные для регистрации.
 *
 * @component
 * @param {function} setNewState - Функция, вызываемая для обновления состояния после успешной отправки формы.
 *
 * @example
 * const handleNewState = (data) => {
 *   console.log('Новое состояние:', data);
 * };
 * 
 * return (
 *   <ModalPrivetOffice setNewState={handleNewState} />
 * );
 */

const ModalPrivetOffice = ({ setNewState }) => {
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm({
        name: "",
        email: "",
        password: "",
    }, setNewState);

    const [isShowAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setIsLoading(true); // Устанавливаем состояние загрузки
        // Вызываем handleSubmit из useForm для отправки данных
        const isSuccess = await handleSubmit(e); // Предполагается, что handleSubmit возвращает true/false

        // Если форма успешно отправлена и нет ошибок
        if (isSuccess) {
            localStorage.setItem('userData', JSON.stringify(formData));

            setShowAlert(true);
            resetForm(); // Сбрасываем форму
            setTimeout(() => {
                setShowAlert(false);
            }, 3000); // Закрываем алерт через 3 секунды
        } else {
            // Устанавливаем сообщение и показываем Alert
            setAlertMessage("Данные введены не корректно.");
            setAlertVariant('negative'); // Установите нужный вариант
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
            setIsLoading(false); // Сбрасываем состояние загрузки
            return
        }
        // Устанавливаем сообщение и показываем Alert
        setAlertMessage("Регисрация прошла успешно.");
        setAlertVariant('positive'); // Установите нужный вариант
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
        setIsLoading(false); // Сбрасываем состояние загрузки
    };
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    return (
        <form onSubmit={handleFormSubmit} method="dialog" >
            <div className="${isDarkMode ? 'bg-gray-800' : 'bg-white'}p-4  shadow-lg w-72 h-96 flex flex-col mt-6 " >
                {/* Заголовок Модального окна */}
                <div className=" bottom-4 text-4xl ml-16">
                    <h1 className="font-bold ">Войти</h1>
                </div>
                <Input
                    className={errors.name ? "border-red-500" : ""}
                    label="Name"
                    type="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />


                <Input
                    className={errors.email ? "border-red-500" : ""}
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    className={errors.password ? "border-red-500" : ""}
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <Link href="/forgot-password" className="m-6 cursor-pointer"><p>Забыли пароль?</p>
                </Link>
                <Button
                    type="submit"
                    variant="secondary"
                    className="mt-6"
                    isLoading={isLoading} // Передаём состояние загрузки
                >Отправить
                </Button>

                <div className=" flex justify-between  items-center">
                    <p className="text-base text-center mt-10 ">Нет аккаунта?</p>
                    <Link href="/account-page" className="mt-10 cursor-pointer">
                        <p >Создать</p>
                    </Link>

                </div>

                {isShowAlert ? (
                    <Alert
                        variant={alertVariant}
                        isOpen={isShowAlert}
                        onClose={handleCloseAlert}
                    >
                        {alertMessage}
                    </Alert>
                ) : (
                    <Alert
                        variant={alertVariant} // Или другой вариант, который вы хотите использовать
                        isOpen={isShowAlert} // Убедитесь, что это условие правильно
                        onClose={handleCloseAlert}

                    >
                        {alertMessage}
                    </Alert>
                )}
            </div>

        </form>
    );
}

export default ModalPrivetOffice;

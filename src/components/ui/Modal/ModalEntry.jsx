import React, { useRef, useEffect, useState } from "react";
import { useTheme } from '@/context/ThemeContext';
import Link from "next/link";
import Alert from "../Alert/Alert";
import useForm from "@/hooks/useForm";
import Input from "../Input/Input";
import Button from "../Button/Button";

/**
 * Модальное окно для входа пользователя.
 *
 * Этот компонент отображает модальное окно, где пользователь может ввести свои данные для входа.
 *
 * @component
 * @param {boolean} show - Определяет, открыто ли модальное окно.
 * @param {function} onClose - Функция, вызываемая для закрытия модального окна.
 * @param {function} setNewForm - Функция, вызываемая для обновления состояния формы после успешной отправки.
 *
 * @example
 * const [isModalOpen, setModalOpen] = useState(false);
 * const handleNewForm = (data) => {
 *   console.log('Новая форма:', data);
 * };
 * 
 * return (
 *   <>
 *     <button onClick={() => setModalOpen(true)}>Открыть модальное окно</button>
 *     <ModalEntry show={isModalOpen} onClose={() => setModalOpen(false)} setNewForm={handleNewForm} />
 *   </>
 * );
 */
const ModalEntry = ({ show, onClose, setNewForm }) => {
    const { isDarkMode } = useTheme(); // Получаем доступ к теме
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        {
            name: "",
            email: "",
            password: "",
        },
        setNewForm
    );


    const dialogRef = useRef(null);
    const [isShowAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки

    useEffect(() => {
        if (show) {
            dialogRef.current.show();
            document.addEventListener("mousedown", handleBackgroundClick);
        } else {
            dialogRef.current.close();
            document.removeEventListener("mousedown", handleBackgroundClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleBackgroundClick);
        };
    }, [show]);

    // Обработчик события для закрытия диалогового окна
    const handleBackgroundClick = (e) => {
        // Check if the click target is not the dialog or its children
        if (dialogRef.current && !dialogRef.current.contains(e.target)) {
            // Очищаем поля
            resetForm();
            onClose(); // Close the modal
        }
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Устанавливаем состояние загрузки перед отправкой
        setIsLoading(true);

        // Если нет ошибок, отправляем данные
        const isSuccess = await handleSubmit(e);

        if (isSuccess) {
            localStorage.setItem("userData", JSON.stringify(formData));
            setAlertMessage("Регистрация прошла успешно.");
            setAlertVariant('positive');
            setShowAlert(true);
            resetForm();

            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 3000);
            setIsLoading(false); // Сбрасываем состояние загрузки

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

    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const isFormValid = Object.keys(errors).length === 0 && formData.name && formData.email && formData.password;


    console.log("Form Data:", formData);
    console.log("Errors:", errors);
    console.log("Is Form Valid:", isFormValid);


    return (
        <div
            className={`fixed inset-0 bg-black/50 flex justify-center z-10 items-center ${show ? "block" : "hidden"}`}
            onClick={handleBackgroundClick} // Добавляем обработчик клика
        >
            <dialog ref={dialogRef} className="rounded-xl">
                <form onSubmit={handleFormSubmit} method="dialog">
                    <div
                        className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-lg w-11/12 md:w-3/4 lg:w-72 h-auto flex flex-col`}
                        onClick={(e) => e.stopPropagation()} // Останавливаем всплытие клика на модалке
                    >
                        {/* Заголовок Модального окна */}
                        <div className="bottom-4 text-4xl ml-16">
                            <h1 className="font-bold">Войти</h1>
                        </div>

                        {/* Содержание Модального окна */}
                        <Input
                            className={errors.name ? "border-red-500" : ""}
                            label="Name"
                            type="text"
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
                            // onBlur={handleBlur} // Используем обработчик из useForm
                            error={errors.password}
                        />
                        <Link href="/forgot-password" className="mt-6 cursor-pointer" onClick={onClose}>
                            <p>Забыли пароль?</p>
                        </Link>

                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={!isFormValid} // Делаем кнопку недоступной, если форма не валидна
                            isLoading={isLoading} // Передаём состояние загрузки
                        >
                            Отправить
                        </Button>

                        {isShowAlert && (
                            <Alert
                                variant={alertVariant}
                                isOpen={isShowAlert}
                                onClose={handleCloseAlert}
                            >
                                {alertMessage}
                            </Alert>
                        )}

                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ModalEntry;

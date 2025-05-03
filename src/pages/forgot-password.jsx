import React, { useState, } from "react"
import Link from "next/link";
import useForm from "@/hooks/useForm";
import Alert from "@/components/ui/Alert/Alert";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

/**
 * Компонент для восстановления пароля.
 * Позволяет пользователю ввести свой адрес электронной почты для получения нового пароля.
 *
 * @component
 * @param {Function} setNewState - Функция для обновления состояния родительского компонента.
 * @returns {JSX.Element} Элемент, представляющий форму восстановления пароля.
 *
 * @example
 * return <Password setNewState={someFunction} />;
 */

const Password = (setNewState) => {

    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        { email: "", }, setNewState);




    const [isShowAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('info');
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    /**
     * Обработчик отправки формы.
     * Предотвращает перезагрузку страницы, отправляет данные формы и управляет состоянием уведомлений.
     *
     *  @param {Event} e - Событие отправки формы.
     */
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        setIsLoading(true); // Устанавливаем состояние загрузки
        // Вызываем handleSubmit из useForm для отправки данных
        const isSuccess = await handleSubmit(e); // Предполагается, что handleSubmit возвращает true/false

        // Если форма успешно отправлена и нет ошибок
         if(isSuccess) {
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
        setAlertMessage("Новый пароль был выслан на ваш адрес электронной почты.");
        setAlertVariant('positive'); // Установите нужный вариант
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false)
        }, 3000)
        setIsLoading(false); // Сбрасываем состояние загрузки
    }

    /**
     * Обработчик закрытия уведомления.
     * Скрывает уведомление при вызове.
     */
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    const isFormValid = Object.keys(errors).length === 0  && formData.email ;

    return (
        <>
            <h2 className="text-3xl font-semibold ">Забыли пароль?</h2>
            <div className="flex">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>-
                <Link href="/privetofficepage" className="text-base hover:underline ml-1 mr-1">Личный кабинет</Link>
                -
                <p className="text-base ml-1">Забыли пароль?</p>
            </div>

            <Alert
                isOpen={isShowAlert}
                onClose={handleCloseAlert}
                variant={alertVariant}
            >
                {alertMessage}
            </Alert>

            <form
                onSubmit={handleFormSubmit}
                method="dialog"
            >
                <div className="inline-flex flex-col mt-6">

                    <Input
                        className={errors.email ? "border-red-500" : ""}
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div className="mt-6">
                    <Link href="/privetofficepage" className="bg-zinc-300 px-4 py-2 rounded-lg mr-3">назад</Link>

                    {/* <button type="submit" className="bg-zinc-300 px-4 py-2 rounded-lg m-3">продолжить</button> */}
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={!isFormValid}
                        isLoading={isLoading} // Передаём состояние загрузки
                    >
                        Отправить
                    </Button>
                </div>

            </form>

        </>

    );
}

export default Password;


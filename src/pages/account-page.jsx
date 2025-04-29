import React, { useState, } from "react"
import useForm from "@/hooks/useForm";
import Link from "next/link";
import Alert from "@/components/ui/Alert/Alert";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button";

/**
 * Компонент для регистрации пользователя.
 * Позволяет пользователю вводить свои данные для создания аккаунта.
 *
 * @component
 * @param {Function} setNewState - Функция для обновления состояния родительского компонента.
 * @returns {JSX.Element} Элемент, представляющий форму регистрации.
 *
 * @example
 * const handleNewState = (newState) => {
 *   // Обработка нового состояния
 * };
 * 
 * <Account setNewState={handleNewState} />
 */

const Account = (setNewState) => {
    
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
        { name: '', phone: '', email: "", password: '', confirmation: '' }, setNewState);
   
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
      
          if(isSuccess)  {
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
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };


    return (
        <>
            <h2 className="text-3xl font-semibold ">Быстрая регистрация</h2>
            <div className="flex mt-6">
                <Link href="/" className="text-base hover:underline mr-1">Главная</Link>
                -
                <p className="text-base ml-1">Быстрая регистрация</p>
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
                className="flex flex-col sm:flex-row lg:flex-wrap">
                <div className="inline-flex flex-col m-6">
                    
                    <Input
                        className={errors.name ? "border-red-500" : ""}
                        label="Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                   
                    <Input
                        className={errors.phone ? "border-red-500" : ""}
                        label="Телефон"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                    
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
                <div className="inline-flex flex-col m-6">
                   
                    <Input
                        className={errors.password ? "border-red-500" : ""}
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                </div>
                <div className="inline-flex flex-col m-6">
                    
                        <Input
                    className={errors.password ? "border-red-500" : ""}
                    label="Confirmation"
                    type="password"
                    name="confirmation"
                    value={formData.confirmation}
                    onChange={handleChange}
                    error={errors.confirmation}
                />
                </div>

                {/* <button type="submit" className="bg-blue-400 text-white p-3 rounded-md">Продолжить</button> */}
                <Button 
                type="submit" 
                variant="secondary"
                isLoading={isLoading} // Передаём состояние загрузки
               className="w-1/6 h-1/6 mt-12"
                >
                        Отправить
                    </Button>
            </form>

        </>

    );
}

export default Account;


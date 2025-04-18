import React, { useState, useEffect } from "react";
import {
    FaInfoCircle,
    FaCheckCircle,
    FaExclamationCircle,
    FaTimesCircle,
} from "react-icons/fa";

/**
 * компонент уведомления.
 * @param {Object} props - Свойства компонента.
 * @param {string} [props.variant="neutral"] - Вариант стиля компонента.
 * @param {ReactNode} props.children - Дочерние элементы компонента.
 * @param {boolean} props.isOpen - Флаг указывающий открыт/закрыт компонент.
 * @param {function} props.onClose - Функция обратного вызова.
 * 
 */
const Alert = ({ variant = "neutral", children, isOpen }) => {

    // Стили для вариантов компонента
    const variantClasses = {
        neutral: "bg-gray-100 text-gray-800",
        info: "bg-blue-100 text-blue-800",
        positive: "bg-green-100 text-green-800",
        notice: "bg-yellow-100 text-yellow-800",
        negative: "bg-red-100 text-red-800",
    }
    //Вариант иконок
    const iconVariant = {
        info: <FaInfoCircle className="w-5 h-5" />,
        positive: <FaCheckCircle className="w-5 h-5" />,
        notice: <FaExclamationCircle className="w-5 h-5" />,
        negative: <FaTimesCircle className="w-5 h-5" />,
    };
    // Стейт для открытия/закрытия компонента
    const [isShowAlert, setShowAlert] = useState(false);
    //Если не передавать в хук, то не увидит изменений.
    useEffect(() => {
        setShowAlert(isOpen)
    }, [isOpen]);
    if (!isOpen) return null;
    return (
        isShowAlert && (
            <div
                className={`flex items-center ${variantClasses[variant]} fixed top-4 left-1/2 transform-translate-x-1/2
            w-96 px-3 py-2 rounded-md z-50`}
                role="alert"
            >
                <div className="">{iconVariant[variant]}</div>
                <div className="ml-2">{children}</div>
            </div>
        )

    );
};

export default Alert;
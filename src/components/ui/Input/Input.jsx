import React from "react"
import classNames from "classnames";

/**
 * @param {Object} - Свойство компонента. 
 * @param {string} props.value - Текущее значение кода. 
 * @param {string} props.name - Уникальное имя элемента. 
 * @param {string} props.label - Подпись элемента формы. 
 * @param {string} props.error - Текст с ошибками при валидации. 
 * @param {boolean}props.required - Поле ввода обязательно или нет. 
 * @param {string} props.disabled - Поле доступно или нет для ввода. 
 * @param {string} props.autoComplete - Разрешить автозаполнение для подставления данных при следующем входе. 
 * @param {boolean}props.readOnly - Поле ввода для чтения или нет. 
 * @param {string} props.placeholder - Текст подсказка для ввода. 
 * @param {string} props.type - Тип ввода (на пример, "text","password" и.т.д.)
 * @param {event: React.MouseEvent<HTMLInputElement>} props.onClick - Событие клика на вводе. 
 * @param {event: React.ChangeEvent<HTMLInputElement>}props.onChange - Событие изменения значения ввода. 
 * @param {event: React.InputEvent<HTMLInputElement>}props.onInput - Событие по окончании изменения значения элемента формы. 
 * @param {event: React.FocusEvent<HTMLInputElement>} props.onBlure - Событие потери фокуса вводом. 
 * @param {event: React.FocusEvent<HTMLInputElement>}props.onFocus - Событие получения фокуса вводом. 
 * @param {string}props.className - Дополнительные классы для стилизации компонента. 
 * @param {JSX.Element} - Элемент ввода текста. 
 * 
 */
const Input = ({
    value,
    name,
    required,
    label,
    error,
    disabled,
    autoComplete = "off",
    readOnly,
    placeholder,
    type,
    onClick,
    onChange,
    onInput,
    onBlure,
    onFocus,
    className,

}) => {
    const inputClasses = classNames(
        "max-w-96 w-full border p-2 rounded-md focus:outline-none",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className || ""
    );
    /**
     * Обработчик события для поля ввода формы пои изменении значения. 
     * @param {React.ChangeEvent<HTMLInputElement>}event - Событие срабатывает при изменении поля формы. 
     * @returns {void}
     */
    const handleChange = (event) => {
        onChange && onChange(event);
    };

    /**
     * Обработчие собыия для поля ввода формы по окончании изменения значения элемента. 
     * @param {React.FormEvent<HTMLInputElement>} event - Событие срабатывает по окончании изменения значения элемента формы. 
     * @returns {void}
     */
    const handleInput = (event) => {
        onInput && onInput(event);
    }
    /**
     * Обработчик события получения фокуса вводом. 
     * @function
     * @param {React.FocusEvent<HTMLInputElement>}event - Событие получения фокуса. 
     * @returns {void}
     */
    const handleFocus = (event) => {
        onFocus && onFocus(event);
    };
    /**
     * Обработчик события потери фокуса вводом. 
     * @function
     * @param {React.FocusEvent<HTMLInputElement>}event - Событие потери фокуса. 
     * @returns {void}
     */
    const handleBlur = (event) => {
        onBlure && onBlure(event);
    };
    return (
        <div>
            <label
                className="block text-gray-700 text-sm font-bolt mb-2"
                htmlFor={name}
            >
                {label}
            </label>
            <input
                type={type || "text"}
                name={name}
                required={required}
                autoComplete={autoComplete}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                placeholder={placeholder}
                onClick={onClick}
                onChange={handleChange}
                onInput={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={inputClasses}
            />
            {error && (
                <span className="text-red-500 text-xs italic mt-1">{error}</span>
            )}
        </div>
    );
};

export default Input;
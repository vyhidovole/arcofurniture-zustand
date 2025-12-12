import React from "react";
import classNames from "classnames";

/**
 * @param {Object} props - Свойства компонента.
 * @param {string} props.value - Текущее значение кода.
 * @param {string} props.name - Уникальное имя элемента.
 * @param {string} props.label - Подпись элемента формы.
 * @param {string} props.error - Текст с ошибками при валидации.
 * @param {boolean} props.required - Поле ввода обязательно или нет.
 * @param {boolean} props.disabled - Поле доступно или нет для ввода.
 * @param {string} props.autoComplete - Разрешить автозаполнение для подставления данных при следующем входе.
 * @param {boolean} props.readOnly - Поле ввода для чтения или нет.
 * @param {string} props.placeholder - Текст подсказка для ввода.
 * @param {string} props.type - Тип ввода (например, "text","password" и.т.д.)
 * @param {event: React.MouseEvent<HTMLInputElement>} props.onClick - Событие клика на вводе.
 * @param {event: React.ChangeEvent<HTMLInputElement>} props.onChange - Событие изменения значения ввода.
 * @param {event: React.InputEvent<HTMLInputElement>} props.onInput - Событие по окончании изменения значения элемента формы.
 * @param {event: React.FocusEvent<HTMLInputElement>} props.onBlure - Событие потери фокуса вводом.
 * @param {event: React.FocusEvent<HTMLInputElement>} props.onFocus - Событие получения фокуса вводом.
 * @param {string} props.className - Дополнительные классы для стилизации компонента.
 * @returns {JSX.Element} - Элемент ввода текста.
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
        "max-w-96 w-full p-2 rounded-md focus:outline-none focus:ring-2", // Изменено: Убрал цветовые классы (bg-, text-, border-, focus:ring-), оставил layout и focus:outline-none (поскольку теперь в CSS .input:focus)
        // Добавлено: Класс "input" использует CSS vars для цветов
        "input",
        // Условные состояния
        disabled ? "opacity-50 cursor-not-allowed" : "", // Оставлено (Tailwind util)
        error ? "error" : "", // Изменено: Добавил "error" класс, который в CSS переопределяет border-color на var(--text-error)
        className || ""
    );

    /**
     * Обработчик события для поля ввода формы при изменении значения.
     * @param {React.ChangeEvent<HTMLInputElement>} event - Событие срабатывает при изменении поля формы.
     * @returns {void}
     */
    const handleChange = (event) => {
        onChange && onChange(event);
    };

    /**
     * Обработчик события для поля ввода формы по окончании изменения значения элемента.
     * @param {React.FormEvent<HTMLInputElement>} event - Событие срабатывает по окончании изменения значения элемента формы.
     * @returns {void}
     */
    const handleInput = (event) => {
        onInput && onInput(event);
    };

    /**
     * Обработчик события получения фокуса вводом.
     * @param {React.FocusEvent<HTMLInputElement>} event - Событие получения фокуса.
     * @returns {void}
     */
    const handleFocus = (event) => {
        onFocus && onFocus(event);
    };

    /**
     * Обработчик события потери фокуса вводом.
     * @param {React.FocusEvent<HTMLInputElement>} event - Событие потери фокуса.
     * @returns {void}
     */
    const handleBlur = (event) => {
        onBlure && onBlure(event);
    };

    return (
        <div>
            <label
                className="block input-label text-sm font-bold mb-2" // Изменено: Убрал "text-gray-700 dark:text-gray-300", добавил "input-label" (использует var(--text-label))
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
                <span className="input-error text-xs italic mt-1">{error}</span> // Изменено: Убрал "text-red-500 dark:text-red-400", добавил "input-error" (использует var(--text-error))
                
            )}
        </div>
    );
};

export default Input;

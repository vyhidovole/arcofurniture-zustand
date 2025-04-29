import { useState } from "react";
import { validateForm } from "../utils/validators";

/**
 * Хук для управления состоянием формы и валидацией.
 *
 * @param {Object} initialState - Начальное состояние формы.
 * @returns {Object} - Объект с состоянием формы, ошибками и функциями.
 */
function useValidate(initialState) {
  // Состояние формы, хранит значения полей
  const [formState, setFormState] = useState(initialState);

  // Состояние для отслеживания ошибок валидации
  const [errors, setErrors] = useState({});

  // Состояние для отслеживания полей, в которых пользователь находился
  // const [touchedFields, setTouchedFields] = useState({});

  /**
   * Обработчик изменения значения полей формы.
   *
   * @param {Object} e - Событие изменения.
   */
  const handleInput = (e) => {
    const { name, value } = e.target;

    // Обновляем состояние формы для текущего поля
    const updatedFormState = { ...formState, [name]: value };
    setFormState(updatedFormState);

    // Валидируем только текущее поле
    const validationErrors = {
      ...errors,
      [name]: validateForm({ [name]: value })[name],
    };

    // Обновляем состояние ошибок
    setErrors(validationErrors);
  };

  // Внутренний обработчик фокуса
  // const handleBlur = (e) => {
  //   const { name } = e.target;

  //   // Устанавливаем касаемость поля внутри хука
  //   setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
  // };

  return {
    formState,
    errors,
    handleInput,
  };
}

export default useValidate;

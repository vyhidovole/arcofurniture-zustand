import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * 
 * Провайдер для контекста темы.
 * Оборачивает дочерниек компоненты и предоставляет им доступ к состоянию темы(светлая/тёмная).
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {React.ReactNode} props.children - Дочерние компоненты которые будут иметь доступ к контексту.
 * @returns {JSX.Element} Элемент, представляющий провайдер контекста темы.
 * 
 * @example
 * <ThemeProvider>
 * <MyComponent>
 * </ThemeProvider>
 */
//Создаём контекст
export const ThemeContext = createContext();
//Провайдер для контекста
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarklMode] = useState(() => {
        //Проверяем есть ли доступ к localStorage
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('isDarkMode');
            return savedTheme === 'true';//Преобразуем строку в boolean.
        }
        return false;//Значение по умолчанию
    });
    /**
     * Переключает режим темы между светлым и темным.
     * Обновляет состояние и сохраняет новое значение в localStorage.
     */
    const toggleThme = () => {
        setIsDarklMode((prevMode) => {
            const newMode = !prevMode;//Переключаем режим
            if (typeof window !== 'undefined') {
                localStorage.setItem('isDarkMode', newMode);//Сохраняем новое значение в localStorage
            }
            return newMode;
        });
    };
    //Используем useEffect для изменения атрибута data-theme
    useEffect(()=>{
        if(typeof window !=='undefined'){
            if(isDarkMode){
                document.body.setAttribute('data-theme', 'dark');
            } else {
                document.body.removeAttribute('data-theme');
            }
        }
    },[isDarkMode])

    return (
        <ThemeContext.Provider value={{isDarkMode,toggleThme}}>
            {children}
        </ThemeContext.Provider>
    )
}
/**
 * Хук для использования контекста темы.
 * 
 * @returns {Object} Объект с состоянием темы и методом для переключения
 * @returns {boolean} isDarkMode - Состояние темы(true, если темный режим активен).
 * @returns {Function} toggleTheme - Метод для переключения темы
 * 
 * @example
 * const {isDarkMode,setIsDarkMode}= useTheme();
 */
export const useTheme = ()=>{
    return useContext(ThemeContext);
};
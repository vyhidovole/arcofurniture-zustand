import React,{createContext,useContext,useState} from "react";
//Создаём контекст
const LoadingContext = createContext();
/**
 * Провайдер для контекста загрузки.
 * Оборачивает дочерние компоненты и предоставляет им доступ к состоянию загрузки
 * 
 * @component
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние компоненты которые будут иметь доступ к контексту загрузки.
 * @returns {JSX.Element} Элемент, представляющий провайдер элемента загрузки.
 * 
 * @example
 * <LoadingProvider>
 *  <MyComponent />
 * </LoadingProvider>
 */
//Создаём провайдер
export const LoadingProvider = ({children})=>{
    const[loading,setLoading]= useState(false)

    return (
        <LoadingContext.Provider value={{loading,setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}
/**
 * Хук для использования контекста загрузки.
 * 
 * @returns {Object} Объект с состоянием загрузки и методом для его обновления.
 * @returns {boolean} loading - Состояние загрузки(true, если загрузка активна)
 * @returns {Function} setLoading - Метод  для установки состояния загрузки.
 * @example
 * const { loading, setLoading } = useLoading();
 */

export const useLoading = ()=>{
    return useContext(LoadingContext)
}

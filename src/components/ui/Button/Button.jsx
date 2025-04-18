import { BiLoaderAlt } from "react-icons/bi";
import { cn } from "@/utils/class-merge";


/**
 *  Компонент кнопки.
 * @param {Object} props - Свойства компонента. 
 * @param {string} props.className - Дополнительные классы для кнопки
 * @param {Function} pops.onClick - Обработчик клика. 
 * @param {string} props.variant - Вариант кнопки (primary,secondary,negative,ghost,link). 
 * @param {string} props.type - Тип кнопки (submit,button,reset). 
 * @param {reactNode} props.icon - Иконка кнопки. 
 * @param {boolean} props.isLoading - Флаг загрузки. 
 * @param {RactNode} props.children - Дочерние элементы кнопки. 
 * @param {boolean} props.disabled - Кнопка доступна или нет. 
 */
const Button = ({
    className,
    onClick,
    variant = "primary",
    type = "submit",
    suffix,
    icon,
    isLoading,
    children,
    disabled,
}) => {
    const buttonClasses = cn(
        "rounded inline-flex items-cener justify-center py-2 px-2",
        className,
        {
            "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900":
                variant === "primary",
            "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100":
                variant === "secondary",
            "bg-red-500 hover:bg-red-600 text-white": variant === "negative",
            "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-500 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent":
                variant === "ghost",
            "bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent":
                variant === "link",
            "opacity-50 pointer-events-none": disabled,
        }
    )
    return (
        <button
            className={buttonClasses}
            disabled={disabled || isLoading}
            onClick={onClick}
            type={type}
        >
            {isLoading && (
                <BiLoaderAlt className="animate-spin pointer-events-none" />
            )}
            {!isLoading && (
                <>
                    {icon}
                    {children}
                    {suffix && <span className="ml-2">{suffix}</span>}
                </>
            )}
        </button>
    );
}

export default Button;
import React,{useState} from "react";
import Link from "next/link";

const DropdownLiving = () => {
    const [isOpen,setIsOpen]= useState(false)

    const toggleMenu = () => {
        setIsOpen((prev) => !prev)
    }
    return ( 
        <div className="relative inline-block text-left">
            <div>
                <button
                onClick={toggleMenu}
                className="outline-transparent hover:cursor-pointer text-lg font-medium"
                >
                    гостиные

                </button>
            </div>
            {isOpen&&(
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/20">
                    <div className="py-1"role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link href='/drawing-room'className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                        Модульные
                        </Link>
                        <Link href='/drawing-room'className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                        Готовые комплекты
                        </Link>
                        <Link href='/drawing-room'className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                        Маленькие
                        </Link>

                    </div>

                </div>
            )}

        </div>
     );
}
 
export default DropdownLiving;
import React, { useState } from 'react';
import Link from "next/link";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleMenu}
                    className= 'outline-transparent hover:cursor-pointer text-2xl font-medium'
                   
                >
                    кухни
                    
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/20">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link href="/kitchen"className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Угловые кухни
                        </Link>
                        <Link href="/kitchen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                           Модульные кухни
                        </Link>
                        <Link href="/kitchen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Готовые комплекты
                        </Link>
                        <Link href="/kitchen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Маленькие кухни
                        </Link>
                        <Link href="/kitchen" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            Кухонные уголки
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

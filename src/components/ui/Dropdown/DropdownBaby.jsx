import React, { useState } from 'react';
import Link from 'next/link';

const DropdownBaby = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div className='relative inline-block text-left'>
            <div>
                <button
                    onClick={toggleMenu}
                    className='outline-transparent hover:cursor-pointer text-2xl font-medium'
                >
                    детские

                </button>
            </div>
            {isOpen && (
                <div className='absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg
                 bg-white ring-1 ring-black/20'>
                    <div className='py-1' role="menu" aria-orientation='vertical' aria-labelledby='options-menu'>
                        <Link href='/nursery' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
                            Кровати
                        </Link >
                        <Link href='/nursery' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
                            Полки
                        </Link>
                        <Link href='/nursery' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'role='menuitem'>
                        Столы
                        </Link>
                        <Link href='/nursery'className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
                        Шкафы
                        </Link>
                       <Link href='/nursery' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>
                       Комоды
                       </Link>

                    </div>

                </div>
            )}
        </div>

    );
}

export default DropdownBaby;
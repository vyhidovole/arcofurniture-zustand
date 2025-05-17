import React,{useState} from "react";
import Link from "next/link";

const DropdownCouch = () => {
    const [isOpen,setIsOpen]=useState(false)

    const toggleMenu=()=> {
        setIsOpen((prev)=>!prev)
    }
    return ( 
        <div className="relative inline-block text-left">
            <div>
                <button
                onClick={toggleMenu}
                className="outline-transparent hover:cursor-pointer text-2xl font-medium"
                >
                    диваны

                </button>
            </div>
            {isOpen&&(
                <div className="absolute right-0 z-10 w-56 rounded-md shadow-lg bg-white ring-1 ring-black/20">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <Link href='/couch' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                    Прямые
                    </Link>
                    <Link href='/couch'className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                    Угловые
                    </Link>
                    <Link href='/couch'className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                    На металлокаркасе
                    </Link>
                    <Link href='/couch'className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"role="menuitem">
                    Кресла
                    </Link>

                    </div>

                </div>
            )}

        </div>
     );
}
 
export default DropdownCouch;
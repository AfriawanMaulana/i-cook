import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);

    const searchRecipes = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (searchRef.current) {
            const inputValue = searchRef.current.value.trim();
            navigate(`/search/${inputValue}`)
        }
    }

    const openNav = () => {
        if (showNav == false) {
            setShowNav(true);
        } else if (showNav == true) {
            setShowNav(false);
        }
    }

    useEffect(() => {
        const navClass = document.querySelector('.mobileNav');
        const openBar = document.querySelector('.openBar');
        const closeBar = document.querySelector('.closeBar');
        const navbar = document.querySelector('.navbar');

        if (showNav == true && navClass?.classList.contains('hidden')) {
            navClass.classList.remove('hidden');
            openBar?.classList.add('hidden');
            closeBar?.classList.remove('hidden');
            navbar?.classList.remove('rounded-b-2xl');
        } else if (showNav == false) {
            navClass?.classList.add('hidden');
            openBar?.classList.remove('hidden');
            closeBar?.classList.add('hidden');
            navbar?.classList.add('rounded-b-2xl');
        }
    })
    return ( 
        <>
            <nav className="items-center z-40 sticky top-0 bg-orange-400 border-b-2 navbar">
                <div className="flex p-2 justify-between font-bold">
                    <h1 className="text-white text-3xl font-bold w-60">What would you like to cook?</h1>
                    {/* <img src="/images/logo2.png" alt="s" width={150} height={100}/> */}
                    <button onClick={openNav} type="button" className="font-bold text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 openBar">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 closeBar hidden">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                    </button>
                </div>
                
                <div className="pb-4">
                    <form className="flex p-4 items-center">
                        <input className="searchInput w-full p-2 rounded-md focus:outline-none" 
                            type="text" 
                            placeholder="Find recipes..."
                            ref={searchRef}
                        />
                        <button onClick={searchRecipes} className="absolute right-4 bg-white rounded-md p-2 font-bold text-orange-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </form>
                </div>

                <ul className="flex flex-col items-center bg-orange-400 w-full h-screen gap-4 py-4 text-white font-bold absolute mobileNav">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/search"}>Search</Link></li>
                    <li><a href="">Category</a></li>
                    
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
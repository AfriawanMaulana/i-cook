import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Recipes {
    recipes: [{
        id: number;
        name: string;
    }]
}

function SearchPage() {
    const [ food, setFood ] = useState<Recipes | null>(null);
    const { query } = useParams();
    
    async function fetchData(key: string) {
        const url = import.meta.env.VITE_BASE_URL;

        try {
            const response = await fetch(`${url}/search?q=${key}`);
            if (!response.ok) {
                throw new Error('Failed fetching data');
            }

            const data = await response.json();
            setFood(data);
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        fetchData(`${query}`)
    }, [food, query])
    return (
        <>
            <Navbar />
            <div className="p-4">
                <div className="flex items-center gap-4 font-bold text-xl">
                    <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-10 fill-orange-400">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                    </Link>
                    {query ? (
                        <h1>Result for <span className="text-orange-400">{query}</span></h1>
                    ) : (
                        <h1></h1>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 py-4">
                    {food?.recipes.map((recipe) => {
                        return (
                            <div key={recipe.id} className="text-center">
                                <img src={`${import.meta.env.VITE_IMG_URL}${recipe.id}.webp`} alt={recipe.name} />
                                <h1>{recipe.name}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default SearchPage;
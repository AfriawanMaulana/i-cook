import { useEffect, useState } from "react";
interface Recipes {
    recipes: [{
        id: number;
        name: string;
    }]
}

function CategoryPage() {
    const [ food, setFood ] = useState<Recipes | null>(null);

    async function fetchData(query: string) {
        const url = import.meta.env.VITE_BASE_URL + `/search?q=${query}`;
        
        try {
            const response = await fetch(url);

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
        fetchData('chicken');
    }, [food])
    return (
        <>
            <h1>hes</h1>
            <div className="grid grid-cols-2 gap-4 p-4">
                {food?.recipes.map((recipe) => {
                    return (
                        <div key={recipe.id}>
                            <img src={`${import.meta.env.VITE_IMG_URL}${recipe.id}.webp`} alt="s" />
                            <h1>{recipe.name}</h1>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default CategoryPage;
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Loading from "./Loading";

interface Recipes {
    recipes: [{
        id: number;
        name: string;
        ingredients: string;
        instructions: string;
        cookTimeMinutes: number;
        difficulty: string;
        cuisine: string;
        rating: number;
    }]
}
function FoodRecipe() {
    const [ food, setFood ] = useState<Recipes | null>(null);
    // const [ difficulty, setDifficulty ] = useState<Recipes | null>(null);

    
    const difficultyEmoji: { [key: string]: string } = {
        easy: '😊',
        medium: '😐',
        hard: '😖'
    }

    
    async function fetchAPI() {
        const url = import.meta.env.VITE_BASE_URL;

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
        fetchAPI()
    }, [food])
   
    return (
        <div>
            <Loading />
            <Navbar />
            <div className="max-w-full shadow-sm shadow-black rounded-b-xl">
                <ul className="foodCategory flex overflow-x-auto md:justify-center items-center gap-2 p-4">
                    <li className="">
                        <Link to="/tag/pizza" className="flex flex-col w-20 justify-center text-center">
                        <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/doodle/48/pizza--v1.png" alt="pizza"/>
                            <p className="font-bold">Pizza</p>
                        </Link>
                    </li>
                    <li className="">
                        <Link to="/tag/beef" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/color/48/steak.png" alt="steak"/>
                            <p className="font-bold">Beef</p>
                        </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/chicken" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-chicken-grocery-nawicon-outline-color-nawicon.png" alt="chicken"/>
                            <p className="font-bold">Chicken</p>
                        </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/pasta" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-pasta-world-cuisine-flaticons-flat-flat-icons.png" alt="pasta"/>
                            <p className="font-bold">Pasta</p>
                         </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/salad" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/64/external-salad-food-levitation-icongeek26-linear-colour-icongeek26.png" alt="salad"/>
                            <p className="font-bold">Salad</p>                           
                        </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/dessert" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/color/48/cherry-cheesecake.png" alt="dessert"/>
                            <p className="font-bold">Dessert</p>
                        </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/ramen" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/external-ramen-japanese-food-tulpahn-outline-color-tulpahn.png" alt="ramen"/>
                            <p className="font-bold">Ramen</p>
                        </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/sushi rolls" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-sushi-world-cuisine-flaticons-flat-flat-icons.png" alt="sushi"/>
                            <p className="font-bold">Sushi</p>
                        </Link>
                    </li>
                    <li className="flex flex-col w-20 justify-center text-center">
                        <Link to="/tag/shrimp" className="flex flex-col w-20 justify-center text-center">
                            <img className="bg-orange-400 border border-black rounded-full p-2" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-shrimp-street-food-flaticons-lineal-color-flat-icons.png" alt="shrimp"/>
                            <p className="font-bold">Shrimp</p>
                        </Link>
                    </li>
                    
                </ul>
            </div>
            <div className="p-4">
                <h1 className="font-bold text-2xl">Recommendation:</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-4">
                    {food?.recipes.map((data) => {
                        return (
                            <Link to={`/recipes/${data.id}`} key={data.id} className="flex gap-4 rounded-xl shadow-sm shadow-black">
                                <img className="rounded-xl" width={150} height={150} src={`${import.meta.env.VITE_IMG_URL}${data.id}.webp`} alt={data.name} />
                                <div className="flex items-center w-13 absolute mt-28 ml-24 justify-center bg-black/50 rounded-md text-white">
                                    <img width="30" height="30" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1"/>
                                    <p className="font-semibold">{data.rating}</p>
                                </div>

                                <div>
                                    <h1 className="font-bold text-xl py-2">{data.name}</h1>
                                    <ul className="flex gap-4">
                                        <li className="flex gap-2">
                                            <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/12B886/delivery-time.png" alt="delivery-time"/>
                                            <p className="font-semibold">{data.cookTimeMinutes} Min</p>
                                        </li>
                                        <li className="flex">
                                            <p className="font-semibold">
                                                {difficultyEmoji[`${data.difficulty}`] || '🌟'}
                                                {data.difficulty.toUpperCase()}</p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FoodRecipe;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";

interface Recipes {
    id: number;
    name: string;
    ingredients: [string];
    instructions: [string];
    cookTimeMinutes: number;
    difficulty: string;
    rating: number;
}
function RecipePage() {
    const [ food, setFood ] = useState<Recipes | null>(null)
    const { id } = useParams();
    
    async function fetchData(key: string) {
        const url = import.meta.env.VITE_BASE_URL;
        
        try {
            const response = await fetch(`${url}/${key}`)

            if (!response.ok) {
                throw new Error('Failed fethcing data');
            }

            const data = await response.json();
            setFood(data)
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        fetchData(`${id}`);
    }, [food, id])

    return (
        <div>
            <BackBtn />
            <div className="flex flex-col items-center">
                <img
                    className="h-96 w-full  fixed" 
                    src={`${import.meta.env.VITE_IMG_URL}${food?.id}.webp`} 
                    alt={food?.name} 
                />
                <div className="bg-white w-full minh-screen shadow-md shadow-black rounded-t-3xl absolute top-80 z-50">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold py-4">{food?.name}</h1>
                        <ul className="flex items-center gap-4 text-white">
                            <li className="flex gap-2 items-center bg-orange-400 py-1 px-2 rounded-xl">
                                <img width="30" height="30" src="https://img.icons8.com/fluency/48/star--v1.png" alt="star--v1"/>
                                <p className="font-bold text-xl">{food?.rating}</p>
                            </li>
                            <li className="bg-orange-400 py-1 px-2 rounded-xl">
                                <p className="font-bold text-xl">{food?.cookTimeMinutes} minutes</p>
                            </li>
                            <li className="bg-orange-400 py-1 px-2 rounded-xl">
                                <p className="font-bold text-xl">{food?.difficulty}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-10 p-4">
                        <h1 className="text-xl font-bold">Ingredients:</h1>
                        {food?.ingredients.map((ingredient) => (
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,300,150"
                                className="fill-green-500">
                                    <g fill="#40c057" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(8.53333,8.53333)"><path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-2.17938 -0.59,-4.21686 -1.60547,-5.97852l-11.24805,11.24609c-0.187,0.187 -0.44103,0.29297 -0.70703,0.29297c-0.265,0 -0.52003,-0.10497 -0.70703,-0.29297l-4.45313,-4.45312c-0.391,-0.391 -0.391,-1.02306 0,-1.41406c0.391,-0.391 1.02306,-0.391 1.41406,0l3.74609,3.74609l10.80078,-10.80078c-2.201,-2.655 -5.52223,-4.3457 -9.24023,-4.3457zM24.24023,7.3457c0.43165,0.52058 0.81351,1.08435 1.1543,1.67383l2.3125,-2.3125c0.391,-0.392 0.391,-1.02306 0,-1.41406c-0.391,-0.391 -1.02306,-0.391 -1.41406,0z"></path></g></g>
                                </svg>
                                <p>{ingredient}</p>
                            </div>
                            )
                        )}
                    </div>
                    <div className="p-4">
                        <h1 className="text-xl font-bold">Instructions:</h1>
                        {food?.instructions.map((instruction) => (
                                <div className="flex gap-2">
                                    <p className="font-bold text-xl text-green-500">-</p>
                                    <p>{instruction}</p>
                                </div>
                            )
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RecipePage;
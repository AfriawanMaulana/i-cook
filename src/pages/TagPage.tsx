
import { useEffect, useState } from "react";
import BackBtn from "../components/BackBtn";
import { Link, useParams } from "react-router-dom";


interface Recipes {
    recipes: [{
        id: number;
        name: string;
        cookTimeMinutes: number;
        rating: number
        difficulty: string;
    }]
}
function TagPage() {
    const [ food, setFood ] = useState<Recipes | null>(null);
    const { query } = useParams()

    async function fetchData(key: string) {
        const url = import.meta.env.VITE_BASE_URL;

        try {
            const response = await fetch(`${url}/tag/${key}`);
            if (!response.ok) {
                throw new Error('Failed fetching data');
            }

            const data = await response.json();
            setFood(data)
        } catch (error) {
            console.log('Error: ', error);
        }
    }

    useEffect(() => {
        fetchData(`${query}`)
    }, [food, query])

    return (
        <>
            <div className="flex flex-col items-center">
              <BackBtn />
              <img src="/src/assets/images/pizzabanner.png" alt="" />  
              <h1 className="font-bold text-3xl">{query}</h1>
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
                                            <p className="font-semibold">{data.difficulty.toUpperCase()}</p>
                                        </li>
                                    </ul>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default TagPage;
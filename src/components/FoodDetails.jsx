import { useEffect } from "react";


export default function FoodDetails({foodId}){
    const URL=`https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
    useEffect(()=>{
        async function fetchFood(){
           const res = await fetch(`${URL}?apiKey=${API_KEY}`)
           const data = await res.json()
        console.log(data);
        }
        fetchFood()
    },[])
    return <div>Food Details{foodId}</div>
}
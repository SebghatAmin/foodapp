import { useEffect, useState } from "react";
const URL="https://api.spoonacular.com/recipes/complexSearch"
const API_KEY=import.meta.env.VITE_SPOONACULAR_API_KEY;
export default function App() {
    const [query,setQuery]=useState("pizza")
    useEffect(()=>{
       async function foodfetch(){
       const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
        const data = await res.json();
        console.log(data.results);

       }
       foodfetch();
    }
    ,[query])
  return (
    <div>
      <input type="text"
      onChange={(e)=>{setQuery(e.target.value)}}
      value={query}
      />
    </div>
  );
}

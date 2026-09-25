import { useEffect, useState } from "react";
import { fetchJsonWithCache } from "../utils/recipeApi";
import styles from "./search.module.css";

const URL = "https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const SEARCH_DELAY = 600;

export default function Search({ setFoodData }) {
  const [query, setQuery] = useState("pizza");

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      setFoodData([]);
      return;
    }

    let ignore = false;

    async function foodfetch() {
      try {
        const data = await fetchJsonWithCache(
          `${URL}?query=${encodeURIComponent(normalizedQuery)}&apiKey=${API_KEY}`,
          `search:${normalizedQuery}`,
        );

        if (!ignore) {
          setFoodData(Array.isArray(data.results) ? data.results : []);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Unable to fetch recipes", error);
        }
      }
    }

    const timeoutId = setTimeout(foodfetch, SEARCH_DELAY);

    return () => {
      ignore = true;
      clearTimeout(timeoutId);
    };
  }, [query, setFoodData]);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        value={query}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { fetchJsonWithCache } from "../utils/recipeApi";
import ItemList from "./ItemList";
import styles from "./foodDetails.module.css";

const API_URL = "https://api.spoonacular.com/recipes";
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!foodId) return;

    let ignore = false;

    async function fetchFood() {
      setIsLoading(true);

      try {
        const data = await fetchJsonWithCache(
          `${API_URL}/${foodId}/information?apiKey=${API_KEY}`,
          `recipe:${foodId}`,
        );

        if (!ignore) {
          setFood(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Unable to fetch recipe details", error);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchFood();

    return () => {
      ignore = true;
    };
  }, [foodId]);

  if (!foodId) return null;

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img
          className={styles.recipeImage}
          src={food.image}
          alt={food.title}
        />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏱️ {food.readyInMinutes} Minutes</strong>
          </span>
          <span>
            <strong>
              {food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}
            </strong>
          </span>
          <span>
            <strong>👨‍👩‍👧‍👦 Serves {food.servings}</strong>
          </span>
          <span>
            <strong>{food.vegan ? "🐄 Vegan" : ""}</strong>
          </span>
        </div>
        <div>
          <span>
            <strong>
              💲{food.pricePerServing / 100} Per Serving
            </strong>
          </span>
        </div>
        <h2>Ingredients</h2>
        <ItemList food={food} isLoading={isLoading} />
        <div className={styles.recipeInstructions}>
          <h2>Instructions</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {food.analyzedInstructions?.[0]?.steps?.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

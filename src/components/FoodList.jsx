import { useState } from "react";
import FoodItem from "./FoodItem";
import styles from "./foodList.module.css";

export default function FoodList({ foodData,setFoodId}) {
  return (
    <div className={styles.foodList}>
      {foodData.map((food) => (
        <FoodItem key={food.id} food={food} setFoodId={setFoodId}/>
      ))} 
    </div>
  );
}

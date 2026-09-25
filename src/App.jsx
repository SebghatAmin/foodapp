import { useRef, useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css";
import Container from "./components/Container";
import InnerContainer from "./components/InnerContainer";
import FoodDetails from "./components/FoodDetails";
export default function App() {
  const [foodData, setFoodData] = useState([]);
  const [foodId,setFoodId]=useState("656329");
  const recipeSectionRef = useRef(null);

  function showRecipe(foodId) {
    setFoodId(foodId);
    window.requestAnimationFrame(() => {
      recipeSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container>
          <InnerContainer>
          <FoodList foodData={foodData} setFoodId={showRecipe} />
          </InnerContainer>
          <InnerContainer>
          <div ref={recipeSectionRef} className="recipeSection">
            <FoodDetails foodId={foodId}/>
          </div>
          </InnerContainer>
      </Container>
    </div>
  );
}

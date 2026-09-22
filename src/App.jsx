import { useState } from "react";
import Search from "./components/Search";
import FoodList from "./components/FoodList";
import Nav from "./components/Nav";
import "./App.css"
import Container from "./components/Container";
import innerContainer from "./components/innerContainer";
export default function App() {
  const [foodData, setFoodData] = useState([]);
  return (
    <div className="App">
      <Nav />
      <Search foodData={foodData} setFoodData={setFoodData} />
      <Container >
        <innerContainer >
        <FoodList foodData={foodData} />

        </innerContainer>
      </Container>

    </div>
  );
}

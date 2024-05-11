import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Screen from "./Components/Screen";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Chat from "./Components/Chat";
import "./index.css";
import RouteRecommendation from "./Components/RouteRecommendation";
function App() {
  return (
    <div  className="App">
      <Router>
      <ResponsiveAppBar/>
        <Routes>
          <Route path="/Screen" element={<Screen />}></Route>
          <Route path="/" element={<Chat />}></Route>
          <Route path="/route" element={<RouteRecommendation/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

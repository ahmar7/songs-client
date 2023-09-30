import "./assets/css/style.css";
import Router from "./config/Router";
import "./assets/css/dashboard.css";
// import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <div id="page" className="">
        <Router />
      </div>
    </div>
  );
}

export default App;

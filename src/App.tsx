import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Activity from "./page/Activity";
import DetailActivity from "./page/DetailActivity";
import Pomodoro from "./page/Pomodoro";
import TodoList from "./page/TodoList";
import Register from "./page/Register";
import Login from "./page/Login";
import Landingpage from "./page/Landingpage";
import FAQ from "./page/FAQ";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/detailactivity/:id" element={<DetailActivity />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

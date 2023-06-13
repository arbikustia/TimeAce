import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Activity from "./page/Activity";
import DetailActivity from "./page/DetailActivity";
import Pomodoro from "./page/Pomodoro";
import TodoList from "./page/TodoList";
import Register from "./page/Register";
import Login from "./page/Login";
import Navbar from "./components/Navbar";
import Landingpage from "./page/Landingpage";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/detailactivity/:index" element={<DetailActivity />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

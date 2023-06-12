import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Activity from "./page/Activity";
import DetailActivity from "./page/DetailActivity";
import Pomodoro from "./page/Pomodoro";
import TodoList from "./page/TodoList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Activity />} />
        <Route path="/detailactivity/:index" element={<DetailActivity />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

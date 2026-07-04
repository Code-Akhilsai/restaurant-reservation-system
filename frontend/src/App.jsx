import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookTable from "./pages/BookTable";
import MyReservations from "./pages/MyReservations";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book-table" element={<BookTable />} />
      <Route path="/my-reservations" element={<MyReservations />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

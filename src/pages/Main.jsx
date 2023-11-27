import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Home";
import AppTest from "./AppTest";
import Register from "./Register";
import Login from "./Login";
import DetailUser from "./DetailUser";
import TestLogic from "./TestLogic";

function Main() {
  const token = useSelector((state) => state.auth.dataUser.token);

  const authentication = token;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/testLogic" element={<TestLogic />} />
        <Route path="/detail" element={<DetailUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        {authentication ? (
          <Route path="/appTest" element={<AppTest />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Main;

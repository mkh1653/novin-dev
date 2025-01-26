import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Users from "./pages/Users";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import UpdateUser from "./pages/UpdateUser";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import NotFound from "./pages/404";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/404' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/createUser' element={<CreateUser />} />
        <Route path='/updateUser' element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

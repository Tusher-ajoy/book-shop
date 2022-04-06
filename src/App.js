import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import Headers from './components/Headers/Headers';
import Admin from './components/Admin/Admin';
import ManageBook from './components/ManageBook/ManageBook';
import AddBook from './components/AddBook/AddBook';
import EditBook from './components/EditBook/EditBook';
import { createContext, useState } from 'react';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Orders from './components/Orders/Orders';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <BrowserRouter>
    <Headers />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout/:bookId" element={<RequireAuth> <Checkout /> </RequireAuth>} />
        <Route path="/admin" element={<RequireAuth> <Admin /> </RequireAuth>} />
        <Route path="/orders" element={<RequireAuth> <Orders /> </RequireAuth>} />
        <Route path="/admin/manage-book" element={<RequireAuth> <ManageBook /> </RequireAuth>} />
        <Route path="/admin/add-book" element={<RequireAuth> <AddBook /> </RequireAuth>} />
        <Route path="/admin/edit-book" element={<RequireAuth> <EditBook /> </RequireAuth>} />
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;

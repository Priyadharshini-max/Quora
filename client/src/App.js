import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarFn from './Components/Navbar';
import Home from "./Pages/Home.page";
import Answer from './Pages/Answer.page';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataProvider from './Components/Contex';

export default function App() {
  return (
    <DataProvider>
    <BrowserRouter>
      <ToastContainer />
      <NavbarFn /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/answer/:id" element={<Answer />} />
        </Routes>
    </BrowserRouter>
    </DataProvider>

  )
}
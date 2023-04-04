import { Routes, Route } from "react-router-dom";
import axios from "axios";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:slug?' element={<AccountPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import axios from "axios";

// layouts
import MainLayout from "./layouts/MainLayout";
import AccountLayout from "./layouts/AccountLayout";

// pages
import IndexPage from "./pages/IndexPage";
// login/register pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// account pages
import Account_ProfilePage from "./pages/Account_ProfilePage";
import Account_VoyagesPage from "./pages/Account_VoyagesPage";
import Account_YachtsPage from "./pages/Account_YachtsPage";
import Account_Yachts_NewPage from "./pages/Account_Yachts_NewPage";
import Account_Yachts_EditPage from "./pages/Account_Yachts_EditPage";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route path='/account/' element={<AccountLayout />}>
          <Route index element={<Account_ProfilePage />} />
          <Route path='/account/voyages' element={<Account_VoyagesPage />} />
          <Route path='/account/yachts' element={<Account_YachtsPage />} />
          <Route
            path='/account/yachts/new'
            element={<Account_Yachts_NewPage />}
          />
          <Route
            path='/account/yachts/:yacht_id?'
            element={<Account_Yachts_EditPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

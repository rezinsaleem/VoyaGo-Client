import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import HomePage from "./pages/user/HomePage";
import SignUpPage from "./pages/user/SignUpPage";
import 'react-toastify/dist/ReactToastify.css'; 
import SignInPage from "./pages/user/SignInPage";
import { useSelector } from "react-redux";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import UserProfilePage from "./pages/user/UserProfilePage";

function App() {
  const  user  = useSelector((store:{ user: { loggedIn: boolean } })=>store.user.loggedIn);
  const  admin  = useSelector((store:{ admin: { loggedIn: boolean } })=>store.admin.loggedIn);
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={user ? <Navigate to={'/'}/>:<SignInPage/>} />
          <Route path="/signup" element={user ? <Navigate to={'/'}/>:<SignUpPage/>} />
          <Route path="/profile" element={user ?<UserProfilePage/> :<Navigate to={'/signin'}/>} />

          <Route path="/admin" element={admin ? <Navigate to={'/admin/dashboard'} /> : <AdminLoginPage />}/>
          <Route path="/admin/dashboard" element={admin ? <AdminHomePage /> : <Navigate to={'/admin'} />}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

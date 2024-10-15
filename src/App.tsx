import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import SignUpPage from "./pages/user/SignUpPage";
import 'react-toastify/dist/ReactToastify.css'; 
import SignInPage from "./pages/user/SignInPage";
import { useSelector } from "react-redux";
import AdminLoginPage from "./pages/admin/AdminLoginPage";

function App() {
  const  user  = useSelector((store:{ user: { loggedIn: boolean } })=>store.user.loggedIn);
  return (
    <Router>
      <div>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={user ? <Navigate to={'/'}/>:<SignInPage/>} />
          <Route path="/signup" element={user ? <Navigate to={'/'}/>:<SignUpPage/>} />

          <Route path='/admin' element={<AdminLoginPage/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

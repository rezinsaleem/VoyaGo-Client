import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css'; 

// Importing pages
import HomePage from "./pages/user/HomePage";
import SignUpPage from "./pages/user/SignUpPage";
import SignInPage from "./pages/user/SignInPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserForgotPassword from "./pages/user/UserForgotPassword";

// Redux hooks
import { useSelector } from "react-redux";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import UserPrivateRoute from "./utils/UserPrivateRoute";
import AdminIdApprovalPage from "./pages/admin/AdminIdApprovalPage";
import AdminUserIdPage from "./pages/admin/AdminUserIdPage";
import PublishRidePage from "./pages/user/PublishRidePage";
import RidePickUpPage from "./pages/user/RidePickUpPage";
import RideDropOffPage from "./pages/user/RideDropOffPage";
import RideRoutePage from "./pages/user/RideRoutePage";
import RideDatePage from "./pages/user/RideDatePage";

function App() {
  // Getting user and admin login state from Redux store
  const user = useSelector((store: { user: { loggedIn: boolean } }) => store.user.loggedIn);
  const admin = useSelector((store: { admin: { loggedIn: boolean } }) => store.admin.loggedIn);

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={user ? <Navigate to="/" /> : <SignInPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <UserForgotPassword />} />

          <Route path="" element={<UserPrivateRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={user ? <UserProfilePage /> : <Navigate to="/signin" />} />
          <Route path="/publish-ride" element={user ? <PublishRidePage /> : <Navigate to="/signin" />} />
          <Route path="/ride-pickup" element={user ? <RidePickUpPage/> : <Navigate to="/signin" />} />
          <Route path="/ride-dropoff" element={user ? <RideDropOffPage/> : <Navigate to="/signin" />} />
          <Route path="/ride-route" element={user ? <RideRoutePage/> : <Navigate to="/signin" />} />
          <Route path="/ride-details" element={user ? <RideDatePage/> : <Navigate to="/signin" />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route path="/admin" element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />} />
          <Route path="/admin/dashboard" element={admin ? <AdminHomePage /> : <Navigate to="/admin" />} />
          <Route path="/admin/user-management" element={admin ? <AdminUsersPage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/ID-approval" element={admin ? <AdminIdApprovalPage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/users/:id" element={ admin ? <AdminUserIdPage /> : <Navigate to={'/admin'} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

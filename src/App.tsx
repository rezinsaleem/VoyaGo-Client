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
import RideVehiclePage from "./pages/user/RideVehiclePage";
import RideHomePage from "./pages/user/RideHomePage";
import RideCompletePage from "./pages/user/RideCompletePage";
import RidePlanPage from "./pages/user/RidePlanPage";
import AdminRidesPage from "./pages/admin/AdminRidesPage";
import RideResultsPage from "./pages/user/RideResultsPage";
import RideOverviewPage from "./pages/user/RideOverviewPage";
import EditVehicle from "./components/User/PublishRide/RideDetails/EditVehicle";
import EditItenary from "./components/User/PublishRide/RideDetails/EditItenary";
import { UserInboxPage } from "./pages/user/UserInboxPage";

function App() {
  // Getting user and admin login state from Redux store
  const user = useSelector((store: { user: { loggedIn: boolean } }) => store.user.loggedIn);
  const admin = useSelector((store: { admin: { loggedIn: boolean } }) => store.admin.loggedIn);

  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Navigate to="/ride-home" /> : <HomePage/>} />
          <Route path="/signin" element={user ? <Navigate to="/" /> : <SignInPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <UserForgotPassword />} />

          <Route path="" element={<UserPrivateRoute />}>
          <Route path="/" element={user ? <Navigate to="/ride-home" /> : <HomePage/>} />
          <Route path="/profile" element={user ? <UserProfilePage /> : <Navigate to="/signin" />} />
          <Route path="/publish-ride" element={user ? <PublishRidePage /> : <Navigate to="/signin" />} />
          <Route path="/ride-pickup" element={user ? <RidePickUpPage/> : <Navigate to="/signin" />} />
          <Route path="/ride-dropoff" element={user ? <RideDropOffPage/> : <Navigate to="/signin" />} />
          <Route path="/ride-route" element={user ? <RideRoutePage/> : <Navigate to="/signin" />} />
          <Route path="/ride-details" element={user ? <RideDatePage/> : <Navigate to="/signin" />} />
          <Route path="/ride-vehicle" element={user ? <RideVehiclePage/> : <Navigate to="/signin" />} />
          <Route path="/ride-complete" element={user ? <RideCompletePage/> : <Navigate to="/signin" />} />
          <Route path="/ride-plan" element={user ? <RidePlanPage/> : <Navigate to="/signin" />} />

          <Route path="/ride-home" element={user ? <RideHomePage/> : <Navigate to="/signin" />} />
          <Route path="/ride-results" element={user ? <RideResultsPage/> : <Navigate to="/signin" />} />
          <Route path="/ride-overview" element={user ? <RideOverviewPage/> : <Navigate to="/signin" />} />
          <Route path="/edit-vehicle/:id" element={user ? <EditVehicle/> : <Navigate to="/signin" />} />
          <Route path="/edit-itinerary/:rideId/:pricePerSeat/:numSeats" element={user ? <EditItenary/> : <Navigate to="/signin" />} />

          <Route path="/inbox/:riderDetails?" element={user ? <UserInboxPage/> : <Navigate to="/signin" />} />
          </Route>
         
          {/* Admin Protected Routes */}
          <Route path="/admin" element={admin ? <Navigate to="/admin/dashboard" /> : <AdminLoginPage />} />
          <Route path="/admin/dashboard" element={admin ? <AdminHomePage /> : <Navigate to="/admin" />} />
          <Route path="/admin/user-management" element={admin ? <AdminUsersPage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/ride-management" element={admin ? <AdminRidesPage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/ID-approval" element={admin ? <AdminIdApprovalPage /> : <Navigate to={'/admin'} />}/>
          <Route path="/admin/users/:id" element={ admin ? <AdminUserIdPage /> : <Navigate to={'/admin'} />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

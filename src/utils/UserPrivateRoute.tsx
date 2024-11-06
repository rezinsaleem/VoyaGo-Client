import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axiosUser from '../service/axios/axiosUser';
import { useEffect, useState, useCallback, useRef } from "react";
import { userLogout } from "../service/redux/slices/userAuthSlice";
import Loading from "./Loading";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserPrivateRoute = () => {
  const { loggedIn, userId } = useSelector(
    (store: { user: { loggedIn: boolean; userId: string } }) => store.user
  );
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const hasToastShown = useRef(false);

  const fetchData = useCallback(async () => {
    if (!loggedIn) return setLoading(false);
    try {
      const { data } = await axiosUser().get(`/isBlocked/${userId}`);
      if (data.message === 'Blocked') {
        if (!hasToastShown.current) {
          toast.error("Your account has been blocked. Logging out...");
          hasToastShown.current = true;
        }
        dispatch(userLogout());
        setIsBlocked(true);
      } else {
        setIsBlocked(false);
      }
    } catch (error) {
      console.error('Error fetching block status', error);
      setIsBlocked(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loggedIn, userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!loggedIn || isBlocked) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default UserPrivateRoute;

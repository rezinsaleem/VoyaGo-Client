import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./service/redux/store.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript } from "@react-google-maps/api";
import { SocketProvider } from "./context/SocketContext.tsx";
import ErrorBoundary from "./utils/ErrorBoundary.tsx";

const GOOGLE_CLIENT = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const VITE_GOOGLE_API = import.meta.env.VITE_GOOGLE_API;

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
  <Provider store={store}>
    <SocketProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        <LoadScript googleMapsApiKey={VITE_GOOGLE_API} libraries={["places"]}>
          <App />
        </LoadScript>
      </PersistGate>
    </GoogleOAuthProvider>
    <ToastContainer />
    </SocketProvider>
  </Provider>
  </ErrorBoundary>
);

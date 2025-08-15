/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { subscribeProjectsStream, replaceAll } from "./store/projectsSlice";

function RealtimeBridge({ children }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  React.useEffect(() => {
    let unsub = null;
    let active = true;

    async function start() {
      if (!user) return;
      const token = await user.getIdToken();
      unsub = subscribeProjectsStream(user.uid, token, (arr) => {
        if (active) dispatch(replaceAll(arr));
      });
    }
    start();

    return () => {
      active = false;
      if (unsub) unsub();
    };
  }, [user, dispatch]);

  return children;
}

function AppWrapper() {
  return (
    <RealtimeBridge>
      <App />
    </RealtimeBridge>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

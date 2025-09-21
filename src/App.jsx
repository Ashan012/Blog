import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authServices
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading) {
    return (
      <>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-3xl font-bold underline"> world!</h1>
      </>
    );
  }
}

export default App;

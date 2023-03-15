import React from "react";

import { useSelector } from "react-redux";

import "./App.css";
import Layout from "./Components/pages/Layout";
import AuthForm from "./Components/Authform/AuthForm";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Layout>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <Homepage />}
      
    </Layout>
  );
}

export default App;

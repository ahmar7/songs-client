import React, { useState } from "react";
import "./AdminLogin.css";
import { NavLink, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/Constant";
const AdminLogin = () => {
  const [isloading, setisloading] = useState(false);
  const [errMsg, seterrMsg] = useState("");
  const [isMatch, setisMatch] = useState(false);
  let Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let logIn = async (e) => {
    setisloading(true);
    e.preventDefault();
    try {
      let res = await fetch(`${baseUrl}admin-login`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
      let data = res.json();

      if (res.status === 400 || !data) {
        seterrMsg("Invalid Email or Password");
        setisMatch(true);
      } else if (res.status === 401) {
        seterrMsg("Please fill both the required fields");
        setisMatch(true);
      } else if (res.status === 200) {
        Navigate("/show-all");
        setisMatch(false);
      }
    } catch (e) {
      setisMatch(true);
      seterrMsg("There is something went wrong");
    } finally {
      setisloading(false);
    }
  };
  return (
    <div className="login-section">
      <form className="login-admin">
        <h3 className="mbr">Login Here</h3>
        {isMatch && (
          <div className="alert alert-danger" role="alert">
            {errMsg}
          </div>
        )}
        <label htmlFor="username">Email</label>
        <input
          type="email"
          name="email"
          id="your_name"
          required="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          id="your_pass"
          className="lower-mb"
          placeholder="Enter Password"
        />

        <button className="bkk admin-button" onClick={logIn}>
          {isloading ? (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;

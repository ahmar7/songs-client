import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/Constant";

//

const UpdatePassword = () => {
  let Navigate = useNavigate();
  const [isValidate, setisValidate] = useState(true);
  const [test, settest] = useState(true);
  const [isDisable, setisDisable] = useState(false);
  const [user, setUser] = useState({
    oldPassword: "",
    newPassword: "",

    confirmPassword: "",
  });
  let handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  let getData = async () => {
    try {
      let res = await fetch(`${baseUrl}admin-categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // let data = JSON.parse(res);
      let data = await res.json();
      if (!data) {
        Navigate("/");
      }
      if (res.status === 200) {
        settest(false);
      }
    } catch (error) {
      Navigate("/");
    } finally {
      settest(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //
  let changePassword = async (e) => {
    try {
      setisDisable(true);
      e.preventDefault();

      let { oldPassword, newPassword, confirmPassword } = user;
      if (!oldPassword || !newPassword || !confirmPassword) {
        alert("Please fill all the fields");
        return false;
      }
      if (newPassword != confirmPassword) {
        alert("New password and confirm password do not match");
        return false;
      }
      if (newPassword.length < 8) {
        alert("password should be of 8 characters or more");
        return false;
      }
      let res = await fetch(`${baseUrl}reset-password`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (res.status === 401) {
        alert("Old Password is wrong");
        return;
      } else if (res.status === 500 || !res) {
        alert("There is something went wrong, please try again later");
        return;
      } else if (res.status === 200) {
        alert("Password Updated successfully, please login again");
        Navigate("/admin-login");
      } else if (res.status === 403) {
        alert("Old password and new password are same");
      }
    } catch (e) {
      alert("something went wrong, please try again later");
    } finally {
      setisDisable(false);
    }
  };

  return (
    <>
      <SideBar />
      <div className="main-content">
        <Header />

        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
        <div className="mt--7 container-fluid">
          <div className="row">
            <div className="mb-5 ">
              <div className="  shadow card">
                <div className="bg-transparent card-header">
                  <div className="align-items-center row">
                    <div className="col">
                      <h2 className="text-dark mb-0">Update Password</h2>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form method="POST">
                    <div className="flex-items">
                      <div className="indiv-field" style={{ width: "100%" }}>
                        <label htmlFor="username">Old Password </label>
                        <input
                          name="oldPassword"
                          placeholder="Enter Old Password"
                          type="password"
                          required="true"
                          onChange={handleInput}
                          value={user.oldPassword}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">New Password</label>
                        <input
                          name="newPassword"
                          placeholder="Enter New Password"
                          type="password"
                          required="true"
                          onChange={handleInput}
                          value={user.newPassword}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">Confirm Passord</label>
                        <input
                          name="confirmPassword"
                          placeholder="Confirm New Password"
                          type="password"
                          required="true"
                          onChange={handleInput}
                          value={user.confirmPassword}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="flex justify-space">
                      <div></div>
                      <button
                        className="save-data  btn btn-success"
                        type="submit"
                        onClick={changePassword}
                        disabled={isDisable}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;

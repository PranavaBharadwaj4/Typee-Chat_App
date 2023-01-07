import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const navigate = useNavigate();
  const [userValues, setUserValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem("typee-user")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoclose: 6000,
    pauseOnHover: true,
    dragable: true,
    theme: "colored",
    closeOnClick: true,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      // alert("true");
      const { username, email, password } = userValues;
      const { data } = await axios.post(registerRoute, {
        username: username.toLowerCase(),
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        localStorage.setItem("typee-user", JSON.stringify(data.user));
        navigate("/setIcon");
      }
    }
  };
  const handleChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    if (userValues.username.length < 4) {
      console.log("Username Should Be More Than 4 Charachters");
      toast.error("Username Should Be More Than 4 Charachters", toastOptions);
      return false;
    } else if (userValues.username.hasUpperc < 4) {
      console.log("Username Should Be More Than 4 Charachters");
      toast.error("Username Should Be More Than 4 Charachters", toastOptions);
      return false;
    } else if (userValues.email === "") {
      console.log("Email Is Required");
      toast.error("Email Is Required", toastOptions);
      return false;
    } else if (userValues.password.length < 8) {
      console.log(
        "Password Should Be Equal To or More More Than 8 Charachters"
      );
      toast.error(
        "Password Should Be Equal To or More Than 8 Charachters",
        toastOptions
      );
      return false;
    } else if (userValues.password !== userValues.confirmPassword) {
      console.log("Passwords Don't Match");
      toast.error("Passwords Don't Match", toastOptions);
      return false;
    }
    console.log("validation successful");
    return true;
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src="" alt="" /> */}
            <h1>Typee</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            required
          />
          <button type="submit">Create User</button>
          <span>
            Already Have an Account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer theme="colored" closeOnClick={true} />
    </>
  );
}

export default Register;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [userValues, setUserValues] = useState({
    username: "",
    password: "",
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
      const { username, password } = userValues;
      const { data } = await axios.post(loginRoute, {
        username: username.toLowerCase(),
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        toast.success(data.msg, toastOptions);
        localStorage.setItem("typee-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };
  const handleChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    if (userValues.username === "") {
      console.log("Username Required");
      toast.error("Username Required", toastOptions);
      return false;
    } else if (userValues.password === "") {
      console.log("Passwords Required");
      toast.error("Passwords Required", toastOptions);
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
            min="3"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Dont Have an Account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer theme="colored" closeOnClick={true} />
    </>
  );
}

export default Login;

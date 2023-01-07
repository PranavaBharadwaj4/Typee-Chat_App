import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setIconRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import LoaderAnimation from "../components/LoaderAnimation";

function SetIcon() {
  const multiavatar_api_key = "RiZIFyd2OA6mlJ";
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("typee-user")) {
      navigate("/login");
    }
    // else{
    // async function fetchData() {
    //   const user = await JSON.parse(localStorage.getItem("typee-user"));
    //   if(user.isIconSet === true)
    //   navigate('/')
    // }
    //
    // }
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

  const setProfilePicture = async () => {
    if (selectedIcon === undefined) {
      toast.error("Please Select An Icon", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("typee-user"));
      const { data } = await axios.post(`${setIconRoute}/${user._id}`, {
        image: icons[selectedIcon],
      });
      if (data.isSet) {
        user.isIconSet = true;
        user.iconImage = data.image;
        localStorage.setItem("typee-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error Setting Icon. Please Try Again");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(
            Math.random() * 1000
          )}?apikey=${multiavatar_api_key}
            `
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setIcons(data);
      setIsLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(`icon ${selectedIcon === 0 ? "selected" : ""}`);

  return (
    <>
      {!isLoading ? (
        <div className="iconContainer">
          <div className="title-container">
            <h1>
              Pick An <span>ICON</span> For Your Profile.
            </h1>
          </div>
          <div className="icons">
            {icons.map((icon, index) => {
              return (
                <div
                  key={index}
                  className={`icon${selectedIcon === index ? "-selected" : ""}`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${icon}`}
                    alt="Icon"
                    onClick={() => setSelectedIcon(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set Icon
          </button>
        </div>
      ) : (
        <LoaderAnimation />
      )}
      <ToastContainer />
    </>
  );
}

export default SetIcon;

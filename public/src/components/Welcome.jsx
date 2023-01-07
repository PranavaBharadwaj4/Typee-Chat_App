import React from "react";
import WelcomeGif from "./WelcomeGif";

function Welcome({ currentUser }) {
  return (
    <>
      <div className="gif-container">
        <div className="main">
          <h1>
            Welcome, <span>{currentUser.username}</span>!
          </h1>
          <h3>Please select a Chat!</h3>
          <WelcomeGif />
        </div>
      </div>
    </>
  );
}

export default Welcome;

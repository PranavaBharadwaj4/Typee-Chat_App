import React, { useEffect } from "react";

function WelcomeGif() {
  useEffect(function () {
    var round = document.getElementsByTagName("var");
    for (let i = 0; i < round.length; i++) {
      var duration = Math.round(Math.random() * 7) + 2;
      round[i].style.cssText =
        // eslint-disable-next-line
        "\
        -moz-animation-duration:" +
        duration +
        // eslint-disable-next-line
        "s;\
        -webkit-animation-duration:" +
        duration +
        // eslint-disable-next-line
        "s;\
            animation-duration:" +
        duration +
        "s";
    }
  }, []);

  return (
    <var>
      <var>
        <var>
          <var></var>
        </var>
      </var>
    </var>
  );
}

export default WelcomeGif;

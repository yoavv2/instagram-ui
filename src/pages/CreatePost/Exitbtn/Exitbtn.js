import React from "react";
import { useHistory } from "react-router-dom";

function Exitbtn() {
  const history = useHistory();
  return (
    <div onClick={() => history.push("/")} className="btn-exit">
      <ion-icon name="close-outline"></ion-icon>
    </div>
  );
}

export default Exitbtn;

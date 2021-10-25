import React, { useContext} from "react";
import { CardContext } from "../card-context";

function Exitbtn() {
  const { isShown, setIsShown } = useContext(CardContext);
 
  return (
    <div onClick={() => setIsShown(!isShown)} className="btn-exit">
      <ion-icon name="close-circle-outline"></ion-icon>
    </div>
  );
}

export default Exitbtn;

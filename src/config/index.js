import { development } from "./development";
import { production } from "./production";

let enviroment = develpoment;
if (process.env.NODE_ENV === "production") {
  enviroment = production;
}

export default enviroment;

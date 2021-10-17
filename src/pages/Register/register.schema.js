import * as yup from "yup";
import { checkAvailabilityUser } from "../../service/user.service";

export const registerSchema = yup.object().shape({
  fullname: yup.string().max(16).required(),
  username: yup
    .string()
    .min(3)
    .max(16)
    .required("required")
    .test(
      "username",
      "This username has already been registered",
      async function (username) {
        const temp = await checkAvailabilityUser(username);
        console.log(temp);
        return await checkAvailabilityUser(username);
      }
    ),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});

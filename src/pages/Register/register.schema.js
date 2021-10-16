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

// .test("email",'This email has already been registered',async function (email)
//             {
//                 const temp = await checkAvailabilityEmail(email);
//                 console.log(temp);
//                 return await checkAvailabilityEmail(email);
//             }),

// .notOneOf(lowerEmails, "Email already exists.")
//       .notOneOf(upperEmails,"Email already exists")

// .when("checkEmail", {
//     is: true,
//     then: Yup.string()
//     .test({
//       message: () => "Email already exists",
//       test: async (values) => {
//         if (values) {
//           try {
//             let response = await fetch("http://localhost:4000/users/check", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ email: values }),
//             });
//             if (response.ok) {
//               return true;
//             } else {
//               return false;
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       },
//     }),

//   }),

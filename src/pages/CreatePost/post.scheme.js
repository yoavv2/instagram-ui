import * as yup from "yup";

export const postScheme = yup.object().shape({
  body: yup.string(),
  image: yup.mixed().required("You must select an image"),
});

import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerSchema } from "./register.schema";
import { register } from "../../service/user.service";
import "../../styles/Form.scss";
import "./Register.scss";


function Register() {
  async function submit(values) {
    try {
      const user = await register(values);
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }
  //* Using useEfect to fech all the users usename when first relaod the page
  // const [username, setUsername] = useState([]);

  // useEffect(() => {}, []);

  return (
    <div className="form-container">
      <h1 className="form-logo">
        <img src="/images/logo.png" alt="imstagram" className="logo" />
      </h1>
      <h2 className="description">
        Sign up to see photos and videos from your friends.
      </h2>
      <Formik
        className="box-form"
        initialValues={{ username: "", fullname: "", email: "", password: "" }}
        validationSchema={registerSchema}
        initialErrors={{
          username: "required",
          fullname: "required",
          email: "required",
          password: "required",
        }}
        onSubmit={submit}

        // onChange={(values) => console.log(values)}
      >
        {({ isValid, isSubmitting }) => (
          <div className="name-form">
            <Form className="form">
              <div className="input-rapper">
                <Field
                  className="form-input"
                  type="email"
                  name="email"
                  // placeholder="Email"
                  autoComplete="off"
                  required
                />
                <label className="lable-name lable1" htmlFor="name">
                  <span className="content-name">Email</span>
                </label>
              </div>
              <ErrorMessage
                className="error-massage"
                name="email"
                component="span"
              />
              <div className="input-rapper">
                <Field
                  className="form-input "
                  type="text"
                  name="username"
                  // placeholder="Username"
                  autoComplete="off"
                  required
                />
                <label className="lable-name lable2" htmlFor="name">
                  <span className="content-name">Username</span>
                </label>
              </div>
              <ErrorMessage
                className="error-massage"
                name="username"
                component="span"
              />
              <div className="input-rapper">
                <Field
                  className="form-input "
                  type="text"
                  name="fullname"
                  // placeholder="Full Name"
                  autoComplete="off"
                  required
                />
                <label className="lable-name lable3" htmlFor="name">
                  <span className="content-name">Full Name</span>
                </label>
              </div>
              <ErrorMessage
                className="error-massage"
                name="fullname"
                component="span"
              />
              <div className="input-rapper">
                <Field
                  className="form-input "
                  type="password"
                  name="password"
                  // placeholder="Password"
                  autoComplete="off"
                  required
                />
                <label className="lable-name lable4" htmlFor="name">
                  <span className="content-name">Password</span>
                </label>
              </div>
              <ErrorMessage
                className="error-massage"
                name="password"
                component="span"
              />
              <button
                disabled={!isValid}
                className="btn-secondary"
                type="submit"
              >
                {isSubmitting ? "Signing Up..." : "Sign up"}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Register;

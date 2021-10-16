import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Login.scss";

import { loginSchema } from "./login.schema";
import { UserContext } from "../../App";
import { login } from "../../service/user.service";

function Login() {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  console.log("loggedIn ", loggedIn);
  async function submit(values) {
    try {
      const { token } = await login(values);
      setLoggedIn(true);
      localStorage.setItem("loggedIn", token);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="form-container login-container">
      <h1 className="form-logo">
        <img src="/images/logo.png" alt="imstagram" className="logo" />
      </h1>

      <Formik
        className="box-form"
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        initialErrors={{ username: "required", password: "required" }}
        onSubmit={submit}
      >
        {({ isValid, isSubmitting }) => (
          <div className="name-form">
            <Form className="form">
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
                {isSubmitting ? "Submitting" : "Login"}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;

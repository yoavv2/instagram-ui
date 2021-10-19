import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Login.scss";

import { loginSchema } from "./login.schema";
import { UserContext } from "../../App";
import { login, me } from "../../service/user.service";
import IconsValidate from "../IconsValidate/IconsValidate";

function Login() {


  const history = useHistory();
    const { setUser } = useContext(UserContext);

  
  // const { loggedIn, setLoggedIn } = useContext(UserContext);
  // console.log("loggedIn ", loggedIn);

  async function submit(values) {
        try {
            const { token } = await login(values);
            const loggedUser = await me();
            setUser(loggedUser);
            localStorage.setItem('token', token);
            history.push('/');
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
        {({ isValid, isSubmitting, touched, errors }) => (
          <div className="name-form">
            <Form className="form">
              <div className="input-rapper">
                <Field
                  className="form-input "
                  type="text"
                  name="username"
                  autoComplete="off"
                  required
                />

                <label className="lable-name lable2" htmlFor="name">
                  <span className="content-name">Username</span>
                </label>
                <IconsValidate
                  isTouch={touched.username}
                  err={errors.username}
                />
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
                <IconsValidate
                  isTouch={touched.password}
                  err={errors.password}
                />
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
                {}
                {isSubmitting ? "Submitting" : "Login"}
              </button>
            </Form>
          </div>
        )}
      </Formik>

      <p className="link">
        Don't have an account ? <a href="Register">Sign up</a>
      </p>
    </div>
  );
}

export default Login;

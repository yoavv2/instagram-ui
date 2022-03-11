import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRive, useStateMachineInput } from "rive-react";

import "./Login.scss";

import { loginSchema } from "./login.schema";
import { UserContext } from "../../App";
import { login, me } from "../../service/user.service";
import IconsValidate from "../IconsValidate/IconsValidate";
import BearLogin from "../../images/login_bear1.riv";

function Login() {
  const STATE_MACHINE_NAME = "State Machine 1";
  const history = useHistory();
  const { setUser } = useContext(UserContext);
 
 
  const { rive, RiveComponent } = useRive({
    src: BearLogin,
    // animations: "Correct",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });
  
  const onError = useStateMachineInput(rive, STATE_MACHINE_NAME, "Incorrect");
  const onSucsess = useStateMachineInput(rive, STATE_MACHINE_NAME, "Correct");
  // const { loggedIn, setLoggedIn } = useContext(UserContext);
  // console.log("loggedIn ", loggedIn);

  useEffect(() => {
    me()
      .then((loggedUser) => {
        if (!isLoggedIn(loggedUser)) {
          return;
        }
        history.push("/");
      })
      .catch((err) => console.log(err));
  }, [history]);

  function isLoggedIn(user) {
    return user.hasOwnProperty("_id");
  }

  async function submit(values) {
    try {
      const { token } = await login(values);
      localStorage.setItem("token", token);
      const loggedUser = await me();
      setUser(loggedUser);
      onSucsess.fire();
      history.push("/");
    } catch (e) {
      onError.fire();

      console.log("error ", e);
    }
  }

  return (
    <div className="login_wrapper">
      {/* <Rive className="login_bear" src={BearLogin} animations="Correct" /> */}

      <div className="login_bear__wrap">
        <RiveComponent
          className="login_bear"
          onClick={() => onSucsess.fire()}
        />
      </div>

      <div className="form-container login-container">
        <h1 className="form-logo">
          <img src="/images/insta-logo.png" alt="instagram" className="logo" />
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
    </div>
  );
}

export default Login;

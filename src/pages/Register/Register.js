import React from "react";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { registerSchema } from "./register.schema";
import { register } from "../../service/user.service";
import IconsValidate from "../IconsValidate/IconsValidate";
import "../../styles/Form.scss";
import "./Register.scss";

function Register() {
  const history = useHistory();

  async function submit(values) {
    try {
      await register(values);
      history.push("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="form-container">
      <h1 className="form-logo">
        <img src="/images/insta-logo.png" alt="imstagram" className="logo" />
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
        {({ isValid, isSubmitting, touched, errors }) => (
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
                <IconsValidate isTouch={touched.email} err={errors.email} />
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
                  type="text"
                  name="fullname"
                  // placeholder="Full Name"
                  autoComplete="off"
                  required
                />
                <label className="lable-name lable3" htmlFor="name">
                  <span className="content-name">Full Name</span>
                </label>
                <IconsValidate
                  isTouch={touched.fullname}
                  err={errors.fullname}
                />
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
                {isSubmitting ? "Signing Up..." : "Sign up"}
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <p className="link">
        Have an account ? <a href="Login">Log In</a>
      </p>
    </div>
  );
}

export default Register;

import React, { useContext, useEffect, useRef } from "react";
import Exitbtn from "./Exitbtn/Exitbtn";
import { CardContext } from "./card-context";
import "./Create.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { create } from "../../service/post.service";

function Create() {
  const { isShown, setIsShown } = useContext(CardContext);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      //* If the menu is open and the clicked target is not within the menu,
      //* then close the menu

      if (isShown && ref.current && !ref.current.contains(e.target)) {
        setIsShown(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isShown, setIsShown]);

  // const handleClick = (e) => {
  //   e.stopPropagation();
  //   setIsShown(!isShown);
  // };

  //* submiting the post
  async function submit(values) {
    try {
      debugger;
      await create(values);
      console.log(`values`, values);
      setIsShown(false);
      // history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {isShown && (
        <div className="container" ref={ref}>
          <Exitbtn />
          <h1 className="header">Create post</h1>
          <Formik
            initialValues={{ body: "" }}
            // validationSchema={postScheme}
            onSubmit={submit}
          >
            <Form className="create-form">
              <Field
                className="text-area"
                id="body"
                name="body"
                as="textarea"
                placeholder="whats on your mind?"
                label="post create"
              />
              <div className="btn-add">
                <ion-icon name="add-circle-outline"></ion-icon>
              </div>
              <div className="error">
                <ErrorMessage name="body" />
              </div>
              <button type="submit" className="btn-create">
                Create
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Create;

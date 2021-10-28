import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { postScheme } from "./post.scheme";

function PostDetailes() {
  return (
    <div className="create_post__wrapper">
      <Exitbtn />

      <div className="container" ref={ref}>
        <div className="creat__post_form">
          <h3 className="header">Create post</h3>
          <div className="border"></div>
          <Formik
            initialValues={{ body: "", image: null }}
            validationSchema={postScheme}
            onSubmit={submit}
          >
            {({ setFieldValue }) => (
              <Form className="create-form">
                {/* <Field
                  className="text-area"
                  id="body"
                  name="body"
                  as="textarea"
                  placeholder="whats on your mind?"
                  label="post create"
                /> */}

                {/* <div className="error">
                  <ErrorMessage name="body" />
                </div> */}
                <div className="drag-drop-wrap">
                  <div
                    className="drag-area"
                    {...getRootProps({ className: "dropzone" })}
                  >
                    <input
                      className="image-upload"
                      name="image"
                      {...getInputProps({ className: "dropzone" })}
                      onChange={(e) => {
                        setFieldValue("image", e.currentTarget.files[0]);
                      }}
                    />
                    <div className="error">
                      <ErrorMessage name="image" />
                    </div>
                    <DragDrop className="darg-area-icon" />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag 'n' drop some photos here, or click to select photo
                      </p>
                    )}
                    <div>{images}</div>
                  </div>

                  <button type="submit" className="btn-create">
                    Create
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default PostDetailes;

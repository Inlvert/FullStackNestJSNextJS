"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const LOGIN_SCHEMA = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "test@mail.com",
  password: "12345test ",
};

function LoginForm() {
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LOGIN_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 w-80 p-4 shadow-lg rounded-xl">
          <div className="flex flex-col">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;

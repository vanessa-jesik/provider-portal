import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-gray-600">
        {label}
      </label>
      <input
        className="text-input bg-gray-100 border-gray-300 focus:border-blurple-500"
        {...field}
        {...props}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-gray-600">
        {label}
      </label>
      <select className="text-input" {...field} {...props}>
        {props.children}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

const PatientForm = ({ handleNewPatient }) => {
  const handleSubmit = (values) => {
    const newPatient = {
      name: values.name,
      age: values.age,
      sex: values.sex,
      address: values.address,
    };

    fetch("/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPatient),
    })
      .then((r) => r.json())
      .then((patients) => {
        handleNewPatient(patients);
      });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-4">Add a New Patient</h1>
      <Formik
        initialValues={{
          name: "",
          age: "",
          sex: "",
          address: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          age: Yup.number().typeError("Must be a number").required("Required"),
          sex: Yup.string().required("Required"),
          address: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            // placeholder="Name..."
          />
          <MyTextInput
            label="Age"
            name="age"
            type="text"
            // placeholder="25"
          />
          <MySelect label="Sex" name="sex">
            <option value="">Select a sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </MySelect>
          <MyTextInput
            label="Address"
            name="address"
            type="text"
            // placeholder="123 Main St"
          />

          <button
            type="submit"
            className="bg-blurple-500 text-white py-2 px-4 rounded-lg hover:bg-blurple-700"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default PatientForm;

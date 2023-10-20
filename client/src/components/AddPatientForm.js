import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddPatientForm({ handleAddNewPatient, setShowAddPatientForm }) {
  const initialValues = {
    name: "",
    age: "",
    sex: "",
    address: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .max(30, "Name must be 30 or fewer characters")
      .required("Name is required"),
    age: yup
      .number()
      .positive()
      .integer()
      .min(1, "Age must be at least 1")
      .max(115, "Age cannot be greater than 115")
      .required("Must enter age"),
    sex: yup
      .string()
      .oneOf(["Female", "Male"])
      .required("Must record Female or Male for patient sex"),
    address: yup
      .string()
      .max(60, "Address must be fewer than 60 characters")
      .required("Address is required"),
  });

  const onSubmit = values => {
    fetch("/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(r => {
        if (r.status === 201) {
          return r.json();
        } else {
          throw new Error("Failed to create incident");
        }
      })
      .then(newPatient => {
        handleAddNewPatient(newPatient);
        setShowAddPatientForm(false);
      })
      .catch(error => {
        console.error("Error creating incident", error);
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div className="flex justify-center">
      <form onSubmit={formik.handleSubmit} className="w-3/5 mx-4 mb-28">
        <h2 className="text-xl font-bold px-4 py-2">New patient details:</h2>
        <div className="m-2">
          <label htmlFor="name" className="font-semibold">
            Name of patient:
          </label>
          <br />
          <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          />
          <p className="text-fire-light"> {formik.errors.name}</p>
        </div>
        <div className="m-2">
          <label htmlFor="age" className="font-semibold">
            Age of patient:
          </label>
          <br />
          <input
            id="age"
            name="age"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.age}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          />
          <p className="text-fire-light"> {formik.errors.age}</p>
        </div>
        <div className="m-2">
          <label htmlFor="sex" className="font-semibold">
            Sex of patient:
          </label>
          <br />
          <select
            id="sex"
            name="sex"
            onChange={formik.handleChange}
            value={formik.values.sex}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          >
            <option label="Select sex of patient" />
            <option value="Female" label="Female" />
            <option value="Male" label="Male" />
          </select>
          <p className="text-fire-light"> {formik.errors.sex}</p>
        </div>
        <div className="m-2">
          <label htmlFor="address" className="font-semibold">
            Address of Patient:
          </label>
          <br />
          <input
            id="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          />
          <p className="text-fire-light"> {formik.errors.address}</p>
        </div>
        <button
          type="submit"
          className="bg-papaya text-fire px-4 py-2 mx-4 my-2 border-solid border-2 border-papaya-dark rounded-md hover:bg-papaya-dark"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddPatientForm;

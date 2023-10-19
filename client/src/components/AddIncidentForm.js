import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function AddIncidentForm({ provider_id, patients, handleSubmitNewIncident }) {
  const initialValues = {
    date_time: "",
    description: "",
    location: "",
    provider_id: provider_id,
    patient_id: "",
  };

  const validationSchema = yup.object().shape({
    date_time: yup.string().required("Must enter incident date and time"),
    description: yup.string().required("Must enter a description").max(100),
    location: yup.string().required("Must enter an address").max(60),
    patient_id: yup.number().required("Patient is required"),
  });

  const onSubmit = (values, formikBag) => {
    fetch("/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values, null, 2),
    })
      .then(r => {
        if (r.status === 201) {
          return r.json();
        } else {
          throw new Error("Failed to create incident");
        }
      })
      .then(newIncident => {
        handleSubmitNewIncident(newIncident);
        formikBag.resetForm();
      })
      .catch(error => {
        console.error("Error creating incident", error);
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div>
      <h2 className="text-xl font-bold px-4 py-2">New incident details:</h2>
      <form onSubmit={formik.handleSubmit} className="m-4">
        <div className="m-2">
          <label htmlFor="date_time" className="font-semibold">
            Incident date and time:
          </label>
          <br />
          <input
            id="date_time"
            name="date_time"
            onChange={formik.handleChange}
            value={formik.values.date_time}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          />
          <p className="text-fire-light"> {formik.errors.date_time}</p>
        </div>
        <div className="m-2">
          <label htmlFor="description" className="font-semibold">
            Description of incident:
          </label>
          <br />
          <input
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          />
          <p className="text-fire-light"> {formik.errors.description}</p>
        </div>
        <div className="m-2">
          <label htmlFor="location" className="font-semibold">
            Location of incident:
          </label>
          <br />
          <input
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          />
          <p className="text-fire-light"> {formik.errors.location}</p>
        </div>
        <div className="m-2">
          <label htmlFor="patient_id" className="font-semibold">
            Patient:
          </label>
          <br />
          <select
            id="patient_id"
            name="patient_id"
            onChange={formik.handleChange}
            value={formik.values.patient_id}
            className="border border-gray-300 p-2 mb-2 w-full rounded-md focus:outline-air"
          >
            <option label="Select a patient" />
            {patients
              ? patients.map(patient => (
                  <option
                    key={patient.id}
                    value={patient.id}
                    label={patient.name}
                  />
                ))
              : null}
          </select>
          <p className="text-fire-light"> {formik.errors.patient_id}</p>
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

export default AddIncidentForm;

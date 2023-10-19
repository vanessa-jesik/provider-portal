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
      <h1>New incident details:</h1>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="date_time">Incident date and time:</label>
        <br />
        <input
          id="date_time"
          name="date_time"
          onChange={formik.handleChange}
          value={formik.values.date_time}
        />
        <p style={{ color: "red" }}> {formik.errors.date_time}</p>
        <label htmlFor="description">Description of incident:</label>
        <br />
        <input
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <p style={{ color: "red" }}> {formik.errors.description}</p>
        <label htmlFor="location">Location of incident:</label>
        <br />
        <input
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        <label htmlFor="patient_id">Patient:</label>
        <br />
        <select
          id="patient_id"
          name="patient_id"
          onChange={formik.handleChange}
          value={formik.values.patient_id}
        >
          <option value="0" label="Select a patient" />
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
        <p style={{ color: "red" }}> {formik.errors.patient_id}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddIncidentForm;

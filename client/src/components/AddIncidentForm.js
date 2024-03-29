import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function AddIncidentForm({
  provider_id,
  patients,
  handleSubmitNewIncident,
  setShowAddForm,
}) {
  const navigate = useNavigate();
  const initialValues = {
    date_time: "",
    description: "",
    location: "",
    provider_id: provider_id,
    patient_id: "",
  };

  const validationSchema = yup.object().shape({
    date_time: yup.string().required("Must enter incident date and time"),
    description: yup
      .string()
      .max(100, "Description must be 100 or fewer characters")
      .required("Must enter a description"),
    location: yup
      .string()
      .max(60, "Location must be 60 or fewer characters")
      .required("Must enter an address"),
    patient_id: yup.number().required("Patient is required"),
  });

  const onSubmit = values => {
    fetch("/incidents", {
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
      .then(newIncident => {
        handleSubmitNewIncident(newIncident);
        setShowAddForm(false);
      })
      .catch(error => {
        console.error("Error creating incident", error);
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div>
      <h2 className="text-xl font-bold px-4 py-2">New incident details:</h2>
      <form onSubmit={formik.handleSubmit} className="mx-4 mb-28">
        <div className="m-2">
          <label htmlFor="date_time" className="font-semibold">
            Incident date and time:
          </label>
          <br />
          <DateTimePicker
            id="date_time"
            name="date_time"
            format="YYYY-MM-DD HH:mm:ss"
            onChange={date => formik.setFieldValue("date_time", date)}
            value={formik.values.date_time}
            className="w-1/4"
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
        <p className="inline">If the patient is not yet in the system:</p>
        <button
          type="button"
          onClick={() => navigate("/patients")}
          className="bg-prussian-light text-papaya px-4 py-2 mx-4 mt-2 mb-28 rounded-md hover:bg-prussian"
        >
          ADD A NEW PATIENT HERE
        </button>
      </form>
    </div>
  );
}

export default AddIncidentForm;

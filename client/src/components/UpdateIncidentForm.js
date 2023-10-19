import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function UpdateIncidentForm({
  incident,
  patients,
  handleUpdateIncident,
  setShowUpdateForm,
}) {
  const { id, date_time, description, location, provider_id, patient_id } =
    incident;
  const initialValues = {
    date_time,
    description,
    location,
    provider_id,
    patient_id,
  };

  const validationSchema = yup.object().shape({
    date_time: yup.string().required("Must enter incident date and time"),
    description: yup.string().required("Must enter a description").max(100),
    location: yup.string().required("Must enter an address").max(60),
    patient_id: yup.number().required("Patient is required"),
  });

  const onSubmit = values => {
    fetch(`/incidents/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values, null, 2),
    })
      .then(r => {
        if (r.status === 202) {
          return r.json();
        } else {
          throw new Error("Failed to update incident");
        }
      })
      .then(updatedIncident => {
        handleUpdateIncident(updatedIncident);
        setShowUpdateForm(false);
      })
      .catch(error => {
        console.error("Error updating incident", error);
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Update this incident:</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="date_time" className="block font-semibold">
            Incident date and time:
          </label>
          <br />
          <input
            id="date_time"
            name="date_time"
            onChange={formik.handleChange}
            value={formik.values.date_time}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          <p className="text-red-500 mt-2"> {formik.errors.date_time}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">
            Description of incident:
          </label>
          <br />
          <input
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          <p className="text-red-500 mt-2"> {formik.errors.description}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-semibold">
            Location of incident:
          </label>
          <br />
          <input
            id="location"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          <p className="text-red-500 mt-2"> {formik.errors.location}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="patient_id" className="block font-semibold">
            Patient:
          </label>
          <br />
          <select
            id="patient_id"
            name="patient_id"
            onChange={formik.handleChange}
            value={formik.values.patient_id}
            className="border border-gray-300 p-2 w-full rounded-md"
          >
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
          <p className="text-red-500 mt-2"> {formik.errors.patient_id}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateIncidentForm;

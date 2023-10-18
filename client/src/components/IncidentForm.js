import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function IncidentForm({ provider_id, refreshPage, setRefreshPage }) {
  const formSchema = yup.object().shape({
    date_time: yup.string().required("Must enter incident date and time"),
    description: yup.string().required("Must enter a description").max(100),
    location: yup.string().required("Must enter an address").max(60),
    provider_id: yup.number().required("Provider ID is required"),
    patient_id: yup.number().required("Patient ID is required"),
  });

  const formik = useFormik({
    initialValues: {
      date_time: "",
      description: "",
      location: "",
      provider_id: provider_id,
      patient_id: "",
    },
    validationSchema: formSchema,
    onSubmit: values => {
      fetch("/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then(res => {
        if (res.status == 201) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
        <label htmlFor="date_time">Incident date and time</label>
        <br />
        <input
          id="date_time"
          name="date_time"
          onChange={formik.handleChange}
          value={formik.values.date_time}
        />
        <p style={{ color: "red" }}> {formik.errors.date_time}</p>
        <label htmlFor="description">Description of incident</label>
        <br />
        <input
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <p style={{ color: "red" }}> {formik.errors.description}</p>
        <label htmlFor="location">Location of incident</label>
        <br />
        <input
          id="location"
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        <p style={{ color: "red" }}> {formik.errors.location}</p>
        <label htmlFor="provider_id">Primary provider for incident</label>
        <br />
        <input
          id="provider_id"
          name="provider_id"
          value={formik.values.provider_id}
        />
        <p style={{ color: "red" }}> {formik.errors.provider_id}</p>
        <label htmlFor="patient_id">Patient</label>
        <br />
        <input
          id="patient_id"
          name="patient_id"
          onChange={formik.handleChange}
          value={formik.values.patient_id}
        />
        <p style={{ color: "red" }}> {formik.errors.patient_id}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default IncidentForm;

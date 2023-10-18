import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

function IncidentForm({ provider_id }) {
  //   const formSchema = yup.object().shape({
  //     date_time: yup.string().required("Must enter date and time"),
  //     description: yup.string().required("Must enter a description").max(100),
  //     location: yup.string().required("Must enter an address").max(60),
  //     provider_id: yup,
  //     patient_id: yup,
  //   });
  //   const formik = useFormik({
  //     initialValues: {
  //       date_time: "",
  //       description: "",
  //       location: "",
  //       provider_id: provider_id,
  //       patient_id: "",
  //     },
  //     validationSchema: formSchema,
  //     onSubmit: values => {
  //       fetch("customers", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(values, null, 2),
  //       }).then(res => {
  //         if (res.status == 200) {
  //           setRefreshPage(!refreshPage);
  //         }
  //       });
  //     },
  //   });
  //   return (
  //     <div>
  //       <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
  //         <label htmlFor="email">Email Address</label>
  //         <br />
  //         <input
  //           id="email"
  //           name="email"
  //           onChange={formik.handleChange}
  //           value={formik.values.email}
  //         />
  //         <p style={{ color: "red" }}> {formik.errors.email}</p>
  //         <label htmlFor="name">Name</label>
  //         <br />
  //         <input
  //           id="name"
  //           name="name"
  //           onChange={formik.handleChange}
  //           value={formik.values.name}
  //         />
  //         <p style={{ color: "red" }}> {formik.errors.name}</p>
  //         <label htmlFor="age">age</label>
  //         <br />
  //         <input
  //           id="age"
  //           name="age"
  //           onChange={formik.handleChange}
  //           value={formik.values.age}
  //         />
  //         <p style={{ color: "red" }}> {formik.errors.age}</p>
  //         <button type="submit">Submit</button>
  //       </form>
  //     </div>
  //   );
}

export default IncidentForm;

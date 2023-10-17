import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

// And now we can use these
const ProviderForm = ({ handleNewProvider }) => {
  const handleSubmit = values => {
    const newProvider = {
      name: values.name,
      badge_number: values.badge_number,
      provider_type: values.provider_type,
    };

    fetch("/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProvider),
    })
      .then(r => r.json())
      .then(providers => {
        handleNewProvider(providers);
      });
  };

  return (
    <>
      <h1>Add a New Provider</h1>
      <Formik
        initialValues={{
          name: "",
          badge_number: "",
          provider_type: "", // added for our select
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(25, "Must be 25 characters or less")
            .required("Required"),
          badge_number: Yup.number()
            .typeError("Must be a number")
            .required("Required"),
          provider_type: Yup.string()
            .oneOf(
              ["EMT", "Paramedic", "Fire Fighter", "Nurse", "Other"],
              "Invalid Provider Type"
            )
            .required("Required"),
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
            placeholder="Name..."
          />

          <MyTextInput
            label="Badge Number"
            name="badge_number"
            type="text"
            placeholder="12345"
          />

          <MySelect label="Provider Type" name="provider_type">
            <option value="">Select a provider type</option>
            <option value="EMT">EMT</option>
            <option value="Paramedic">Paramedic</option>
            <option value="Fire Fighter">Fire Fighter</option>
            <option value="Nurse">Nurse</option>
            <option value="Other">Other</option>
          </MySelect>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default ProviderForm;

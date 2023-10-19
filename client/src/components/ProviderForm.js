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

const ProviderForm = ({
  handleNewProvider,
  handleUpdateProvider,
  isEditing,
  provider,
}) => {
  const initialValues = isEditing
    ? {
        name: provider.name,
        badge_number: provider.badge_number,
        provider_type: provider.provider_type,
      }
    : {
        name: "",
        badge_number: "",
        provider_type: "",
      };

  const updateProvider = values => {
    const updatedProvider = { ...provider, ...values };
    fetch(`/providers/${provider.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProvider),
    })
      .then(r => {
        if (!r.ok) {
          throw new Error(`Network response was not ok: ${r.status}`);
        }
        return r.json();
      })
      .then(providers => {
        handleUpdateProvider(updatedProvider);
        console.log("Updated provider ran");
      })
      .catch(error => {
        console.error("Error updating provider:", error);
      });
  };

  const postProvider = (values, formikBag) => {
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
        console.log("New provider ran");
        formikBag.resetForm();
      });
  };

  const handleSubmit = (values, formikBag) => {
    if (isEditing) {
      updateProvider(values);
    } else {
      postProvider(values, formikBag);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-4">
        {isEditing ? "Edit Provider" : "Add a New Provider"}
      </h1>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
      >
        <Form>
          <MyTextInput label="Name" name="name" type="text" />
          <MyTextInput label="Badge Number" name="badge_number" type="text" />
          <MySelect label="Provider Type" name="provider_type">
            <option value="">Select a provider type</option>
            <option value="EMT">EMT</option>
            <option value="Paramedic">Paramedic</option>
            <option value="Fire Fighter">Fire Fighter</option>
            <option value="Nurse">Nurse</option>
            <option value="Other">Other</option>
          </MySelect>
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

export default ProviderForm;

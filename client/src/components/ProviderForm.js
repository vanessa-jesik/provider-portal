import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-4">
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-600 font-semibold"
      >
        {label}
      </label>
      <input
        className="text-input bg-gray-100 border rounded-lg p-1 focus:ring focus:ring-blurple-dark focus:ring-opacity-50"
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
      <label
        htmlFor={props.id || props.name}
        className="block text-gray-600 font-semibold"
      >
        {label}
      </label>
      <select
        className="text-input bg-gray-100 border rounded-lg p-1.5 focus:ring focus:ring-blurple-dark focus:ring-opacity-50"
        {...field}
        {...props}
      >
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
  toggleEdit,
  toggleForm,
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

  const updateProvider = (values) => {
    const updatedProvider = { ...provider, ...values };
    fetch(`/providers/${provider.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProvider),
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Network response was not ok: ${r.status}`);
        }
        return r.json();
      })
      .then((providers) => {
        handleUpdateProvider(updatedProvider);
        console.log("Updated provider ran");
      })
      .catch((error) => {
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
      .then((r) => r.json())
      .then((providers) => {
        handleNewProvider(providers);
        console.log("New provider ran");
        formikBag.resetForm();
      });
  };

  const handleSubmit = (values, formikBag) => {
    if (isEditing) {
      updateProvider(values);
      toggleEdit();
    } else {
      postProvider(values, formikBag);
      toggleForm();
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
          badge_number: Yup.string()
            .matches(
              /^\d{5}$/,
              "Badge number must be exactly 5 digits. (Example: 12345)"
            )
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
          <MyTextInput
            label="Name"
            name="name"
            type="text"
            placeholder="John Doe"
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
          <button
            type="submit"
            className="bg-papaya-dark text-white py-2 px-4 rounded-lg hover:bg-papaya mt-4"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProviderForm;

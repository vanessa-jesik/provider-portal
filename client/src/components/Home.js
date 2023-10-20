import React from "react";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center py-4 bg-prussian-dark text-papaya-light">
        WELCOME TO THE PROVIDER PORTAL
      </h1>
      <p className="m-8 text-xl text-center">
        Post incident response, use this application to document details.
      </p>
      <ul className="text-center list-disc list-inside">
        <li>
          Visit the{" "}
          <a href="/providers" className="font-bold hover:underline">
            Providers
          </a>{" "}
          page to view all providers and create, update, or delete a provider.
        </li>
        <li>
          Each provider has a linked page where incidents associated with that
          provider can be viewed, created, edited, or deleted.
        </li>
        {/* <li>
          Visit the Document Incident page to report details of a recent
          incident.
        </li> */}
        <li>
          Visit the{" "}
          <a href="/patients" className="font-bold hover:underline">
            Patients
          </a>{" "}
          page to view all patients or create or delete a patient.
        </li>
        {/* <li>
          Visit the Search page to sift through all providers, patients, and
          incidents by various criteria.
        </li> */}
      </ul>
    </div>
  );
}

export default Home;

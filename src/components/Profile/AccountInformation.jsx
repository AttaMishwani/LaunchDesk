import React from "react";

const AccountInformation = ({ user }) => {
  const { email, username, phone, education, skills, bio, github, linkedin } =
    user || {};

  const InfoRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row mb-4">
      <div className="font-semibold w-40">{label}:</div>
      <div>{value || "Not provided"}</div>
    </div>
  );

  const handleEdit = () => {
    console.log("in editing mode");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Account Information
      </h2>

      <InfoRow label="Username" value={username} />
      <InfoRow label="Email" value={email} />
      <InfoRow label="Phone" value={phone} />
      <InfoRow label="Education" value={education} />
      <InfoRow label="Skills" value={skills} />
      <InfoRow label="Bio" value={bio} />
      <InfoRow
        label="GitHub"
        value={
          github ? (
            <a
              href={github}
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              {github}
            </a>
          ) : null
        }
      />
      <InfoRow
        label="LinkedIn"
        value={
          linkedin ? (
            <a
              href={linkedin}
              className="text-blue-600 underline"
              target="_blank"
              rel="noreferrer"
            >
              {linkedin}
            </a>
          ) : null
        }
      />

      <button
        onClick={handleEdit}
        className="bg-red-500 py-3 px-10 text-white text-1xl rounded-sm "
      >
        Edit Info
      </button>
    </div>
  );
};

export default AccountInformation;

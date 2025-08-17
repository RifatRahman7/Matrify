import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from 'sweetalert2';

const divisions = [
  "Dhaka", "Chattagram", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet",
];
const heights = [
  "4'6''", "4'7''", "4'8''", "4'9''", "4'10''", "4'11''", "5'0''", "5'1''", "5'2''", "5'3''", "5'4''", "5'5''", "5'6''", "5'7''", "5'8''", "5'9''", "5'10''", "5'11''", "6'0''", "6'1''", "6'2''", "6'3''", "6'4''"
];
const weights = [
  "40kg", "45kg", "50kg", "55kg", "60kg", "65kg", "70kg", "75kg", "80kg", "85kg", "90kg", "95kg", "100kg"
];
const occupations = [
  "Student", "Engineer", "Doctor", "Teacher", "Business", "Government Job", "Private Job", "Other"
];
const races = [
  "Fair", "Medium", "Dark"
];

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    biodataType: "",
    name: "",
    profileImage: "",
    dob: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fatherName: "",
    motherName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: "",
    mobile: "",
  });

  // Calculate age from dob
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (name === "dob") {
      const birth = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      updatedForm.age = age > 0 ? age : "";
    }
    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { ...form, contactEmail: user?.email };

    // Validation
    for (let key of [
      "biodataType", "name", "profileImage", "dob", "height", "weight", "age",
      "occupation", "race", "fatherName", "motherName", "permanentDivision",
      "presentDivision", "expectedPartnerAge", "expectedPartnerHeight",
      "expectedPartnerWeight", "contactEmail", "mobile"
    ]) {
      if (!formData[key]) {
        toast.error("Please fill all required fields.");
        return;
      }
    }

    try {
      const res = await axios.post("https://matrify-server.vercel.app/biodatas", formData);
      Swal.fire({
        title: "Success!",
        text: res.data.message || "Biodata saved successfully!",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save biodata.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] dark:text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg border border-white/30 dark:border-slate-800 shadow-2xl rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 dark:text-green-400 mb-4">Edit Your Biodata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/** All inputs **/}
          {[
            { label: "Biodata Type*", name: "biodataType", type: "select", options: ["Male", "Female"] },
            { label: "Name*", name: "name", type: "text" },
            { label: "Profile Image Link*", name: "profileImage", type: "text" },
            { label: "Date of Birth*", name: "dob", type: "date" },
            { label: "Height*", name: "height", type: "select", options: heights },
            { label: "Weight*", name: "weight", type: "select", options: weights },
            { label: "Age*", name: "age", type: "text", readOnly: true },
            { label: "Occupation*", name: "occupation", type: "select", options: occupations },
            { label: "Race (Skin Color)*", name: "race", type: "select", options: races },
            { label: "Father's Name*", name: "fatherName", type: "text" },
            { label: "Mother's Name*", name: "motherName", type: "text" },
            { label: "Permanent Division*", name: "permanentDivision", type: "select", options: divisions },
            { label: "Present Division*", name: "presentDivision", type: "select", options: divisions },
            { label: "Expected Partner Age*", name: "expectedPartnerAge", type: "text" },
            { label: "Expected Partner Height*", name: "expectedPartnerHeight", type: "select", options: heights },
            { label: "Expected Partner Weight*", name: "expectedPartnerWeight", type: "select", options: weights },
            { label: "Contact Email*", name: "contactEmail", type: "text", readOnly: true, value: user?.email },
            { label: "Mobile Number*", name: "mobile", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="font-medium text-gray-700 dark:text-gray-200">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={form[field.name] || field.value || ""}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60"
                >
                  <option value="">Select</option>
                  {field.options && field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  name={field.name}
                  value={form[field.name] || field.value || ""}
                  onChange={handleChange}
                  readOnly={field.readOnly}
                  required
                  className="w-full mt-1 p-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60"
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full mt-6 cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
        >
          Save And Publish Now
        </button>
      </form>
    </div>
  );
};

export default EditBiodata;

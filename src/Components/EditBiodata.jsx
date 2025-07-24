import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

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
    // Validation
    for (let key of [
      "biodataType", "name", "profileImage", "dob", "height", "weight", "age",
      "occupation", "race", "fatherName", "motherName", "permanentDivision",
      "presentDivision", "expectedPartnerAge", "expectedPartnerHeight",
      "expectedPartnerWeight", "contactEmail", "mobile"
    ]) {
      if (!form[key]) {
        toast.error("Please fill all required fields.");
        return;
      }
    }
    try {
      const res = await axios.post("http://localhost:3000/biodatas", form);
      toast.success(res.data.message || "Biodata saved successfully!");
      // Optionally, reset form here if you want
      // setForm({ ...initialState, contactEmail: user?.email || "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save biodata.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">Edit Your Biodata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Biodata Type */}
          <div>
            <label className="font-medium text-gray-700">Biodata Type*</label>
            <select name="biodataType" value={form.biodataType} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          {/* Name */}
          <div>
            <label className="font-medium text-gray-700">Name*</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Profile Image */}
          <div>
            <label className="font-medium text-gray-700">Profile Image Link*</label>
            <input name="profileImage" value={form.profileImage} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* DOB */}
          <div>
            <label className="font-medium text-gray-700">Date of Birth*</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Height */}
          <div>
            <label className="font-medium text-gray-700">Height*</label>
            <select name="height" value={form.height} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {heights.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          {/* Weight */}
          <div>
            <label className="font-medium text-gray-700">Weight*</label>
            <select name="weight" value={form.weight} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {weights.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          {/* Age */}
          <div>
            <label className="font-medium text-gray-700">Age*</label>
            <input name="age" value={form.age} readOnly className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Occupation */}
          <div>
            <label className="font-medium text-gray-700">Occupation*</label>
            <select name="occupation" value={form.occupation} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {occupations.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          {/* Race */}
          <div>
            <label className="font-medium text-gray-700">Race (Skin Color)*</label>
            <select name="race" value={form.race} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {races.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          {/* Father's Name */}
          <div>
            <label className="font-medium text-gray-700">Father's Name*</label>
            <input name="fatherName" value={form.fatherName} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Mother's Name */}
          <div>
            <label className="font-medium text-gray-700">Mother's Name*</label>
            <input name="motherName" value={form.motherName} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Permanent Division */}
          <div>
            <label className="font-medium text-gray-700">Permanent Division*</label>
            <select name="permanentDivision" value={form.permanentDivision} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {divisions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          {/* Present Division */}
          <div>
            <label className="font-medium text-gray-700">Present Division*</label>
            <select name="presentDivision" value={form.presentDivision} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {divisions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          {/* Expected Partner Age */}
          <div>
            <label className="font-medium text-gray-700">Expected Partner Age*</label>
            <input name="expectedPartnerAge" value={form.expectedPartnerAge} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Expected Partner Height */}
          <div>
            <label className="font-medium text-gray-700">Expected Partner Height*</label>
            <select name="expectedPartnerHeight" value={form.expectedPartnerHeight} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {heights.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          {/* Expected Partner Weight */}
          <div>
            <label className="font-medium text-gray-700">Expected Partner Weight*</label>
            <select name="expectedPartnerWeight" value={form.expectedPartnerWeight} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60">
              <option value="">Select</option>
              {weights.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          {/* Contact Email */}
          <div>
            <label className="font-medium text-gray-700">Contact Email*</label>
            <input name="contactEmail" className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
          {/* Mobile Number */}
          <div>
            <label className="font-medium text-gray-700">Mobile Number*</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} required className="w-full mt-1 p-2 rounded-lg border border-gray-200 bg-white/60" />
          </div>
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
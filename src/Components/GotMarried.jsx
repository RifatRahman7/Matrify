import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const GotMarried = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    selfBiodataId: "",
    partnerBiodataId: "",
    coupleImage: "",
    marriageDate: "",
    reviewStar: 5,
    successText: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://matrify-server.vercel.app/success-stories", {
        ...form,
        userEmail: user?.email,
      });
      Swal.fire("Success!", "Your success story has been submitted!", "success");
      setForm({
        selfBiodataId: "",
        partnerBiodataId: "",
        coupleImage: "",
        marriageDate: "",
        reviewStar: 5,
        successText: "",
      });
    } catch {
      Swal.fire("Error", "Failed to submit story. Try again.", "error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Share Your Success Story</h2>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Your Biodata ID</label>
          <input
            name="selfBiodataId"
            value={form.selfBiodataId}
            onChange={handleChange}
            type="number"
            required
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/60 font-mono"
            placeholder="Enter your biodata ID"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Partner Biodata ID</label>
          <input
            name="partnerBiodataId"
            value={form.partnerBiodataId}
            onChange={handleChange}
            type="number"
            required
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/60 font-mono"
            placeholder="Enter partner's biodata ID"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Marriage Date</label>
          <input
            name="marriageDate"
            value={form.marriageDate}
            onChange={handleChange}
            type="date"
            required
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/60"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Couple Image Link</label>
          <input
            name="coupleImage"
            value={form.coupleImage}
            onChange={handleChange}
            type="url"
            required
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/60"
            placeholder="Paste image URL"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Review Star</label>
          <select
            name="reviewStar"
            value={form.reviewStar}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/60"
          >
            {[5, 4, 3, 2, 1].map(star => (
              <option key={star} value={star}>{star} Star{star > 1 && "s"}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Your Success Story</label>
          <textarea
            name="successText"
            value={form.successText}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 rounded-lg border border-gray-200 bg-white/60"
            placeholder="Share your experience and feelings..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition text-lg"
        >
          {loading ? "Submitting..." : "Submit Success Story"}
        </button>
      </form>
    </div>
  );
};

export default GotMarried;
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const MyFavourites = () => {
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/favourites/${user.email}`)
        .then(res => setFavs(res.data));
    }
  }, [user?.email]);

  // Delete favourite
  const handleDelete = async (biodataId) => {
    await axios.delete(`http://localhost:3000/favourites/${user.email}/${biodataId}`);
    setFavs(favs.filter(f => f.biodataId !== biodataId));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/80 p-6 rounded-2xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">My Favourites</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Biodata ID</th>
              <th className="px-4 py-2">Permanent Address</th>
              <th className="px-4 py-2">Occupation</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {favs.map(f => (
              <tr key={f.biodataId}>
                <td className="px-4 py-2">{f.name}</td>
                <td className="px-4 py-2">{f.biodataId}</td>
                <td className="px-4 py-2">{f.permanentDivision}</td>
                <td className="px-4 py-2">{f.occupation}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(f.biodataId)}
                    className="text-red-600 font-bold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {favs.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">No favourites found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavourites;
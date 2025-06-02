import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../features/playlist/playlistSlice";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.playlist);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/playlist");

    if (!formData.name.trim()) {
      setFormError("Playlist name is required.");
      return;
    }

    try {
      await dispatch(createPlaylist(formData)).unwrap();
      setFormData({ name: "", description: "" }); // reset on success
    } catch (err) {
      console.error("Playlist creation failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-black border p-6 rounded-sm shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-200">
        Create New Playlist
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-200">
            Playlist Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter playlist name"
            className="w-full px-3 py-2 bg-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional description"
            rows={3}
            className="w-full px-3 py-2 bg-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        {error && <p className="text-sm text-red-600">Server Error: {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#AE7AFF] text-white py-2 rounded-lg hover:bg-[#7f5abc] transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;

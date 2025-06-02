import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCoverImage,
  resetUserProfileState,
} from "../../features/userProfile/userProfileSlice";

const ChangeCoverImage = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.userProfile
  );

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);

    dispatch(changeCoverImage(formData));
  };

  useEffect(() => {
    return () => {
      dispatch(resetUserProfileState());
    };
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-4">Change Cover Image</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-white bg-gray-800 p-2 border border-gray-700 rounded"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded ${
            loading || !file ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload Cover Image"}
        </button>
      </form>
    </div>
  );
};

export default ChangeCoverImage;

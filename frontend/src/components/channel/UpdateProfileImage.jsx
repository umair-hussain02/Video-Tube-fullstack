import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAvatar,
  resetUserProfileState,
} from "../../features/userProfile/userProfileSlice";

const UpdateProfileImage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { loading, error, successMessage } = useSelector(
    (state) => state.userProfile
  );

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    dispatch(changeAvatar(formData));
  };

  useEffect(() => {
    if (successMessage || error) {
      const timeout = setTimeout(() => {
        dispatch(resetUserProfileState());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage, error, dispatch]);
  console.log(successMessage);

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Update Profile Image</h3>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500"
        />

        {selectedFile && (
          <p className="text-sm text-gray-300">Selected: {selectedFile.name}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default UpdateProfileImage;

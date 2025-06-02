import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addVideo } from "../../features/videos/videoSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VideoUploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showForm, setShowForm] = useState(true); // Local visibility state

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      setIsUploading(true);
      await dispatch(addVideo(formData)).unwrap();
      toast.success("Video uploaded successfully!");
      reset();
      setUploadProgress(0);
      navigate("/");
    } catch (error) {
      toast.error("Failed to upload video.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle internal close
  const handleClose = () => {
    setShowForm(false);
  };

  if (!showForm) return null; // Don't render the form if closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-400 bg-black text-white p-6 w-full max-w-lg rounded-md"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-sm">Upload Video</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white font-semibold text-xs px-3 py-1 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="bg-purple-400 text-black font-semibold text-xs px-3 py-1 rounded disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </div>

        {/* Upload UI */}
        <div className="border border-dashed border-gray-500 p-8 mb-6 flex flex-col items-center gap-3 text-center">
          <div className="bg-purple-300 text-purple-600 rounded-full p-5 text-3xl">
            <i className="fas fa-upload"></i>
          </div>
          <p className="font-semibold text-xs">
            Drag and drop video files to upload
          </p>
          <p className="text-xs text-gray-400">
            Your videos will be private until you publish them.
          </p>

          <label
            htmlFor="videoFile"
            className="bg-purple-400 text-black font-semibold text-xs px-4 py-1 rounded mt-2 cursor-pointer"
          >
            Select Files
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              {...register("videoFile", {
                required: "Video file is required",
              })}
              className="hidden"
              disabled={isUploading}
            />
          </label>
          {errors.videoFile && (
            <p className="text-red-500 text-xs">{errors.videoFile.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <label className="block text-xs mb-1" htmlFor="thumbnail">
          Thumbnail<span className="text-white">*</span>
        </label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="file"
          accept="image/*"
          {...register("thumbnail", {
            required: "Thumbnail is required",
          })}
          className="w-full border border-gray-400 bg-black text-white text-xs mb-4"
          disabled={isUploading}
        />
        {errors.thumbnail && (
          <p className="text-red-500 text-xs">{errors.thumbnail.message}</p>
        )}

        {/* Title */}
        <label className="block text-xs mb-1" htmlFor="title">
          Title<span className="text-white">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          {...register("title", {
            required: "Title is required",
          })}
          className="w-full border border-gray-400 bg-black text-white text-xs mb-4 px-2 py-1"
          disabled={isUploading}
        />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}

        {/* Description */}
        <label className="block text-xs mb-1" htmlFor="description">
          Description<span className="text-white">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows="5"
          {...register("description", {
            required: "Description is required",
          })}
          className="w-full border border-gray-400 bg-black text-white text-xs px-2 py-1 resize-none"
          disabled={isUploading}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </form>
    </div>
  );
}

export default VideoUploadForm;

import React from "react";
import VideoUploadForm from "../components/video/VideoUploadForm";

function Uploadvideo() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload Your Video</h1>
      <VideoUploadForm />
    </div>
  );
}

export default Uploadvideo;

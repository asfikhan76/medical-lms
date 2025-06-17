import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
      console.log("message" ,  err.response.data.message)
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleUpload}>
        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />
        <button type="submit" className="bg-blue-500 px-4 py-1 rounded-md text-amber-100">Upload</button>
      </form>
      <p className="font-bold">{message}</p>
    </div>
  );
}

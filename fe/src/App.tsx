import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    check();
  }, []);

  async function check() {
    try {
      const response = await axios.get(`${url}/status`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${url}/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable && progressEvent.total) {
            const percentComplete = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(percentComplete);
          }
        },
        timeout: 1000000,
      });

      if (response.status === 200) {
        console.log('Upload completed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        upload
      </button>
      {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
    </div>
  );
}

export default App;

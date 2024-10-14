import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

function App() {
  const [file, setFile] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
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
    const selectedFile = Array.from(event.target.files || []);
    setFile(selectedFile);
    setUploadProgress(new Array(selectedFile.length).fill(0));
  };

  const uploadChunk = async (file: File, chunk: Blob, chunkIndex: number) => {
    const formData = new FormData();
    formData.append('file', chunk, `${file.name}.part${chunkIndex}`);

    return axios.post(`${url}/upload`, formData);
  };

  const mergeChunks = async (filename: string, totalChunks: number) => {
    const response = await axios.post(`${url}/merge`, {
      filename: filename,
      totalChunks: totalChunks,
    });
    console.log(response.data.message);
  };

  const handleUpload = async () => {
    if (file.length === 0) return;

    const promises = file.map(async (file, fileIndex) => {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const progress = [];

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        try {
          await uploadChunk(file, chunk, chunkIndex);
          const percentComplete = Math.round(((chunkIndex + 1) / totalChunks) * 100);
          progress.push(percentComplete);
          setUploadProgress((prev) => {
            const newProgress = [...prev];
            newProgress[fileIndex] = percentComplete; // Update progress for the specific file
            return newProgress;
          });
        } catch (error) {
          console.error(
            `Upload failed for chunk ${chunkIndex} of file ${file.name}:`,
            error
          );
          return; // Stop processing if a chunk fails
        }
      }

      // Merge the chunks after uploading all
      await mergeChunks(file.name, totalChunks);
      console.log(`File ${file.name} uploaded and merged successfully.`);
    });

    try {
      await Promise.all(promises);
      console.log('All files uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload} disabled={file.length === 0}>
        upload
      </button>
      {uploadProgress.map((progress, index) => (
        <div key={index}>
          Upload Progress for file {index + 1}: {progress}%
        </div>
      ))}
    </div>
  );
}

export default App;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const TranslateJsonPage = () => {
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setDownloadLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const indianLanguages = [
    "English", "Hindi", "Tamil", "Telugu", "Marathi", "Kannada", 
    "Bengali", "Odia", "Assamese", "Punjabi", "Malayalam", "Gujarati",
    "Urdu", "Sanskrit", "Nepali", "Bodo", "Maithili", "Sindhi",
    "Kashmiri", "Konkani", "Dogri", "Goan Konkani", "Santali"
  ];

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJsonFile(e.target.files[0]);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language) // Remove if already selected
        : [...prev, language] // Add if not already selected
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jsonFile || selectedLanguages.length === 0) {
      setError('Please upload a JSON file and select target languages.');
      return;
    }

    const formData = new FormData();
    formData.append('file', jsonFile);
    selectedLanguages.forEach((lang) => formData.append('translate_to', lang));

    setIsLoading(true);
    setError(null);
    setDownloadLink(null);

    try {
      const response = await axios.post('http://localhost:8000/translate_json_files_new/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // Expecting binary file (zip)
      });

      // Create a download link for the zip file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'translated_sorted_files.zip'); // Default name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('An error occurred while processing the file.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-8">Translate JSON Files</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-1/2 md:w-1/3"
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">Upload JSON File</label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-700 text-lg font-semibold mb-2">Target Languages</label>
          <div
            className="border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-700 cursor-pointer focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedLanguages.length > 0
              ? selectedLanguages.join(', ')
              : 'Select target languages'}
          </div>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-60 w-full overflow-y-auto z-10"
            >
              {indianLanguages.map((language) => (
                <div
                  key={language}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className="mr-2"
                  />
                  <label className="text-gray-700">{language}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg w-full font-semibold hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Translate '}
        </button>
      </form>
    </div>
  );
};

export default TranslateJsonPage;

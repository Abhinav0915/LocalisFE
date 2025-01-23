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
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
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
      const response = await axios.post(
        'http://localhost:8000/translate_json_files_new/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        }
      );
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'translated_files.zip');
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
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg text-gray-800"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Translate JSON Files
        </h1>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">Upload JSON File</label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-lg font-medium mb-2 text-gray-700">Target Languages</label>
          <div
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex justify-between items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Select target languages'}</span>
            <span className="text-gray-500">▼</span>
          </div>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto z-10"
            >
              {indianLanguages.map((language) => (
                <div
                  key={language}
                  className="flex items-center px-4 py-2 hover:bg-indigo-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language)}
                    onChange={() => handleLanguageChange(language)}
                    className="mr-2"
                  />
                  <label>{language}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 focus:ring-4 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Translate'}
        </button>
      </form>
    </div>
  );
};

export default TranslateJsonPage;

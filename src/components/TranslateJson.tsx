import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const TranslateJsonPage = () => {
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  useEffect(() => {
    if (isLoading) {
      // Start polling for progress
      progressIntervalRef.current = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:8082/translation_progress/');
          setProgress(response.data.progress);
          setStatusMessage(response.data.status);
        } catch (err) {
          console.error('Progress polling error:', err);
        }
      }, 1000); // Poll every second
    } else if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJsonFile(e.target.files[0]);
      setError(null);
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
      setError('Please upload a JSON file and select at least one target language.');
      return;
    }

    const formData = new FormData();
    formData.append('file', jsonFile);
    selectedLanguages.forEach((lang) => formData.append('translate_to', lang));

    setIsLoading(true);
    setError(null);
    setProgress(0);
    setStatusMessage('Starting translation...');

    try {
      const response = await axios.post(
        'http://localhost:8082/translate_json_files_new/',
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
      setStatusMessage('Translation completed successfully!');
    } catch (err) {
      setError('An error occurred while processing the file.');
      console.error('Error:', err);
      setStatusMessage('Translation failed.');
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          JSON File Translator
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload JSON File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Languages
            </label>
            <div
              className="w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex justify-between items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-gray-600">
                {selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Select languages'}
              </span>
              <span className="text-gray-400">▼</span>
            </div>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
              >
                {indianLanguages.map((language) => (
                  <div
                    key={language}
                    className="flex items-center px-4 py-2 hover:bg-indigo-50"
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

          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          {isLoading && (
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{statusMessage}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TranslateJsonPage;
"use client";

import { useState } from "react";

interface FilteredResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers?: string[];
  alphabets?: string[];
  highest_alphabet?: string[];
}

export default function Home() {
  const [jsonInput, setJsonInput] = useState<string>('{ "data": [] }');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [response, setResponse] = useState<FilteredResponse | null>(null);

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput);

      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        alert('Invalid JSON format. Ensure it follows: { "data": ["A", "C", "z"] }');
        return;
      }

      const data: string[] = parsedData.data;

      // Filtering Logic
      const numbers = data.filter((item) => !isNaN(Number(item)));
      const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
      const highestAlphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

      const filteredResponse: FilteredResponse = {
        is_success: true,
        user_id: "Garv_Kumar_12012005",
        email: "22bai70298@cuchd.in",
        roll_number: "22BAI70298",
      };

      if (selectedFilters.includes("Numbers")) {
        filteredResponse.numbers = numbers;
      }
      if (selectedFilters.includes("Alphabets")) {
        filteredResponse.alphabets = alphabets;
      }
      if (selectedFilters.includes("Highest Alphabet")) {
        filteredResponse.highest_alphabet = highestAlphabet;
      }

      setResponse(filteredResponse);
    } catch {
      alert("Invalid JSON format. Please check your input.");
    }
  };

  const handleFilterSelection = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Data Filter API</h1>

      {/* JSON Input */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON: { "data": ["A", "C", "z"] }'
        style={{
          width: "400px",
          height: "100px",
          padding: "10px",
          fontSize: "16px",
          fontFamily: "monospace",
          border: "1px solid black",
          color: "black",
        }}
      />

      {/* Filter Selection */}
      <div style={{ marginTop: "15px" }}>
        {["Numbers", "Alphabets", "Highest Alphabet"].map((filter) => (
          <label key={filter} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              checked={selectedFilters.includes(filter)}
              onChange={() => handleFilterSelection(filter)}
            />
            {filter}
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {/* Response Display */}
      {response && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50%",
              padding: "15px",
              background: "black",
              color: "white",
              borderRadius: "5px",
              textAlign: "left",
            }}
          >
            <h3>Filtered Response:</h3>
            <p><strong>Success:</strong> {response.is_success ? "true" : "false"}</p>
            <p><strong>User ID:</strong> {response.user_id}</p>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Roll Number:</strong> {response.roll_number}</p>
            {response.numbers && <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>}
            {response.alphabets && <p><strong>Alphabets:</strong> {response.alphabets.join(", ")}</p>}
            {response.highest_alphabet && <p><strong>Highest Alphabet:</strong> {response.highest_alphabet.join(", ")}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";

export const useSubmitData = (url, method = "POST") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const submitData = async (data) => {
    setLoading(true);
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await fetch(url, {
        method: method.toUpperCase(), // "POST" or "PUT"
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setSuccess(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, submitData };
};

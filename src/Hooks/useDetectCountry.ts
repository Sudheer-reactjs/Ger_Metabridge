import { useEffect, useState } from "react";
import axios from "axios";

const useDetectCountry = () => {
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // This API returns details like country name, code, IP, etc.
        const response = await axios.get("https://ipapi.co/json/");
        setCountryCode(response.data.country_code); // e.g. "IT", "US"
      } catch (error) {
        console.error("Error fetching location:", error);
        setCountryCode("US"); // fallback to English
      }
    };

    fetchCountry();
  }, []);

  return countryCode; 
};

export default useDetectCountry;

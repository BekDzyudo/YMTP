import { getCurrentLang, langHeaders, txDataFor } from "../i18n/i18n";

export const getFetchData = async (url) => {
    const result = {
      data: [],
      error: null,
    };
  
    try {
      const response = await fetch(url, { headers: langHeaders() });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      result.data = txDataFor(getCurrentLang(), await response.json());
    } catch (err) {
      result.error = err.message;
      
    }
  
    return result; // data va error holatlarini qaytaradi
  };
  export default getFetchData
  
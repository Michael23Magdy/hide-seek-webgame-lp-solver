export const sendDataToServer = async (grid) => {
  if (!grid || grid.length === 0) {
    throw new Error("Grid data is empty or undefined");
  }

  const requestData = {
    grid
  };
  
  try {
    console.log("Sending to server:", requestData);
    
    const response = await fetch("http://127.0.0.1:5000/process-data", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server returned error (${response.status}): ${errorText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};
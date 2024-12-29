export const submitSurveyData = async (data) => {
    try {
      console.log('Submitting data:', data); // Debugging log
      const response = await fetch('http://localhost:5000/api/surveys/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
    //   console.log('Response received:', result); 
      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };
  
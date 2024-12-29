'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { submitSurveyData } from '../lib/api';
import 'survey-react/survey.css';

const Survey = dynamic(
  () => import('survey-react').then(mod => ({ default: mod.Survey })),
  {
    ssr: false,
    loading: () => <div>Loading survey...</div>
  }
);

const SurveyForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const surveyJson = {
      logoPosition: "right",
      pages: [
        {
          name: "personalDetails",
          title: "Personal Details",
          elements: [
            {
              type: "text",
              name: "firstName",
              title: "First Name",
              isRequired: true,
              placeholder: "John",
            },
            {
              type: "text",
              name: "lastName",
              title: "Last Name",
              isRequired: true,
              placeholder: "Doe",
            },
            {
              type: "text",
              name: "email",
              title: "Email",
              isRequired: true,
              inputType: "email",
              placeholder: "johndoe@gmail.com",
            },
            {
              type: "text",
              name: "number",
              title: "Mobile Number",
              inputType: "tel",
              placeholder: "9999999999",
            },
          ],
        },
        {
          name: "preferences",
          title: "Preferences",
          elements: [
            {
              type: "radiogroup",
              name: "ownACar",
              title: "Do you own a car?",
              isRequired: true,
              choices: [
                {
                  value: "yes",
                  text: "Yes",
                },
                {
                  value: "no",
                  text: "No",
                },
              ],
            },
            {
              type: "dropdown",
              name: "carBrand",
              visibleIf: "{ownACar} = 'yes'",
              title: "What car brand do you own?",
              isRequired: true,
              choices: [
                {
                  value: "toyota",
                  text: "Toyota",
                },
                {
                  value: "bmw",
                  text: "BMW",
                },
                {
                  value: "honda",
                  text: "Honda",
                },
              ],
            },
            {
              type: "text",
              name: "driveKilometers",
              visibleIf: "{ownACar} = 'yes'",
              title: "How many kilometers do you drive per month?",
              isRequired: true,
              inputType: "number",
            },
            {
              type: "radiogroup",
              name: "travelFrequently",
              visibleIf: "{ownACar} = 'yes'",
              title: "Do you travel frequently for work?",
              isRequired: true,
              choices: [
                {
                  value: "yes",
                  text: "Yes",
                },
                {
                  value: "no",
                  text: "No",
                },
              ],
            },
            {
              type: "checkbox",
              name: "modeOfTransport",
              visibleIf: "{travelFrequently} = 'yes'",
              title: "Which mode of transportation do you prefer?",
              isRequired: true,
              choices: [
                {
                  value: "bus",
                  text: "Bus",
                },
                {
                  value: "car",
                  text: "Car",
                },
                {
                  value: "train",
                  text: "Train",
                },
                {
                  value: "flight",
                  text: "Flight",
                },
              ],
            },
          ],
        },
        {
          name: "feedback",
          title: "Feedback",
          elements: [
            {
              type: "matrix",
              name: "rateStatements",
              title: "Rate the following statements on a scale of 1-5",
              isRequired: true,
              columns: [
                {
                  value: "1: very satisfied",
                  text: "1: Very Satisfied",
                },
                {
                  value: "2: satisfied",
                  text: "2: Satisfied",
                },
                {
                  value: "3: neutral",
                  text: "3: Neutral",
                },
                {
                  value: "4: dissatisfied",
                  text: "4: Dissatisfied",
                },
                {
                  value: "5: very dissatisfied",
                  text: "5: Very Dissatisfied",
                },
              ],
              rows: [
                {
                  value: "the survey was easy to understand.",
                  text: "The survey was easy to understand.",
                },
                {
                  value: "the form interface was intuitive.",
                  text: "The form interface was intuitive.",
                },
                {
                  value: "the questions were relevant.",
                  text: "The questions were relevant.",
                },
              ],
            },
            {
              type: "file",
              name: "fileUpload",
              title: "Upload a photo of your car or a travel ticket.",
              isRequired: false,
              sourceType: "file",
            },
            {
              type: "text",
              name: "additionalFeedback",
              title: "Do you have any additional feedback?",
            },
          ],
        },
      ],
    };

    const onComplete = async (survey) => {
      setIsSubmitting(true);
      setError(null);
  
      try {
        const result = await submitSurveyData(survey.data);
        // const response = await axios.post('http://localhost:5000/api/surveys/submit', survey.data)
        console.log('Survey submitted successfully', result );
        alert('Survey submitted successfully!');
      } catch (err) {
        console.error('Failed to submit survey:', err);
        setError('Failed to submit survey. Please try again.');
        alert('Failed to submit survey. Please try again.');
      }
       finally {
        setIsSubmitting(false);
      }
    };
  
    if (!isMounted) {
      return <div>Loading survey...</div>;
    }
  
    return (
      <div className="survey-wrapper">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <Survey 
          json={surveyJson} 
          onComplete={onComplete}
          showCompletedPage={true}
        />
      </div>
    );
  };
  
  export default SurveyForm;
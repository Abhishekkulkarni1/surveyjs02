    import { saveSurvey } from '../../backend/models/surveyModel';

    export default async function handler(req, res) {
    if (req.method === 'POST') {
        const surveyData = req.body;
        try {
        await saveSurvey(surveyData);
        res.status(200).json({ message: 'Survey submitted successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Database error', error });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
    }

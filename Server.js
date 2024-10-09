// JavaScript Code

// API URL via Proxy Server (relative path)
const API_URL = '/api/meals';

// Funktion til at hente madplanen fra API'en
async function fetchMealPlan() {
    const loadingElement = document.getElementById('loading');
    const weeklyPlanElement = document.getElementById('weekly-plan');

    try {
        const response = await fetch(API_URL);
        console.log('Fetch response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP-fejl! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Data:', data);

        generateMealPlan(data);
    } catch (error) {
        console.error('Fejl ved hentning af API-data:', error);
        displayError(error);
    } finally {
        loadingElement.style.display = 'none'; // Skjul loading
        weeklyPlanElement.style.display = 'block'; // Vis madplanen
    }
}

// Resten af din kode...

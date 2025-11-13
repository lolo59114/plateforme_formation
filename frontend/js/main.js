const API_BASE_URL = "http://localhost:3000";

/**
 * Fonction utilitaire pour récupérer des données depuis l’API
 */
async function getData(endpoint) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des données");
    return await response.json();
}

/**
 * Fonction utilitaire pour envoyer des données (POST ou PUT)
 */
async function sendData(endpoint, method, data) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response;
}

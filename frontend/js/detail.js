const params = new URLSearchParams(window.location.search);
const formationId = params.get("id");

// ID de l'apprenant (simulé ici)
const apprenantId = 1;

async function chargerDetailFormation() {
    try {
        const formation = await getData(`formations/${formationId}`);
        const formateur = await getData(`formateurs/${formation.formateurId}`);

        const main = document.querySelector("main");
        main.innerHTML = `
      <h1>${formation.titre}</h1>
      <p><strong>Catégorie :</strong> ${formation.categorie}</p>
      <p><strong>Durée :</strong> ${formation.duree}</p>
      <p><strong>Formateur :</strong> ${formateur.nom} (${formateur.expertise})</p>
      
      <button id="btnInscription" class="btn"></button>
      <p id="messageInscription"></p>
    `;

        const btnInscription = document.getElementById("btnInscription");
        const message = document.getElementById("messageInscription");

        // Vérifie si l'apprenant est déjà inscrit
        const inscriptionsExistantes = await getData(
            `inscriptions?apprenantId=${apprenantId}&formationId=${formationId}`
        );

        if (inscriptionsExistantes.length > 0) {
            const inscriptionId = inscriptionsExistantes[0].id;
            afficherBoutonDesinscription(btnInscription, message, inscriptionId);
        } else {
            afficherBoutonInscription(btnInscription, message);
        }
    } catch (error) {
        console.error("Erreur lors du chargement des détails :", error);
        document.querySelector("main").innerHTML = `<p>Erreur de chargement.</p>`;
    }
}

/* Fonction pour inscrire l'apprenant */
async function inscrireApprenant(message) {
    try {
        const nouvelleInscription = {
            apprenantId,
            formationId: Number(formationId),
            dateInscription: new Date().toISOString().split("T")[0],
        };

        const reponse = await sendData("inscriptions", "POST", nouvelleInscription);

        if (reponse.ok) {
            message.textContent = "Vous êtes maintenant inscrit à cette formation.";
            message.style.color = "green";
            setTimeout(() => location.reload(), 1000);
        } else {
            message.textContent = "Erreur lors de l'inscription.";
            message.style.color = "red";
        }
    } catch (error) {
        console.error("Erreur d'inscription :", error);
        message.textContent = "Problème de connexion à l'API.";
        message.style.color = "red";
    }
}

/* Fonction pour désinscrire l'apprenant */
async function desinscrireApprenant(message, inscriptionId) {
    const confirmation = confirm("Êtes-vous sûr de vouloir vous désinscrire ?");
    if (!confirmation) return;

    try {
        const response = await fetch(`${API_BASE_URL}/inscriptions/${inscriptionId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            message.textContent = "Vous êtes désinscrit de cette formation.";
            message.style.color = "green";
            setTimeout(() => location.reload(), 1000);
        } else {
            message.textContent = "Erreur lors de la désinscription.";
            message.style.color = "red";
        }
    } catch (error) {
        console.error("Erreur de désinscription :", error);
        message.textContent = "Problème de connexion à l'API.";
        message.style.color = "red";
    }
}

/* Affiche bouton inscription */
function afficherBoutonInscription(btn, message) {
    btn.textContent = "S'inscrire à cette formation";
    btn.style.backgroundColor = "#0077cc";
    btn.onclick = () => inscrireApprenant(message);
}

/* Affiche bouton désinscription */
function afficherBoutonDesinscription(btn, message, inscriptionId) {
    btn.textContent = "Se désinscrire";
    btn.style.backgroundColor = "#e74c3c";
    message.textContent = "Vous êtes déjà inscrit à cette formation.";
    message.style.color = "green";
    btn.onclick = () => desinscrireApprenant(message, inscriptionId);
}

chargerDetailFormation();

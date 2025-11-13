const apprenantId = 1;
const inputNom = document.getElementById("inputNom");
const inputEmail = document.getElementById("inputEmail");
const formProfil = document.getElementById("formulaireProfil");

async function chargerProfil() {
    const apprenant = await getData(`apprenants/${apprenantId}`);
    inputNom.value = apprenant.nom;
    inputEmail.value = apprenant.email;
}

formProfil.addEventListener("submit", async (e) => {
    e.preventDefault();

    const majProfil = {
        nom: inputNom.value,
        email: inputEmail.value
    };

    await sendData(`apprenants/${apprenantId}`, "PUT", majProfil);
    alert("Profil mis à jour !");
});

chargerProfil();

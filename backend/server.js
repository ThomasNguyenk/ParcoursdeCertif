const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Autorise le frontend (Vue.js) à communiquer avec le backend
app.use(cors());

// Base de données des certifications avec tes fonds d'écran et détails
const certifications = [
    {
        id: 1,
        title: "MOOC ANSSI",
        duration: "~15 heures",
        logo: "https://lesbases.anct.gouv.fr/images/ca180d93-c4dc-47ae-82c1-26936c39b83d.webp?width=864",
        bg: "https://codra.net/wp-content/uploads/2019/11/anssi_960x575-1.png",
        link: "https://drive.google.com/file/d/1EWXzDYll9I6LRG2Iu2EtdAn17pDiGV87/view",
        description: "Formation officielle de l'Agence Nationale de la Sécurité des Systèmes d'Information.",
        pros: ["Contenu officiel certifié État", "Couverture cyber complète", "Forte valeur CV"],
        cons: ["Format très théorique", "Modules juridiques denses"],
        examples: ["Sécurisation du poste de travail", "Hygiène informatique", "Protection des données"]
    },
    {
        id: 2,
        title: "Certification PIX",
        duration: "2 à 3 ans",
        logo: "https://couserans.mon-ent-occitanie.fr/lectureFichiergw.do?ID_FICHIER=1451887170746",
        bg: "https://lasalle-valenciennes.com/wp-content/uploads/2024/06/95622b616a0f315d192ab0eb7f61e861-l.jpg",
        link: "https://drive.google.com/file/d/1psa9wg_94pEFcyfA7N20F5CwBRNaM3j-/view",
        description: "Développement des compétences numériques tout au long de la vie.",
        pros: ["Standard national officiel", "Test adaptatif personnalisé", "Valorisation sur CV"],
        cons: ["Demande de la régularité", "Niveaux supérieurs exigeants"],
        examples: ["Recherche de données", "Communication & Collaboration", "Création de contenu"]
    },
    {
        id: 3,
        title: "JavaScript Essentials 1",
        duration: "~40 heures",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwyns96bodKrr8OGzXJ23DtXi3Bl2P7wdrw&s",
        bg: "https://wallpapers.com/images/featured/javascript-pnr9lrhwaigq76mb.jpg",
        link: "https://drive.google.com/file/d/1rfJypqJTsyzP9y7hG-iHmTZ7Pzo8JUtd/view",
        description: "Maîtrise des concepts fondamentaux de la programmation avec JavaScript.",
        pros: ["Logique algorithmique rigoureuse", "Base Web indispensable", "Certification Cisco"],
        cons: ["Technique exigeante", "Pas de frameworks modernes"],
        examples: ["Manipulation du DOM", "Boucles & Conditions", "POO (Classes/Objets)"]
    },
    {
        id: 4,
        title: "Introduction à la Cybersécurité",
        duration: "~6 heures",
        logo: "https://sti.eduscol.education.fr/system/files/images/ressources/pedagogiques/16235/16235-introduction-to-cybersecurity-16.png",
        bg: "https://img.freepik.com/free-photo/cybersecurity-shield-with-padlock_23-2151998478.jpg",
        link: "https://drive.google.com/file/d/15cCNrYsFQhADhy0a6LxHx7r9ZJwQbkbi/view",
        description: "Apprentissage des bases de la protection des données et des réseaux.",
        pros: ["Maîtrise triade CIA", "Identification menaces", "Socle solide"],
        cons: ["Pas de labs pratiques", "Théorique"],
        examples: ["Cryptographie & Hachage", "Protocoles réseau", "Authentification MFA"]
    },
    {
        id: 5,
        title: "HTML Essentials",
        duration: "~30 heures",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/22b824de-26d0-4ee1-8c09-3116479fff57.png",
        bg: "https://media.istockphoto.com/id/1861592942/fr/photo/ic%C3%B4ne-de-d%C3%A9veloppement-de-code-de-programme-sur-un-%C3%A9cran-lcd-num%C3%A9rique-avec-r%C3%A9flexion.jpg?s=612x612&w=0&k=20&c=0C6kSByg-suEaR4xvXeoFAQL59VCt5274HKQ7hnJfbw=",
        link: "https://drive.google.com/file/d/1C6_fMaG7IdDdgDYtHSwphRiFpZmOX8q3/view",
        description: "Conception de pages web modernes et structurées.",
        pros: ["Sémantique Web moderne", "Accessibilité & SEO", "Certification Cisco"],
        cons: ["Pas de design (CSS)", "Web statique"],
        examples: ["Structure HTML5", "Formulaires interactifs", "Intégration multimédia"]
    },
    {
        id: 6,
        title: "Notions de base sur les réseaux",
        duration: "~25 heures",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/ec7b044a-3368-4bc3-8eaf-1872a41780b2.png",
        bg: "https://thumbs.dreamstime.com/b/r%C3%A9seau-informatique-global-32900669.jpg",
        link: "https://drive.google.com/file/d/1Oq8Wf6L81jdFnLRd-Xs6CUdsHc2hS7GY/view",
        description: "Compréhension du fonctionnement global des réseaux informatiques.",
        pros: ["Fondamentaux OSI/TCP-IP", "Architecture réseau", "Certification Cisco"],
        cons: ["Concepts abstraits", "Peu de pratique"],
        examples: ["Adressage IP", "Protocoles TCP/UDP", "Modèle OSI"]
    }
];

// Route API pour envoyer les données au frontend
app.get('/api/certifications', (req, res) => {
    res.json(certifications);
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré avec succès sur http://localhost:${PORT}`);
    console.log(`L'API est accessible sur http://localhost:${PORT}/api/certifications`);
});
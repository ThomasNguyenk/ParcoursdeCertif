const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const certifications = [
    {
        title: "MOOC ANSSI",
        duration: "~15 heures",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9R6U2dM1FF9pasgH2RURmCsnV_7JcGPgiktOg&s",
        bg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070",
        link: "https://drive.google.com/file/d/1EWXzDYll9I6LRG2Iu2EtdAn17pDiGV87/view",
        pros: ["Contenu officiel certifié État", "Couverture cyber complète", "Forte valeur CV"],
        cons: ["Format très théorique", "Modules juridiques denses", "Sensibilisation globale"],
        examples: ["Sécurisation du poste de travail", "Hygiène informatique en entreprise", "Protection des données nomades"]
    },
    {
        title: "Certification Pix",
        duration: "Évaluation continue - 2 à 3 ans",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pix_logo.svg/3840px-Pix_logo.svg.png",
        bg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
        link: "https://drive.google.com/file/d/1psa9wg_94pEFcyfA7N20F5CwBRNaM3j-/view",
        pros: ["Défis interactifs réels", "Évaluation adaptative", "Standard national"],
        cons: ["Profil généraliste", "Cyber de base uniquement", "Validité temporelle"],
        examples: ["Gestion de l'identité numérique", "Collaboration en ligne sécurisée", "Configuration de tableurs"]
    },
    {
        title: "JavaScript Essentials 1",
        duration: "~40 heures",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwyns96bodKrr8OGzXJ23DtXi3Bl2P7wdrw&s",
        bg: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070",
        link: "https://drive.google.com/file/d/1rfJypqJTsyzP9y7hG-iHmTZ7Pzo8JUtd/view",
        pros: ["Logique algorithmique rigoureuse", "Base Web indispensable", "Certification Cisco reconnue"],
        cons: ["Technique exigeante", "Pas de frameworks modernes", "Focus code pur"],
        examples: ["Manipulation du DOM", "Boucles et conditions", "Programmation orientée objet"]
    },
    {
        title: "Introduction à la Cybersécurité",
        duration: "~6 heures",
        logo: "https://sti.eduscol.education.fr/system/files/images/ressources/pedagogiques/16235/16235-introduction-to-cybersecurity-16.png",
        bg: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920",
        link: "https://drive.google.com/file/d/15cCNrYsFQhADhy0a6LxHx7r9ZJwQbkbi/view",
        pros: ["Maîtrise triade CIA", "Identification menaces", "Socle débutant solide"],
        cons: ["Pas de labs pratiques", "Insuffisant seul", "Théorique"],
        examples: ["Analyse de malwares", "Ingénierie sociale", "Concepts de VPN et Pare-feu"]
    },
    {
        title: "HTML Essentials",
        duration: "~30 heures",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/22b824de-26d0-4ee1-8c09-3116479fff57.png",
        bg: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2070",
        link: "https://drive.google.com/file/d/1C6_fMaG7IdDdgDYtHSwphRiFpZmOX8q3/view",
        pros: ["Sémantique Web moderne", "Accessibilité & SEO", "Certification Cisco"],
        cons: ["Pas de design (CSS)", "Web statique uniquement", "Niveau d'entrée"],
        examples: ["Structure sémantique HTML5", "Formulaires interactifs", "Intégration Vidéo/Audio"]
    },
    {
        title: "Notions de base sur les réseaux",
        duration: "~25 heures",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/ec7b044a-3368-4bc3-8eaf-1872a41780b2.png",
        bg: "https://47fce7eb07.cbaul-cdnwnd.com/97174143cf7b54885f12a9ca01d4b3d1/200000000-975e7975e9/servers-room-fond-d-ecran-16907_L.jpg?ph=47fce7eb07",
        link: "https://drive.google.com/file/d/1Oq8Wf6L81jdFnLRd-Xs6CUdsHc2hS7GY/view",
        pros: ["Fondamentaux architecture réseau", "Modèles OSI et TCP/IP", "Certification Cisco Networking Academy"],
        cons: ["Concepts abstraits", "Introduction uniquement", "Peu de configuration réelle"],
        examples: ["Adressage IP et sous-réseaux", "Protocoles de transport (TCP/UDP)", "Fonctionnement du modèle OSI"]
    }
];
app.get('/api/certifications', (req, res) => {
    res.json(certifications);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
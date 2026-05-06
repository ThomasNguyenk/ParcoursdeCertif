const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const certifications = [
    {
        title: "MOOC ANSSI",
        duration: "~15 heures",
        logo: "https://lesbases.anct.gouv.fr/images/ca180d93-c4dc-47ae-82c1-26936c39b83d.webp?width=864",
        bg: "https://codra.net/wp-content/uploads/2019/11/anssi_960x575-1.png",
        link: "https://drive.google.com/file/d/1EWXzDYll9I6LRG2Iu2EtdAn17pDiGV87/view",
        pros: ["Contenu officiel certifié État", "Couverture cyber complète", "Forte valeur CV"],
        cons: ["Format très théorique", "Modules juridiques denses", "Sensibilisation globale"],
        examples: ["Sécurisation du poste de travail", "Hygiène informatique en entreprise", "Protection des données nomades"]
    },
    {
        title: "Certification Pix - Création Numérique",
        duration: "Évaluation continue - 2 à 3 ans",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pix_logo.svg/3840px-Pix_logo.svg.png",
        bg: "https://lasalle-valenciennes.com/wp-content/uploads/2024/06/95622b616a0f315d192ab0eb7f61e861-l.jpg",
        link: "https://drive.google.com/file/d/1psa9wg_94pEFcyfA7N20F5CwBRNaM3j-/view",
        pros: ["Inclusion numérique", "Esprit de collaboration", "Polyvalence créative"],
        cons: ["Moins spécialisé en design pro", "Dépendance aux plateformes", "Matériel variable"],
        examples: ["Édition de contenus multimédia", "Partage de ressources en ligne", "Droit d'auteur et licences Creative Commons"]
    },
    {
        title: "JavaScript Essentials 1",
        duration: "~40 heures",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwyns96bodKrr8OGzXJ23DtXi3Bl2P7wdrw&s",
        bg: "https://w0.peakpx.com/wallpaper/957/738/HD-wallpaper-javascript-golden-logo-programming-language-brown-metal-background-creative-javascript-logo-programming-language-signs-javascript.jpg",
        link: "https://drive.google.com/file/d/1rfJypqJTsyzP9y7hG-iHmTZ7Pzo8JUtd/view",
        pros: ["Logique algorithmique rigoureuse", "Base Web indispensable", "Certification Cisco reconnue"],
        cons: ["Technique exigeante", "Pas de frameworks modernes", "Focus code pur"],
        examples: ["Manipulation du DOM", "Boucles et conditions", "Programmation orientée objet"]
    },
    {
        title: "Introduction à la Cybersécurité",
        duration: "~6 heures",
        logo: "https://sti.eduscol.education.fr/system/files/images/ressources/pedagogiques/16235/16235-introduction-to-cybersecurity-16.png",
        bg: "https://img.freepik.com/free-photo/cybersecurity-shield-with-padlock_23-2151998478.jpg",
        link: "https://drive.google.com/file/d/15cCNrYsFQhADhy0a6LxHx7r9ZJwQbkbi/view",
        pros: ["Maîtrise triade CIA", "Identification menaces", "Socle débutant solide"],
        cons: ["Pas de labs pratiques", "Insuffisant seul", "Théorique"],
        examples: ["Analyse de malwares", "Ingénierie sociale", "Concepts de VPN et Pare-feu"]
    },
    {
        title: "HTML Essentials",
        duration: "~30 heures",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/22b824de-26d0-4ee1-8c09-3116479fff57.png",
        bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTewIej39o_5wz9AKXLa0yHUpbQdpaE8eas7A&s",
        link: "https://drive.google.com/file/d/1C6_fMaG7IdDdgDYtHSwphRiFpZmOX8q3/view",
        pros: ["Sémantique Web moderne", "Accessibilité & SEO", "Certification Cisco"],
        cons: ["Pas de design (CSS)", "Web statique uniquement", "Niveau d'entrée"],
        examples: ["Structure sémantique HTML5", "Formulaires interactifs", "Intégration Vidéo/Audio"]
    },
    {
        title: "Notions de base sur les réseaux",
        duration: "~25 heures",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/ec7b044a-3368-4bc3-8eaf-1872a41780b2.png",
        bg: "https://thumbs.dreamstime.com/b/r%C3%A9seau-informatique-global-32900669.jpg",
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
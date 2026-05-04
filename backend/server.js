const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const certifications = [
    {
        title: "MOOC ANSSI",
        duration: "~15 heures",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6U2dM1FF9pasgH2RURmCsnV_7JcGPgiktOg&s",
        bg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070",
        link: "https://drive.google.com/file/d/1EWXzDYll9I6LRG2Iu2EtdAn17pDiGV87/view",
        pros: ["Contenu officiel certifié État", "Couverture cyber complète", "Forte valeur CV"],
        cons: ["Format très théorique", "Modules juridiques denses", "Sensibilisation globale"]
    },
    {
        title: "Certification Pix",
        duration: "Évaluation continue - 2 à 3 ans",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pix_logo.svg/3840px-Pix_logo.svg.png",
        bg: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070",
        link: "https://drive.google.com/file/d/1psa9wg_94pEFcyfA7N20F5CwBRNaM3j-/view",
        pros: ["Défis interactifs réels", "Évaluation adaptative", "Standard national"],
        cons: ["Profil généraliste", "Cyber de base uniquement", "Validité temporelle"]
    },
    {
        title: "JavaScript Essentials 1",
        duration: "~40 heures",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvwyns96bodKrr8OGzXJ23DtXi3Bl2P7wdrw&s",
        bg: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070",
        link: "https://drive.google.com/file/d/1rfJypqJTsyzP9y7hG-iHmTZ7Pzo8JUtd/view",
        pros: ["Logique algorithmique rigoureuse", "Base Web indispensable", "Certification Cisco reconnue"],
        cons: ["Technique exigeante", "Pas de frameworks modernes", "Focus code pur"]
    },
    {
        title: "Introduction à la Cybersécurité",
        duration: "~6 heures à notre rythme",
        logo: "https://sti.eduscol.education.fr/system/files/images/ressources/pedagogiques/16235/16235-introduction-to-cybersecurity-16.png",
        // --- LIEN EXACT POUR LE FOND DE L'IMAGE image_aa94bb.png ---
        bg: "https://img.freepik.com/free-vector/cyber-security-concept_23-2148532223.jpg?t=st=1715000000&sep=1&res=high",
        link: "https://drive.google.com/file/d/15cCNrYsFQhADhy0a6LxHx7r9ZJwQbkbi/view",
        pros: ["Maîtrise triade CIA", "Identification menaces", "Socle débutant solide"],
        cons: ["Pas de labs pratiques", "Insuffisant seul", "Théorique"]
    },
    {
        title: "HTML Essentials",
        duration: "~30 heures à notre rythme",
        logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/22b824de-26d0-4ee1-8c09-3116479fff57.png",
        bg: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=2070",
        link: "https://drive.google.com/file/d/1C6_fMaG7IdDdgDYtHSwphRiFpZmOX8q3/view",
        pros: ["Sémantique Web moderne", "Accessibilité & SEO", "Certification Cisco"],
        cons: ["Pas de design (CSS)", "Web statique uniquement", "Niveau d'entrée"]
    }
];

app.get('/api/certifications', (req, res) => {
    res.json(certifications);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
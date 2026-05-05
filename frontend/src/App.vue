<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const current = ref(0)
const certifications = ref([])
const loading = ref(true)

// Navigation
const next = () => { if (current.value < totalSlides.value - 1) current.value++ }
const prev = () => { if (current.value > 0) current.value-- }

// Gestion des flèches du clavier
const handleKeydown = (e) => {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(async () => {
  // Ajout de l'écouteur clavier
  window.addEventListener('keydown', handleKeydown)

  try {
    const response = await fetch('http://localhost:3000/api/certifications')
    const dataBackend = await response.json()

    const certifReseau = {
      title: "Notions de base sur les réseaux",
      duration: "~25 heures",
      logo: "https://www.netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/badges/badge-images/ec7b044a-3368-4bc3-8eaf-1872a41780b2.png",
      bg: "https://47fce7eb07.cbaul-cdnwnd.com/97174143cf7b54885f12a9ca01d4b3d1/200000000-975e7975e9/servers-room-fond-d-ecran-16907_L.jpg?ph=47fce7eb07",
      link: "https://drive.google.com/file/d/1Oq8Wf6L81jdFnLRd-Xs6CUdsHc2hS7GY/view",
      pros: ["Fondamentaux architecture réseau", "Modèles OSI et TCP/IP", "Certification Cisco Networking Academy"],
      cons: ["Concepts abstraits", "Introduction uniquement", "Peu de configuration réelle"],
      examples: ["Adressage IP et sous-réseaux", "Protocoles de transport (TCP/UDP)", "Fonctionnement du modèle OSI"]
    }

    certifications.value = [...dataBackend, certifReseau]
  } catch (error) {
    console.error("Erreur :", error)
  } finally {
    loading.value = false
  }
})

// Très important : retirer l'écouteur quand on quitte la page pour éviter les fuites de mémoire
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const totalSlides = computed(() => certifications.value.length + 3)
const activeCert = computed(() => {
  if (current.value >= 2 && current.value < certifications.value.length + 2) {
    return certifications.value[current.value - 2]
  }
  return null
})

const handleImageError = (e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/52/52349.png" }
</script>

<template>
  <div id="app-container">
    <div v-if="loading" class="loader-overlay">
      <div class="loader"></div>
    </div>

    <template v-else>
      <nav class="nav-ui">
        <button class="nav-btn" @click="prev" :disabled="current === 0" title="Flèche gauche">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div class="nav-dots">
          <div v-for="n in totalSlides" :key="n" class="dot" :class="{ active: current === n-1 }"></div>
        </div>
        <button class="nav-btn" @click="next" :disabled="current === totalSlides - 1" title="Flèche droite">
          <i class="fas fa-chevron-right"></i>
        </button>
      </nav>

      <transition name="page-flip" mode="out-in">
        <!-- 1. ACCUEIL -->
        <div v-if="current === 0" class="slide central" key="home" style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072');">
          <div class="overlay"></div>
          <div class="content hero-content">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:D9GcRXeBFtgSzK7xszW_B57chbeyb2qOId3qNUXA&s" class="hero-logo-img">
            <h1 class="main-title">Certifications</h1>
            <div class="status-line">
              <span class="pulse"></span>
              <p>Expertise Technique & Infrastructure</p>
            </div>
          </div>
        </div>

        <!-- 2. GALERIE -->
        <div v-else-if="current === 1" class="slide central" key="gallery" style="background-image: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070');">
          <div class="overlay"></div>
          <div class="content">
            <h2 class="section-label">PARCOURS D'ACCRÉDITATION</h2>
            <div class="cert-grid">
              <div v-for="c in certifications" class="grid-item" :key="c.title">
                <div class="item-icon-box"><img :src="c.logo" @error="handleImageError"></div>
                <span class="item-name">{{ c.title }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. DÉTAILS -->
        <div v-else-if="activeCert" class="slide split-layout" :key="activeCert.title" :style="{ backgroundImage: `url(${activeCert.bg})` }">
          <div class="overlay"></div>

          <div class="panel panel-left">
            <div class="glass-card">
              <div class="logo-holder"><img :src="activeCert.logo" @error="handleImageError"></div>
              <h2 class="display-title">{{ activeCert.title }}</h2>
              <div class="meta-info">
                <span class="badge"><i class="far fa-clock"></i> {{ activeCert.duration }}</span>
                <span class="badge success">Certifié</span>
              </div>
              <a :href="activeCert.link" target="_blank" class="cta-link">
                Consulter le diplôme <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>

          <div class="panel panel-right">
            <div class="skills-stack">
              <div class="skill-group card-style examples" v-if="activeCert.examples">
                <h3><i class="fas fa-lightbulb"></i> Modules clés & Travaux</h3>
                <ul class="example-list">
                  <li v-for="ex in activeCert.examples" :key="ex">{{ ex }}</li>
                </ul>
              </div>

              <div class="skill-group card-style pros">
                <h3><i class="fas fa-check-double"></i> Points Forts</h3>
                <ul>
                  <li v-for="p in activeCert.pros" :key="p">{{ p }}</li>
                </ul>
              </div>

              <div class="skill-group card-style cons">
                <h3><i class="fas fa-layer-group"></i> Périmètre</h3>
                <ul>
                  <li v-for="n in activeCert.cons" :key="n">{{ n }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. BILAN -->
        <div v-else class="slide central" key="final" style="background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070');">
          <div class="overlay"></div>
          <div class="content bilan-container">
            <div class="bilan-header">
              <div class="bilan-badge">
                <i class="fas fa-award"></i> <span>SYNTHÈSE DU PARCOURS</span>
              </div>
              <p class="bilan-quote">
                "L'ensemble de ces certifications témoigne de ma polyvalence technique et de ma capacité à assimiler les standards professionnels actuels."
              </p>
            </div>

            <div class="roadmap-box">
              <div class="roadmap-title">
                <div class="line"></div>
                <h3>OBJECTIFS 2025 - 2026</h3>
                <div class="line"></div>
              </div>

              <div class="roadmap-grid">
                <div class="roadmap-card">
                  <div class="r-icon r-ia"><i class="fas fa-brain"></i></div>
                  <h4>IA & Innovation</h4>
                  <ul>
                    <li>• IA Générative (IBM)</li>
                    <li>• Analyse de données</li>
                  </ul>
                </div>
                <div class="roadmap-card">
                  <div class="r-icon r-data"><i class="fas fa-database"></i></div>
                  <h4>Data & Dev</h4>
                  <ul>
                    <li>• Python Data Science</li>
                    <li>• Programmation C++</li>
                  </ul>
                </div>
                <div class="roadmap-card">
                  <div class="r-icon r-infra"><i class="fas fa-shield-alt"></i></div>
                  <h4>Cyber & Réseaux</h4>
                  <ul>
                    <li>• Sécurité Cisco</li>
                    <li>• Packet Tracer Pro</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;400;600;800&display=swap');

/* CONFIG GÉNÉRALE */
#app-container {
  background: #020617;
  color: #f8fafc;
  font-family: 'Outfit', sans-serif;
  height: 100vh; width: 100%;
  overflow: hidden;
  position: relative;
}

.slide {
  position: absolute; inset: 0;
  display: flex;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute; inset: 0;
  background: radial-gradient(circle at center, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.98) 100%);
  z-index: 1;
}

.central { align-items: center; justify-content: center; text-align: center; }
.content { position: relative; z-index: 5; width: 90%; max-width: 1200px; }

/* NAVIGATION */
.nav-ui {
  position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);
  z-index: 100; display: flex; align-items: center; gap: 30px;
  background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(10px);
  padding: 12px 25px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1);
}
.nav-btn { background: none; border: none; color: #fff; cursor: pointer; font-size: 1.2rem; transition: 0.3s; }
.nav-btn:hover:not(:disabled) { color: #0ea5e9; transform: scale(1.2); }
.nav-btn:disabled { opacity: 0.2; }
.nav-dots { display: flex; gap: 8px; }
.dot { width: 6px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 50%; transition: 0.4s; }
.dot.active { width: 24px; background: #0ea5e9; border-radius: 10px; }

/* ACCUEIL */
.hero-logo-img { height: 100px; margin-bottom: 20px; }
.main-title { font-size: 5rem; font-weight: 800; letter-spacing: -2px; margin-bottom: 10px; }
.status-line { display: flex; align-items: center; justify-content: center; gap: 15px; opacity: 0.7; }
.pulse { width: 10px; height: 10px; background: #0ea5e9; border-radius: 50%; box-shadow: 0 0 10px #0ea5e9; }

/* SPLIT LAYOUT */
.split-layout { display: flex; align-items: center; padding: 0 8%; }
.panel { position: relative; z-index: 5; flex: 1; }
.glass-card {
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px); padding: 50px; border-radius: 30px; max-width: 450px;
}
.logo-holder { background: white; padding: 15px; border-radius: 15px; display: inline-block; margin-bottom: 25px; height: 60px; }
.logo-holder img { height: 100%; object-fit: contain; }
.display-title { font-size: 2.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; }
.meta-info { display: flex; gap: 15px; margin-bottom: 35px; }
.badge { background: rgba(255,255,255,0.07); padding: 5px 15px; border-radius: 50px; font-size: 0.8rem; }
.badge.success { border: 1px solid #10b981; color: #10b981; }
.cta-link { color: #0ea5e9; text-decoration: none; font-weight: 600; font-size: 1.1rem; border-bottom: 1px solid transparent; transition: 0.3s; }
.cta-link:hover { border-bottom-color: #0ea5e9; padding-bottom: 5px; }

/* CARTES DROITE */
.skills-stack {
  padding-left: 10%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-style {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px 25px;
  border-radius: 15px;
  transition: all 0.3s ease;
}
.card-style:hover {
  transform: translateX(10px);
  border-color: #0ea5e9;
  background: rgba(14, 165, 233, 0.05);
}
.card-style h3 {
  font-size: 0.85rem; color: #0ea5e9; margin-bottom: 15px;
  text-transform: uppercase; letter-spacing: 2px;
  display: flex; align-items: center; gap: 10px;
}
.card-style ul { list-style: none; padding: 0; margin: 0; }
.card-style li { font-size: 0.95rem; margin-bottom: 8px; padding-left: 25px; position: relative; color: #cbd5e1; }
.card-style li::before { position: absolute; left: 0; }
.examples li::before { content: "•"; color: #38bdf8; font-weight: bold; }
.pros li::before { content: "✓"; color: #10b981; }
.cons li::before { content: "→"; color: #94a3b8; opacity: 0.7; }
.examples li { color: #f8fafc; font-weight: 600; }

/* BILAN */
.bilan-container { max-width: 1000px !important; }
.bilan-badge {
  display: inline-flex; align-items: center; gap: 10px; background: rgba(14, 165, 233, 0.1);
  padding: 8px 20px; border-radius: 50px; border: 1px solid rgba(14, 165, 233, 0.3);
  color: #0ea5e9; font-weight: 600; letter-spacing: 2px; font-size: 0.8rem; margin-bottom: 30px;
}
.bilan-quote { font-size: 2rem; font-weight: 200; font-style: italic; line-height: 1.4; margin-bottom: 60px; }
.roadmap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
.roadmap-card {
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
  padding: 30px; border-radius: 20px; text-align: left; transition: 0.3s;
}
.r-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 20px; }
.r-ia { background: rgba(168, 85, 247, 0.1); color: #a855f7; }
.r-data { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; }
.r-infra { background: rgba(16, 185, 129, 0.1); color: #10b981; }

/* TRANSITIONS */
.page-flip-enter-active, .page-flip-leave-active { transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
.page-flip-enter-from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
.page-flip-leave-to { opacity: 0; transform: translateY(-30px); filter: blur(10px); }

/* LOADER */
.loader-overlay { height: 100vh; display: flex; align-items: center; justify-content: center; background: #020617; }
.loader { border: 2px solid rgba(255,255,255,0.1); border-top: 2px solid #0ea5e9; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

/* GALERIE */
.cert-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
.grid-item { background: rgba(255,255,255,0.03); padding: 25px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
.item-icon-box { background: white; padding: 10px; border-radius: 10px; height: 40px; display: inline-block; margin-bottom: 15px; }
.item-icon-box img { height: 100%; object-fit: contain; }
.item-name { display: block; font-size: 0.9rem; font-weight: 600; }
</style>
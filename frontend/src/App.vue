<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const current = ref(0)
const certifications = ref([])
const loading = ref(true)

const next = () => { if (current.value < totalSlides.value - 1) current.value++ }
const prev = () => { if (current.value > 0) current.value-- }

const handleKeydown = (e) => {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  try {
    const response = await fetch('http://localhost:3000/api/certifications')
    const dataBackend = await response.json()
    certifications.value = [...dataBackend]
  } catch (error) {
    console.error("Erreur :", error)
  } finally {
    loading.value = false
  }
})

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
        <div v-if="current === 0" class="slide central" key="home"
             style="background-image: url('https://i.pinimg.com/736x/39/e4/83/39e483bfb3807afe00823e63a4519e28.jpg');">
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
        <div v-else-if="current === 1" class="slide central" key="gallery"
             style="background-image: url('https://img.freepik.com/photos-gratuite/arriere-plan-du-pirate-matrice_23-2150082005.jpg?semt=ais_hybrid&w=740&q=80'); background-size: cover; background-position: center;">
          <div class="overlay"></div>
          <div class="content gallery-content">
            <h2 class="gallery-title">CERTIFICATIONS</h2>
            <div class="cert-futur-grid">
              <div v-for="(c, index) in certifications" :key="c.title"
                   class="cert-futur-card"
                   :style="{ animationDelay: `${index * 0.08}s` }">
                <div class="card-scan-line"></div>
                <div class="card-corner-tl"></div>
                <div class="card-corner-br"></div>
                <div class="card-logo-box">
                  <img :src="c.logo" @error="handleImageError" alt="">
                </div>
                <p class="card-name">{{ c.title }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. DÉTAILS -->
        <div v-else-if="activeCert" class="slide split-layout"
             :key="activeCert.title"
             :style="{ backgroundImage: `url(${activeCert.bg})` }">
          <div class="overlay"></div>

          <div class="panel panel-left">
            <div class="glass-card">
              <div class="logo-holder">
                <img :src="activeCert.logo" @error="handleImageError">
              </div>
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
                <ul>
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
        <div v-else class="slide central" key="final"
             style="background-image: url('https://www.itpedia.nl/wp-content/uploads/2024/05/Large-language-model-in-SC.jpg');">
          <div class="overlay"></div>
          <div class="content bilan-container">
            <div class="bilan-header">
              <div class="bilan-badge">
                <i class="fas fa-award"></i> <span>SYNTHÈSE DU PARCOURS</span>
              </div>
              <p class="bilan-quote">
                "Ces certifications traduisent une démarche volontaire : celle d'un développeur qui structure ses apprentissages, les ancre dans les standards reconnus du secteur et s'inscrit dans une progression continue face aux évolutions rapides de l'informatique."
              </p>
            </div>

            <div class="roadmap-box">
              <div class="roadmap-title">
                <div class="line"></div>
                <h3>OBJECTIFS 2025 - 2026</h3>
                <div class="line"></div>
              </div>

              <div class="roadmap-grid">
                <div class="roadmap-card roadmap-ia">
                  <div class="card-scan-line"></div>
                  <div class="card-corner-tl"></div>
                  <div class="card-corner-br"></div>
                  <div class="r-icon r-ia"><i class="fas fa-brain"></i></div>
                  <h4>IA & Innovation</h4>
                  <ul>
                    <li>IA Générative (IBM)</li>
                    <li>Analyse de données</li>
                  </ul>
                </div>
                <div class="roadmap-card roadmap-data">
                  <div class="card-scan-line"></div>
                  <div class="card-corner-tl"></div>
                  <div class="card-corner-br"></div>
                  <div class="r-icon r-data"><i class="fas fa-database"></i></div>
                  <h4>Data & Dev</h4>
                  <ul>
                    <li>Python Data Science</li>
                    <li>Programmation C++</li>
                  </ul>
                </div>
                <div class="roadmap-card roadmap-infra">
                  <div class="card-scan-line"></div>
                  <div class="card-corner-tl"></div>
                  <div class="card-corner-br"></div>
                  <div class="r-icon r-infra"><i class="fas fa-shield-alt"></i></div>
                  <h4>Cyber & Réseaux</h4>
                  <ul>
                    <li>Sécurité Cisco</li>
                    <li>Packet Tracer Pro</li>
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

/* ===== CONFIG GÉNÉRALE ===== */
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

/* ===== NAVIGATION ===== */
.nav-ui {
  position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%);
  z-index: 100; display: flex; align-items: center; gap: 30px;
  background: rgba(15,23,42,0.7); backdrop-filter: blur(10px);
  padding: 12px 25px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1);
}
.nav-btn { background: none; border: none; color: #fff; cursor: pointer; font-size: 1.2rem; transition: 0.3s; }
.nav-btn:hover:not(:disabled) { color: #0ea5e9; transform: scale(1.2); }
.nav-btn:disabled { opacity: 0.2; }
.nav-dots { display: flex; gap: 8px; }
.dot { width: 6px; height: 6px; background: rgba(255,255,255,0.2); border-radius: 50%; transition: 0.4s; }
.dot.active { width: 24px; background: #0ea5e9; border-radius: 10px; }

/* ===== ACCUEIL ===== */
.hero-logo-img { height: 100px; margin-bottom: 20px; }
.main-title { font-size: 5rem; font-weight: 800; letter-spacing: -2px; margin-bottom: 10px; }
.status-line { display: flex; align-items: center; justify-content: center; gap: 15px; opacity: 0.7; }
.pulse { width: 10px; height: 10px; background: #0ea5e9; border-radius: 50%; box-shadow: 0 0 10px #0ea5e9; }

/* ===== COMPOSANTS FUTURISTES PARTAGÉS ===== */
.card-scan-line {
  position: absolute;
  top: -5%; left: 0;
  width: 100%; height: 1px;
  background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
  opacity: 0.3;
  animation: card-scan 3s linear infinite;
}

@keyframes card-scan {
  from { top: -5%; }
  to   { top: 105%; }
}

.card-corner-tl, .card-corner-br {
  position: absolute;
  width: 10px; height: 10px;
  opacity: 0.5;
}
.card-corner-tl { top: 8px; left: 8px; border-top: 2px solid #0ea5e9; border-left: 2px solid #0ea5e9; }
.card-corner-br { bottom: 16px; right: 8px; border-bottom: 2px solid #0ea5e9; border-right: 2px solid #0ea5e9; }

/* ===== GALERIE ===== */
.gallery-content { max-width: 1200px !important; }

.gallery-title {
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 40px;
}

.cert-futur-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.cert-futur-card {
  position: relative;
  background: linear-gradient(135deg, rgba(15,23,42,0.92), rgba(2,6,23,0.97));
  border: 1px solid rgba(14,165,233,0.25);
  backdrop-filter: blur(20px);
  padding: 30px 25px;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0%, 100% 88%, 93% 100%, 0% 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  animation: card-appear 0.5s ease both;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.cert-futur-card:hover {
  border-color: rgba(14,165,233,0.7);
  transform: translateY(-5px);
  box-shadow: 0 0 25px rgba(14,165,233,0.1), 0 20px 40px rgba(0,0,0,0.5);
}

@keyframes card-appear {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card-logo-box {
  background: white;
  border: 1.5px solid #0ea5e9;
  border-radius: 8px;
  width: 54px; height: 54px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 12px rgba(14,165,233,0.2);
  overflow: hidden;
}
.card-logo-box img { width: 80%; height: 80%; object-fit: contain; }

.card-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
  line-height: 1.4;
}

/* ===== DÉTAILS ===== */
.split-layout { display: flex; align-items: center; padding: 0 8%; }
.panel { position: relative; z-index: 5; flex: 1; }

.glass-card {
  background: linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(2,6,23,0.95) 100%);
  border: 1px solid rgba(14,165,233,0.3);
  backdrop-filter: blur(25px);
  padding: 50px;
  max-width: 450px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.8);
}

.glass-card::after {
  content: "";
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 2px;
  background: linear-gradient(90deg, transparent, #0ea5e9, transparent);
  animation: scan-line 4s linear infinite;
  opacity: 0.2;
}

@keyframes scan-line {
  0%  { top: 0; }
  100%{ top: 100%; }
}

.logo-holder {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid #0ea5e9;
  display: inline-block;
  margin-bottom: 25px;
  height: 60px;
  box-shadow: 0 0 15px rgba(14,165,233,0.3);
}
.logo-holder img { height: 100%; object-fit: contain; }

.display-title { font-size: 2.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; text-transform: uppercase; }

.meta-info { display: flex; gap: 15px; margin-bottom: 35px; }
.badge {
  background: rgba(14,165,233,0.1);
  padding: 6px 15px;
  border-left: 3px solid #0ea5e9;
  font-family: monospace;
  font-size: 0.8rem;
}
.badge.success { border-left-color: #10b981; color: #10b981; background: rgba(16,185,129,0.1); }

.cta-link {
  color: #0ea5e9;
  text-decoration: none;
  font-weight: 600;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 0.3s;
}
.cta-link:hover { text-shadow: 0 0 8px #0ea5e9; }

.skills-stack { padding-left: 10%; display: flex; flex-direction: column; gap: 20px; }

.card-style {
  background: linear-gradient(135deg, rgba(30,41,59,0.4) 0%, rgba(15,23,42,0.8) 100%);
  border: 1px solid rgba(14,165,233,0.2);
  backdrop-filter: blur(15px);
  padding: 20px 25px;
  border-radius: 10px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.card-style:hover {
  transform: translateX(15px);
  border-color: #0ea5e9;
  box-shadow: 0 0 20px rgba(14,165,233,0.15);
}

.card-style h3 {
  font-size: 0.75rem; color: #0ea5e9; margin-bottom: 15px;
  text-transform: uppercase; letter-spacing: 3px;
  display: flex; align-items: center; gap: 10px; font-weight: 800;
}

.card-style h3::after {
  content: ""; flex: 1; height: 1px;
  background: linear-gradient(90deg, rgba(14,165,233,0.4), transparent);
}

.card-style ul { list-style: none; padding: 0; margin: 0; }
.card-style li {
  font-size: 0.9rem;
  margin-bottom: 8px;
  padding: 6px 12px 6px 35px;
  position: relative;
  color: #cbd5e1;
  background: rgba(255,255,255,0.02);
  border-radius: 4px;
}

.card-style li::before { position: absolute; left: 12px; font-family: monospace; font-weight: bold; }
.examples li::before { content: "01"; color: #38bdf8; font-size: 0.7rem; top: 8px; }
.pros li::before     { content: ">>"; color: #10b981; }
.cons li::before     { content: "!!"; color: #f43f5e; }

.examples li { color: #f8fafc; border-left: 2px solid #0ea5e9; }
.pros li     { border-left: 2px solid #10b981; }
.cons li     { border-left: 2px solid #f43f5e; }

/* ===== BILAN ===== */
.bilan-container { max-width: 1000px !important; }
.bilan-badge {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(14,165,233,0.1);
  padding: 8px 20px; border-radius: 50px; border: 1px solid rgba(14,165,233,0.3);
  color: #0ea5e9; font-weight: 600; letter-spacing: 2px; font-size: 0.8rem; margin-bottom: 30px;
}
.bilan-quote { font-size: 2rem; font-weight: 200; font-style: italic; line-height: 1.4; margin-bottom: 60px; }

.roadmap-title {
  display: flex; align-items: center; gap: 20px; margin-bottom: 30px;
}
.roadmap-title h3 {
  font-size: 0.8rem; letter-spacing: 4px; color: rgba(255,255,255,0.5);
  white-space: nowrap; font-weight: 600;
}
.roadmap-title .line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }

.roadmap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }

/* Carte roadmap futuriste */
.roadmap-card {
  position: relative;
  background: linear-gradient(135deg, rgba(15,23,42,0.92), rgba(2,6,23,0.97));
  border: 1px solid rgba(14,165,233,0.25);
  backdrop-filter: blur(20px);
  padding: 30px 25px;
  overflow: hidden;
  clip-path: polygon(0% 0%, 100% 0%, 100% 88%, 93% 100%, 0% 100%);
  text-align: left;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.roadmap-ia:hover   { border-color: rgba(168,85,247,0.7); box-shadow: 0 0 25px rgba(168,85,247,0.1), 0 20px 40px rgba(0,0,0,0.5); transform: translateY(-5px); }
.roadmap-data:hover { border-color: rgba(14,165,233,0.7);  box-shadow: 0 0 25px rgba(14,165,233,0.1),  0 20px 40px rgba(0,0,0,0.5); transform: translateY(-5px); }
.roadmap-infra:hover{ border-color: rgba(16,185,129,0.7);  box-shadow: 0 0 25px rgba(16,185,129,0.1),  0 20px 40px rgba(0,0,0,0.5); transform: translateY(-5px); }

.roadmap-card h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.roadmap-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }

.roadmap-card li {
  font-size: 0.88rem;
  color: #94a3b8;
  padding: 6px 12px;
  background: rgba(255,255,255,0.02);
  border-radius: 4px;
}

.roadmap-ia   li { border-left: 2px solid #a855f7; }
.roadmap-data li { border-left: 2px solid #0ea5e9; }
.roadmap-infra li { border-left: 2px solid #10b981; }

.r-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 20px; }
.r-ia   { background: rgba(168,85,247,0.1); color: #a855f7; }
.r-data { background: rgba(14,165,233,0.1);  color: #0ea5e9; }
.r-infra{ background: rgba(16,185,129,0.1);  color: #10b981; }

/* ===== TRANSITIONS ===== */
.page-flip-enter-active, .page-flip-leave-active { transition: all 0.6s cubic-bezier(0.4,0,0.2,1); }
.page-flip-enter-from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
.page-flip-leave-to  { opacity: 0; transform: translateY(-30px); filter: blur(10px); }
</style>
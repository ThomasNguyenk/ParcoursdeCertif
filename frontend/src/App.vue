<script setup>
import { ref, onMounted, computed } from 'vue'

// --- ÉTAT ---
const current = ref(0)
const certifications = ref([])
const loading = ref(true)

// --- RÉCUPÉRATION DES DONNÉES (BACKEND) ---
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/certifications')
    certifications.value = await response.json()
  } catch (error) {
    console.error("Erreur de connexion au backend :", error)
  } finally {
    loading.value = false
  }
})

// --- LOGIQUE DE NAVIGATION ---
const totalSlides = computed(() => certifications.value.length + 3)

const activeCert = computed(() => {
  // Les certifs commencent à l'index 2 (après Accueil et Galerie)
  if (current.value >= 2 && current.value < certifications.value.length + 2) {
    return certifications.value[current.value - 2]
  }
  return null
})

const next = () => {
  if (current.value < totalSlides.value - 1) current.value++
}
const prev = () => {
  if (current.value > 0) current.value--
}
</script>

<template>
  <div id="app-container">
    <!-- Écran de chargement -->
    <div v-if="loading" class="loader-overlay">
      <div class="loader"></div>
      <p>Initialisation du Portfolio...</p>
    </div>

    <template v-else>
      <!-- NAVIGATION UI -->
      <nav class="nav-ui">
        <button class="nav-btn" @click="prev" :disabled="current === 0">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="nav-counter">{{ current + 1 }} / {{ totalSlides }}</span>
        <button class="nav-btn" @click="next" :disabled="current === totalSlides - 1">
          <i class="fas fa-chevron-right"></i>
        </button>
      </nav>

      <transition mode="out-in">
        <!-- 0. ACCUEIL -->
        <div v-if="current === 0" class="slide" key="home"
             style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072');">
          <div class="overlay"></div>
          <div class="content">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXeBFtgSzK7xszW_B57chbeyb2qOId3qNUXA&s"
                 alt="Logo SIO" class="main-hero-logo">
            <h1 class="hero-title">Certifications</h1>
            <p class="hero-subtitle">> Accréditations Techniques & Développement d'Applications Métier</p>
          </div>
        </div>

        <!-- 1. GALERIE -->
        <div v-else-if="current === 1" class="slide" key="gallery"
             style="background-image: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070');">
          <div class="overlay"></div>
          <div class="content">
            <h2 class="section-title">Expertise Logicielle</h2>
            <div class="cert-grid">
              <div v-for="c in certifications" class="cert-item" :key="c.title">
                <img :src="c.logo" :alt="c.title">
                <div class="cert-label">{{ c.title }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2 à N. FICHES DE CERTIFICATIONS -->
        <div v-else-if="activeCert" class="slide" :key="current" :style="{ backgroundImage: `url(${activeCert.bg})` }">
          <div class="overlay"></div>
          <div class="content">
            <!-- Wrapper blanc pour le logo (comme sur image_b4fb5a.jpg) -->
            <div class="logo-white-card">
              <img :src="activeCert.logo" class="cert-logo-detail">
            </div>

            <h2 class="cert-main-title">{{ activeCert.title }}</h2>
            <div class="duration-badge"><i class="far fa-clock"></i> {{ activeCert.duration }}</div>

            <div class="info-grid">
              <!-- Points Forts (Vert) -->
              <div class="card pros">
                <h4><i class="fas fa-check-circle"></i> Points Forts</h4>
                <ul>
                  <li v-for="p in activeCert.pros" :key="p">
                    <i class="fas fa-plus icon-small"></i> {{ p }}
                  </li>
                </ul>
              </div>
              <!-- Enjeux (Rouge) -->
              <div class="card cons">
                <h4><i class="fas fa-exclamation-circle"></i> Enjeux</h4>
                <ul>
                  <li v-for="n in activeCert.cons" :key="n">
                    <i class="fas fa-minus icon-small"></i> {{ n }}
                  </li>
                </ul>
              </div>
            </div>

            <a :href="activeCert.link" target="_blank" class="btn-view">
              <i class="fas fa-file-pdf"></i> Consulter le certificat
            </a>
          </div>
        </div>

        <!-- FINAL. BILAN -->
        <div v-else class="slide" key="final"
             style="background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070');">
          <div class="overlay"></div>
          <div class="content">
            <i class="fas fa-rocket rocket-icon"></i>
            <h2 class="final-title">Bilan & Perspectives Techniques</h2>

            <div class="card final-card">
              <p class="final-text">
                L'acquisition de ces certifications entre 2023 et 2026 consolide une expertise polyvalente en <strong>Solutions
                Logicielles (SLAM)</strong>.
              </p>

              <div class="perspective-grid">
                <div class="next-step">
                  <h4 class="blue-text"><i class="fas fa-laptop-code"></i> Programmation</h4>
                  <ul>
                    <li><i class="fas fa-chevron-right blue-text"></i> C Essentiels & C++</li>
                    <li><i class="fas fa-chevron-right blue-text"></i> Python Essentials</li>
                  </ul>
                </div>
                <div class="next-step">
                  <h4 class="green-text"><i class="fas fa-network-wired"></i> Infra & Cyber</h4>
                  <ul>
                    <li><i class="fas fa-chevron-right green-text"></i> Cisco Packet Tracer</li>
                    <li><i class="fas fa-chevron-right green-text"></i> Cybersécurité Avancée</li>
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
/* --- CONFIGURATION GÉNÉRALE --- */
#app-container {
  background: #020617;
  color: #f8fafc;
  font-family: 'Outfit', sans-serif;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(15, 23, 42, 0.85) 0%, #020617 100%);
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

/* --- ACCUEIL --- */
.main-hero-logo {
  height: 100px;
  margin-bottom: 25px;
  filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.3));
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -2px;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-family: 'DM Mono', monospace;
  color: #38bdf8;
  font-size: 1.2rem;
}

/* --- GALERIE --- */
.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 40px;
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.cert-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 20px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.cert-item img {
  max-height: 60px;
  margin-bottom: 20px;
}

.cert-label {
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
}

/* --- FICHES DÉTAILS --- */
.logo-white-card {
  background: white;
  padding: 15px;
  border-radius: 15px;
  display: inline-block;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.cert-logo-detail {
  height: 70px;
  width: auto;
  object-fit: contain;
  display: block;
}

.cert-main-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.duration-badge {
  display: inline-block;
  padding: 8px 20px;
  border: 1px solid #38bdf8;
  border-radius: 30px;
  color: #38bdf8;
  font-family: 'DM Mono', monospace;
  margin-bottom: 25px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 30px;
}

.card {
  background: rgba(255, 255, 255, 0.03);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
}

/* Couleurs Points Forts / Enjeux (image_b4fb5a.jpg) */
.pros h4 {
  color: #10b981 !important;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cons h4 {
  color: #f43f5e !important;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  color: #94a3b8;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.95rem;
  text-align: left;
}

.icon-small {
  font-size: 0.7rem;
  margin-top: 5px;
}

.pros .icon-small {
  color: #10b981;
}

.cons .icon-small {
  color: #f43f5e;
}

.btn-view {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 14px 35px;
  background: #38bdf8;
  color: #020617;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 800;
  transition: 0.3s;
}

.btn-view:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(56, 189, 248, 0.4);
}

/* --- NAVIGATION UI --- */
.nav-ui {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 25px;
  background: rgba(15, 23, 42, 0.95);
  padding: 12px 30px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.nav-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.3s;
}

.nav-btn:hover:not(:disabled) {
  color: #38bdf8;
  transform: scale(1.2);
}

.nav-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.nav-counter {
  font-family: 'DM Mono', monospace;
  font-weight: 700;
  min-width: 60px;
  text-align: center;
}

/* --- BILAN --- */
.rocket-icon {
  font-size: 3.5rem;
  color: #38bdf8;
  margin-bottom: 20px;
}

.final-card {
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
}

.perspective-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
  margin-top: 20px;
}

.blue-text {
  color: #38bdf8;
}

.green-text {
  color: #10b981;
}

/* --- TRANSITIONS --- */
.v-enter-active, .v-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.v-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(-20px);
}

/* --- LOADER --- */
.loader-overlay {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #020617;
}

.loader {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #38bdf8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
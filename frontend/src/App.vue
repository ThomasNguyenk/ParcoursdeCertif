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
    certifications.value = await response.json()
  } catch (error) {
    console.error("Erreur Backend :", error)
  } finally {
    // Petit délai pour l'effet "BIOS"
    setTimeout(() => { loading.value = false }, 1200)
  }
})

onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })

// Calcul dynamique du nombre de slides : Accueil (1) + Galerie (1) + Certifs (N) + Bilan (1)
const totalSlides = computed(() => certifications.value.length + 3)

// Détermine quelle certification afficher selon l'index actuel
const activeCert = computed(() => {
  const index = current.value - 2 // On retire l'accueil et la galerie
  if (index >= 0 && index < certifications.value.length) {
    return certifications.value[index]
  }
  return null
})

const handleImageError = (e) => {
  e.target.src = "https://cdn-icons-png.flaticon.com/512/52/52349.png"
}
</script>

<template>
  <div id="cyber-app">
    <!-- CHARGEMENT SYSTÈME -->
    <div v-if="loading" class="bios-loader">
      <div class="terminal-text">
        <p>> INITIALIZING_INTERFACE...</p>
        <p>> LOADING_DATA_STREAM [OK]</p>
        <div class="progress-bar"><div class="fill"></div></div>
      </div>
    </div>

    <template v-else>
      <!-- INTERFACE HUD -->
      <div class="hud-frame">
        <div class="corner top-left"></div><div class="corner top-right"></div>
        <div class="corner bottom-left"></div><div class="corner bottom-right"></div>
        <div class="hud-header">OPERATOR: SIO_STUDENT // STATUS: ONLINE</div>

        <nav class="hud-controls">
          <button @click="prev" :disabled="current === 0">PREV_</button>
          <div class="slide-counter">{{ current + 1 }} / {{ totalSlides }}</div>
          <button @click="next" :disabled="current === totalSlides - 1">NEXT_</button>
        </nav>
      </div>

      <transition name="cyber-fade" mode="out-in">

        <!-- SLIDE 0 : ACCUEIL -->
        <div v-if="current === 0" class="slide center" key="home" style="display: flex !important; opacity: 1 !important;">
          <!-- Fond avec z-index bas -->
          <div class="bg-blur home-bg" style="z-index: 1;"></div>

          <!-- Contenu avec z-index haut et couleur forcée -->
          <div class="hero-content" style="z-index: 10; position: relative;">
            <h1 class="mega-title"
                data-text="CERTIFICATIONS"
                style="color: #00f2ff !important; -webkit-text-stroke: 1px #00f2ff !important;">
              CERTIFICATIONS
            </h1>
            <div class="hero-details">
              <p class="subtitle" style="color: #00f2ff !important; opacity: 1 !important;">
                BTS SERVICES INFORMATIQUES AUX ORGANISATIONS
              </p>
              <div class="id-badge" style="border: 1px solid #00f2ff !important; color: #00f2ff !important;">
                PARCOURS SLAM // 2024 - 2026
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE 1 : INDEX / BENTO -->
        <div v-else-if="current === 1" class="slide" key="gallery">
          <div class="bg-blur gallery-bg"></div>
          <div class="container-inner">
            <h2 class="section-label">// DATABASE_INDEX</h2>
            <div class="bento-grid">
              <div v-for="(c, i) in certifications" :key="i" class="bento-item" @click="current = i + 2">
                <div class="bento-logo-box"><img :src="c.logo" @error="handleImageError"></div>
                <div class="item-info">
                  <h3>{{ c.title }}</h3>
                  <span class="access-btn">ACCESS_DATA_</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SLIDE DERNIÈRE : BILAN (Fixée sur totalSlides - 1) -->
        <div v-else-if="current === totalSlides - 1" class="slide center" key="final">
          <div class="bg-blur final-bg"></div>
          <div class="final-box content-up">
            <div class="hex-badge">SIO</div>
            <h2 class="mega-title-small">MISSION_COMPLETE</h2>
            <!-- ICI LA NOUVELLE PHRASE -->
            <p class="final-text">
              Ce parcours de certification valide une expertise technique centrée sur le développement
              d'applications sécurisées et la maîtrise des infrastructures, piliers fondamentaux
              de ma spécialisation SLAM.
            </p>
            <button class="reboot-btn" @click="current = 0">_REBOOT_SYSTEM</button>
          </div>
        </div>

        <!-- SLIDES INTERMÉDIAIRES : DÉTAILS CERTIFS -->
        <div v-else-if="activeCert" class="slide split-view" :key="activeCert.title">
          <div class="bg-blur dynamic-bg" :style="{ backgroundImage: `url(${activeCert.bg})` }"></div>

          <div class="detail-container">
            <div class="glass-module cert-main">
              <div class="scan-line"></div>
              <div class="white-logo-card">
                <img :src="activeCert.logo" class="logo-large" @error="handleImageError">
              </div>
              <div class="cert-text">
                <h2 class="cert-title">{{ activeCert.title }}</h2>
                <div class="cert-meta">DURATION: {{ activeCert.duration }} // STATUS: VALIDATED</div>
                <p class="cert-desc">{{ activeCert.description }}</p>
              </div>
            </div>

            <div class="cert-stats">
              <div class="glass-module stat-block">
                <h3 class="block-label">SKILLS_GAINED</h3>
                <ul class="skill-list">
                  <li v-for="s in activeCert.pros" :key="s">{{ s }}</li>
                </ul>
              </div>
              <div class="glass-module stat-block">
                <h3 class="block-label">TECH_STACK</h3>
                <div class="tag-wrap">
                  <span v-for="ex in activeCert.examples" :key="ex" class="badge-tech">{{ ex }}</span>
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
@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=JetBrains+Mono:wght@400;700&display=swap');

#cyber-app {
  background: #000; color: #00f2ff;
  font-family: 'JetBrains Mono', monospace;
  height: 100vh; width: 100vw; overflow: hidden;
  --neon: #00f2ff;
}

/* BACKGROUNDS */
.bg-blur {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.2) blur(40px); /* <--- C'EST ICI */
  z-index: 1;
  transform: scale(1.1);
  transition: 0.8s ease;
}
.home-bg { background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa'); }
.gallery-bg { background-image: url('https://images.unsplash.com/photo-1510511459019-5dee99c43dbf'); }
.final-bg { background-image: url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6'); }

/* HUD SYSTEM */
.hud-frame { position: fixed; inset: 20px; border: 1px solid rgba(0, 242, 255, 0.1); pointer-events: none; z-index: 100; }
.corner { position: absolute; width: 15px; height: 15px; border: 2px solid var(--neon); }
.top-left { top: -2px; left: -2px; border-right: 0; border-bottom: 0; }
.top-right { top: -2px; right: -2px; border-left: 0; border-bottom: 0; }
.bottom-left { bottom: -2px; left: -2px; border-right: 0; border-top: 0; }
.bottom-right { bottom: -2px; right: -2px; border-left: 0; border-top: 0; }

.hud-header { position: absolute; top: 12px; left: 20px; font-size: 0.65rem; letter-spacing: 2px; opacity: 0.8; }
.hud-controls {
  position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
  display: flex; align-items: center; gap: 20px; pointer-events: auto;
}
.hud-controls button {
  background: rgba(0,0,0,0.8); border: 1px solid var(--neon); color: var(--neon);
  padding: 8px 20px; cursor: pointer; font-family: inherit; font-size: 0.7rem; transition: 0.3s;
}
.hud-controls button:hover:not(:disabled) { background: var(--neon); color: #000; box-shadow: 0 0 15px var(--neon); }
.hud-controls button:disabled { opacity: 0.3; cursor: not-allowed; }

/* SLIDE CORE */
.slide { height: 100vh; width: 100vw; padding: 40px; box-sizing: border-box; position: relative; z-index: 5; }
.center { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }

/* HOME TITLES */
.hero-content { margin-top: -50px; }
.mega-title {
  z-index: 10;
  text-shadow: 0 0 20px rgba(0, 242, 255, 0.5); /* Effet néon pour percer le noir */
}
.mega-title::after {
  content: attr(data-text); position: absolute; left: 0; top: 0;
  color: var(--neon); animation: glitch 4s infinite;
}
.subtitle { font-size: 0.9rem; letter-spacing: 5px; margin-top: 20px; opacity: 0.7; }
.id-badge { display: inline-block; margin-top: 20px; padding: 6px 20px; border: 1px solid var(--neon); font-size: 0.8rem; }

/* BENTO INDEX */
.container-inner { max-width: 1200px; margin: 40px auto; position: relative; z-index: 10; }
.section-label { font-size: 0.8rem; margin-bottom: 30px; letter-spacing: 3px; color: var(--neon); }
.bento-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
.bento-item {
  background: rgba(0, 242, 255, 0.03); border: 1px solid rgba(0, 242, 255, 0.1);
  padding: 30px; cursor: pointer; transition: 0.4s ease;
}
.bento-item:hover { border-color: var(--neon); transform: translateY(-5px); background: rgba(0, 242, 255, 0.08); }
.bento-logo-box { background: #fff; height: 70px; padding: 12px; display: flex; justify-content: center; margin-bottom: 20px; border-radius: 2px; }
.bento-logo-box img { max-height: 100%; object-fit: contain; }

/* DETAIL VIEW */
.split-view { display: flex; align-items: center; justify-content: center; }
.detail-container { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; width: 100%; max-width: 1100px; z-index: 10; }
.glass-module { background: rgba(0, 10, 15, 0.9); backdrop-filter: blur(10px); border: 1px solid rgba(0, 242, 255, 0.2); padding: 35px; }
.white-logo-card { background: #fff; padding: 25px; border-radius: 4px; height: 160px; display: flex; justify-content: center; margin-bottom: 30px; }
.logo-large { max-height: 100%; object-fit: contain; }
.cert-title { font-family: 'Syncopate', sans-serif; font-size: 1.6rem; color: var(--neon); margin: 0; }
.cert-meta { font-size: 0.7rem; margin: 15px 0; opacity: 0.6; letter-spacing: 1px; }
.cert-desc { font-size: 0.9rem; line-height: 1.7; color: #ccc; }

/* STATS */
.cert-stats { display: flex; flex-direction: column; gap: 20px; }
.block-label { font-size: 0.65rem; color: var(--neon); border-bottom: 1px solid rgba(0, 242, 255, 0.2); padding-bottom: 10px; margin-bottom: 20px; letter-spacing: 2px; }
.skill-list { list-style: none; padding: 0; font-size: 0.8rem; }
.skill-list li { margin-bottom: 12px; padding-left: 20px; position: relative; }
.skill-list li::before { content: ">"; position: absolute; left: 0; color: var(--neon); font-weight: bold; }
.tag-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
.badge-tech { border: 1px solid rgba(0, 242, 255, 0.4); padding: 5px 12px; font-size: 0.7rem; color: #fff; background: rgba(0, 242, 255, 0.05); }

/* FINAL SLIDE */
.final-box { z-index: 10; max-width: 600px; }
.hex-badge {
  font-size: 1.8rem; font-weight: bold; border: 2px solid var(--neon);
  width: 90px; height: 90px; display: flex; align-items: center; justify-content: center;
  margin: 0 auto 30px; clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
.mega-title-small { font-family: 'Syncopate', sans-serif; font-size: 2.5rem; color: var(--neon); margin-bottom: 20px; }
.reboot-btn {
  margin-top: 40px; background: transparent; border: 1px solid var(--neon);
  color: var(--neon); padding: 12px 30px; cursor: pointer; font-family: inherit;
  letter-spacing: 2px; transition: 0.3s;
}
.reboot-btn:hover { background: var(--neon); color: #000; box-shadow: 0 0 20px var(--neon); }

/* ANIMATIONS */
.scan-line {
  position: absolute; top: 0; left: 0; width: 100%; height: 2px;
  background: var(--neon); box-shadow: 0 0 15px var(--neon); animation: scan 4s linear infinite; opacity: 0.5;
}
@keyframes scan { 0% { top: 0% } 100% { top: 100% } }
@keyframes glitch {
  0%, 100% { transform: translate(0) }
  2% { transform: translate(-2px, 1px) }
  4% { transform: translate(2px, -1px) }
}

.cyber-fade-enter-active, .cyber-fade-leave-active { transition: 0.5s ease; }
.cyber-fade-enter-from, .cyber-fade-leave-to { opacity: 0; filter: blur(15px); transform: translateY(10px); }

/* LOADER */
.bios-loader { height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; z-index: 1000; }
.terminal-text p { margin: 5px 0; font-size: 0.8rem; }
.progress-bar { height: 2px; background: rgba(0, 242, 255, 0.1); width: 250px; margin-top: 15px; }
.fill { height: 100%; background: var(--neon); width: 0; animation: fill 1.2s forwards ease-in-out; }
@keyframes fill { to { width: 100%; } }
</style>
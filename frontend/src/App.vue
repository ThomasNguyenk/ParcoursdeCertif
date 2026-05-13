<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const current = ref(0)
const certifications = ref([])
const loading = ref(true)

const next = () => {
  if (current.value < totalSlides.value - 1) current.value++
}

const prev = () => {
  if (current.value > 0) current.value--
}

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
    console.error('Erreur Backend :', error)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 1200)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const totalSlides = computed(() => certifications.value.length + 3)

const activeCert = computed(() => {
  const index = current.value - 2

  if (index >= 0 && index < certifications.value.length) {
    return certifications.value[index]
  }

  return null
})

const handleImageError = (e) => {
  e.target.src =
      'https://cdn-icons-png.flaticon.com/512/52/52349.png'
}
</script>

<template>
  <div id="cyber-app">

    <!-- LOADER -->
    <div v-if="loading" class="bios-loader">
      <div class="loader-box">
        <div class="loader-circle"></div>
        <h2>Chargement de l’interface...</h2>
        <p>Initialisation des données de certification</p>
      </div>
    </div>

    <template v-else>

      <!-- NAVIGATION -->
      <div class="floating-nav">
        <button @click="prev" :disabled="current === 0">
          ←
        </button>

        <button
            @click="next"
            :disabled="current === totalSlides - 1"
        >
          →
        </button>
      </div>

      <transition name="cyber-fade" mode="out-in">

        <!-- HOME -->
        <section
            v-if="current === 0"
            class="slide center"
            key="home"
        >
          <div class="bg-blur home-bg"></div>

          <div class="hero-content">

            <div class="hero-topline">
              BTS SERVICES INFORMATIQUES AUX ORGANISATIONS
            </div>

            <h1
                class="mega-title"
                data-text="CERTIFICATIONS"
            >
              CERTIFICATIONS
            </h1>

            <p class="hero-description">
              Parcours de montée en compétences autour du
              développement, de la cybersécurité, des systèmes
              et des technologies professionnelles modernes.
            </p>

            <div class="id-badge">
              <span class="pulse"></span>
              PARCOURS SLAM • 2024 — 2026
            </div>

          </div>
        </section>

        <!-- GALLERY -->
        <section
            v-else-if="current === 1"
            class="slide"
            key="gallery"
        >
          <div class="bg-blur gallery-bg"></div>

          <div class="container-inner">

            <div class="section-header">
              <span class="section-mini">
                CERTIFICATION INDEX
              </span>

              <h2>
                Technologies & compétences validées
              </h2>
            </div>

            <div class="bento-grid">

              <div
                  v-for="(c, i) in certifications"
                  :key="i"
                  class="bento-item"
                  @click="current = i + 2"
              >

                <div class="bento-logo-box">
                  <img
                      :src="c.logo"
                      @error="handleImageError"
                  >
                </div>

                <div class="item-info">
                  <h3>{{ c.title }}</h3>

                  <p>
                    Certification professionnelle validée
                  </p>

                  <div class="access-btn">
                    Voir les détails
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        <!-- FINAL -->
        <section
            v-else-if="current === totalSlides - 1"
            class="slide center"
            key="final"
        >
          <div class="bg-blur final-bg"></div>

          <div class="final-box">

            <div class="final-icon">
              ✓
            </div>

            <h2 class="mega-title-small">
              PARCOURS VALIDÉ
            </h2>

            <p class="final-text">
              Ce parcours de certification démontre une
              capacité à maîtriser des technologies
              professionnelles modernes, à développer des
              applications robustes et à évoluer dans des
              environnements techniques exigeants.
            </p>

            <button
                class="reboot-btn"
                @click="current = 0"
            >
              Revenir à l’accueil
            </button>

          </div>
        </section>

        <!-- DETAILS -->
        <section
            v-else-if="activeCert"
            class="slide split-view"
            :key="activeCert.title"
        >
          <div
              class="bg-blur dynamic-bg"
              :style="{
              backgroundImage: `url(${activeCert.bg})`
            }"
          ></div>

          <div class="detail-container">

            <!-- MAIN -->
            <div class="glass-module cert-main">

              <div class="white-logo-card">
                <img
                    :src="activeCert.logo"
                    class="logo-large"
                    @error="handleImageError"
                >
              </div>

              <div class="cert-text">

                <div class="cert-category">
                  CERTIFICATION PROFESSIONNELLE
                </div>

                <h2 class="cert-title">
                  {{ activeCert.title }}
                </h2>

                <div class="cert-meta">
                  {{ activeCert.duration }}
                </div>

                <p class="cert-desc">
                  {{ activeCert.description }}
                </p>

              </div>

            </div>

            <!-- STATS -->
            <div class="cert-stats">

              <div class="glass-module stat-block">

                <h3 class="block-label">
                  Compétences acquises
                </h3>

                <ul class="skill-list">

                  <li
                      v-for="s in activeCert.pros"
                      :key="s"
                  >
                    {{ s }}
                  </li>

                </ul>

              </div>

              <div class="glass-module stat-block">

                <h3 class="block-label">
                  Technologies utilisées
                </h3>

                <div class="tag-wrap">

                  <span
                      v-for="ex in activeCert.examples"
                      :key="ex"
                      class="badge-tech"
                  >
                    {{ ex }}
                  </span>

                </div>

              </div>

            </div>

          </div>
        </section>

      </transition>
    </template>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

#cyber-app {
  --primary: #6ee7ff;
  --secondary: #8b5cf6;
  --bg: #050816;
  --glass: rgba(255,255,255,0.06);
  --border: rgba(255,255,255,0.1);
  --text: #f8fafc;
  --muted: rgba(255,255,255,0.65);

  background:
      radial-gradient(circle at top left,
      rgba(139,92,246,0.16),
      transparent 30%),

      radial-gradient(circle at bottom right,
      rgba(110,231,255,0.12),
      transparent 30%),

      #050816;

  color: var(--text);

  font-family: 'Inter', sans-serif;

  height: 100vh;
  width: 100vw;

  overflow: hidden;
}

/* GLOBAL */

* {
  box-sizing: border-box;
}

.slide {
  position: relative;

  width: 100vw;
  height: 100vh;

  padding: 60px;

  overflow: hidden;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* BACKGROUNDS */

.bg-blur {
  position: absolute;
  inset: 0;

  background-size: cover;
  background-position: center;

  opacity: 0.15;

  filter:
      blur(12px)
      brightness(0.45);

  transform: scale(1.1);
}

.home-bg {
  background-image:
      url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070');
}

.gallery-bg {
  background-image:
      url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072');
}

.final-bg {
  background-image:
      url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070');
}

/* HERO */

.hero-content {
  position: relative;
  z-index: 10;

  max-width: 1000px;
}

.hero-topline {
  color: var(--primary);

  font-size: 0.9rem;
  font-weight: 600;

  letter-spacing: 5px;

  margin-bottom: 30px;

  text-transform: uppercase;
}

.mega-title {
  font-size: clamp(4rem, 10vw, 8rem);

  font-weight: 900;

  line-height: 0.95;

  letter-spacing: -6px;

  margin: 0;

  background: linear-gradient(
      135deg,
      #ffffff 0%,
      #b8d8ff 45%,
      #6ee7ff 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
      0 0 40px rgba(110,231,255,0.12);
}

.hero-description {
  margin: 35px auto 0;

  max-width: 760px;

  color: var(--muted);

  line-height: 1.8;

  font-size: 1.05rem;
}

.id-badge {
  margin-top: 45px;

  display: inline-flex;
  align-items: center;
  gap: 12px;

  padding: 16px 30px;

  border-radius: 999px;

  background: rgba(255,255,255,0.06);

  border: 1px solid rgba(255,255,255,0.08);

  backdrop-filter: blur(14px);

  font-size: 0.9rem;
  font-weight: 600;

  box-shadow:
      0 10px 50px rgba(0,0,0,0.3);
}

.pulse {
  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: #6ee7ff;

  box-shadow:
      0 0 10px #6ee7ff;
}

/* NAV */

.floating-nav {
  position: fixed;

  right: 40px;
  bottom: 40px;

  display: flex;
  gap: 14px;

  z-index: 100;
}

.floating-nav button {
  width: 60px;
  height: 60px;

  border-radius: 50%;

  border: 1px solid rgba(255,255,255,0.08);

  background: rgba(255,255,255,0.06);

  backdrop-filter: blur(16px);

  color: white;

  font-size: 1.2rem;

  cursor: pointer;

  transition: 0.3s ease;
}

.floating-nav button:hover:not(:disabled) {
  transform: scale(1.08);

  background: rgba(255,255,255,0.12);
}

.floating-nav button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* SECTION */

.container-inner {
  position: relative;
  z-index: 10;

  max-width: 1350px;

  margin: auto;
}

.section-header {
  margin-bottom: 50px;
}

.section-mini {
  color: var(--primary);

  font-size: 0.8rem;

  letter-spacing: 4px;

  text-transform: uppercase;
}

.section-header h2 {
  margin-top: 15px;

  font-size: 3rem;

  font-weight: 800;
}

/* BENTO */

.bento-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(320px, 1fr));

  gap: 24px;
}

.bento-item {
  background: rgba(255,255,255,0.04);

  border: 1px solid rgba(255,255,255,0.08);

  border-radius: 28px;

  padding: 30px;

  cursor: pointer;

  transition:
      transform 0.4s ease,
      border 0.4s ease,
      background 0.4s ease;
}

.bento-item:hover {
  transform: translateY(-8px);

  border-color: rgba(110,231,255,0.4);

  background: rgba(255,255,255,0.07);

  box-shadow:
      0 20px 60px rgba(0,0,0,0.35);
}

.bento-logo-box {
  height: 90px;

  background: white;

  border-radius: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 18px;

  margin-bottom: 24px;
}

.bento-logo-box img {
  max-height: 100%;
  object-fit: contain;
}

.item-info h3 {
  margin: 0;

  font-size: 1.1rem;
  font-weight: 700;
}

.item-info p {
  margin-top: 10px;

  color: var(--muted);

  line-height: 1.6;

  font-size: 0.95rem;
}

.access-btn {
  margin-top: 22px;

  display: inline-flex;

  padding: 10px 18px;

  border-radius: 999px;

  background: rgba(110,231,255,0.08);

  border: 1px solid rgba(110,231,255,0.15);

  color: var(--primary);

  font-size: 0.85rem;
  font-weight: 600;
}

/* DETAILS */

.split-view {
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-container {
  position: relative;
  z-index: 10;

  width: 100%;
  max-width: 1300px;

  display: grid;

  grid-template-columns: 1.2fr 0.8fr;

  gap: 28px;
}

.glass-module {
  background: rgba(255,255,255,0.05);

  border: 1px solid rgba(255,255,255,0.08);

  backdrop-filter: blur(18px);

  border-radius: 32px;

  padding: 40px;

  box-shadow:
      0 10px 50px rgba(0,0,0,0.35);
}

.white-logo-card {
  height: 180px;

  background: white;

  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  margin-bottom: 35px;
}

.logo-large {
  max-height: 100%;
  object-fit: contain;
}

.cert-category {
  color: var(--primary);

  font-size: 0.8rem;

  letter-spacing: 3px;

  margin-bottom: 16px;
}

.cert-title {
  margin: 0;

  font-size: 2.2rem;

  font-weight: 800;

  line-height: 1.2;
}

.cert-meta {
  margin-top: 18px;

  color: var(--muted);

  font-size: 0.95rem;
}

.cert-desc {
  margin-top: 25px;

  line-height: 1.9;

  color: rgba(255,255,255,0.8);

  font-size: 1rem;
}

/* STATS */

.cert-stats {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.block-label {
  margin-top: 0;
  margin-bottom: 25px;

  font-size: 1rem;

  font-weight: 700;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skill-list li {
  position: relative;

  padding-left: 24px;

  margin-bottom: 16px;

  line-height: 1.7;

  color: rgba(255,255,255,0.8);
}

.skill-list li::before {
  content: '';

  position: absolute;

  left: 0;
  top: 10px;

  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: var(--primary);
}

.tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.badge-tech {
  padding: 10px 16px;

  border-radius: 999px;

  background: rgba(255,255,255,0.06);

  border: 1px solid rgba(255,255,255,0.08);

  font-size: 0.85rem;

  color: white;
}

/* FINAL */

.final-box {
  position: relative;
  z-index: 10;

  max-width: 850px;
}

.final-icon {
  width: 120px;
  height: 120px;

  margin: auto auto 35px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 3rem;
  font-weight: 700;

  background:
      linear-gradient(
          135deg,
          rgba(110,231,255,0.18),
          rgba(139,92,246,0.18)
      );

  border: 1px solid rgba(255,255,255,0.1);

  backdrop-filter: blur(12px);
}

.mega-title-small {
  font-size: clamp(3rem, 7vw, 5rem);

  font-weight: 900;

  margin: 0;

  background: linear-gradient(
      135deg,
      white,
      #8b5cf6,
      #6ee7ff
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.final-text {
  margin-top: 30px;

  color: var(--muted);

  line-height: 1.9;

  font-size: 1.1rem;
}

.reboot-btn {
  margin-top: 45px;

  border: none;

  padding: 16px 32px;

  border-radius: 999px;

  background:
      linear-gradient(
          135deg,
          #6ee7ff,
          #8b5cf6
      );

  color: white;

  font-weight: 700;

  cursor: pointer;

  transition: 0.3s ease;
}

.reboot-btn:hover {
  transform: translateY(-3px);

  box-shadow:
      0 15px 40px rgba(110,231,255,0.2);
}

/* TRANSITIONS */

.cyber-fade-enter-active,
.cyber-fade-leave-active {
  transition:
      opacity 0.7s ease,
      transform 0.7s ease,
      filter 0.7s ease;
}

.cyber-fade-enter-from,
.cyber-fade-leave-to {
  opacity: 0;

  transform: scale(1.03);

  filter: blur(10px);
}

/* LOADER */

.bios-loader {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #050816;
}

.loader-box {
  text-align: center;
}

.loader-circle {
  width: 80px;
  height: 80px;

  margin: auto auto 25px;

  border-radius: 50%;

  border:
      4px solid rgba(255,255,255,0.08);

  border-top:
      4px solid #6ee7ff;

  animation: spin 1s linear infinite;
}

.loader-box h2 {
  margin-bottom: 10px;

  font-size: 1.4rem;
}

.loader-box p {
  color: var(--muted);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* RESPONSIVE */

@media (max-width: 1100px) {

  .detail-container {
    grid-template-columns: 1fr;
  }

  .slide {
    overflow-y: auto;
  }
}

@media (max-width: 768px) {

  .slide {
    padding: 30px;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .floating-nav {
    right: 20px;
    bottom: 20px;
  }

  .floating-nav button {
    width: 52px;
    height: 52px;
  }

  .hero-description {
    font-size: 0.95rem;
  }
}
</style>
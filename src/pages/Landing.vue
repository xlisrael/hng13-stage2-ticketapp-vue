<template>
  <main class="hero-container">
    <div class="hero-inner container">
      <div class="hero-left">
        <h1>TicketApp — Manage issues, fast.</h1>
        <p class="lead">
          A simple multi-framework ticket management app (Vue version).
          Create, track and close tickets — with a consistent layout.
        </p>

        <div class="cta-row">
          <router-link to="/auth/signup" class="btn">Get Started</router-link>
          <router-link to="/auth/login" class="btn-outline">Login</router-link>
        </div>
      </div>

      <div class="hero-right" aria-hidden="true">
        <img :src="circleSvg" alt="" class="decor-circle decor-1"/>
        <div class="box demo-box">Feature box - quick stats</div>
      </div>
    </div>

    <div class="hero-wave" aria-hidden="true" :style="{ backgroundImage: `url(${waveSvg})` }">
      <svg></svg>
    </div>

    <footer class="site-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} TicketApp — Built for HNG Stage 2</p>
      </div>
    </footer>
  </main>
</template>

<script>
import circleSvg from '../assets/circle.svg'
import waveSvg from '../assets/wave.svg'

export default {
  name: 'Landing',
  setup() {
    return {
      circleSvg,
      waveSvg
    }
  }
}
</script>
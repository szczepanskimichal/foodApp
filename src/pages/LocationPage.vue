<template>
  <div class="location-page">
    <h1>{{ t('location.title') }}</h1>
    <p>{{ t('location.subtitle') }}</p>
    
    <!-- Map Section -->
    <div class="map-section">
      <h2>Current Location</h2>
      <div id="map" ref="mapContainer" class="map-container"></div>
    </div>
    
    <div class="location-info">
      <div class="current-location">
        <h2>Today's Location</h2>
        <p><strong>Downtown Food Court</strong></p>
        <p>2860 Hov, Randsfjørdvegen 1123,</p>
        <p>City Center (REMA1000)</p>
        <p>Open: 12:00 AM - 23:00 PM</p>
      </div>
      
      <div class="schedule">
        <h2>Weekly Schedule</h2>
        <ul>
          <li><strong>Mandag:</strong> Bjørvika (Oslo sentrum)</li>
          <li><strong>Tirsdag:</strong> Universitetet i Oslo (Blindern)</li>
          <li><strong>Onsdag:</strong> Nygårdsparken (Bergen)</li>
          <li><strong>Torsdag:</strong> Solsiden (Trondheim)</li>
          <li><strong>Fredag:</strong> Fornebu (Technologiparken)</li>
          <li><strong>Lørdag:</strong> Bondens Marked (Karl Johans gate)</li>
          <li><strong>Søndag:</strong> Aker Brygge (Vannkanten)</li>
        </ul>
      </div>
      <div class="contact">
        <h2>Contact</h2>
        <p>📞 (+47) 8687889</p>
        <p>📧 hello@burgertruck.com</p>
        <p>📱 Follow us @TheBurgerTruck</p>
        
        <!-- Social Media Links -->
        <div class="social-media">
          <h3>{{ t('location.followUs') }}</h3>
          <div class="social-links">
            <a href="https://facebook.com/TheBurgerTruck" target="_blank" rel="noopener noreferrer" class="social-link facebook">
              <span class="social-icon">📘</span>
              <span class="social-text">Facebook</span>
            </a>
            <a href="https://instagram.com/TheBurgerTruck" target="_blank" rel="noopener noreferrer" class="social-link instagram">
              <span class="social-icon">📷</span>
              <span class="social-text">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '../composables/useI18n'
import { useImageOptimization } from '../composables/useImageOptimization'

const { t } = useI18n()
const { isSlowConnection } = useImageOptimization()
const mapContainer = ref<HTMLElement>()

onMounted(() => {
  if (mapContainer.value) {
    // Coordinates for the food truck location
    const lat = 60.696237966673415
    const lng = 10.353046317000066
    
    // Initialize the map
    const map = L.map(mapContainer.value).setView([lat, lng], 15)
    
    // Use different tile servers based on connection speed
    const tileUrl = isSlowConnection.value 
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'  // Basic tiles for slow connections
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    
    const tileOptions = {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // Reduce tile loading for slow connections
      ...(isSlowConnection.value && {
        updateWhenIdle: true,
        updateWhenZooming: false,
        keepBuffer: 2
      })
    }
    
    // Add OpenStreetMap tiles
    L.tileLayer(tileUrl, tileOptions).addTo(map)
    
    // Custom burger truck icon
    const truckIcon = L.divIcon({
      html: '🚚',
      iconSize: [30, 30],
      className: 'truck-marker'
    })
    
    // Add marker for food truck location
    L.marker([lat, lng], { icon: truckIcon })
      .addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <h3>🍔 The Burger Truck</h3>
          <p><strong>Randsfjørdvegen 1123</strong></p>
          <p>2860 Hov (REMA1000)</p>
          <p>⏰ 12:00 - 23:00</p>
          <p>📞 (+47) 8687889</p>
        </div>
      `)
      .openPopup()
  }
})
</script>

<style scoped>
.location-page {
  padding: 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

.map-section {
  margin: 2rem 0;
}

.map-section h2 {
  color: #dc2626;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.map-container {
  height: 400px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 2px solid #dc2626;
}

:deep(.truck-marker) {
  background: none;
  border: none;
  font-size: 24px;
  text-align: center;
  line-height: 30px;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:deep(.popup-content) {
  text-align: center;
  min-width: 200px;
}

:deep(.popup-content h3) {
  margin: 0 0 10px 0;
  color: #dc2626;
  font-size: 1.1rem;
}

:deep(.popup-content p) {
  margin: 5px 0;
  font-size: 0.9rem;
}

.location-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  text-align: left;
  padding: 0;
}

.location-info > div {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box;
}

.location-info h2 {
  color: #dc2626;
  margin-bottom: 1rem;
}

.schedule ul {
  list-style: none;
  padding: 0;
}

.schedule li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 0.25rem;
}

.social-media {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #f3f4f6;
}

.social-media h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  flex: 1;
  min-width: 120px;
  justify-content: center;
}

.social-link.facebook {
  background: #4267B2;
  color: white;
  border: 2px solid #4267B2;
}

.social-link.facebook:hover {
  background: white;
  color: #4267B2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 103, 178, 0.2);
}

.social-link.instagram {
  background: #E4405F;
  color: white;
  border: 2px solid #E4405F;
}

.social-link.instagram:hover {
  background: white;
  color: #E4405F;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(228, 64, 95, 0.2);
}

.social-icon {
  font-size: 1.2rem;
}

.social-text {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .social-links {
    flex-direction: column;
  }
  
  .social-link {
    min-width: auto;
  }
}

/* Dark Mode Styles */
body.dark-mode .location-page {
  background: #1a1a1a !important;
  color: #e5e5e5 !important;
}

body.dark-mode .location-page h1 {
  color: #e5e5e5 !important;
}

body.dark-mode .location-page p {
  color: #b3b3b3 !important;
}

body.dark-mode .map-section h2 {
  color: #dc2626 !important;
}

body.dark-mode .location-info > div {
  background: #2d2d2d !important;
  border: 1px solid #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .location-info h2 {
  color: #dc2626 !important;
}

body.dark-mode .location-info p {
  color: #b3b3b3 !important;
}

body.dark-mode .schedule li {
  background: #404040 !important;
  color: #e5e5e5 !important;
}

body.dark-mode .social-media h3 {
  color: #e5e5e5 !important;
}

body.dark-mode .social-media {
  border-top-color: #404040 !important;
}
</style>
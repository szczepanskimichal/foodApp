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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const mapContainer = ref<HTMLElement>()

onMounted(() => {
  if (mapContainer.value) {
    // Coordinates for the food truck location
    const lat = 60.696237966673415
    const lng = 10.353046317000066
    
    // Initialize the map
    const map = L.map(mapContainer.value).setView([lat, lng], 15)
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    
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
</style>
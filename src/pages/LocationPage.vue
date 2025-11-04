<template>
  <div class="location-page">
    <h1>Find Us</h1>
    <p>We're a mobile food truck - follow us for daily location updates!</p>
    
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
<style scoped>
.location-page {
  padding: 2rem 0;
  text-align: center;
}

.location-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  text-align: left;
}

.location-info > div {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
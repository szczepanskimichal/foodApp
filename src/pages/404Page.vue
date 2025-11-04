<template>
  <div class="not-found-page">
    <div class="error-content">
      <div class="error-number">404</div>
      <h1>Page Not Found</h1>
      <p>Looks like our food truck drove off with this page!</p>
      
      <div class="truck-container">
        <div class="road"></div>
        <div class="food-truck">🚚</div>
        <div class="smoke">💨</div>
      </div>
      
      <div class="actions">
        <router-link to="/" class="btn btn-primary">Home</router-link>
        <router-link to="/menu" class="btn btn-outline">Menu</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #87ceeb 0%, #98d8e8 50%, #bde4f4 100%);
  position: relative;
  overflow: hidden;
}

.error-content {
  max-width: 500px;
  background: white;
  padding: 3rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
}

.error-number {
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #dc2626, #ea580c);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 1rem;
}

.error-content h1 {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 700;
}

.error-content p {
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.truck-container {
  position: relative;
  height: 100px;
  margin: 2rem 0;
  overflow: hidden;
}

.road {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #666 10%, 
    #666 20%, 
    transparent 30%,
    transparent 40%, 
    #666 50%, 
    #666 60%, 
    transparent 70%,
    transparent 80%, 
    #666 90%, 
    transparent 100%
  );
  animation: roadMove 2s linear infinite;
}

.food-truck {
  position: absolute;
  bottom: 25px;
  font-size: 3rem;
  animation: truckDrive 6s ease-in-out infinite;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2));
}

.smoke {
  position: absolute;
  bottom: 45px;
  font-size: 1.5rem;
  opacity: 0;
  animation: smokeTrail 6s ease-in-out infinite;
}

@keyframes truckDrive {
  0% {
    transform: translateX(120px) scale(1);
    left: calc(100% + 60px);
  }
  15% {
    transform: translateX(0) scale(1.1);
    left: 60%;
  }
  85% {
    transform: translateX(0) scale(1.1);
    left: 20%;
  }
  100% {
    transform: translateX(-120px) scale(0.8);
    left: -60px;
  }
}

@keyframes smokeTrail {
  0% {
    opacity: 0;
    transform: translateX(100px) scale(0.5);
    left: calc(100% + 40px);
  }
  15% {
    opacity: 0.7;
    transform: translateX(20px) scale(1);
    left: 60%;
  }
  85% {
    opacity: 0.7;
    transform: translateX(20px) scale(1);
    left: 20%;
  }
  100% {
    opacity: 0;
    transform: translateX(-20px) scale(0.5);
    left: -40px;
  }
}

@keyframes roadMove {
  0% { background-position: 0 0; }
  100% { background-position: 100px 0; }
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #dc2626, #ea580c);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
}

.btn-outline {
  border: 2px solid #dc2626;
  color: #dc2626;
  background: transparent;
}

.btn-outline:hover {
  background: #dc2626;
  color: white;
  transform: translateY(-2px);
}
</style>

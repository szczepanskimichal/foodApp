import { ref, onMounted } from 'vue'

export function useImageOptimization() {
  const isSlowConnection = ref(false)
  
  onMounted(() => {
    // Sprawdź jakość połączenia
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        // Dla wolnych połączeń (jak VPN) użyj mniejszych obrazów
        isSlowConnection.value = connection.effectiveType === 'slow-2g' || 
                                  connection.effectiveType === '2g' ||
                                  connection.effectiveType === '3g' ||
                                  connection.downlink < 1.5
      }
    }
  })
  
  const getOptimizedImageUrl = (originalUrl: string, options: { width?: number, height?: number, quality?: number } = {}) => {
    if (!originalUrl.includes('unsplash.com')) return originalUrl
    
    const { width = 400, height = 300, quality = isSlowConnection.value ? 60 : 80 } = options
    
    // Dla wolnych połączeń użyj mniejszych rozmiarów
    const actualWidth = isSlowConnection.value ? Math.floor(width * 0.7) : width
    const actualHeight = isSlowConnection.value ? Math.floor(height * 0.7) : height
    
    return `${originalUrl}&q=${quality}&w=${actualWidth}&h=${actualHeight}&dpr=1`
  }
  
  return {
    isSlowConnection,
    getOptimizedImageUrl
  }
}
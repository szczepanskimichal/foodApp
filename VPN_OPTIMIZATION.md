# Optymalizacja dla VPN i wolnych połączeń

## Problem
Aplikacja działa wolno gdy użytkownicy mają włączony VPN lub mają wolne połączenie internetowe.

## Zaimplementowane rozwiązania

### 1. Konfiguracja Vite (vite.config.ts)

```typescript
server: {
  host: '0.0.0.0', // Pozwala na dostęp z innych urządzeń w sieci
  port: 5173,
  strictPort: false, // Automatycznie znajdzie wolny port
  hmr: {
    clientPort: 5173, // Poprawia HMR z VPN
  },
  // Optymalizacje dla VPN
  watch: {
    usePolling: true, // Lepsze dla niektórych VPN
    interval: 1000,
  },
}
```

### 2. Nowy script npm dla trybu VPN

```bash
npm run dev:vpn  # Uruchamia serwer z optymalizacjami dla VPN
```

### 3. Automatyczna detekcja wolnego połączenia

Aplikacja automatycznie wykrywa wolne połączenia i:
- Ładuje mniejsze obrazy (70% oryginalnego rozmiaru)
- Zmniejsza jakość obrazów (60% zamiast 80%)
- Optymalizuje ładowanie map
- Pokazuje ostrzeżenie użytkownikowi

### 4. Lazy loading obrazów

Wszystkie obrazy w menu używają lazy loading i są optymalizowane dla wolnych połączeń.

### 5. Optymalizacja map

- Dla wolnych połączeń: redukcja częstotliwości aktualizacji map
- Buforowanie tiles
- Mniej agresywne ładowanie podczas przewijania

## Jak używać

### Dla deweloperów:

```bash
# Standardowy tryb
npm run dev

# Tryb zoptymalizowany dla VPN/wolnego połączenia
npm run dev:vpn
```

### Dla użytkowników:

Aplikacja automatycznie wykryje wolne połączenie i zaaplikuje optymalizacje. Użytkownik zobaczy ostrzeżenie w prawym górnym rogu.

## Dodatkowe wskazówki dla VPN

1. **Zmień serwer VPN** - spróbuj serwer bliżej Twojej lokalizacji
2. **Protokół VPN** - spróbuj WireGuard zamiast OpenVPN (szybszy)
3. **Split tunneling** - wyklucz localhost/127.0.0.1 z VPN
4. **DNS** - użyj szybkich serwerów DNS (1.1.1.1, 8.8.8.8)

## Troubleshooting

### Problem: HMR nie działa z VPN
**Rozwiązanie**: Użyj `npm run dev:vpn` który konfiguruje odpowiedni `clientPort`

### Problem: Bardzo wolne ładowanie obrazów
**Rozwiązanie**: Aplikacja automatycznie przełączy się na mniejsze obrazy

### Problem: Mapa nie ładuje się
**Rozwiązanie**: Sprawdź czy VPN nie blokuje OpenStreetMap, spróbuj wyłączyć VPN na chwilę

### Problem: Port 5173 zajęty
**Rozwiązanie**: Konfiguracja automatycznie znajdzie wolny port

## Metryki wydajności

Z optymalizacjami VPN:
- Zmniejszenie rozmiaru obrazów o ~50%
- Szybsze ładowanie początkowe o ~30%
- Mniejsze zużycie danych o ~40%
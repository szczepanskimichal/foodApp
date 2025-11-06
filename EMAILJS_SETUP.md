# EmailJS Configuration Guide

## Krok 1: Załóż konto EmailJS
1. Idź na https://www.emailjs.com/
2. Zarejestruj się używając email: michalszczepanski07@gmail.com
3. Potwierdź email i zaloguj się

## Krok 2: Dodaj Email Service
1. W dashboard kliknij "Add New Service"
2. Wybierz "Gmail" jako provider
3. Połącz z kontem michalszczepanski07@gmail.com
4. Skopiuj "Service ID" (np. service_abc123)

## Krok 3: Stwórz Email Templates

### Template dla Contact Form:
**Template ID:** template_contact
**Subject:** [Burger Truck] New Contact: {{subject}}
**Body:**
```
Nowa wiadomość z formularza kontaktowego The Burger Truck!

📧 SZCZEGÓŁY KONTAKTU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Imię: {{from_name}}
📧 Email: {{from_email}}
📞 Telefon: {{phone}}
📋 Temat: {{subject}}

💬 WIADOMOŚĆ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕒 Wysłano: {{timestamp}}
🍔 Formularz: {{form_type}}
🏪 Restauracja: {{restaurant_name}}

---
Odpowiedz bezpośrednio na email {{reply_to}}
```

### Template dla Job Applications:
**Template ID:** template_job
**Subject:** [Burger Truck] New Job Application: {{position}}
**Body:**
```
Nowa aplikacja o pracę w The Burger Truck! 👨‍🍳

👤 DANE KANDYDATA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Imię i Nazwisko: {{applicant_name}}
📧 Email: {{applicant_email}}
📞 Telefon: {{phone}}
💼 Pozycja: {{position}}
🎯 Doświadczenie: {{experience}}
⏰ Dostępność: {{availability}}

📝 LIST MOTYWACYJNY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{cover_letter}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕒 Wysłano: {{timestamp}}
🍔 Formularz: {{form_type}}
🏪 Restauracja: {{restaurant_name}}

---
Skontaktuj się z kandydatem: {{reply_to}}
```

## Krok 4: Pobierz klucze
1. W "Account" sekcji znajdź "Public Key"
2. Skopiuj Public Key (np. user_abc123xyz)

## Krok 5: Zaktualizuj kod
W pliku `src/composables/useEmailJS.ts` zastąp:
```typescript
const EMAIL_CONFIG = {
  SERVICE_ID: 'twój_service_id_tutaj',
  TEMPLATE_ID_CONTACT: 'template_contact',
  TEMPLATE_ID_JOB: 'template_job', 
  PUBLIC_KEY: 'twój_public_key_tutaj',
  TO_EMAIL: 'michalszczepanski07@gmail.com'
}
```

## Krok 6: Test
1. Uruchom aplikację: `npm run dev`
2. Idź do About page
3. Wypełnij formularz Contact Us lub Join Our Team
4. Sprawdź email michalszczepanski07@gmail.com

## Limity (Free Plan):
- 200 emaili/miesiąc
- Do 2 email services
- Podstawowe templates

## Security Note:
Public Key jest bezpieczny do użycia w frontend - nie zawiera wrażliwych danych.

---
Po skonfigurowaniu EmailJS wszystkie formularze będą automatycznie wysyłać emaile na michalszczepanski07@gmail.com! 🚀
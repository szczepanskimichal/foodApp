// Web3Forms Configuration
const WEB3FORMS_CONFIG = {
  ACCESS_KEY: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  ENDPOINT: 'https://api.web3forms.com/submit',
  TO_EMAIL: import.meta.env.VITE_WEB3FORMS_TO_EMAIL || 'michalszczepanski07@gmail.com'
}

export const useEmailJS = () => {
  
  const sendContactEmail = async (formData: {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
  }) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', WEB3FORMS_CONFIG.ACCESS_KEY)
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone || 'Not provided')
      formDataToSend.append('subject', `[Burger Truck] Contact: ${formData.subject}`)
      formDataToSend.append('message', `
🍔 CONTACT FORM SUBMISSION - The Burger Truck

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone || 'Not provided'}
📋 Subject: ${formData.subject}

💬 MESSAGE:
${formData.message}

---
📅 Submitted: ${new Date().toLocaleString('pl-PL')}
🏪 From: The Burger Truck Website
      `)
      
      // Web3Forms specific fields
      formDataToSend.append('from_name', 'The Burger Truck Website')
      formDataToSend.append('redirect', 'https://web3forms.com/success')

      const response = await fetch(WEB3FORMS_CONFIG.ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (result.success) {
        return { success: true, result }
      } else {
        throw new Error(result.message || 'Failed to send email')
      }
    } catch (error) {
      console.error('Web3Forms Contact Error:', error)
      return { success: false, error }
    }
  }

  const sendJobApplication = async (formData: {
    fullName: string
    email: string
    phone: string
    position: string
    experience?: string
    availability: string[]
    coverLetter: string
  }) => {
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('access_key', WEB3FORMS_CONFIG.ACCESS_KEY)
      formDataToSend.append('name', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('subject', `[Burger Truck] Job Application: ${formData.position}`)
      formDataToSend.append('message', `
🍔 JOB APPLICATION - The Burger Truck

👤 CANDIDATE DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Full Name: ${formData.fullName}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
💼 Position: ${formData.position}
🎯 Experience: ${formData.experience || 'Not specified'}
⏰ Availability: ${formData.availability.join(', ')}

📝 COVER LETTER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.coverLetter}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Submitted: ${new Date().toLocaleString('pl-PL')}
🏪 From: The Burger Truck Website
      `)
      
      // Web3Forms specific fields
      formDataToSend.append('from_name', 'The Burger Truck Website')
      formDataToSend.append('redirect', 'https://web3forms.com/success')

      const response = await fetch(WEB3FORMS_CONFIG.ENDPOINT, {
        method: 'POST',
        body: formDataToSend
      })

      const result = await response.json()

      if (result.success) {
        return { success: true, result }
      } else {
        throw new Error(result.message || 'Failed to send email')
      }
    } catch (error) {
      console.error('Web3Forms Job Application Error:', error)
      return { success: false, error }
    }
  }

  // Web3Forms jest zawsze skonfigurowane jeśli mamy access key
  const isConfigured = () => {
    const hasAccessKey = WEB3FORMS_CONFIG.ACCESS_KEY !== ''
    if (!hasAccessKey) {
      console.warn('Web3Forms Access Key not found. Please check your .env file.')
    }
    return hasAccessKey
  }

  // Funkcja inicjalizacji nie jest potrzebna dla Web3Forms
  const initEmailJS = () => {
    console.log('Using Web3Forms - no initialization needed')
  }

  return {
    sendContactEmail,
    sendJobApplication,
    initEmailJS,
    isConfigured
  }
}
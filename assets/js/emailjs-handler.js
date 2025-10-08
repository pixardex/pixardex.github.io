// EmailJS Form Handler with Multi-Language Support

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    
    // Get current language translations
    const t = translations[currentLanguage];
    
    // Change button text to "Sending..."
    const sendingText = {
        en: "Sending...",
        si: "යවමින්...",
        ta: "அனுப்புகிறது...",
        es: "Enviando...",
        ar: "جارٍ الإرسال..."
    };
    
    submitBtn.textContent = sendingText[currentLanguage];
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';
    
    // Send email using EmailJS
    emailjs.sendForm(
        'service_q19lsbl',      // Replace with your Service ID
        'template_1lo18zb',     // Replace with your Template ID
        form
    )
    .then(() => {
        // Success message
        alert(t.contact_form_success || 'Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = t.contact_form_submit;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    })
    .catch((error) => {
        // Error message
        const errorText = {
            en: "Failed to send message. Please try again or email us directly.",
            si: "පණිවිඩය යැවීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.",
            ta: "செய்தியை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
            es: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
            ar: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى."
        };
        
        alert(errorText[currentLanguage]);
        console.error('EmailJS Error:', error);
        
        // Reset button
        submitBtn.textContent = t.contact_form_submit;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    });
}

// Optional: Add form validation with visual feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ff4444';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('landing-form');
    const phoneInput = document.getElementById('phone');

    // Phone number formatting
    if(phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[1]) {
                e.target.value = '+998';
                return;
            }
            
            let formatted = '+998 ';
            if(x[1] === '998') {
                formatted += (x[2] ? x[2] + ' ' : '') + (x[3] ? x[3] + ' ' : '') + (x[4] ? x[4] + ' ' : '') + (x[5] ? x[5] : '');
            } else {
                formatted += (x[1] ? x[1] + ' ' : '') + (x[2] ? x[2] + ' ' : '') + (x[3] ? x[3] + ' ' : '') + (x[4] ? x[4] : '');
            }
            
            e.target.value = formatted.trim();
        });
        
        phoneInput.addEventListener('focus', function(e) {
            if(e.target.value === '') {
                e.target.value = '+998 ';
            }
        });
    }

    // Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Yuborilmoqda...';
        submitBtn.disabled = true;

        // FACEBOOK PIXEL LEAD EVENT
        if (typeof fbq === 'function') {
            fbq('track', 'Lead', {
                content_name: 'Gaming PC Landing Lead',
                content_category: 'Lead Generation',
                currency: 'USD'
            });
            console.log("Facebook Pixel 'Lead' event fired!");
        }

        // TELEGRAM BOT INTEGRATION
        const BOT_TOKEN = '8202479409:AAF72_jBy-xkZOhn_t8xg7-uoG0Vl5v81_8';
        const CHAT_ID = '426689201';
        
        const message = `🚀 <b>YANGI BUYURTMA (LANDING PAGE)</b> 🚀

💰 <b>Taklif:</b> 440$ Gaming PC
👤 <b>Ism:</b> ${name}
📞 <b>Telefon:</b> ${phone}`;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.innerHTML = 'Muvaffaqiyatli yuborildi! ✅';
            submitBtn.style.background = '#00c853';
            
            // Redirect to Thank You page
            setTimeout(() => {
                window.location.href = 'thanks.html';
            }, 800);
        })
        .catch(error => {
            console.error('Error sending to Telegram:', error);
            submitBtn.innerHTML = 'Xatolik yuz berdi ❌';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });
});

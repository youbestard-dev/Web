// Konfigurasi Telegram
const BOT_TOKEN = '8515476751:AAFOzpluilVEVBB0fkPn1_o1XY1fvGa7AQM';
const CHAT_ID = '1882985552';

// Fungsi utama kirim ke Telegram
function sendToTelegram() {
    const message = document.getElementById('replyMessage').value;
    const sender = document.getElementById('senderName').value || 'Anonim';
    
    // Validasi input
    if (!message.trim()) {
        alert('Boss, isi dulu pesannya! Jangan kosong!');
        return;
    }
    
    // Format pesan untuk Telegram
    const fullMessage = `📨 *PESAN RAHASIA BARU*\n\n` +
                       `🔹 *Dari:* ${sender}\n` +
                       `📝 *Pesan:* ${message}\n\n` +
                       `🕵️ *Konteks:* Balasan untuk "Pesan Lanjutan Kemarin"\n` +
                       `⏰ *Waktu:* ${new Date().toLocaleString('id-ID')}`;
    
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const payload = {
        chat_id: CHAT_ID,
        text: fullMessage,
        parse_mode: 'Markdown',
        disable_notification: false
    };
    
    // Tampilkan notifikasi loading
    showNotification('🔄 Mengirim pesan...', '#2196F3');
    
    // Kirim request ke Telegram API
    fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showNotification('✅ Pesan terkirim!', '#4CAF50');
            clearInputs();
        } else {
            throw new Error('Telegram API error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('❌ Gagal mengirim!', '#f44336');
    });
}

// Fungsi tampilkan notifikasi
function showNotification(text, color = '#4CAF50') {
    const notif = document.getElementById('notif');
    notif.textContent = text;
    notif.style.backgroundColor = color;
    notif.style.display = 'block';
    
    // Auto-hide setelah 5 detik
    setTimeout(() => {
        notif.style.display = 'none';
    }, 5000);
}

// Fungsi clear input setelah kirim
function clearInputs() {
    document.getElementById('replyMessage').value = '';
    document.getElementById('senderName').value = '';
}

// Event listener untuk Enter key
document.getElementById('replyMessage').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendToTelegram();
    }
});

// Animasi halaman saat load
document.addEventListener('DOMContentLoaded', function() {
    // Fade in effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Auto-focus ke input pesan
    document.getElementById('replyMessage').focus();
    
    // Tambahkan efek ketik otomatis untuk placeholder
    const placeholderText = "Ketik pesan balasanmu di sini...";
    let i = 0;
    const speed = 50;
    
    function typeWriter() {
        if (i < placeholderText.length) {
            document.getElementById('replyMessage').placeholder = 
                placeholderText.substring(0, i+1);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Jalankan efek ketik setelah 1 detik
    setTimeout(typeWriter, 1000);
});

// Fitur tambahan: Konfirmasi sebelum kirim (opsional)
window.onbeforeunload = function() {
    const msg = document.getElementById('replyMessage').value;
    if (msg.trim() !== '') {
        return 'Pesan belum terkirim! Yakin mau keluar?';
    }
};

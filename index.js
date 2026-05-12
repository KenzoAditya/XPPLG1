// === FUNGSI BUKA-TUTUP ALBUM/FOLDER ===
function toggleAlbum(albumId) {
    const grid = document.getElementById(albumId);
    const card = grid.previousElementSibling; // Mengambil elemen kotak folder di atasnya

    // Cek apakah album sedang tertutup
    if (grid.style.display === "none" || grid.style.display === "") {
        grid.style.display = "grid"; // Buka album (munculkan foto)
        card.classList.add("open");  // Putar ikon panah ke bawah
    } else {
        grid.style.display = "none"; // Tutup album (sembunyikan foto)
        card.classList.remove("open"); // Kembalikan arah panah ke kanan
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // === 1. CAROUSEL HOME (GALERI PUTAR DI BERANDA) ===
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        let classes = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'];
        setInterval(() => {
            let lastClass = classes.pop();
            classes.unshift(lastClass);
            galleryItems.forEach((item, index) => {
                item.className = 'gallery-item ' + classes[index];
            });
        }, 3000);
    }

    // === 2. FULLSCREEN FOTO (SAAT POLAROID DIKLIK) ===
    const mainArea = document.getElementById('mainArea');
    
    if (mainArea) {
        const fullscreenModal = document.getElementById("imageModal");
        const fullscreenImg = document.getElementById("imgFull");
        const captionText = document.getElementById("caption");

        mainArea.addEventListener('click', (e) => {
            // Jika foto diklik -> Layar Penuh
            if (e.target.tagName === 'IMG' && e.target.closest('.polaroid-card')) {
                fullscreenModal.style.display = "block";
                fullscreenImg.src = e.target.src;
                
                const polaroidCard = e.target.closest('.polaroid-card');
                captionText.innerText = polaroidCard.querySelector('.polaroid-caption').innerText;
            }
        });

        // Tutup Layar Penuh saat background hitam diklik
        window.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                fullscreenModal.style.display = "none";
            }
        });
    }

});

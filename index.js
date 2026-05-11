// ===== 1. REGISTRASI SERVICE WORKER (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('Service Worker terdaftar!', registration.scope))
            .catch(err => console.log('Service Worker gagal:', err));
    });
}

// ===== 2. LOGIKA GALERI 3D CAROUSEL =====
document.addEventListener('DOMContentLoaded', () => {
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    let classes = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'];

    function rotateGalleryLeft() {
        // Logika ini mengambil elemen paling belakang (pos-5) dan memindahkannya ke urutan depan (pos-1)
        // Efek visualnya: semua gambar akan bergeser ke arah kiri
        let lastClass = classes.pop();
        classes.unshift(lastClass);

        // Memperbarui class pada setiap elemen gambar sesuai urutan array yang baru
        galleryItems.forEach((item, index) => {
            item.className = 'gallery-item ' + classes[index];
        });
    }

    // Menjalankan fungsi geser ke kiri setiap 3000 milidetik (3 detik)
    setInterval(rotateGalleryLeft, 3000);

});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => console.log('Service Worker terdaftar!', registration.scope))
            .catch(err => console.log('Service Worker gagal:', err));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    let classes = ['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'];

    function rotateGalleryLeft() {
        // Logika ini mengambil elemen paling belakang dan memindahnya ke depan
        // Efek visualnya: gambar yang di tengah akan bergeser ke kiri
        let lastClass = classes.pop();
        classes.unshift(lastClass);

        galleryItems.forEach((item, index) => {
            item.className = 'gallery-item ' + classes[index];
        });
    }

    // Jalankan fungsi geser ke kiri setiap 3000 ms (3 detik)
    setInterval(rotateGalleryLeft, 3000);

}); 

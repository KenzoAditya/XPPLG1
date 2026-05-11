document.addEventListener('DOMContentLoaded', () => {

    // === 1. CAROUSEL HOME (GALERI PUTAR) ===
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

    // === 2. MEMOIRE LOGIC (DENGAN LOCAL STORAGE) ===
    const mainArea = document.getElementById('mainArea');
    
    if (mainArea) {
        const addModal = document.getElementById('addMemoryModal');
        const addForm = document.getElementById('addMemoryForm');

        // --- A. BACA DATA DARI LOCAL STORAGE SAAT WEB DIBUKA ---
        // Kita bikin "gudang" memori bernama 'memoriKelas'
        let memoriTersimpan = JSON.parse(localStorage.getItem('memoriKelas')) || [];

        // Fungsi untuk mencetak kartu ke layar
        function renderCard(data) {
            const newCard = document.createElement('div');
            newCard.className = `polaroid-card ${data.rotation}`;
            newCard.dataset.id = data.id; // Tanda pengenal unik kartu ini

            newCard.innerHTML = `
                <div class="polaroid-image">
                    <img src="${data.img}" alt="New Memory">
                    <button class="btn-delete"><span class="material-symbols-outlined">delete</span></button>
                </div>
                <div class="polaroid-info">
                    <p class="polaroid-caption">${data.caption}</p>
                    <div class="polaroid-meta">
                        <span>MEMORIES</span>
                        <span>${data.tanggal}</span>
                    </div>
                </div>
            `;
            
            const targetContainer = document.getElementById(`container-${data.semester}`);
            const targetGrid = document.getElementById(`grid-${data.semester}`);

            if (targetContainer) targetContainer.style.display = 'block';
            if (targetGrid) targetGrid.prepend(newCard);
        }

        // Jalankan fungsi cetak untuk semua memori yang ada di gudang LocalStorage
        memoriTersimpan.forEach(data => renderCard(data));


        // --- B. SUBMIT FORM (SIMPAN DATA BARU) ---
        if (addForm) {
            addForm.addEventListener('submit', (e) => {
                e.preventDefault(); 
                
                const imgUrl = document.getElementById('imgUrlInput').value;
                const fileInput = document.getElementById('imageUpload').files[0];
                const semesterPilihan = document.getElementById('semesterInput').value; 
                const tanggalPilihan = document.getElementById('dateInput').value;
                const caption = document.getElementById('captionInput').value;
                
                const dateObj = new Date(tanggalPilihan);
                const dateStr = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
                const rotation = Math.random() > 0.5 ? 'rotate-left' : 'rotate-right';
                const unikId = Date.now().toString(); // ID acak berdasarkan waktu

                // Fungsi inti untuk menyimpan data ke memori
                const simpanDataKeMemori = (gambarFinal) => {
                    const dataBaru = {
                        id: unikId,
                        img: gambarFinal,
                        semester: semesterPilihan,
                        tanggal: dateStr,
                        caption: caption,
                        rotation: rotation
                    };

                    memoriTersimpan.push(dataBaru); // Masukkan ke array
                    
                    try {
                        // Simpan ke buku catatan browser (LocalStorage)
                        localStorage.setItem('memoriKelas', JSON.stringify(memoriTersimpan));
                        renderCard(dataBaru); // Langsung tampilkan di layar
                    } catch (error) {
                        // Fitur pengaman: LocalStorage cuma muat ~5MB.
                        alert("Waduh, memori HP/Laptop penuh! Coba hapus beberapa foto lama dulu.");
                    }

                    addForm.reset();
                    addModal.style.display = 'none';
                };

                // Cek Gambar (File Upload harus dibaca jadi teks Base64 dulu biar bisa disimpan)
                if (fileInput) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        simpanDataKeMemori(event.target.result); // event.target.result adalah teks Base64 fotonya
                    };
                    reader.readAsDataURL(fileInput);
                } else if (imgUrl) {
                    simpanDataKeMemori(imgUrl);
                } else {
                    alert("Tolong masukkan link gambar atau upload foto dari perangkatmu!");
                }
            });
        }


        // --- C. FULLSCREEN & DELETE FOTO (HAPUS PERMANEN) ---
        const fullscreenModal = document.getElementById("imageModal");
        const fullscreenImg = document.getElementById("imgFull");
        const captionText = document.getElementById("caption");

        mainArea.addEventListener('click', (e) => {
            // Fullscreen
            if (e.target.tagName === 'IMG' && e.target.closest('.polaroid-card')) {
                fullscreenModal.style.display = "block";
                fullscreenImg.src = e.target.src;
                
                const polaroidCard = e.target.closest('.polaroid-card');
                captionText.innerText = polaroidCard.querySelector('.polaroid-caption').innerText;
            }
            
            // Delete (Tong Sampah)
            if (e.target.innerText === 'delete' || e.target.classList.contains('btn-delete')) {
                const polaroidCard = e.target.closest('.polaroid-card');
                if (polaroidCard) {
                    const cardId = polaroidCard.dataset.id;
                    
                    // Kalau fotonya punya ID (berarti dari LocalStorage), hapus juga dari gudang memori
                    if (cardId) {
                        memoriTersimpan = memoriTersimpan.filter(data => data.id !== cardId);
                        localStorage.setItem('memoriKelas', JSON.stringify(memoriTersimpan));
                    }
                    
                    polaroidCard.remove(); // Hapus dari layar
                }
            }
        });

        // --- D. TUTUP MODAL DARI BACKGROUND HITAM ---
        window.addEventListener('click', (e) => {
            if (e.target === addModal) addModal.style.display = "none";
            if (e.target === fullscreenModal) fullscreenModal.style.display = "none";
        });
    }

});

document.addEventListener('DOMContentLoaded', function() { // Menjalankan kode setelah seluruh dokumen dimuat
    const guestList = document.getElementById('guestList'); // Mendapatkan elemen daftar tamu dengan id 'guestList'

    // Memuat daftar tamu yang ada dari localStorage
    loadGuestList();

    function getGuestsFromStorage() { // Fungsi untuk mendapatkan daftar tamu dari localStorage
        const guests = localStorage.getItem('guestList'); // Mendapatkan item 'guestList' dari localStorage
        return guests ? JSON.parse(guests) : []; // Jika ada, parse JSON, jika tidak, kembalikan array kosong
    }

    function saveGuestsToStorage(guests) { // Fungsi untuk menyimpan daftar tamu ke localStorage
        localStorage.setItem('guestList', JSON.stringify(guests)); // Mengubah daftar tamu menjadi string JSON dan menyimpannya di localStorage
    }

    function loadGuestList() { // Fungsi untuk memuat dan menampilkan daftar tamu dari localStorage
        const guests = getGuestsFromStorage(); // Mendapatkan daftar tamu dari localStorage
        guests.forEach(displayGuest); // Menampilkan setiap tamu di halaman
    }

    function displayGuest(guest) { // Fungsi untuk menampilkan tamu di halaman
        const guestDiv = document.createElement('div'); // Membuat elemen div baru
        guestDiv.classList.add('guest-entry'); // Menambahkan kelas 'guest-entry' ke div
        guestDiv.innerHTML = ` 
            <strong>No Pesanan:</strong> ${guest.orderNumber} <br>
            <strong>Nama:</strong> ${guest.name} <br>
            <strong>Jumlah Pesanan:</strong> ${guest.orderQuantity} <br>
            <strong>Antar/Jemput:</strong> ${guest.pickup} <br>
            <button onclick="deleteGuest(${guest.orderNumber})">Done</button> 
        `;
        guestList.appendChild(guestDiv); // Menambahkan div ke elemen daftar tamu
    }

    window.deleteGuest = function(orderNumber) { // Fungsi untuk menghapus tamu berdasarkan nomor pesanan
        let guests = getGuestsFromStorage(); // Mendapatkan daftar tamu dari localStorage
        guests = guests.filter(guest => guest.orderNumber !== orderNumber); // Menghapus tamu dengan nomor pesanan yang sesuai
        saveGuestsToStorage(guests); // Menyimpan daftar tamu yang diperbarui ke localStorage
        guestList.innerHTML = ''; // Mengosongkan elemen daftar tamu
        loadGuestList(); // Memuat kembali daftar tamu
    }

    window.clearGuestList = function() { // Fungsi untuk menghapus semua tamu
        localStorage.removeItem('guestList'); // Menghapus item 'guestList' dari localStorage
        guestList.innerHTML = ''; // Mengosongkan elemen daftar tamu
    }
});

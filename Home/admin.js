document.addEventListener('DOMContentLoaded', function() {
    const guestList = document.getElementById('guestList');
    const pricePerItem = 50000; // Harga per item

    loadGuestList();

    function getGuestsFromStorage() {
        const guests = localStorage.getItem('guestList');
        return guests ? JSON.parse(guests) : [];
    }

    function saveGuestsToStorage(guests) {
        localStorage.setItem('guestList', JSON.stringify(guests));
    }

    function loadGuestList() {
        const guests = getGuestsFromStorage();
        guests.forEach(displayGuest);
    }

    function displayGuest(guest) {
        const totalPrice = guest.orderQuantity * pricePerItem; // Menghitung total harga
        const guestDiv = document.createElement('div');
        guestDiv.classList.add('guest-entry');
        guestDiv.innerHTML = `
            <strong>No Pesanan:</strong> ${guest.orderNumber} <br>
            <strong>Nama:</strong> ${guest.name} <br>
            <strong>Jumlah Pesanan:</strong> ${guest.orderQuantity} <br>
            <strong>Total Harga:</strong> Rp. ${totalPrice.toLocaleString()} <br> <!-- Menampilkan total harga -->
            <strong>Antar/Jemput:</strong> ${guest.pickup} <br>
            <button onclick="deleteGuest(${guest.orderNumber})">Done</button> 
        `;
        guestList.appendChild(guestDiv);
    }

    window.deleteGuest = function(orderNumber) {
        let guests = getGuestsFromStorage();
        guests = guests.filter(guest => guest.orderNumber !== orderNumber);
        saveGuestsToStorage(guests);
        guestList.innerHTML = '';
        loadGuestList();
    }

    window.clearGuestList = function() {
        localStorage.removeItem('guestList');
        guestList.innerHTML = '';
    }
});

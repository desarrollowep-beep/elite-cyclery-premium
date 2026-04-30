// 🔒 PROTECCIÓN DE ACCESO
if (window.location.pathname.includes('admin-panel.html')) {
  const access = localStorage.getItem('eliteAdminAccess');

  if (access !== 'true') {
    window.location.href = './admin-login.html';
  }
}

// 📌 ELEMENTOS
const bikeForm = document.getElementById('bikeForm');
const adminBikeList = document.getElementById('adminBikeList');
const logoutBtn = document.getElementById('logoutBtn');

// 📦 OBTENER BICIS
function getBikes() {
  return JSON.parse(localStorage.getItem('eliteCycleryBikes')) || [];
}

// 💾 GUARDAR BICIS
function saveBikes(bikes) {
  localStorage.setItem('eliteCycleryBikes', JSON.stringify(bikes));
}

// 🎨 RENDER INVENTARIO
function renderAdminBikes() {

  if (!adminBikeList) return;

  const bikes = getBikes();
  adminBikeList.innerHTML = '';

  if (bikes.length === 0) {
    adminBikeList.innerHTML = '<p>No hay bicicletas registradas todavía.</p>';
    return;
  }

  bikes.forEach((bike, index) => {
    const card = document.createElement('div');
    card.classList.add('admin-bike-card');

    card.innerHTML = `
      <img src="${bike.imagen}" alt="${bike.marca} ${bike.modelo}">
      <h3>${bike.marca} ${bike.modelo}</h3>
      <p><strong>Tipo:</strong> ${bike.tipo}</p>
      <p><strong>Color:</strong> ${bike.color}</p>
      <p><strong>Stock:</strong> ${bike.stock}</p>
      <p><strong>Serie:</strong> ${bike.serie}</p>
      <p><strong>Precio:</strong> ${bike.precio}</p>

      <button class="delete-btn" data-index="${index}">
        Eliminar
      </button>
    `;

    adminBikeList.appendChild(card);
  });

  // 🗑️ ELIMINAR PRODUCTOS
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const bikes = getBikes();

      if (confirm('¿Seguro que quieres eliminar esta bicicleta?')) {
        bikes.splice(index, 1);
        saveBikes(bikes);
        renderAdminBikes();
      }
    });
  });
}

// ➕ REGISTRAR BICICLETA
if (bikeForm) {
  bikeForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const tipo = document.getElementById('tipo').value;
    const rodada = document.getElementById('rodada').value;
    const color = document.getElementById('color').value;
    const serie = document.getElementById('serie').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenInput = document.getElementById('imagen');

    const file = imagenInput.files[0];

    if (!file) {
      alert('Debes seleccionar una imagen.');
      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      const newBike = {
        marca,
        modelo,
        tipo,
        rodada,
        color,
        serie,
        precio,
        stock,
        descripcion,
        imagen: event.target.result
      };

      const bikes = getBikes();
      bikes.unshift(newBike);
      saveBikes(bikes);

      bikeForm.reset();
      renderAdminBikes();

      alert('Bicicleta registrada correctamente.');
    };

    reader.readAsDataURL(file);
  });
}

// 🚪 LOGOUT
if (logoutBtn) {
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem('eliteAdminAccess');
    window.location.href = './admin-login.html';
  });
}

// 🚀 INIT
window.addEventListener('DOMContentLoaded', renderAdminBikes);
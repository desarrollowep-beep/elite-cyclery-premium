const defaultBikes = [
  {
    marca: "Specialized",
    modelo: "Turbo Levo Comp",
    tipo: "MTB",
    rodada: "29",
    color: "Negro / Rojo",
    precio: "$89,900 MXN",
    descripcion: "Bicicleta premium de montaña con alto rendimiento y suspensión avanzada.",
    imagen: "https://images.unsplash.com/photo-1541625602330-2277a4c46182"
  },
  {
    marca: "Trek",
    modelo: "Domane SL 6",
    tipo: "Ruta",
    rodada: "700C",
    color: "Negro Mate",
    precio: "$76,500 MXN",
    descripcion: "Diseñada para velocidad, resistencia y máximo confort en carretera.",
    imagen: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8"
  },
  {
    marca: "Cannondale",
    modelo: "Quick Neo",
    tipo: "Eléctrica",
    rodada: "28",
    color: "Gris Titanio",
    precio: "$54,900 MXN",
    descripcion: "Movilidad urbana premium con asistencia eléctrica y diseño elegante.",
    imagen: "https://images.unsplash.com/photo-1571068316344-75bc76f77890"
  }
];

function getStoredBikes() {
  const saved = localStorage.getItem("eliteCycleryBikes");
  if (!saved) {
    localStorage.setItem("eliteCycleryBikes", JSON.stringify(defaultBikes));
    return defaultBikes;
  }
  return JSON.parse(saved);
}

function renderCatalog() {
  const catalog = document.getElementById("bikeCatalog");
  if (!catalog) return;

  const bikes = getStoredBikes();
  catalog.innerHTML = "";

  bikes.forEach((bike) => {
    const card = document.createElement("div");
    card.classList.add("bike-card");

    card.innerHTML = `
      <img src="${bike.imagen}" alt="${bike.marca} ${bike.modelo}">
      <h3>${bike.marca} ${bike.modelo}</h3>
      <p><strong>Tipo:</strong> ${bike.tipo}</p>
      <p>${bike.descripcion}</p>
      <div class="price">${bike.precio}</div>
      <a 
        class="whatsapp-btn" 
        target="_blank"
        href="https://wa.me/529982660569?text=Hola,%20me%20interesa%20la%20bicicleta%20${encodeURIComponent(bike.marca + ' ' + bike.modelo)}"
      >
        Solicitar Información
      </a>
    `;

    catalog.appendChild(card);
  });
}

window.addEventListener("DOMContentLoaded", renderCatalog);

const map = L.map('map').setView([-26.2, -58.2], 8);

// Capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Simulación: parcelas del usuario


// Renderizar parcelas en el mapa
parcelas.forEach((p) => {
  const marker = L.marker([p.lat, p.lng]).addTo(map);
  marker.bindPopup(`<b>${p.name}</b><br>Click para ver cultivos`);
  marker.on("click", () => mostrarCultivos(p.id));
});

// Mostrar lista de parcelas
const listaParcelas = document.getElementById("listaParcelas");
parcelas.forEach((p) => {
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `<strong>${p.name}</strong>`;
  listaParcelas.appendChild(div);
});

// Simulación: cultivos
const cultivos = {
  1: [
    { nombre: "Soja", estado: "Saludable", fase: "Crecimiento", humedad: "65%" },
    { nombre: "Maíz", estado: "Estresado", fase: "Floración", humedad: "40%" },
  ],
  2: [{ nombre: "Trigo", estado: "Madurez", fase: "Excelente", humedad: "70%" }],
};

function mostrarCultivos(idParcela) {
  const listaCultivos = document.getElementById("listaCultivos");
  listaCultivos.innerHTML = "";
  if (cultivos[idParcela]) {
    cultivos[idParcela].forEach((c) => {
      const item = document.createElement("div");
      item.className = "item";
      item.innerHTML = `
        <strong>${c.nombre}</strong><br>
        Estado: ${c.estado}<br>
        Fase: ${c.fase}<br>
        Humedad: ${c.humedad}
      `;
      listaCultivos.appendChild(item);
    });
  } else {
    listaCultivos.innerHTML = "<p>No hay cultivos registrados.</p>";
  }
}

// Simulación: ranchos


const listaRanchos = document.getElementById("listaRanchos");
ranchos.forEach((r) => {
  const item = document.createElement("div");
  item.className = "item";
  item.innerHTML = `
    <strong>${r.nombre}</strong><br>
    Animales: ${r.ganado}<br>
    Estado: ${r.saludPromedio}
  `;
  listaRanchos.appendChild(item);
});

// Registrar nueva parcela (simulación)

document.getElementById("btnNuevaParcela").addEventListener("click", () => {
  window.location.replace("registro-parcelas.html"); // o abre un modal
});


adocument.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("parcelas-list");

  const res = await fetch("/api/parcels");
  const data = await res.json();

  if (data.data.length === 0) {
    container.innerHTML = "<p>No hay parcelas registradas.</p>";
    return;
  }

  container.innerHTML = data.data.map(p => `
    <div class="parcela">
      <h3>${p.name}</h3>
      <p><b>Tamaño:</b> ${p.size} ha</p>
      <p><b>Cultivo:</b> ${p.crop.name}</p>
    </div>
  `).join("");
});

cargarParcelas();

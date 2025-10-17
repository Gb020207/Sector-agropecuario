
const map = L.map('map').setView([-26.2, -58.2], 8);

// Capa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Simulación: parcelas del usuario
const parcelas = [
  { id: 1, name: "Parcela Norte", lat: -26.19, lng: -58.22 },
  { id: 2, name: "Parcela Sur", lat: -26.25, lng: -58.18 },
];

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
const ranchos = [
  { nombre: "Rancho Principal", ganado: 20, saludPromedio: "Buena" },
  { nombre: "Rancho Secundario", ganado: 12, saludPromedio: "Regular" },
];

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
  alert("Funcionalidad para registrar nueva parcela próximamente.");
});

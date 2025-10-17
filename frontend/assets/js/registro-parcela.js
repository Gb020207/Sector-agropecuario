document.addEventListener("DOMContentLoaded", async () => {
  const cropSelect = document.getElementById("crop");

  // Cargar cultivos desde backend
  try {
    const res = await fetch("http://localhost:4000/api/crops");
    const data = await res.json();
    data.data.forEach(c => {
      const option = document.createElement("option");
      option.value = c._id;
      option.textContent = c.name;
      cropSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error cargando cultivos:", err);
  }
});

// Enviar formulario
document.getElementById("formParcela").addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const size = document.getElementById("size").value;
  const crop = document.getElementById("crop").value;

  try {
    const res = await fetch("http://localhost:4000/api/parcels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        farmer: "idDelUsuarioActual",
        crop,
        cattle: []
      })
    });
    const result = await res.json();
    if (res.status === 200) {
      alert("Parcela registrada con éxito");
      window.location.href = "establecimiento.html";
    } else {
      alert(result.msg);
    }
  } catch (err) {
    console.error("Error registrando parcela:", err);
  }
});

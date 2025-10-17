document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formParcela');
  const cropSelect = document.getElementById('crop');

  // Ejemplo de carga dinámica de cultivos
  const cultivos = ['Soja', 'Maíz', 'Trigo', 'Girasol'];
  cultivos.forEach(c => {
    const option = document.createElement('option');
    option.value = c;
    option.textContent = c;
    cropSelect.appendChild(option);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // evita el refresh

    const data = {
      name: form.name.value,
      size: form.size.value,
      crop: form.crop.value
    };

    console.log('Datos a registrar:', data);

    // ejemplo: guardar en localStorage o enviar al backend
    alert('Parcela registrada correctamente');
   
  });
});

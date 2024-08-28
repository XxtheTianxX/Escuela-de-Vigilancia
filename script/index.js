const bar = document.querySelector(".fa-bars");
const menu = document.querySelector(".menu");

bar.addEventListener("click", () => {
    menu.classList.toggle("show-menu");
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('productForm');

    form.addEventListener('submit', (event) => {
        // Obtener los valores de los campos
        const nombre = form.querySelector('#nombre').value.trim();
        const Correo = form.querySelector('#correo').value.trim();
        

        // Inicializar variable para saber si hay errores
        let isValid = true;

        // Verificar que todos los campos estén llenos
        if (!nombre) {
            alert('El campo Nombre es obligatorio.');
            isValid = false;
        }

        if (!Correo) {
            alert('El campo Precio es obligatorio.');
            isValid = false;
        }

        // Prevenir el envío del formulario si hay errores
        if (!isValid) {
            event.preventDefault();
        }
    });
});

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;

    // Enviar datos al servidor usando Fetch API
    fetch('http://localhost:3000/registrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: nombre, correo: correo }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Mostrar mensaje del servidor
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function calcularEdad() {
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    document.getElementById('edad').value = edad;
}

function calcularPromedio() {

    const salario1 = parseFloat(document.getElementById('salario1').value) || 0;
    const salario2 = parseFloat(document.getElementById('salario2').value) || 0;
    const salario3 = parseFloat(document.getElementById('salario3').value) || 0;
    const salario4 = parseFloat(document.getElementById('salario4').value) || 0;
    const salario5 = parseFloat(document.getElementById('salario5').value) || 0;


    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const dpi = document.getElementById('dpi').value;
    const nit = document.getElementById('nit').value;
    const direccion = document.getElementById('direccion').value;
    const anosLaborados = parseInt(document.getElementById('anosLaborados').value) || 0;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const edad = parseInt(document.getElementById('edad').value) || 0;


    if (anosLaborados < 20 && !(edad > 50 && anosLaborados >= 10)) {
        alert("No cumple con los requisitos de jubilación.");
        return;
    }


    const promedio = (salario1 + salario2 + salario3 + salario4 + salario5) / 5;


    const totalConBono = promedio + 250;

    // Mostrar resultado
    mostrarResultado(nombreCompleto, dpi, nit, direccion, fechaNacimiento, edad, anosLaborados, salario1, salario2, salario3, salario4, salario5, promedio, totalConBono);

    // Generar el PDF
    generarPDF(nombreCompleto, dpi, nit, direccion, fechaNacimiento, edad, anosLaborados, salario1, salario2, salario3, salario4, salario5, promedio, totalConBono);
}

function mostrarResultado(nombreCompleto, dpi, nit, direccion, fechaNacimiento, edad, anosLaborados, salario1, salario2, salario3, salario4, salario5, promedio, totalConBono) {
    const resultadoDiv = document.getElementById('resultado-jubilacion');
    resultadoDiv.innerHTML = `
        <p><strong>Nombre Completo:</strong> ${nombreCompleto}</p>
        <p><strong>DPI:</strong> ${dpi}</p>
        <p><strong>NIT:</strong> ${nit}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>Años Laborados:</strong> ${anosLaborados}</p>
        <p><strong>Salario Año 1:</strong> Q${salario1.toFixed(2)}</p>
        <p><strong>Salario Año 2:</strong> Q${salario2.toFixed(2)}</p>
        <p><strong>Salario Año 3:</strong> Q${salario3.toFixed(2)}</p>
        <p><strong>Salario Año 4:</strong> Q${salario4.toFixed(2)}</p>
        <p><strong>Salario Año 5:</strong> Q${salario5.toFixed(2)}</p>
        <p><strong>Promedio de Salarios:</strong> Q${promedio.toFixed(2)}</p>
        <p><strong>Total con Bono ($250):</strong> Q${totalConBono.toFixed(2)}</p>
    `;
}

function generarPDF(nombreCompleto, dpi, nit, direccion, fechaNacimiento, edad, anosLaborados, salario1, salario2, salario3, salario4, salario5, promedio, totalConBono) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Plantilla de Formulario de Información de Clientes", 20, 20);

    // Información del cliente
    doc.setFontSize(16);
    doc.text(`Nombre Completo: ${nombreCompleto}`, 20, 40);
    doc.text(`DPI: ${dpi}`, 20, 50);
    doc.text(`NIT: ${nit}`, 20, 60);
    doc.text(`Dirección: ${direccion}`, 20, 70);
    doc.text(`Fecha de Nacimiento: ${fechaNacimiento}`, 20, 80);
    doc.text(`Edad: ${edad}`, 20, 90);
    doc.text(`Años Laborados: ${anosLaborados}`, 20, 100);

    // Sección de salarios
    doc.setFont("Helvetica", "normal");
    doc.text("Salarios de los Últimos 5 Años:", 20, 120);
    doc.text(`Año 1: Q${salario1.toFixed(2)}`, 20, 130);
    doc.text(`Año 2: Q${salario2.toFixed(2)}`, 20, 140);
    doc.text(`Año 3: Q${salario3.toFixed(2)}`, 20, 150);
    doc.text(`Año 4: Q${salario4.toFixed(2)}`, 20, 160);
    doc.text(`Año 5: Q${salario5.toFixed(2)}`, 20, 170);

    // Resultados del cálculo
    doc.setFont("Helvetica", "bold");
    doc.text(`Promedio de Salarios: Q${promedio.toFixed(2)}`, 20, 190);
    doc.text(`Total con Bono (Q250): ${totalConBono.toFixed(2)}`, 20, 200);

    // Notas finales
    doc.setFont("Helvetica", "normal");
    doc.text("Notas:", 20, 220);
    doc.text("Este documento es generado automáticamente.", 20, 230);

    // Guardar el PDF con un nombre específico
    doc.save("informacion_cliente.pdf");
}

function openTab(evt, tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.style.display = 'none');

    const tabLinks = document.querySelectorAll('.tablink');
    tabLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

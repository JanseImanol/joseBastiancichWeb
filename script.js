// 1. Lógica del formulario de pago (solo se ejecuta si existe en la página)
const formulario = document.getElementById("formulario-pago");

if (formulario) {
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const btn = document.getElementById("btn-enviar");
    btn.innerText = "Enviando...";

    const archivo = document.getElementById("comprobante").files[0];
    const lector = new FileReader();

    lector.onload = function (e) {
      const base64 = e.target.result.split("base64,")[1];

      const datosParaEnviar = {
        nombre: document.getElementById("nombre").value,
        whatsapp: document.getElementById("whatsapp").value,
        paquete: document.getElementById("paquete").value,
        nombreArchivo: archivo.name,
        mimeType: archivo.type,
        archivoBase64: base64,
      };

      fetch(
        "https://script.google.com/macros/s/AKfycbwjDeJu9TAkg8D5ZDtAg63p5A3vugxRBE94D6Gzxx2fap-HCg6fzNBvS0h6sywIcholFQ/exec",
        {
          method: "POST",
          body: JSON.stringify(datosParaEnviar),
        },
      )
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          alert("¡Enviado con éxito!");
          btn.innerText = "Confirmar Pago";
        })
        .catch((error) => {
          alert("Hubo un error al enviar");
          btn.innerText = "Confirmar Pago";
        });
    };

    lector.readAsDataURL(archivo);
  });
}

// 2. Lógica del botón falso de archivo (solo se ejecuta si existe)
const inputArchivo = document.getElementById("comprobante");
const textoArchivo = document.getElementById("texto-archivo");

if (inputArchivo && textoArchivo) {
  inputArchivo.addEventListener("change", function () {
    if (inputArchivo.files.length > 0) {
      textoArchivo.textContent = "✅ " + inputArchivo.files[0].name;
      textoArchivo.style.borderColor = "#25d366";
      textoArchivo.style.color = "#ffffff";
    } else {
      textoArchivo.textContent = "📎 Subir comprobante de pago";
      textoArchivo.style.borderColor = "#444444";
    }
  });
}

    
        document
          .getElementById("formulario-pago")
          .addEventListener("submit", function (evento) {
            evento.preventDefault(); // Evita que la página se recargue

            const btn = document.getElementById("btn-enviar");
            btn.innerText = "Enviando...";

            const archivo = document.getElementById("comprobante").files[0];
            const lector = new FileReader();

            // Esta función se ejecuta cuando la imagen termina de leerse
            lector.onload = function (e) {
              // Extraemos solo el código Base64 de la imagen
              const base64 = e.target.result.split("base64,")[1];

              const datosParaEnviar = {
                nombre: document.getElementById("nombre").value,
                whatsapp: document.getElementById("whatsapp").value,
                paquete: document.getElementById("paquete").value,
                nombreArchivo: archivo.name,
                mimeType: archivo.type,
                archivoBase64: base64,
              };

              // Petición HTTP a la URL que te dio Google
              fetch(
                "https://script.google.com/macros/s/AKfycbwVvqwQNNZorLxGxvZSnY5fCxeScG9yYyc7R7Eysq6-wWcTatRRC-K71nEd_IJ6UrxNkA/exec",
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

            // Inicia la lectura del archivo
            lector.readAsDataURL(archivo);
          });

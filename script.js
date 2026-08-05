    
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

            // Inicia la lectura del archivo
            lector.readAsDataURL(archivo);
          });



          // Buscamos el input y nuestro label (botón falso)
          const inputArchivo = document.getElementById('comprobante');
          const textoArchivo = document.getElementById('texto-archivo');

          // Le decimos que escuche cada vez que cambia el archivo seleccionado
          inputArchivo.addEventListener('change', function() {
              if (inputArchivo.files.length > 0) {
                  // Si hay un archivo, mostramos el nombre
                  textoArchivo.textContent = "✅ " + inputArchivo.files[0].name;
                  // Le cambiamos el color al borde para que sepa que está todo ok
                  textoArchivo.style.borderColor = "#25d366"; 
                  textoArchivo.style.color = "#ffffff";
              } else {
                  // Si cancela, vuelve al texto original
                  textoArchivo.textContent = "📎 Subir comprobante de pago";
                  textoArchivo.style.borderColor = "#444444";
              }
          });

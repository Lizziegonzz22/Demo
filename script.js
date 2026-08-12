document.addEventListener('DOMContentLoaded', () => {

    // Cambios fluidos de pantalla
    function navigateTo(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    // Listener para todos los botones que redirigen de menú
    document.querySelectorAll('[data-target]').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            navigateTo(target);
        });
    });

    // --- ALERTAS RECOGIDAS DE TUS NOTAS DE CUADERNO ---

    // Estudiantes
    document.getElementById('btn-create-group')?.addEventListener('click', () => {
        alert('Formulario de creación:\nSe solicitarán tus datos personales para asignarte un código de aula único.');
    });

    document.getElementById('btn-student-doubts')?.addEventListener('click', () => {
        alert('Zona de consultas:\nTu duda será enviada de forma directa. Para mitigar la desinformación, únicamente los profesores calificados podrán responderla.');
    });

    document.getElementById('btn-upload-notes')?.addEventListener('click', () => {
        alert('Subida de archivos:\nSelecciona tus documentos o apuntes para cargarlos a la nube de tu clase.');
    });

    document.getElementById('btn-search-materia')?.addEventListener('click', () => {
        alert('Buscando material académico en la base de datos...');
    });

    // Filtros de Cuaderno 2
    document.getElementById('btn-filter-all')?.addEventListener('click', () => {
        alert('Filtro Global Activo: Mostrando los apuntes compartidos por todos los alumnos de cualquier liceo asociados a esta materia.');
    });

    document.getElementById('btn-filter-group')?.addEventListener('click', () => {
        alert('Filtro Local Activo: Restringiendo la vista únicamente a los contenidos subidos por tus compañeros de grupo.');
    });

    // Profesores
    document.getElementById('btn-teacher-doubts')?.addEventListener('click', () => {
        alert('Bandeja de Consultas:\nVisualizando todas las dudas pendientes de los alumnos. Puedes usar filtros para segmentar solo las de tu materia.');
    });

    document.getElementById('btn-upload-idea')?.addEventListener('click', () => {
        alert('Repositorio Colaborativo:\nSube tus videos, audios o secuencias didácticas para inspirar y ayudar a otros colegas docentes.');
    });

    // Invitados
    document.getElementById('btn-search-guest')?.addEventListener('click', () => {
        alert('Explorando contenidos públicos en modo lectura (Sin asignación de grupo).');
    });
    // --- LÓGICA DEL CHAT INTERACTIVO ---
    const chatInput = document.getElementById('chat-input');
    const btnSendMessage = document.getElementById('btn-send-message');
    const chatWindow = document.getElementById('chat-window');

    function enviarMensaje() {
        const texto = chatInput.value.trim();
        if (texto === '') return; // No enviar si está vacío

        // Crear elemento de mensaje estructurado
        const nuevoMensaje = document.createElement('div');
        nuevoMensaje.className = 'chat-msg user-own';
        nuevoMensaje.innerHTML = `
            <span class="chat-user">Usuario (Tú)</span>
            <p class="chat-text">${texto}</p>
        `;

        // Acoplar a la ventana y hacer scroll automático al final
        chatWindow.appendChild(nuevoMensaje);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Limpiar cuadro de texto
        chatInput.value = '';
    }

    // Escuchar el clic en la flecha de enviar
    btnSendMessage?.addEventListener('click', enviarMensaje);

    // Permitir enviar el mensaje también presionando la tecla "Enter"
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            enviarMensaje();
        }
    });
        // --- LÓGICA DEL ESCÁNER INTELIGENTE (OCR) ---
    
    // Insertar dinámicamente la librería externa Tesseract.js de forma segura
    const scriptOcr = document.createElement('script');
    scriptOcr.src = 'https://jsdelivr.net';
    document.head.appendChild(scriptOcr);

    // Esperamos a que el script se cargue por completo antes de asignar las funciones
    scriptOcr.onload = () => {
        const scannerUpload = document.getElementById('scanner-upload');
        const uploadStatus = document.getElementById('upload-status');
        const progressContainer = document.getElementById('scanner-progress-container');
        const progressFill = document.getElementById('scanner-progress-fill');
        const progressText = document.getElementById('scanner-progress-text');
        const scannerPreview = document.getElementById('scanner-preview');
        const resultContainer = document.getElementById('scanner-result-container');
        const resultText = document.getElementById('scanner-result-text');
        const btnCopyClean = document.getElementById('btn-copy-clean');

        scannerUpload?.addEventListener('change', function(e) {
            const file = e.target.files[0]; // Corrección para capturar el archivo individual del celular
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(event) {
                if (scannerPreview) {
                    scannerPreview.src = event.target.result;
                    scannerPreview.style.display = 'block';
                }
                procesarImagenConOcr(event.target.result);
            };
            reader.readAsDataURL(file);
            
            if (uploadStatus) uploadStatus.innerText = "¡Imagen cargada con éxito!";
        });

        function procesarImagenConOcr(imageSrc) {
            if (progressContainer) progressContainer.style.display = 'block';
            if (resultContainer) resultContainer.style.display = 'none';
            if (progressFill) progressFill.style.width = '0%';
            if (progressText) progressText.innerText = "Inicializando IA... 0%";

            Tesseract.recognize(imageSrc, 'spa', {
                logger: m => {
                    if (m.status === 'recognizing text' && progressFill && progressText) {
                        const porcentaje = Math.round(m.progress * 100);
                        progressFill.style.width = porcentaje + '%';
                        progressText.innerText = `Pasando a limpio... ${porcentaje}%`;
                    }
                }
            }).then(({ data: { text } }) => {
                if (progressContainer) progressContainer.style.display = 'none';
                if (resultContainer) resultContainer.style.display = 'block';
                
                if (resultText) {
                    if (text.trim() === '') {
                        resultText.value = "[Ejemplo de Demo]: No se detectó texto claro en la imagen. Intenta con una foto más nítida, o prueba subiendo cualquier imagen de texto impreso.";
                    } else {
                        resultText.value = text;
                    }
                }
            }).catch(err => {
                console.error(err);
                if (progressContainer) progressContainer.style.display = 'none';
                alert('Hubo un pequeño inconveniente al procesar el escaneo en este dispositivo.');
            });
        }

        btnCopyClean?.addEventListener('click', () => {
            if (resultText) {
                resultText.select();
                navigator.clipboard.writeText(resultText.value);
                alert('¡Texto limpio copiado al portapapeles con éxito!');
            }
        });
    };

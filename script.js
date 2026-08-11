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
});

AOS.init({
    duration: 1200,
});

const checkbox = document.getElementById("switch");
//const audio = document.getElementById("miAudio");
//const gelda = document.getElementById("miImagen");

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        // checked → modo claro
        document.documentElement.setAttribute("data-theme", "light");
        //gelda.style.display = 'block';
        //gelda.classList.add('rotar');
        //audio.play();
    } else {
        // sin marcar → modo oscuro (default en :root)
        document.documentElement.removeAttribute("data-theme", "dark");
        //gelda.style.display = 'none';
        //gelda.classList.remove('rotar');
        //audio.pause();
    }
});
let currentSpread = 0;
const totalSpreads = 2;

function updateDisplay() {
    const spreads = document.querySelectorAll('.page-spread');
    const currentPagesSpan = document.getElementById('current-pages');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Actualizar spreads con rotación 3D
    spreads.forEach((spread, index) => {
        spread.classList.remove('active', 'prev', 'next');

        if (index === currentSpread) {
            spread.classList.add('active');
        } else if (index < currentSpread) {
            spread.classList.add('prev');
        } else {
            spread.classList.add('next');
        }
    });

    // Actualizar indicador de eventos
    const leftEventNum = (currentSpread * 2) + 1;
    const rightEventNum = (currentSpread * 2) + 2;
    currentPagesSpan.textContent = `${leftEventNum}-${rightEventNum}`;

    // Actualizar botones
    prevBtn.disabled = currentSpread === 0;
    nextBtn.disabled = currentSpread === totalSpreads - 1;
}

function nextPage() {
    if (currentSpread < totalSpreads - 1) {
        currentSpread++;
        updateDisplay();
    }
}

function previousPage() {
    if (currentSpread > 0) {
        currentSpread--;
        updateDisplay();
    }
}

// Navegación con teclado
/*document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        previousPage();
    }
});

// Inicializar
updateDisplay();

AOS.init({
    duration: 1200,
})

const objs = document.querySelectorAll(".obj-ani");
const container = document.querySelector(".flip-container");

container.addEventListener("scroll", () => {
  objs.forEach(el => {
    const rect = el.getBoundingClientRect();

    // si el objeto está visible en el viewport
    if (rect.left < window.innerWidth && rect.right > 0) {
      el.classList.add("aos-active");
    } else {
      // se quita la animación al salir
      el.classList.remove("aos-active");
    }
  });
});*/

// Variables para el carrusel de galería
let currentGalleryIndex = 0;
const galleryItems = document.querySelectorAll('.carrusel-pag');
const totalGalleryItems = galleryItems.length;



// Función para actualizar el estado de los botones
function updateGalleryButtons() {
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');
    
    prevBtn.disabled = currentGalleryIndex === 0;
    nextBtn.disabled = currentGalleryIndex === totalGalleryItems - 1;
    
    // Aplicar estilos visuales cuando están deshabilitados
    if (prevBtn.disabled) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }
    
    if (nextBtn.disabled) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

// Función para ir al siguiente elemento
function nextGallery() {
    if (currentGalleryIndex < totalGalleryItems - 1) {
        currentGalleryIndex++;
        showGalleryItem(currentGalleryIndex);
    }
}

// Función para ir al elemento anterior
function prevGallery() {
    if (currentGalleryIndex > 0) {
        currentGalleryIndex--;
        showGalleryItem(currentGalleryIndex);
    }
}

// Navegación con teclado para el carrusel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        nextGallery();
    } else if (e.key === 'ArrowLeft') {
        prevGallery();
    }
});

// Función para crear los indicadores
function createIndicators() {
    const indicatorsContainer = document.getElementById('gallery-indicators');
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalGalleryItems; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'gallery-indicator';
        indicator.addEventListener('click', () => {
            currentGalleryIndex = i;
            showGalleryItem(currentGalleryIndex);
        });
        indicatorsContainer.appendChild(indicator);
    }
}

// Función para actualizar los indicadores
function updateIndicators() {
    const indicators = document.querySelectorAll('.gallery-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentGalleryIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Función para mostrar el elemento actual del carrusel
function showGalleryItem(index) {
    // Ocultar todos los elementos
    galleryItems.forEach(item => {
        item.classList.remove('gallery-active');
    });
    
    // Mostrar el elemento actual
    if (galleryItems[index]) {
        galleryItems[index].classList.add('gallery-active');
    }
    
    // Actualizar estado de los botones
    updateGalleryButtons();
    
    // Actualizar indicadores
    updateIndicators();
}


// Variables para el auto-play del carrusel

// Código para el timeline progress bar
function updateTimelineProgress() {
    const timelineContainer = document.querySelector('.timeline-line-container');
    const progressBar = document.querySelector('.timeline-line-progress');
    
    if (!timelineContainer || !progressBar) {
        console.log('No se encontraron elementos del timeline');
        return;
    }
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = timelineContainer.offsetTop;
    const containerHeight = timelineContainer.offsetHeight;
    const windowHeight = window.innerHeight;
    
    // Calcular el progreso con un factor de ajuste
    let progress = 0;
    
    if (scrollTop >= containerTop) {
        const scrolled = scrollTop - containerTop;
        // Usar solo el 50% del scroll total para que sea más gradual
        const maxScroll = (containerHeight - windowHeight) * 0.7;
        progress = Math.min(scrolled / maxScroll, 1);
        progress = Math.max(progress, 0);
        
        // Aplicar una curva de suavizado adicional
        progress = Math.pow(progress, 0.9);
    }
    
    // Aplicar el progreso a la barra con una curva más suave
    const progressHeight = progress * 100;
    progressBar.style.height = `${progressHeight}%`;
    
    console.log('Progress:', progress, 'Height:', progressHeight + '%');
}

// Event listener para el scroll
window.addEventListener('scroll', updateTimelineProgress);

// Función de prueba para verificar que funciona
function testProgressBar() {
    const progressBar = document.querySelector('.timeline-line-progress');
    if (progressBar) {
        progressBar.style.height = '50%';
        console.log('Test: Progress bar height set to 50%');
    } else {
        console.log('Test: Progress bar not found');
    }
}

// Inicializar el progreso cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    createIndicators();
    showGalleryItem(currentGalleryIndex);
    updateTimelineProgress();
    
    // Agregar botón de prueba temporal
    /*const testButton = document.createElement('button');
    testButton.textContent = 'Test Progress Bar';
    testButton.style.position = 'fixed';
    testButton.style.top = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '9999';
    testButton.onclick = testProgressBar;
    document.body.appendChild(testButton);*/
    
    console.log('Initialization complete');
});

// cuando paso sobre el item de la lista, muestro el div correspondiente
document.querySelectorAll(".timeline-der li span").forEach(item => {
    item.addEventListener("mouseenter", () => {
        // ocultar todos
        document.querySelectorAll(".platon-datos").forEach(d => d.style.display = "none");

        // mostrar el que corresponda
        if (item.classList.contains("pla-log-lis")) {
            document.querySelector(".pla-log").style.display = "block";
        } else if (item.classList.contains("pla-thy-lis")) {
            document.querySelector(".pla-thy").style.display = "block";
        } else if (item.classList.contains("pla-epi-lis")) {
            document.querySelector(".pla-epi").style.display = "block";
        }
    });
});

const stations = document.querySelectorAll('.station');
const infos = document.querySelectorAll('.info');

stations.forEach(st => {
  st.addEventListener('click', () => {
    stations.forEach(s => s.classList.remove('station-active'));
    infos.forEach(i => i.classList.remove('station-active'));

    st.classList.add('station-active');
    document.getElementById(st.dataset.info).classList.add('station-active');
  });
});

const info = ["",
    "Siglo XX|~~~~|El siglo XX consolidó la psicología como una ciencia independiente con la aparición del conductismo y el psicoanálisis.",
    "Gestalt|Max Wertheimer, Wolfgang Köhler y Kurt Koffka.| Los Seres humanos no experimentan las cosas como piezas aisladas, sino como totalidades.",
    "Psicoanálisis|Sigmund Freud| Explica los transtornos mentales desde la perspectiva del inconsciente.",
    "Psicología Humanista|Abraham Maslow Carl Rogers | Sosteía estudiar a las personas sanas y excepcionales. Desarrolló la pirámide de necesidades.",
    "Psicología Cognitiva|Jean Piaget|Se centra en el razonamiento, la memoria, resolución de problemas, el lenguaje."
    
];

document.querySelectorAll('.bubble').forEach((bubble, i) => {
    bubble.onclick = () => {
        const [year, title, desc] = info[bubble.dataset.info].split('|');
        document.getElementById('modalYear').textContent = year;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDescription').textContent = desc;
        document.getElementById('modal').classList.add('active');
    };
});

document.getElementById('closeBtn').onclick = () => document.getElementById('modal').classList.remove('active');
document.getElementById('modal').onclick = (e) => e.target.id === 'modal' && e.target.classList.remove('active');





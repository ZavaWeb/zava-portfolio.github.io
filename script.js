// script.js - Toute l'interactivité

// Données des œuvres (simule une base de données)
const artworks = [
    {
        id: 1,
        title: "La Bonté",
        category: "peinture",
        technique: "Acrylique sur papier",
        year: 2025,
        image: "photo3.jpg",
        description: " La beauté, c’est juste dans les yeux, mais la bonté, c’est plus profonde"
    },
    {
        id: 2,
        title: "Pomme et poire",
        category: "peinture",
        technique: "Acrylique",
        year: 2025,
        image: " photo5.jpg",
        description: "Realisation nature morte"
    },
    {
        id: 3,
        title: "Dessin traditionnel",
        category: "dessin",
        technique: "Fusain sur papier",
        year: 2025,
        image: "photo2.jpg",
        description: "Fo , penina sy  taratasy ary amboroa ."
    },
    {
        id: 4,
        title: "Jiro Die ",
        category: "numerique",
        technique: "Ibis paint x",
        year: 2024,
        image: "photo6.jpg",
        description: "Illustration numérique pourla delestage"
    },
    {
        id: 5,
        title: "Destruction de la nature",
        category: "dessin",
        technique: "Fusain sur papier",
        year: 2023,
        image: "photo7.jpg",
        description: "Pollution de la nature"
    },
    {
        id: 6,
        title: "Mon mirroir",
        category: "dessin",
        technique: "Crayon pierre noir",
        year: 2024,
        image: "photo4.jpg",
        description: "Mon  miroir est mon meilleur ami ,car lorsque je pleur il ne rit jamais."
    }
];

// --- 1. GÉNÉRATION DE LA GALERIE ---
const galleryGrid = document.getElementById('gallery-grid');

function displayArtworks(filter = 'all') {
    galleryGrid.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? artworks 
        : artworks.filter(art => art.category === filter);
    
    filtered.forEach(art => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.id = art.id;
        
        item.innerHTML = `
            <img src="${art.image}" alt="${art.title}">
            <div class="gallery-info">
                <h3>${art.title}</h3>
                <p>${art.technique}, ${art.year}</p>
            </div>
        `;
        
        galleryGrid.appendChild(item);
    });
}

// Afficher toutes les œuvres au chargement
displayArtworks();

// --- 2. SYSTÈME DE FILTRES ---
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Gestion de la classe active
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filtrer les œuvres
        const filter = btn.dataset.filter;
        displayArtworks(filter);
    });
});

// --- 3. LIGHTBOX (agrandissement des images) ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close');

// Ouvrir la lightbox quand on clique sur une œuvre
galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    
    const id = parseInt(item.dataset.id);
    const artwork = artworks.find(a => a.id === id);
    
    if (artwork) {
        lightboxImg.src = artwork.image;
        lightboxCaption.innerHTML = `${artwork.title} - ${artwork.technique}, ${artwork.year}<br>${artwork.description}`;
        lightbox.classList.add('active');
    }
});

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Fermer en cliquant en dehors de l'image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// --- 4. MENU MOBILE HAMBURGER ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- 5. FORMULAIRE DE CONTACT (simulation) ---
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Ici, vous pourriez envoyer les données à un serveur
    // Pour l'exemple, on simule juste un envoi
    alert('Message envoyé ! (simulation)');
    contactForm.reset();
});

// --- 6. SCROLL REVEAL (animation au défilement) ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer aux sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});
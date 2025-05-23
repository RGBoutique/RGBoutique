document.addEventListener("DOMContentLoaded", () => {
  /**
   * ANIMATIONS AU SCROLL
   * Fait apparaître les éléments avec un effet de fondu et de glissement
   */
  const initScrollAnimations = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" 
    });

    fadeElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      fadeObserver.observe(el);
    });
  };

  /**
   * MENU BURGER
   * Gère l'ouverture/fermeture du menu mobile
   */
  const initBurgerMenu = () => {
    const burgerBtn = document.getElementById("burger-btn");
    const navLinks = document.getElementById("nav-links");

    if (!burgerBtn || !navLinks) return;

    burgerBtn.addEventListener("click", () => {
      // Animation du bouton burger
      burgerBtn.classList.toggle("active");
      
      // Affichage du menu
      navLinks.classList.toggle("active");
      
      // Empêche le scroll quand le menu est ouvert
      document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    });

    // Ferme le menu quand on clique sur un lien
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        burgerBtn.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  };

  /**
   * FILTRAGE DES ARTICLES
   * Filtre les produits par marque
   */
  const initBrandFilter = () => {
    const filter = document.getElementById("brand-filter");
    const productCards = document.querySelectorAll(".card[data-brand]");

    if (!filter) return;

    filter.addEventListener("change", (e) => {
      const selectedBrand = e.target.value.toLowerCase();
      
      productCards.forEach(card => {
        const cardBrand = card.dataset.brand.toLowerCase();
        const shouldShow = selectedBrand === "all" || cardBrand === selectedBrand;
        
        card.style.display = shouldShow ? "inline-block" : "none";
        card.style.animation = shouldShow ? "fadeIn 0.5s forwards" : "none";
      });
    });
  };

  /**
   * INTERACTIONS DES PRODUITS
   * Gère l'affichage des descriptions au hover/clic
   */
  const initProductInteractions = () => {
    const productCards = document.querySelectorAll(".card");

    productCards.forEach(card => {
      const description = card.querySelector(".description");
      if (!description) return;

      // Version desktop : hover
      card.addEventListener("mouseenter", () => {
        if (window.innerWidth > 768) {
          description.style.display = "block";
          card.style.transform = "translateY(-5px)";
        }
      });

      card.addEventListener("mouseleave", () => {
        if (window.innerWidth > 768) {
          description.style.display = "none";
          card.style.transform = "translateY(0)";
        }
      });

      // Version mobile : clic
      card.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isVisible = description.style.display === "block";
          
          // Ferme toutes les descriptions d'abord
          document.querySelectorAll(".description").forEach(desc => {
            desc.style.display = "none";
          });
          
          // Ouvre la description actuelle si elle était fermée
          description.style.display = isVisible ? "none" : "block";
        }
      });
    });
  };

  // Initialisation de toutes les fonctionnalités
  initScrollAnimations();
  initBurgerMenu();
  initBrandFilter();
  initProductInteractions();

  // Réinitialise le filtre si on revient en arrière
  window.addEventListener("pageshow", () => {
    const filter = document.getElementById("brand-filter");
    if (filter) filter.value = "all";
  });
});

function showImage(carousel, index) {
  const images = carousel.querySelectorAll('.carousel-image');
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
  carousel.dataset.index = index;
}

function prevImage(btn) {
  const carousel = btn.closest('.image-carousel');
  const images = carousel.querySelectorAll('.carousel-image');
  let index = parseInt(carousel.dataset.index || 0, 10);
  index = (index - 1 + images.length) % images.length;
  showImage(carousel, index);
}

function nextImage(btn) {
  const carousel = btn.closest('.image-carousel');
  const images = carousel.querySelectorAll('.carousel-image');
  let index = parseInt(carousel.dataset.index || 0, 10);
  index = (index + 1) % images.length;
  showImage(carousel, index);
}

// Initialisation pour chaque carrousel
document.querySelectorAll('.image-carousel').forEach(carousel => {
  carousel.dataset.index = 0;
  showImage(carousel, 0);
});

document.querySelectorAll('.counter').forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const speed = 18; // plus petit = plus rapide
    if (count < target) {
      counter.innerText = Math.ceil(count + (target - count) / speed);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

// Carrousel d'avis clients
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-carousel .testimonial');
const showTestimonial = (idx) => {
  testimonials.forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
};
window.prevTestimonial = function() {
  testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
};
window.nextTestimonial = function() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
};
// Auto défilement toutes les 7s
setInterval(() => {
  window.nextTestimonial();
}, 7000);
showTestimonial(testimonialIndex);

// Bouton remonter en haut
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

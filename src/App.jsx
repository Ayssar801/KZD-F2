import { useEffect, useState } from 'react';
import './App.css';

const carouselImages = [
  {
    src: '/img-2-17-11.avif',
    alt: 'A colorful bouquet of daisies and seasonal flowers',
    label: 'Indoor Plants',
    description: 'Greenery for home and life',
  },
  {
    src: '/img-3-17-11.webp',
    alt: 'A soft pink bouquet wrapped for gifting',
    label: 'Fresh Flowers',
    description: 'Arranged with care',
  },
];

function App() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);

  useEffect(() => {
    fetch('/categories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Fout bij ophalen:', error);
      });
  }, []);

  useEffect(() => {
    if (carouselPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCarouselIndex(index => (index + 1) % carouselImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  const showPreviousImage = () => {
    setCarouselIndex(index => (index - 1 + carouselImages.length) % carouselImages.length);
  };

  const showNextImage = () => {
    setCarouselIndex(index => (index + 1) % carouselImages.length);
  };

  const closeMenu = () => setMenuOpen(false);
  const visibleImages = [carouselImages[carouselIndex]];

  return (
    <div className="site-shell" id="home">
      <header className="site-header">
        <div className="page-width header-inner">
          <a className="brand" href="#home" onClick={closeMenu}>Florist</a>
          <button
            className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen(open => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav
            className={`site-nav${menuOpen ? ' is-open' : ''}`}
            id="site-navigation"
            aria-label="Main navigation"
          >
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#category-roses" onClick={closeMenu}>Roses</a>
            <a href="#category-bouquets" onClick={closeMenu}>Bouquets</a>
            <a href="#category-plants" onClick={closeMenu}>Plants</a>
            <a href="#category-gifts" onClick={closeMenu}>Gifts</a>
            <a href="#visit" onClick={closeMenu}>Location</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Fresh Flowers, Thoughtfully Arranged</h1>
            <p className="hero-description">
              Seasonal blooms crafted for everyday moments and meaningful occasions.
              Sourced responsibly and arranged with care.
            </p>
            <a className="shop-button" href="#categories">Shop Flowers</a>
          </div>

          <div
            className="hero-carousel"
            aria-label="Featured flowers"
            aria-roledescription="carousel"
            onMouseEnter={() => setCarouselPaused(true)}
            onMouseLeave={() => setCarouselPaused(false)}
            onFocus={() => setCarouselPaused(true)}
            onBlur={event => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setCarouselPaused(false);
              }
            }}
          >
            <div className="carousel-track" aria-live="polite">
              {visibleImages.map(image => (
                <figure className="carousel-image" key={image.src}>
                  <img src={image.src} alt={image.alt} />
                  <div className="carousel-caption">
                    <figcaption>{image.label}</figcaption>
                    <p>{image.description}</p>
                  </div>
                </figure>
              ))}
            </div>
            <button
              className="carousel-control previous"
              type="button"
              aria-label="Previous flowers"
              onClick={showPreviousImage}
            >
              &#8249;
            </button>
            <button
              className="carousel-control next"
              type="button"
              aria-label="Next flowers"
              onClick={showNextImage}
            >
              &#8250;
            </button>
          </div>
        </section>

        <section className="categories-section page-width" id="categories" aria-label="Categories">
          <div className="category-grid">
            {categories.map(category => (
              <a
                className="category-card"
                href="#visit"
                id={`category-${category.id}`}
                key={category.id}
              >
                <span className="category-title">{category.title}</span>
                <span className="category-description">{category.description}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="visit-section page-width" id="visit" aria-labelledby="visit-title">
          <div className="shop-image">
            <img
              src="/img-17-11.jpg"
              alt="A flower shop storefront surrounded by flowers and plants"
            />
          </div>
          <div className="visit-copy">
            <h2 id="visit-title">Visit Our Shop</h2>
            <address>
              123 Flower Street<br />
              Garden District<br />
              Bloomington, BT 45578
            </address>
            <p className="opening-hours">
              Open Monday to Saturday<br />
              9:00 AM - 6:00 PM
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://www.facebook.com/">Facebook</a>
        <a href="https://www.pinterest.com/">Pinterest</a>
        <a href="https://x.com/">Twitter</a>
      </footer>
    </div>
  );
}

export default App;

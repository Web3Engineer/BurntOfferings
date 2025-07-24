// Burnt Offerings Website JavaScript
// Contact info storage variable
let contactInfo = null;

// Product data - Easy for Jean to update
const products = [
    {
        id: 1,
        title: "Lightning Oak Coffee Table",
        price: 850,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A stunning oak coffee table featuring intricate Lichtenberg fractal patterns that dance across the surface like captured lightning. The natural wood grain complements the burned patterns beautifully, creating a unique centerpiece for any living room."
    },
    {
        id: 2,
        title: "Fractal Walnut Dining Table",
        price: 1200,
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "This magnificent walnut dining table showcases the raw power of electricity captured in wood. The fractal burn patterns create organic, tree-like designs that make every meal a work of art. Seats 6 comfortably."
    },
    {
        id: 3,
        title: "Electric Cherry Bookshelf",
        price: 650,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A beautiful cherry wood bookshelf with lightning-like burn patterns flowing vertically through each shelf. The contrast between the rich cherry wood and the dark burned channels creates a dramatic and functional piece."
    },
    {
        id: 4,
        title: "Thunderstruck Pine Bench",
        price: 450,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "This rustic pine bench features bold fractal patterns that seem to radiate energy. Perfect for entryways or as accent seating, the natural pine grain enhanced by the electric burn patterns creates a piece that's both rustic and sophisticated."
    },
    {
        id: 5,
        title: "Maple Lightning Side Table",
        price: 380,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An elegant maple side table with delicate fractal patterns that branch across the surface like frozen lightning. The light maple wood provides a beautiful canvas for the intricate burned designs, making it perfect for any room."
    },
    {
        id: 6,
        title: "Storm Cedar Chest",
        price: 750,
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A magnificent cedar storage chest featuring dramatic lightning patterns that flow across the entire surface. The aromatic cedar wood combined with the striking burn patterns creates both a functional storage solution and a conversation piece."
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('burntOfferingsCart')) || [];

// Carousel variables
let currentSlide = 0;
let isTransitioning = false;

// Lightning effects variables
let lightningContainer;
let lastMouseX = 0;
let lastMouseY = 0;
let lightningThrottle = false;

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Burnt Offerings website initializing...');
    
    // Initialize all components
    initializeCarousel();
    updateCartDisplay();
    setupParallax();
    setupNavigation();
    setupContactForm();
    setupLightningEffects();
    
    // Show content smoothly after initialization
    setTimeout(() => {
        document.body.classList.add('loaded');
        console.log('✨ Content displayed smoothly');
    }, 100);
    
    console.log('✅ Website initialization complete');
});

// Parallax effect
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('.parallax-bg');
        
        if (parallaxBg) {
            const speed = scrolled * 0.5;
            parallaxBg.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
}

// Carousel functionality
function initializeCarousel() {
    console.log('🎠 Initializing product carousel...');
    
    const carouselTrack = document.getElementById('carousel-track');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    
    if (!carouselTrack || !indicatorsContainer) return;
    
    // Create slides
    products.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <div class="slide-overlay">
                <div class="slide-title">${product.title}</div>
                <div class="slide-price">$${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        carouselTrack.appendChild(slide);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
    
    updateProductDescription();
    console.log('✅ Carousel initialized with', products.length, 'products');
}

function nextSlide() {
    if (isTransitioning) return;
    currentSlide = (currentSlide + 1) % products.length;
    updateCarousel();
}

function previousSlide() {
    if (isTransitioning) return;
    currentSlide = (currentSlide - 1 + products.length) % products.length;
    updateCarousel();
}

function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    isTransitioning = true;
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
    
    // Update product description with fade effect
    updateProductDescription();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}

function updateProductDescription() {
    const descriptionElement = document.getElementById('product-description');
    if (!descriptionElement) return;
    
    const currentProduct = products[currentSlide];
    
    // Fade out
    descriptionElement.classList.remove('show');
    
    setTimeout(() => {
        descriptionElement.innerHTML = `
            <h3>${currentProduct.title}</h3>
            <p>${currentProduct.description}</p>
        `;
        
        // Fade in
        descriptionElement.classList.add('show');
    }, 250);
}

function scrollToGallery() {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        gallerySection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Shopping cart functionality
function addToCart(productId) {
    console.log('🛒 Adding product to cart:', productId);
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartDisplay();
    
    // Show feedback
    showNotification(`${product.title} added to cart!`);
}

function removeFromCart(productId) {
    console.log('🗑️ Removing product from cart:', productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
}

function clearCart() {
    console.log('🧹 Clearing entire cart');
    cart = [];
    saveCart();
    updateCartDisplay();
    showNotification('Cart cleared!');
}

function saveCart() {
    localStorage.setItem('burntOfferingsCart', JSON.stringify(cart));
    console.log('💾 Cart saved to localStorage');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('💳 Proceeding to checkout with total:', total);
    
    // Close cart sidebar
    toggleCart();
    
    // Call credit card function with total amount
    if (typeof creditCard === 'function') {
        creditCard(total);
    } else {
        console.error('❌ Credit card function not available');
        showNotification('Payment system unavailable. Please try again later.');
    }
}

// Contact form functionality
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📞 Contact form submitted');
            
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Store contact info
            contactInfo = {
                phone: phone,
                message: message,
                timestamp: new Date().toISOString()
            };
            
            console.log('📋 Contact info saved:', contactInfo);
            
            // Show success message
            showNotification('Thank you! Jean will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: var(--dark-wood);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Auto-advance carousel (optional)
let autoAdvanceInterval;

function startAutoAdvance() {
    autoAdvanceInterval = setInterval(() => {
        if (!isTransitioning) {
            nextSlide();
        }
    }, 5000);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
    }
}

// Start auto-advance when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(startAutoAdvance, 2000);
});

// Pause auto-advance when user interacts with carousel
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
        carouselContainer.addEventListener('mouseleave', startAutoAdvance);
    }
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        previousSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'Escape') {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    }
}

// Lightning Effects System
function setupLightningEffects() {
    lightningContainer = document.getElementById('lightning-container');
    if (!lightningContainer) return;
    
    console.log('⚡ Setting up lightning effects...');
    
    // Mouse movement handler
    document.addEventListener('mousemove', handleLightningMove);
    
    // Touch movement handler for mobile
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            handleLightningMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    });
    
    // Click/tap handler for instant lightning
    document.addEventListener('click', function(e) {
        createLightningBurst(e.clientX, e.clientY);
    });
    
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            createLightningBurst(touch.clientX, touch.clientY);
        }
    });
    
    console.log('⚡ Lightning effects ready!');
}

function handleLightningMove(e) {
    if (lightningThrottle) return;
    
    const currentX = e.clientX;
    const currentY = e.clientY;
    
    // Calculate movement distance
    const deltaX = currentX - lastMouseX;
    const deltaY = currentY - lastMouseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Only create lightning if there's significant movement
    if (distance > 15) {
        createLightningStreak(currentX, currentY, lastMouseX, lastMouseY);
        
        // Throttle lightning creation
        lightningThrottle = true;
        setTimeout(() => {
            lightningThrottle = false;
        }, 100);
    }
    
    lastMouseX = currentX;
    lastMouseY = currentY;
}

function createLightningStreak(x, y, fromX, fromY) {
    if (!lightningContainer) return;
    
    // Calculate angle and length
    const deltaX = x - fromX;
    const deltaY = y - fromY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    // Create main lightning streak
    const streak = document.createElement('div');
    streak.className = 'lightning-streak';
    streak.style.left = fromX + 'px';
    streak.style.top = fromY + 'px';
    streak.style.height = length + 'px';
    streak.style.transform = `rotate(${angle + 90}deg)`;
    
    lightningContainer.appendChild(streak);
    
    // Create random branches
    const numBranches = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
    
    for (let i = 0; i < numBranches; i++) {
        setTimeout(() => {
            createLightningBranch(fromX, fromY, length, angle);
        }, Math.random() * 200);
    }
    
    // Remove streak after animation
    setTimeout(() => {
        if (streak.parentNode) {
            streak.parentNode.removeChild(streak);
        }
    }, 800);
}

function createLightningBranch(originX, originY, parentLength, parentAngle) {
    if (!lightningContainer) return;
    
    // Random position along parent streak
    const branchPosition = Math.random() * 0.7 + 0.1; // 10% to 80% along parent
    const branchLength = parentLength * (Math.random() * 0.4 + 0.2); // 20% to 60% of parent length
    
    // Random angle deviation from parent
    const angleDeviation = (Math.random() - 0.5) * 120; // ±60 degrees
    const branchAngle = parentAngle + angleDeviation;
    
    // Calculate branch start position
    const branchStartX = originX + Math.cos((parentAngle - 90) * Math.PI / 180) * parentLength * branchPosition;
    const branchStartY = originY + Math.sin((parentAngle - 90) * Math.PI / 180) * parentLength * branchPosition;
    
    const branch = document.createElement('div');
    branch.className = 'lightning-branch';
    branch.style.left = branchStartX + 'px';
    branch.style.top = branchStartY + 'px';
    branch.style.height = branchLength + 'px';
    branch.style.setProperty('--branch-angle', branchAngle + 90 + 'deg');
    branch.style.transform = `rotate(${branchAngle + 90}deg)`;
    
    lightningContainer.appendChild(branch);
    
    // Remove branch after animation
    setTimeout(() => {
        if (branch.parentNode) {
            branch.parentNode.removeChild(branch);
        }
    }, 600);
}

function createLightningBurst(x, y) {
    if (!lightningContainer) return;
    
    // Create multiple streaks radiating from click point
    const numStreaks = Math.floor(Math.random() * 4) + 3; // 3-6 streaks
    
    for (let i = 0; i < numStreaks; i++) {
        setTimeout(() => {
            const angle = (360 / numStreaks) * i + Math.random() * 30 - 15; // Slight randomization
            const length = Math.random() * 80 + 40; // 40-120px length
            
            const streak = document.createElement('div');
            streak.className = 'lightning-streak';
            streak.style.left = x + 'px';
            streak.style.top = y + 'px';
            streak.style.height = length + 'px';
            streak.style.transform = `rotate(${angle}deg)`;
            
            lightningContainer.appendChild(streak);
            
            // Create branches for burst streaks too
            if (Math.random() > 0.6) {
                setTimeout(() => {
                    createLightningBranch(x, y, length, angle - 90);
                }, Math.random() * 100);
            }
            
            // Remove streak after animation
            setTimeout(() => {
                if (streak.parentNode) {
                    streak.parentNode.removeChild(streak);
                }
            }, 800);
        }, i * 50); // Stagger the creation
    }
}

// Clean up old lightning elements periodically
setInterval(() => {
    if (lightningContainer && lightningContainer.children.length > 20) {
        // Remove oldest elements if too many accumulate
        const children = Array.from(lightningContainer.children);
        children.slice(0, 10).forEach(child => {
            if (child.parentNode) {
                child.parentNode.removeChild(child);
            }
        });
    }
}, 2000);



console.log('🎨 Burnt Offerings JavaScript loaded successfully!');

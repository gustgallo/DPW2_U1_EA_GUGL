/**
 * Villa Olímpica Athletics - JavaScript Vainilla
 * Lógica de interactividad para el menú responsivo, carrito, scroll y formulario
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Móvil Hamburguesa
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            
            // Cambiar icono del botón entre menu y close
            const iconSpan = mobileMenuBtn.querySelector('.material-symbols-outlined');
            if (iconSpan) {
                iconSpan.textContent = isOpen ? 'close' : 'menu';
            }
        });

        // Cerrar el menú al hacer clic en cualquier enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const iconSpan = mobileMenuBtn.querySelector('.material-symbols-outlined');
                if (iconSpan) iconSpan.textContent = 'menu';
            });
        });
    }

    // 2. Efecto del Header al Hacer Scroll
    const header = document.querySelector('.navbar-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 3. Resaltar enlace de navegación activo según la página actual
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href) && href !== '#') {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        }
    });

    // 4. Funcionalidad de "Agregar al Carrito"
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-badge');
    const addCartBtns = document.querySelectorAll('.btn-add-cart');

    addCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            
            if (cartBadge) {
                cartBadge.textContent = cartCount;
                // Efecto de rebote sutil al agregar
                cartBadge.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    cartBadge.style.transform = 'scale(1)';
                }, 200);
            }

            // Obtener el nombre del producto
            const productCard = btn.closest('.product-card');
            let productName = 'Producto';
            if (productCard) {
                const titleEl = productCard.querySelector('.product-title');
                if (titleEl) productName = titleEl.textContent.trim();
            }

            // Mostrar notificación Toast
            showToast(`¡${productName} agregado al carrito!`);
        });
    });

    // 5. Suscripción al Boletín / Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input && input.value.trim() !== '') {
                showToast('¡Gracias por suscribirte a Villa Olímpica!');
                input.value = '';
            } else {
                showToast('Por favor introduce un correo válido.');
            }
        });
    }

    // 6. Buscador rápido
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                showToast(`Buscando: "${searchInput.value.trim()}"...`);
            }
        });
    }

    // Función auxiliar para Toast Notifications
    function showToast(message) {
        let toast = document.getElementById('toastNotification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastNotification';
            toast.className = 'toast-notification';
            toast.innerHTML = `
                <span class="material-symbols-outlined" style="color: var(--color-secondary);">check_circle</span>
                <span id="toastMessage"></span>
            `;
            document.body.appendChild(toast);
        }

        const toastMsg = toast.querySelector('#toastMessage');
        if (toastMsg) toastMsg.textContent = message;

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});

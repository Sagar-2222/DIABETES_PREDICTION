// Enhanced JavaScript for Diabetes Prediction System

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll for navigation links
    initSmoothScroll();
    
    // Form validation and enhancement
    initFormValidation();
    
    // Add loading animation on form submit
    initFormSubmit();
    
    // Tooltip functionality
    initTooltips();
    
    // Add animations on scroll
    initScrollAnimations();
});

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
}

// ===================================
// FORM VALIDATION
// ===================================
function initFormValidation() {
    const form = document.getElementById('predictionForm');
    
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', function() {
            validateInput(this);
        });
        
        // Validation on blur
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Form submit validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Please fill in all fields correctly', 'error');
        }
    });
}

function validateInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.getAttribute('min'));
    const max = parseFloat(input.getAttribute('max'));
    const name = input.getAttribute('name');
    
    // Remove previous error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.classList.remove('error');
    
    // Check if empty
    if (input.value.trim() === '') {
        if (input.hasAttribute('required')) {
            showInputError(input, 'This field is required');
            return false;
        }
        return true;
    }
    
    // Check if valid number
    if (isNaN(value)) {
        showInputError(input, 'Please enter a valid number');
        return false;
    }
    
    // Check min/max
    if (min !== null && value < min) {
        showInputError(input, `Value must be at least ${min}`);
        return false;
    }
    
    if (max !== null && value > max) {
        showInputError(input, `Value must be at most ${max}`);
        return false;
    }
    
    // Specific validations
    if (name === 'glucose' && value > 0 && value < 50) {
        showInputError(input, 'Unusually low glucose level. Please verify.');
        return false;
    }
    
    if (name === 'bmi' && value > 0 && value < 10) {
        showInputError(input, 'Unusually low BMI. Please verify.');
        return false;
    }
    
    if (name === 'age' && value < 1) {
        showInputError(input, 'Age must be at least 1');
        return false;
    }
    
    return true;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f5576c';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '0.3rem';
    
    input.parentElement.appendChild(errorDiv);
}

// ===================================
// FORM SUBMIT ANIMATION
// ===================================
function initFormSubmit() {
    const form = document.getElementById('predictionForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.btn-predict');
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span style="display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-spinner fa-spin"></i>
                    Analyzing...
                </span>
            `;
        }
    });
}

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? '#f5576c' : '#38ef7d'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// TOOLTIPS
// ===================================
function initTooltips() {
    const tooltipIcons = document.querySelectorAll('.tooltip-icon');
    
    tooltipIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.about-card, .step-item, .info-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// INPUT FORMATTING
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Format BMI to 2 decimal places
    const bmiInput = document.getElementById('bmi');
    if (bmiInput) {
        bmiInput.addEventListener('change', function() {
            if (this.value) {
                this.value = parseFloat(this.value).toFixed(2);
            }
        });
    }
    
    // Format DPF to 3 decimal places
    const dpfInput = document.getElementById('dpf');
    if (dpfInput) {
        dpfInput.addEventListener('change', function() {
            if (this.value) {
                this.value = parseFloat(this.value).toFixed(3);
            }
        });
    }
});

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('predictionForm');
        if (form) {
            form.requestSubmit();
        }
    }
    
    // Escape to reset form
    if (e.key === 'Escape') {
        const form = document.getElementById('predictionForm');
        if (form && confirm('Reset the form?')) {
            form.reset();
        }
    }
});

// ===================================
// RESULT PAGE ANIMATIONS
// ===================================
if (document.querySelector('.result-page')) {
    window.addEventListener('load', function() {
        const resultIcon = document.querySelector('.result-icon');
        if (resultIcon) {
            resultIcon.style.animation = 'scaleIn 0.6s ease';
        }
    });
}

// ===================================
// ADD CSS FOR ANIMATIONS
// ===================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-group.focused label {
        color: #667eea;
    }
    
    .form-group input.error {
        border-color: #f5576c;
        background: #fff5f5;
    }
    
    .error-message {
        animation: shake 0.3s ease;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(styleSheet);

// ===================================
// PROGRESS BAR FOR FORM
// ===================================
function updateFormProgress() {
    const form = document.getElementById('predictionForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required]');
    let filledInputs = 0;
    
    inputs.forEach(input => {
        if (input.value.trim() !== '' && validateInput(input)) {
            filledInputs++;
        }
    });
    
    const progress = (filledInputs / inputs.length) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.form-progress-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'form-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
            z-index: 9999;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = progress + '%';
}

// Add progress tracking
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    if (form) {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updateFormProgress);
            input.addEventListener('change', updateFormProgress);
        });
        updateFormProgress();
    }
});

// ===================================
// AUTO-SAVE TO SESSION (OPTIONAL)
// ===================================
function autoSaveForm() {
    const form = document.getElementById('predictionForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Load saved value
        const savedValue = sessionStorage.getItem(input.name);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // Save on change
        input.addEventListener('change', function() {
            sessionStorage.setItem(this.name, this.value);
        });
    });
    
    // Clear on form submit
    form.addEventListener('submit', function() {
        inputs.forEach(input => {
            sessionStorage.removeItem(input.name);
        });
    });
}

// Uncomment to enable auto-save
// autoSaveForm();

// ===================================
// PRINT RESULT FUNCTIONALITY
// ===================================
if (document.querySelector('.result-page')) {
    const printBtn = document.querySelector('button[onclick*="print"]');
    if (printBtn) {
        printBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.print();
        });
    }
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.hasAttribute('aria-label')) {
            const label = input.closest('.form-group')?.querySelector('label');
            if (label) {
                input.setAttribute('aria-label', label.textContent.trim());
            }
        }
    });
    
    // Add focus visible for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
});

// Add keyboard navigation styles
const accessibilityStyles = document.createElement('style');
accessibilityStyles.textContent = `
    body.keyboard-nav *:focus {
        outline: 3px solid #667eea;
        outline-offset: 2px;
    }
    
    body:not(.keyboard-nav) *:focus {
        outline: none;
    }
`;
document.head.appendChild(accessibilityStyles);

// ===================================
// COPY RESULT FUNCTIONALITY
// ===================================
function addCopyButton() {
    const resultText = document.querySelector('.result-text');
    if (!resultText) return;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn-copy';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy Result';
    copyBtn.style.cssText = `
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        background: #f7fafc;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    `;
    
    copyBtn.addEventListener('click', function() {
        const text = resultText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Copied!';
            this.style.background = '#38ef7d';
            this.style.color = 'white';
            this.style.borderColor = '#38ef7d';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-copy"></i> Copy Result';
                this.style.background = '#f7fafc';
                this.style.color = '';
                this.style.borderColor = '#e2e8f0';
            }, 2000);
        });
    });
    
    resultText.parentElement.appendChild(copyBtn);
}

if (document.querySelector('.result-page')) {
    addCopyButton();
}

// ===================================
// EASTER EGG: Konami Code
// ===================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    const colors = ['#667eea', '#764ba2', '#38ef7d', '#f5576c', '#11998e'];
    let colorIndex = 0;
    
    const interval = setInterval(() => {
        document.body.style.background = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 200);
    
    setTimeout(() => {
        clearInterval(interval);
        document.body.style.background = '';
        showNotification('🎉 You found the secret!', 'info');
    }, 3000);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for input validation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to input validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        const debouncedValidation = debounce(() => validateInput(input), 300);
        input.addEventListener('input', debouncedValidation);
    });
});

// ===================================
// DARK MODE TOGGLE (BONUS FEATURE)
// ===================================
function addDarkModeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'dark-mode-toggle';
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        color: white;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 9998;
    `;
    
    toggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDark);
    });
    
    toggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    toggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(toggle);
    
    // Check saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Add dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
    body.dark-mode {
        background: #1a202c;
        color: #e2e8f0;
    }
    
    body.dark-mode .navbar,
    body.dark-mode .form-container,
    body.dark-mode .about-card,
    body.dark-mode .result-card,
    body.dark-mode .info-card {
        background: #2d3748;
        color: #e2e8f0;
    }
    
    body.dark-mode input {
        background: #1a202c;
        color: #e2e8f0;
        border-color: #4a5568;
    }
    
    body.dark-mode .input-hint,
    body.dark-mode .hero-subtitle,
    body.dark-mode .about-card p {
        color: #a0aec0;
    }
`;
document.head.appendChild(darkModeStyles);

// Uncomment to enable dark mode toggle
// addDarkModeToggle();

// ===================================
// ANALYTICS (OPTIONAL)
// ===================================
function trackFormSubmission() {
    const form = document.getElementById('predictionForm');
    if (!form) return;
    
    form.addEventListener('submit', function() {
        // Add your analytics tracking here
        // Example: gtag('event', 'form_submit', { event_category: 'engagement' });
        console.log('Form submitted - Analytics tracked');
    });
}

trackFormSubmission();

// ===================================
// INITIALIZE ALL FEATURES
// ===================================
console.log('🩺 Diabetes Prediction System - Frontend Loaded Successfully');
console.log('💡 Tip: Press Ctrl/Cmd + Enter to submit the form');
console.log('💡 Tip: Press Escape to reset the form');
// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        
        // Password strength checker
        const passwordInput = document.getElementById('signupPassword');
        if (passwordInput) {
            passwordInput.addEventListener('input', checkPasswordStrength);
        }
        
        // Confirm password validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', validatePasswordMatch);
        }
    }

    // Toggle Password Visibility
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Social Login Buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            showNotification(`${provider} login coming soon!`, 'success');
        });
    });
});

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    // Validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Demo credentials
    const DEMO_EMAIL = 'yashpatil@gmail.com';
    const DEMO_PASSWORD = '123456789';
    
    // Check demo credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        showNotification('Logging in...', 'success');
        
        // Simulate API call
        setTimeout(() => {
            const user = {
                email: email,
                name: 'Yash Patil',
                loggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            // Store user session
            if (remember) {
                localStorage.setItem('moviebook_user', JSON.stringify(user));
            } else {
                sessionStorage.setItem('moviebook_user', JSON.stringify(user));
            }
            
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect to user home page
            setTimeout(() => {
                window.location.href = '../User/home.html';
            }, 1500);
        }, 1000);
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const termsAccepted = formData.get('terms');
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showNotification('Please accept the Terms & Conditions', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Here you would normally make an API call
    // For demo purposes, we'll simulate a successful signup
    showNotification('Creating your account...', 'success');
    
    // Simulate API call
    setTimeout(() => {
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            name: `${firstName} ${lastName}`,
            loggedIn: true,
            signupTime: new Date().toISOString()
        };
        
        // Store user session
        localStorage.setItem('moviebook_user', JSON.stringify(user));
        
        showNotification('Account created successfully! Redirecting...', 'success');
        
        // Redirect to user dashboard
        setTimeout(() => {
            window.location.href = '../User/movie-list.html';
        }, 1500);
    }, 1500);
}

// Password Strength Checker
function checkPasswordStrength(e) {
    const password = e.target.value;
    const strengthBar = document.querySelector('.strength-bar');
    
    if (!strengthBar) return;
    
    let strength = 0;
    
    // Length
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Contains lowercase and uppercase
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    
    // Contains numbers
    if (password.match(/[0-9]/)) strength++;
    
    // Contains special characters
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    // Update strength bar
    strengthBar.classList.remove('weak', 'medium', 'strong');
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
}

// Validate Password Match
function validatePasswordMatch(e) {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = e.target.value;
    
    if (confirmPassword && password !== confirmPassword) {
        e.target.setCustomValidity('Passwords do not match');
        e.target.style.borderColor = '#e53935';
    } else {
        e.target.setCustomValidity('');
        e.target.style.borderColor = '';
    }
}

// Check if user is already logged in
function checkAuthStatus() {
    const user = localStorage.getItem('moviebook_user') || sessionStorage.getItem('moviebook_user');
    
    if (user) {
        const userData = JSON.parse(user);
        return userData;
    }
    
    return null;
}

// Logout function
function logout() {
    localStorage.removeItem('moviebook_user');
    sessionStorage.removeItem('moviebook_user');
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = '../auth/login.html';
    }, 1000);
}

// Show notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

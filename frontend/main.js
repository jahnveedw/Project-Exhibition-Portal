// Common functionality for all pages

// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Role selection
    const roleButtons = document.querySelectorAll('.role-btn');
    if (roleButtons.length > 0) {
        roleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                roleButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Update placeholder based on role
                const emailInput = document.getElementById('email');
                if (this.dataset.role === 'student') {
                    emailInput.placeholder = 'student@student.edu';
                } else {
                    emailInput.placeholder = 'faculty@university.edu';
                }
            });
        });
    }
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.querySelector('.role-btn.active').dataset.role;
            
            // Demo authentication
            //Here to put database
            const isFacultyValid = email === 'sarah_johnson@university.edu' && password === 'faculty123';
            const isStudentValid = email === 'john.smith@student.edu' && password === 'student123';
            
            if ((role === 'faculty' && isFacultyValid) || (role === 'student' && isStudentValid)) {
                // Store user data
                localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    role: role,
                    name: role === 'faculty' ? 'Dr. Sarah Johnson' : 'John Smith'
                }));
                
                // Redirect to dashboard
                window.location.href = role === 'faculty' ? 'faculty.html' : 'student.html';
            } else {
                alert('Invalid credentials. Please use the demo credentials provided.');
            }
        });
    }
    
    // Logout functionality
    const logoutBtns = document.querySelectorAll('#logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    });
    
    // Load user data on dashboard pages
    const welcomeElements = document.querySelectorAll('.welcome');
    if (welcomeElements.length > 0) {
        const userData = JSON.parse(localStorage.getItem('currentUser'));
        if (!userData) {
            window.location.href = 'index.html';
            return;
        }
        
        welcomeElements.forEach(el => {
            el.textContent = `Welcome, ${userData.name}`;
        });
    }
});
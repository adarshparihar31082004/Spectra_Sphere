function initializeNavbar() {
   const navMenu = document.getElementById('nav-menu'),
         navToggle = document.getElementById('nav-toggle'),
         navClose = document.getElementById('nav-close');

   if (navToggle && navMenu) {
       navToggle.addEventListener('click', () => {
           navMenu.classList.add('show-menu');
       });
   }

   if (navClose) {
       navClose.addEventListener('click', () => {
           navMenu.classList.remove('show-menu');
       });
   }

   const login = document.getElementById('login'),
         loginBtn = document.getElementById('login-btn'),
         loginClose = document.getElementById('login-close');

   if (loginBtn && login) {
       loginBtn.addEventListener('click', () => {
           login.classList.add('show-login');
       });
   }

   if (loginClose) {
       loginClose.addEventListener('click', () => {
           login.classList.remove('show-login');
       });
   }

   const signupBtn = document.getElementById('signup-btn');
   if (signupBtn) {
       signupBtn.addEventListener('click', function() {
           window.location.href = 'signup.html'; // Change to your actual signup page URL
       });
   }
}

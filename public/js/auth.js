document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Extract form data
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const data = {
        username: username,
        password: password,
      };

      try {
        // Send JSON data
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }

        const result = await response.json();
        alert('Login successful!');
        // Redirect to the Todo page or perform another action
        window.location.href = '/todo';
      } catch (error) {
        document.getElementById('error').innerText = error.message;
      }
    });
  }

  // Signup form submission
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Extract form data
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const data = {
        username: username,
        email: email,
        password: password,
      };

      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      
        if (response.ok) {
          const result = await response.json();
          alert('Login successful!');
          window.location.href = '/todo'; // Redirect on success
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }
        
      } catch (error) {
        document.getElementById('error').innerText = error.message;
      }
      
    });
  }
});

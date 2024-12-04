document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Extract form data
      const formData = new FormData(loginForm);
      const data = {
        username: formData.get('username'),
        password: formData.get('password'),
      };

      try {
        // Send JSON data
        const response = await fetch('http://localhost:3000/auth/login', {
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
        localStorage.setItem('token', result.token); // Save the token to localStorage
        alert('Login successful!');
        window.location.href = 'todos.html'; // Redirect to the Todo page
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
      const formData = new FormData(signupForm);
      const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        // Send JSON data
        const response = await fetch('http://localhost:3000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Signup failed');
        }

        alert('Signup successful! Please login.');
        window.location.href = 'login.html'; // Redirect to the Login page
      } catch (error) {
        document.getElementById('error').innerText = error.message;
      }
    });
  }
});

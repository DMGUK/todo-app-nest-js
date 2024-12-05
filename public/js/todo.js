// todos.js
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const todoList = document.getElementById('todoList');
  const addTodoButton = document.getElementById('addTodo');

  const fetchTodos = async () => {
      try {
          const response = await fetch('http://localhost:3000/todo', {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          const todos = await response.json();
          todoList.innerHTML = '';
          todos.forEach((todo) => {
              const li = document.createElement('li');
              li.classList.add('list-group-item');
              li.innerHTML = `
                  <h5>${todo.title}</h5>
                  <p>${todo.description}</p>
                  <p>Status: ${todo.isFinished ? 'Finished' : 'Not Finished'}</p>
                  <a href="/todo/${todo.id}/status" class="btn btn-primary btn-sm me-2">
                      Mark as ${todo.isFinished ? 'Unfinished' : 'Finished'}
                  </a>
                  <a href="/todo/${todo.id}/edit" class="btn btn-warning btn-sm me-2">Edit</a>
                  <a href="/todo/${todo.id}/delete" class="btn btn-danger btn-sm">Delete</a>
              `;
              todoList.appendChild(li);
          });
      } catch (error) {
          console.error('Error fetching todos:', error);
      }
  };

  if (addTodoButton) {
      addTodoButton.addEventListener('click', async () => {
          const title = document.getElementById('title').value;
          const description = document.getElementById('description').value;

          try {
              await fetch('http://localhost:3000/todo/create_todo', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ title, description }),
              });
              fetchTodos();
          } catch (error) {
              console.error('Error adding todo:', error);
          }
      });
  } else {
      console.error('Add Todo button not found.');
  }

  // Fetch todos on page load
  fetchTodos();
});

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
            <button class="btn btn-primary btn-sm me-2" onclick="toggleTodoStatus(${todo.id}, ${!todo.isFinished})">
              Mark as ${todo.isFinished ? 'Unfinished' : 'Finished'}
            </button>
            <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
          `;
          todoList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    window.toggleTodoStatus = async (id, isFinished) => {
      try {
        await fetch(`http://localhost:3000/todo/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isFinished }),
        });
        fetchTodos();
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    };
  
    window.deleteTodo = async (id) => {
      try {
        await fetch(`http://localhost:3000/todo/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
  
    addTodoButton.addEventListener('click', async () => {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
  
      try {
        await fetch('http://localhost:3000/todo', {
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
  
    // Fetch todos on page load
    fetchTodos();
  });
  
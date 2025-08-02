export function renderTodo(projectTitle, renderingList) {
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const todoContainer = document.getElementById('todo-container');
  let todoHTML = '';

  projectTitleBtn.textContent = projectTitle;
  
  if (renderingList[0]) {
    if (renderingList[0].id !== 0) {
      let margin = '';

      renderingList.forEach((todo) => {
        if (todo.project === projectTitle) {
          if (todo.dueDate) {
            margin = 'todo-due-date-margin';
          }

          todoHTML += `
            <li class="todo-item" data-id="${todo.id}">
              <div class="todo-title-row">
                <div class="check-mark ${todo.check} ${todo.priority}">
                  <svg class="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
                </div>
                <h3 class="todo-title">${todo.title}</h3>
              </div>
              <p class="todo-due-date-container">
                <span class="todo-due-date ${margin}">${todo.dueDate}</span>
                <span class="todo-time">${todo.time}</span>
              </p>
            </li>
          `;

          margin = '';
        }
      });
    }
  }
  todoContainer.innerHTML = todoHTML;  
}

import { compareAsc, format } from "date-fns";

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];

dates.sort(compareAsc);
//=> [
//   Wed Feb 11 1987 00:00:00,
//   Mon Jul 10 1989 00:00:00,
//   Sun Jul 02 1995 00:00:00
// ]

console.log(dates);

function projectController() {
  const dialogControlProject = document.querySelector('.dialog-control-project');
  const dialogCreateProject = document.querySelector('.dialog-create-project');
  const dialogEditProject = document.querySelector('.dialog-edit-project');
  const dialogDeleteProject = document.querySelector('.dialog-delete-project');
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const createProjectBtn = document.querySelector('.create-project-btn');
  const editProjectBtn = document.querySelector('.edit-project-btn');
  const deleteProjectBtn = document.querySelector('.delete-project-btn');
  const cancelProjectBtn = document.querySelector('.cancel-project-btn');
  const cancelCreateBtn = document.querySelector('.cancel-create-btn');
  const cancelEditBtn = document.querySelector('.cancel-edit-btn-for-project');
  const cancelDeleteBtn = document.querySelector('.cancel-delete-btn-for-project');
  const createBtn = document.querySelector('.create-btn-for-project');
  const editBtn = document.querySelector('.edit-btn-for-project');
  const deleteBtn = document.querySelector('.delete-btn-for-project');
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const arrowBtns = document.querySelectorAll('.arrow-btn');
  const projectTitleInput = document.getElementById('project-title');
  const editTitleInput = document.getElementById('edit-project-title');
  const alertNoProjectTitle = document.querySelector('.alert-no-project-title');
  const alertNoEditTitle = document.querySelector('.alert-no-edit-project-title');

  let projectList = [];

  const openControlProject = () => {
    dialogControlProject.showModal();
  };
  projectTitleBtn.addEventListener('click', (e) => {
    if (projectTitleBtn.textContent === 'Start Project') {
      openCreateProject(e);
    } else {
      openControlProject();
    }
  });
 
  const closeControlProject = (e) => {
    e.preventDefault();
    dialogControlProject.close();
  };
  cancelProjectBtn.addEventListener('click', closeControlProject);

  const openCreateProject = (e) => {
    e.preventDefault();
    closeControlProject(e);
    dialogCreateProject.showModal();
  };
  createProjectBtn.addEventListener('click', openCreateProject);

  const closeCreateProject = (e) => {
    e.preventDefault();
    dialogCreateProject.close();
    projectTitleInput.value = '';
    alertNoProjectTitle.style.visibility = 'hidden';
  };
  cancelCreateBtn.addEventListener('click', closeCreateProject);

  const createProject = (e) => {
    e.preventDefault();

    const projectTitle = projectTitleInput.value;
    const newProject = [];
    const idObject = {id: 0, project: projectTitle};
    newProject.push(idObject);

    if (projectTitle === '') {
      alertNoProjectTitle.style.visibility = 'visible';
      return;
    }

    if (addTodoBtn.style.visibility = 'hidden') {
      addTodoBtn.style.visibility = 'visible';
    }

    projectList.push(newProject);
    renderTodo(projectTitle, newProject);

    if (projectList[1]) {
      arrowBtns.forEach((btn) => {
        btn.style.visibility = 'visible';
      });
    }

    updateProjectList();
    closeCreateProject(e);
  };
  createBtn.addEventListener('click', createProject);

  const getProjectList = () => projectList;

  const openEditProject = (e) => {
    e.preventDefault();
    closeControlProject(e);
    dialogEditProject.showModal();
  };
  editProjectBtn.addEventListener('click', openEditProject);

  const closeEditProject = (e) => {
    e.preventDefault();
    dialogEditProject.close();
    editTitleInput.value = '';
    alertNoEditTitle.style.visibility = 'hidden';
    
  };
  cancelEditBtn.addEventListener('click', closeEditProject);

  const editProject = (e) => {
    e.preventDefault();

    const oldProjectTitle = projectTitleBtn.textContent;
    const newProjectTitle = editTitleInput.value;

    if (newProjectTitle === '') {
      alertNoEditTitle.style.visibility = 'visible';
      return;
    }

    projectPropertyEditor(oldProjectTitle, newProjectTitle);
    renderTodo(newProjectTitle);
    closeEditProject(e);
  };
  editBtn.addEventListener('click', editProject);

  const openDeleteProject = (e) => {
    e.preventDefault();
    closeControlProject(e);
    dialogDeleteProject.showModal();
  }
  deleteProjectBtn.addEventListener('click', openDeleteProject);

  const closeDeleteProject = (e) => {
    e.preventDefault();
    dialogDeleteProject.close();
  };
  cancelDeleteBtn.addEventListener('click', closeDeleteProject);

  const deleteProject = (e) => {
    e.preventDefault();

    const projectTitle = projectTitleBtn.textContent;
    const projectList = projectEraser(projectTitle);

    renderTodo('DELETED PROJECT', projectList);
    closeDeleteProject(e);
  };
  deleteBtn.addEventListener('click', deleteProject);

  const switchProject = (arrowBtn) => {
    let projectTitle = projectTitleBtn.textContent;
    if (arrowBtn.classList.contains('left-btn')) {
      let previousProject;

      projectList.forEach((list, i) => {
        list.forEach((todo) => {
          if (todo.project === projectTitle) {
            previousProject = projectList[i - 1];
          }
        });
      });
      if (!previousProject) {
        previousProject = projectList[projectList.length -1];
      }
      projectTitle = previousProject[0].project;
      renderTodo(projectTitle, previousProject);
    } else {
      let nextProject;

      projectList.forEach((list, i) => {
        list.forEach((todo) => {
          if (todo.project === projectTitle) {
            nextProject = projectList[i + 1];
          }
        });
      });
      if (!nextProject) {
        nextProject = projectList[0];
      }
      projectTitle = nextProject[0].project;
      renderTodo(projectTitle, nextProject);
    }
    todo.updateCurrentList();
  };
  arrowBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => switchProject(e.target))});

  return {getProjectList};
}

const project = projectController();

function updateProjectList() {
  let projectList = add.getProjectList();

  if (!projectList[0]) {
    projectList = project.getProjectList();
  }
  
  const getProjectList = () => projectList;
  console.log(projectList);
  return {getProjectList};
}

function projectPropertyEditor(oldProjectTitle, newProjectTitle) {
  const projectList = updateProjectList().getProjectList();

  projectList.forEach((list) => {
    if (list[0].project === oldProjectTitle) {
      list.forEach((todo) => {
        todo.project = newProjectTitle;
      });
    }
  });
}

function projectEraser(projectTitle) {
  const projectList = updateProjectList().getProjectList();
  
  projectList.forEach((list, i) => {
    
    if (list[0].project === projectTitle) {
      projectList.splice(i, 1);
    }
  });
  
  return projectList;
}

function todoGenerator(project, title, description, dueDate, time, priority) {
  return {
    id: crypto.randomUUID(), project, check: 'unchecked', title, description, dueDate, time, priority
  };
}

function addTodo() {
  const dialogAddTodo = document.querySelector('.dialog-add-todo');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const dueDate = document.getElementById('due-date');
  const time = document.getElementById('time');
  const priority = document.getElementById('priority');
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const cancelAddBtn = document.querySelector('.cancel-add-btn-for-project');
  const addBtn = document.querySelector('.add-btn-for-project');
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const alertNoTodoTitle = document.querySelector('.alert-no-todo-title');

  let projectList = [];

  const openAddTodo = (e) => {
    e.preventDefault();
    dialogAddTodo.showModal();
  };
  addTodoBtn.addEventListener('click', openAddTodo);

  const closeAddTodo = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (alertNoTodoTitle.style.visibility = 'visible') {
      alertNoTodoTitle.style.visibility = 'hidden';
    }
    dialogAddTodo.close();
    title.value = '';
    description.value = '';
    dueDate.value = '';
    time.value = '';
    priority.value = '';
  };
  cancelAddBtn.addEventListener('click', closeAddTodo);

  const addTodoToProject = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (title.value === '') {
      alertNoTodoTitle.style.visibility = 'visible';
      return;
    }

    const dueDateInput = dueDate.value.replace(/-/g, ',');
    let dueDateValue;
    
    if (!dueDate.value) {
      dueDateValue = dueDate.value;
    } else {
      dueDateValue = format(new Date(dueDateInput), 'EEE MM-dd-yyyy');
    }

    const timeInput = time.value.split('');
    const hours = timeInput[0] + timeInput[1];
    const minutes = timeInput[3] + timeInput[4];
    let timeValue;
    
    if (!time.value) {
      timeValue = time.value;
    } else {
      timeValue = format(new Date(2025, 7, 28, hours, minutes), 'h:mm aaa');
    }
    
    const projectTitle = projectTitleBtn.textContent;
    const newTodo = todoGenerator(projectTitle, title.value, description.value, dueDateValue, timeValue, priority.value);
    
    projectList = project.getProjectList();
    
    if (!projectList[1]) {
      if (projectList[0][0].id === 0) {
        projectList[0] = [];
      }
      projectList[0].push(newTodo);
      renderTodo(projectTitle, projectList[0]);
    } else {
      let index;

      projectList.forEach((list, i) => {
        const projectTitleBtn = document.querySelector('.project-title-btn');
        const projectTitle = projectTitleBtn.textContent;

        if (list[0]) {
          if (projectTitle === list[0].project) {
            index = i;
            if(projectList[i][0].id === 0) {
              projectList[index] = [];
            }
            projectList[index].push(newTodo);
          }
        }
      });
      renderTodo(projectTitle, projectList[index]);
    }
    todo.updateCurrentList();
    closeAddTodo();
  }
  addBtn.addEventListener('click', addTodoToProject);

  const getProjectList = () => projectList;
  
  return {addTodoToProject, getProjectList};
}

const add = addTodo();

function todoController() {
  const dialogControlTodo = document.querySelector('.dialog-control-todo');
  const dialogEditTodo = document.querySelector('.dialog-edit-todo');
  const dialogDeleteTodo = document.querySelector('.dialog-delete-todo');
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const cancelTodoBtn = document.querySelector('.cancel-todo-btn');
  const finishTodoBtn = document.querySelector('.finish-todo-btn');
  const editTodoBtn = document.querySelector('.edit-todo-btn');
  const deleteTodoBtn = document.querySelector('.delete-todo-btn');
  const cancelEditBtn = document.querySelector('.cancel-edit-btn-for-todo');
  const cancelDeleteBtn = document.querySelector('.cancel-delete-btn-for-todo');
  const editBtn = document.querySelector('.edit-btn-for-todo');
  const deleteBtn = document.querySelector('.delete-btn-for-todo');
  const alertNoEditTitle = document.querySelector('.alert-no-edit-todo-title');
  const titleForEdit = document.getElementById('title-for-edit');
  const descriptionForEdit = document.getElementById('description-for-edit');
  const dueDateForEdit = document.getElementById('due-date-for-edit');
  const timeForEdit = document.getElementById('time-for-edit');
  const priorityForEdit = document.getElementById('priority-for-edit');
  const todoDescription = document.querySelector('.todo-description');

  let projectTitle;
  let projectList;
  let todoItems;
  let id;
  let checkMark;
  let currentList;
  let editIndex;
  let currentDescription;

  const updateCurrentList = () => {
    const todoItem = document.querySelector('.todo-item');
    if (todoItem) {
      todoItem.addEventListener('click', openControlTodo);
    }

    projectTitle = projectTitleBtn.textContent;
    projectList = updateProjectList().getProjectList();

    projectList.forEach((list) => {
      if (list[0].project === projectTitle) {
        currentList = list;
      }
    });

    if (currentList[1]) {
      todoItems = document.querySelectorAll('.todo-item');
      todoItems.forEach((item) => {
        item.addEventListener('click', openControlTodo);
      });
    }
  };

  const openControlTodo = (e) => {
    if (e.target.classList.contains('todo-item')) {
      id = e.target.dataset.id;
      checkMark = e.target.children[0].children[0];
    } else if (e.target.classList.contains('todo-title-row')) {
      id = e.target.parentElement.dataset.id;
      checkMark = e.target.children[0];
    } else if (e.target.classList.contains('check-mark-svg')) {
      id = e.target.parentElement.parentElement.parentElement.dataset.id;
      checkMark = e.target.parentElement;
    } else if (e.target.classList.contains('todo-title')) {
      id = e.target.parentElement.parentElement.dataset.id;
      checkMark = e.target.previousElementSibling;
    } else if (e.target.classList.contains('todo-due-date')) {
      id = e.target.parentElement.dataset.id;
      checkMark = e.target.previousElementSibling.children[0];
    } else {
      id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
      checkMark = e.target.parentElement.parentElement;
    }

    currentList.forEach((todo) => {
      if (todo.id === id) {
        if (todo.description === '') {
          currentDescription = 'No description';
        } else {
          currentDescription = todo.description;
        }
      }
    });
    
    todoDescription.textContent = currentDescription;
    dialogControlTodo.showModal();
  };

  const closeControlTodo = (e) => {
    e.preventDefault();
    dialogControlTodo.close();
  }
  cancelTodoBtn.addEventListener('click', closeControlTodo);

  const finishTodo = (e) => {
    e.preventDefault();
    
    currentList.forEach((todo) => {
      if (todo.id === id) {
        if (checkMark.classList.contains('unchecked')) {
          checkMark.classList.replace('unchecked', 'checked');
          todo.check = 'checked';
        } else {
          checkMark.classList.replace('checked', 'unchecked');
          todo.check = 'unchecked';
        }
      }
    });
    
    closeControlTodo(e);
  };
  finishTodoBtn.addEventListener('click', finishTodo);

  const openEditTodo = (e) => {
    e.preventDefault();
    closeControlTodo(e);

    currentList.forEach((todo, i) => {
      if (todo.id === id) {
        editIndex = i;
      }
    });

    const currentValue = currentList[editIndex];
    const date = currentValue.dueDate.slice(4).split('-');
    const currentDueDate = date[2] + '-' + date[0] + '-' + date[1];
    const time = currentValue.time.slice(0).split('');
    let hours;
    let hour;
    let minutes;
    
    if (time[1] !== ':') {
      hour = time[0] + time[1];
      minutes = time[3] + time[4];
    } else {
      hour = time[0];
      minutes = time[2] + time[3];
    }
    
    if (time[time.length - 2] === 'p') {
      if (hour === '12') {
        hours = hour;
      } else {
        hours = (Number(hour) + 12).toString();
      }
    } else {
      if (hour === '12') {
        hours = '0' + (Number(hour) - 12).toString();
      } else if (hour === '10' || hour === '11') {
        hours = hour;
      } else {
        hours = '0' + hour;
      }
    }

    const currentTime = hours + ':' + minutes;

    titleForEdit.value = currentValue.title;
    descriptionForEdit.value = currentValue.description;
    dueDateForEdit.value = currentDueDate;
    timeForEdit.value = currentTime;
    priorityForEdit.value = currentValue.priority;

    dialogEditTodo.showModal();
  };
  editTodoBtn.addEventListener('click', openEditTodo);

  const closeEditTodo  = (e) => {
    e.preventDefault();
    dialogEditTodo.close();
    alertNoEditTitle.style.visibility = 'hidden';
  };
  cancelEditBtn.addEventListener('click', closeEditTodo);
  
  const editTodo = (e) => {
    e.preventDefault();

    if (titleForEdit.value === '') {
      alertNoEditTitle.style.visibility = 'visible';
      return;
    }

    const dueDateInput = dueDateForEdit.value.replace(/-/g, ',');
    let dueDateValue;
    
    if (!dueDateForEdit.value) {
      dueDateValue = dueDateForEdit.value;
    } else {
      dueDateValue = format(new Date(dueDateInput), "EEE MM-dd-yyyy");
    }

    const timeInput = timeForEdit.value.split('');
    const hours = timeInput[0] + timeInput[1];
    const minutes = timeInput[3] + timeInput[4];
    let timeValue;
    
    if (!timeForEdit.value) {
      timeValue = timeForEdit.value;
    } else {
      timeValue = format(new Date(2025, 7, 28, hours, minutes), 'h:mm aaa');
    }

    const currentTodo = currentList[editIndex];

    currentTodo.title = titleForEdit.value;
    currentTodo.description = descriptionForEdit.value;
    currentTodo.dueDate = dueDateValue;
    currentTodo.time = timeValue;
    currentTodo.priority = priorityForEdit.value;

    renderTodo(projectTitle, currentList);
    closeEditTodo(e);
    todo.updateCurrentList();
  }
  editBtn.addEventListener('click', editTodo);

  const openDeleteTodo = (e) => {
    e.preventDefault();
    dialogControlTodo.close();
    dialogDeleteTodo.showModal();
  };
  deleteTodoBtn.addEventListener('click', openDeleteTodo);

  const closeDeleteTodo = (e) => {
    e.preventDefault();
    dialogDeleteTodo.close();
  };
  cancelDeleteBtn.addEventListener('click', closeDeleteTodo);

  const deleteTodo = (e) => {
    e.preventDefault();

    currentList.forEach((todo, i) => {
      if (todo.id === id) {
        currentList.splice(i, 1);
      }
    });

    if (!currentList[0]) {
      const idObject = {id: 0, project: projectTitle};
      currentList.push(idObject);
    }
    
    renderTodo(projectTitle, currentList);
    closeDeleteTodo(e);
    todo.updateCurrentList();
  };
  deleteBtn.addEventListener('click', deleteTodo);

  return {updateCurrentList};
};

const todo  = todoController();

const todoOne = todoGenerator('Daily Life', 'Clean the room', 'Clean the living room and the bathroom.', 'Thu Jul. 17', '10:30', 'medium');
const todoTwo = todoGenerator('Daily Life', 'Buy some foods', 'Go to the abc market and get eggs, tomato and rice.', 'Fri Jul. 18', '17:30', 'high');
const todoThree = todoGenerator('Daily Life', 'Watch youtube videos', 'Watch some English videos to brush up my listening skill.', 'Sat Jul. 19', '21:00', 'low');
const todoFour = todoGenerator('Work', 'Attend the meeting', 'Attend the project team meeting and discuss about the progress of the project.', 'Mon Jul. 21', '13:30', 'high');
const todoFive = todoGenerator('Work', 'Complete the code', 'Finish to debug the Javascript code.', 'Thu Jul. 24', '9:00', 'medium');
const todoSix = todoGenerator('Daily Life', 'Walk along the river', 'Walk along the river for 30 min as an exercise', 'Thu Jul. 18', '15:00', 'medium');

// modifier.addToProject(todoOne);
// modifier.addToProject(todoTwo);
// modifier.addToProject(todoThree);
// modifier.addToProject(todoFour);
// modifier.addToProject(todoFive);
// modifier.addToProject(todoSix);


function renderTodo(projectTitle, renderingList) {
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const arrowBtns = document.querySelectorAll('.arrow-btn');
  const container = document.getElementById('container');
  const todoDueDateValue = document.querySelector('.todo-due-date-value');
  let todoHTML = '';
  let latestList;

  if (projectTitle && projectTitle !== 'DELETED PROJECT') {
    projectTitleBtn.textContent = projectTitle;
  }
  
  if (!renderingList && projectTitle !== 'DELETED PROJECT') {
    return;
  }

  if (projectTitle === 'DELETED PROJECT') {
    if (!renderingList[0]) {
      projectTitleBtn.textContent = 'Start Project';
      addTodoBtn.style.visibility = 'hidden';

      return container.innerHTML = todoHTML;
    } else {
      if (renderingList.length === 1) {
        arrowBtns.forEach((btn) => {
          btn.style.visibility = 'hidden';
        });
      }
      latestList = renderingList[renderingList.length -1];
    }
  }
  if (latestList) {
    projectTitleBtn.textContent = latestList[0].project;
    if (latestList[0].id !== 0) {
      latestList.forEach((todo) => {
        if (!todo.dueDate) {
          todoHTML += `
          <li class="todo-item" data-id="${todo.id}">
            <div class="todo-title-row">
              <div class="check-mark ${todo.check} ${todo.priority}">
                <svg class="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
              </div>
              <h3 class="todo-title">${todo.title}</h3>
            </div>
            <p class="todo-due-date">
              <span>${todo.dueDate}</span>
              <span>${todo.time}</span>
            </p>
          </li>
        `;
        } else {
          todoHTML += `
          <li class="todo-item" data-id="${todo.id}">
            <div class="todo-title-row">
              <div class="check-mark ${todo.check} ${todo.priority}">
                <svg class="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
              </div>
              <h3 class="todo-title">${todo.title}</h3>
            </div>
            <p class="todo-due-date">
              <span class="todo-due-date-value">${todo.dueDate}</span>
              <span>${todo.time}</span>
            </p>
          </li>
        `;
        }
      });
    }
  } else if (renderingList[0] && renderingList[0].id !== 0) {
    renderingList.forEach((todo) => {
      if (todo.project === projectTitle) {
        if (!todo.dueDate) {
          todoHTML += `
          <li class="todo-item" data-id="${todo.id}">
            <div class="todo-title-row">
              <div class="check-mark ${todo.check} ${todo.priority}">
                <svg class="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
              </div>
              <h3 class="todo-title">${todo.title}</h3>
            </div>
            <p class="todo-due-date">
              <span>${todo.dueDate}</span>
              <span>${todo.time}</span>
            </p>
          </li>
        `;
        } else {
          todoHTML += `
          <li class="todo-item" data-id="${todo.id}">
            <div class="todo-title-row">
              <div class="check-mark ${todo.check} ${todo.priority}">
                <svg class="check-mark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check-bold</title><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
              </div>
              <h3 class="todo-title">${todo.title}</h3>
            </div>
            <p class="todo-due-date">
              <span class="todo-due-date-value">${todo.dueDate}</span>
              <span>${todo.time}</span>
            </p>
          </li>
        `;
        }
      }
    });
  }
  container.innerHTML = todoHTML;
}


import { compareAsc, format } from "date-fns";

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

  let projectTitle;
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
    if (e.type === 'click') {
      e.preventDefault();
    }
    dialogCreateProject.close();
    projectTitleInput.value = '';
    alertNoProjectTitle.style.visibility = 'hidden';
  };
  cancelCreateBtn.addEventListener('click', closeCreateProject);

  const createProject = (e) => {
    if (e.type === 'click') {
      e.preventDefault();
    }

    if (e.type !== 'click') {
      projectTitle = e;
    } else {
      projectTitle = projectTitleInput.value;
    }
    
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

    projectTitle = projectTitleBtn.textContent;
    editTitleInput.value = projectTitle;
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
    projectList = updateProjectList().getProjectList();

    if (newProjectTitle === '') {
      alertNoEditTitle.style.visibility = 'visible';
      return;
    }

    projectList.forEach((list) => {
      if (list[0].project === oldProjectTitle) {
        list.forEach((todo) => {
          todo.project = newProjectTitle;
        });
      }
    });

    renderTodo(newProjectTitle);
    todo.updateCurrentList()
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

    projectTitle = projectTitleBtn.textContent;
    projectList = updateProjectList().getProjectList();
    
    projectList.forEach((list, i) => {
      if (list[0].project === projectTitle) {
        projectList.splice(i, 1);
      }
    });

    renderTodo('DELETED PROJECT', projectList);
    todo.updateCurrentList();
    closeDeleteProject(e);
  };
  deleteBtn.addEventListener('click', deleteProject);

  const switchProject = (arrowBtn, initialLoading) => {
    projectTitle = projectTitleBtn.textContent;
    projectList = updateProjectList().getProjectList();
    let sendingProject;

    if (initialLoading) {
      projectTitle = projectList[0][0].project;
      sendingProject = projectList[0];
    }

    if (arrowBtn) {
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
        sendingProject = previousProject;
      } else if (arrowBtn.classList.contains('right-btn')) {
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
        sendingProject = nextProject;
      }
    }
    renderTodo(projectTitle, sendingProject);
    todo.updateCurrentList();
  };
  arrowBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => switchProject(e.target));
  });

  return {createProject, getProjectList, switchProject};
}

function updateProjectList(list, listIndex) {
  let projectList = add.getProjectList();

  if (!projectList[0]) {
    projectList = project.getProjectList();
  }
  if (list) {
    if (list[0]) {
      if (listIndex !== 'all') {
        projectList[listIndex] = list;
      } else {
        const storedList = list;
        
        storedList.forEach((list) => {
          project.createProject(list[0].project);

          list.forEach((todo) => {
            if (todo.id === 0) {
              return;
            }
            const todoItem = todoGenerator(todo.project, todo.check, todo.title, todo.description, todo.dueDate, todo.time, todo.priority);
            add.addTodoToProject(todoItem);
          });
        });
      }
    }
  }
  
  const getProjectList = () => projectList;
  localStorage.setItem('projectList', JSON.stringify(projectList));
  console.log(projectList);
  return {getProjectList};
}

function todoGenerator(project, check, title, description, dueDate, time, priority) {
  return {
    id: crypto.randomUUID(), project, check, title, description, dueDate, time, priority
  };
}

function formatTime(time) {
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

  return {hours, minutes};
}

function reorderList(list) {
  let date = [];
  let newOrder = [];

  list.forEach((todo, i) => {
    const time = formatTime(todo.time.slice(0).split(''));
    const hours = time.hours;
    const minutes = time.minutes;
    const dateElement = todo.dueDate.slice(4).replace(/-/g, ',').split(',').map((item) => (Number(item)));
    dateElement[0] -= 1;
    date.push([new Date(dateElement[2], dateElement[0], dateElement[1], hours, minutes), i]);
  });
  
  date.sort(compareAsc);
  date.map((item) => newOrder.push(item[1]));
  const reorderedList = newOrder.map((index) => list[index]);
  return reorderedList;
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

  let projectTitle;
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
    title.value = '';
    description.value = '';
    dueDate.value = '';
    time.value = '';
    priority.value = '';
    dialogAddTodo.close();
  };
  cancelAddBtn.addEventListener('click', closeAddTodo);

  const addTodoToProject = (e) => {
    let defaultTodo;
    let check;

    if (e.type === 'click') {
      e.preventDefault();
    } else {
      defaultTodo = e;
    }

    if (title.value === '' && !defaultTodo) {
      alertNoTodoTitle.style.visibility = 'visible';
      return;
    }

    if (defaultTodo) {
      check = defaultTodo.check;
    } else {
      check = 'unchecked';
    }

    const dueDateInput = dueDate.value.replace(/-/g, ',').split(',').map((item) => (Number(item)));
    const timeInput = time.value.split('');
    const hours = timeInput[0] + timeInput[1];
    const minutes = timeInput[3] + timeInput[4];
    let dueDateValue = '';
    let timeValue = '';
    
    if (dueDate.value) {
      dueDateValue = format(new Date(dueDateInput), 'EEE MM-dd-yyyy');
    }
    if (time.value) {
      timeValue = format(new Date(2025, 7, 28, hours, minutes), 'h:mm aaa');
    }
    
    projectTitle = projectTitleBtn.textContent;
    projectList = updateProjectList().getProjectList();

    let newTodo = todoGenerator(projectTitle, check, title.value, description.value, dueDateValue, timeValue, priority.value);

    if (defaultTodo) {
      newTodo = defaultTodo;
    }

    let currentIndex;

    projectList.forEach((list, i) => {
      if (projectTitle === list[0].project) {
        currentIndex = i;
        if(projectList[i][0].id === 0) {
          projectList[currentIndex] = [];
        }
        projectList[currentIndex].push(newTodo);

        if (projectList[i][1]) {
          const reorderedList = reorderList(list);
          projectList[i] = reorderedList;
        }
      }
    });

    renderTodo(projectTitle, projectList[currentIndex]);
    todo.updateCurrentList();
    closeAddTodo();
  }
  addBtn.addEventListener('click', addTodoToProject);

  const getProjectList = () => projectList;
  
  return {addTodoToProject, getProjectList};
}

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
  let projectList = [];
  let currentList = [];
  let listIndex;
  let editIndex;
  let id;
  let checkMark;
  let currentDescription;
  let currentTodo;

  const updateCurrentList = () => {
    const todoItem = document.querySelector('.todo-item');
    if (todoItem) {
      todoItem.addEventListener('click', openControlTodo);
    }

    projectTitle = projectTitleBtn.textContent;
    projectList = updateProjectList().getProjectList();
    
    projectList.forEach((list, i) => {
      if (list[0].project === projectTitle) {
        currentList = list;
        listIndex = i;
      }
    });
  
    if (currentList) {
      if (currentList[1]) {
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach((item) => {
          item.addEventListener('click', openControlTodo);
        });
      }
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
    } else if (e.target.classList.contains('todo-due-date-container')) {
      id = e.target.parentElement.dataset.id;
      checkMark = e.target.previousElementSibling.children[0];
    } else if (e.target.classList.contains('todo-due-date') || e.target.classList.contains('todo-time')) {
      id = e.target.parentElement.parentElement.dataset.id;
      checkMark = e.target.parentElement.previousElementSibling.children[0];
    } else {
      id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
      checkMark = e.target.parentElement.parentElement;
    }
    
    currentList.forEach((todo) => {
      if (todo.id === id) {
        if (todo.description === '') {
          currentDescription = 'No description';
          todoDescription.classList.add('no-todo-description');
        } else {
          currentDescription = todo.description;
          if (todoDescription.classList.contains('no-todo-description')) {
            todoDescription.classList.remove('no-todo-description');
          }
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
    
    updateCurrentList();
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

    currentTodo = currentList[editIndex];
    
    const date = currentTodo.dueDate.slice(4).split('-');
    const currentDueDate = date[2] + '-' + date[0] + '-' + date[1];
    const time = formatTime(currentTodo.time.slice(0).split(''));
    const currentTime = time.hours + ':' + time.minutes;

    titleForEdit.value = currentTodo.title;
    descriptionForEdit.value = currentTodo.description;
    dueDateForEdit.value = currentDueDate;
    timeForEdit.value = currentTime;
    priorityForEdit.value = currentTodo.priority;

    dialogEditTodo.showModal();
  };
  editTodoBtn.addEventListener('click', openEditTodo);

  const closeEditTodo  = (e) => {
    e.preventDefault();
    alertNoEditTitle.style.visibility = 'hidden';
    dialogEditTodo.close();
  };
  cancelEditBtn.addEventListener('click', closeEditTodo);
  
  const editTodo = (e) => {
    e.preventDefault();

    if (titleForEdit.value === '') {
      alertNoEditTitle.style.visibility = 'visible';
      return;
    }

    const dueDateInput = dueDateForEdit.value.replace(/-/g, ',').split(',').map((item) => (Number(item)));
    const timeInput = timeForEdit.value.split('');
    const hours = timeInput[0] + timeInput[1];
    const minutes = timeInput[3] + timeInput[4];
    let dueDateValue = '';
    let timeValue = '';
    
    if (dueDateForEdit.value) {
      dueDateValue = format(new Date(dueDateInput), 'EEE MM-dd-yyyy');
    }   
    if (timeForEdit.value) {
      timeValue = format(new Date(2025, 7, 28, hours, minutes), 'h:mm aaa');
    }

    currentTodo = currentList[editIndex];

    currentTodo.title = titleForEdit.value;
    currentTodo.description = descriptionForEdit.value;
    currentTodo.dueDate = dueDateValue;
    currentTodo.time = timeValue;
    currentTodo.priority = priorityForEdit.value;

    if (currentList[1]) {
      const reorderedList = reorderList(currentList);
      currentList = reorderedList;
    }
    
    renderTodo(projectTitle, currentList);
    updateProjectList(currentList, listIndex);
    updateCurrentList();
    closeEditTodo(e);
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
    todo.updateCurrentList();
    closeDeleteTodo(e);
  };
  deleteBtn.addEventListener('click', deleteTodo);

  return {updateCurrentList};
};

function renderTodo(projectTitle, list, showAddBtn, showArrowBtns) {
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const arrowBtns = document.querySelectorAll('.arrow-btn');
  const todoContainer = document.getElementById('todo-container');
  let todoHTML = '';
  let renderingList;

  if (projectTitle && projectTitle !== 'DELETED PROJECT') {
    projectTitleBtn.textContent = projectTitle;
  }
  
  if (!list && projectTitle !== 'DELETED PROJECT') {
    return;
  }

  if (showAddBtn) {
    addTodoBtn.style.visibility = 'visible';
  }
  if (showArrowBtns) {
    arrowBtns.forEach(btn => btn.style.visibility = 'visible');
  }

  if (projectTitle === 'DELETED PROJECT') {
    if (!list[0]) {
      projectTitleBtn.textContent = 'Start Project';
      addTodoBtn.style.visibility = 'hidden';

      return todoContainer.innerHTML = todoHTML;
    } else {
      if (list.length === 1) {
        arrowBtns.forEach((btn) => btn.style.visibility = 'hidden');
      }
      renderingList = list[list.length -1];
      projectTitle = renderingList[0].project;
      projectTitleBtn.textContent = projectTitle;
    }
  } else {
    renderingList = list;
  }
  
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
  todoContainer.innerHTML = todoHTML;  
}

const project = projectController();
const add = addTodo();
const todo = todoController();

// some default items
const todoOne = todoGenerator('Daily life', 'unchecked', 'Clean the rooms', 'Clean the living room and the bathroom.', 'Sat 08-02-2025', '10:30 am', 'medium');
const todoTwo = todoGenerator('Daily life', 'unchecked', 'Buy foods', 'Go to XYZ store and get eggs, rice and vegetables.', 'Sun 08-03-2025', '5:30 pm', 'high');
const todoThree = todoGenerator('Daily life', 'unchecked', 'Watch videos', 'Watch some English videos on YouTube to brush up my listening skill.', 'Sun 08-03-2025', '9:00 pm', 'low');
const todoFour = todoGenerator('My work', 'unchecked', 'Attend the meeting', 'Attend the team meeting and discuss about the progress of the project.', 'Mon 08-04-2025', '1:30 pm', 'medium');
const todoFive = todoGenerator('My work', 'unchecked', 'Complete the project', 'Finish styling the page and fix some minor bugs.', 'Tue 08-05-2025', '5:00 pm', 'high');

// localStorage.removeItem('projectList');

const storedList = JSON.parse(localStorage.getItem('projectList'));

if (storedList) {
  updateProjectList(storedList, 'all');
} else {
  project.createProject('Daily life');
  add.addTodoToProject(todoOne);
  add.addTodoToProject(todoTwo);
  add.addTodoToProject(todoThree);
  project.createProject('My work');
  add.addTodoToProject(todoFour);
  add.addTodoToProject(todoFive);
}

project.switchProject('', 'initialLoading');
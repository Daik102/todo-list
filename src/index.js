import './styles.css';
import { projectController } from './project-controller';

import {
  todoGenerator,
  todoController,
} from './todo-controller';

import { renderTodo } from './render';

const project = projectController();
const todo = todoController();

const projectTitleBtn = document.querySelector('.project-title-btn');
const cancelProjectBtn = document.querySelector('.cancel-project-btn');
const createProjectBtn = document.querySelector('.create-project-btn');
const cancelCreateBtn = document.querySelector('.cancel-create-btn');
const createBtn = document.querySelector('.create-btn-for-project');
const editProjectBtn = document.querySelector('.edit-project-btn');
const cancelEditBtn = document.querySelector('.cancel-edit-btn-for-project');
const editBtn = document.querySelector('.edit-btn-for-project');
const deleteProjectBtn = document.querySelector('.delete-project-btn');
const cancelDeleteBtn = document.querySelector('.cancel-delete-btn-for-project');
const deleteBtn = document.querySelector('.delete-btn-for-project');
const arrowBtns = document.querySelectorAll('.arrow-btn');

const addTodoBtn = document.querySelector('.add-todo-btn');
const cancelAddBtn = document.querySelector('.cancel-add-btn-for-project');
const addBtn = document.querySelector('.add-btn-for-project');
const cancelTodoBtn = document.querySelector('.cancel-todo-btn');
const completeTodoBtn = document.querySelector('.complete-todo-btn');
const editTodoBtn = document.querySelector('.edit-todo-btn');
const cancelEditBtnForTodo = document.querySelector('.cancel-edit-btn-for-todo');
const editBtnForTodo = document.querySelector('.edit-btn-for-todo');
const deleteTodoBtn = document.querySelector('.delete-todo-btn');
const cancelDeleteBtnForTodo = document.querySelector('.cancel-delete-btn-for-todo');
const deleteBtnForTodo = document.querySelector('.delete-btn-for-todo');

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const btnContainerForControlProject = document.querySelector('.btn-container-for-control-project');
const btnContainerForControlTodo = document.querySelector('.btn-container-for-control-todo');
const projectTitleInput = document.getElementById('project-title');
const editTitleInput = document.getElementById('edit-project-title');
const dueDate = document.getElementById('due-date');
const time = document.getElementById('time');
const priority = document.getElementById('priority');
const todoContainer = document.getElementById('todo-container');
const adminLink = document.querySelector('.admin-link');
const titleForEdit = document.getElementById('title-for-edit');
const descriptionForEdit = document.getElementById('description-for-edit');
const dueDateForEdit = document.getElementById('due-date-for-edit');
const timeForEdit = document.getElementById('time-for-edit');
const priorityForEdit = document.getElementById('priority-for-edit');

projectTitleBtn.addEventListener('click', () => {
  if (projectTitleBtn.textContent === 'Start Project') {
    project.openCreateProject();
  } else {
    project.openControlProject();
  }
});

cancelProjectBtn.addEventListener('click', (e) => {
  project.closeControlProject(e);
});

createProjectBtn.addEventListener('click', project.openCreateProject);
cancelCreateBtn.addEventListener('click', project.closeCreateProject);
createBtn.addEventListener('click', project.createProject);
editProjectBtn.addEventListener('click', project.openEditProject);
cancelEditBtn.addEventListener('click', project.closeEditProject);
editBtn.addEventListener('click', project.editProject);
deleteProjectBtn.addEventListener('click', project.openDeleteProject);
cancelDeleteBtn.addEventListener('click', project.closeDeleteProject);
deleteBtn.addEventListener('click', project.deleteProject);

arrowBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => project.switchProject(e.target.classList[1]));
});

addTodoBtn.addEventListener('click', todo.openAddTodo);

cancelAddBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.closeAddTodo(projectList);
});

addBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.addTodoToProject(projectList);
});

cancelTodoBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.closeControlTodo(projectList);
});

completeTodoBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.completeTodo(projectList);
});

editTodoBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.openEditTodo(projectList);
});

cancelEditBtnForTodo.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.closeEditTodo(projectList);
});

editBtnForTodo.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.editTodo(projectList);
});

deleteTodoBtn.addEventListener('click', todo.openDeleteTodo);

cancelDeleteBtnForTodo.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.closeDeleteTodo(projectList);
});

deleteBtnForTodo.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.deleteTodo(projectList);
});

projectTitleBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    project.switchProject(e.key);
  } else if (e.key === 'ArrowUp') {
    adminLink.focus();
  } else if (e.key === 'ArrowDown') {
    addTodoBtn.focus();
  }
});

leftBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    project.switchProject(e.key);
  } else if (e.key === 'ArrowRight') {
    projectTitleBtn.focus();
  } else if (e.key === 'ArrowUp') {
    adminLink.focus();
  } else if (e.key === 'ArrowDown') {
    addTodoBtn.focus();
  }
});

rightBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    projectTitleBtn.focus();
  } else if (e.key === 'ArrowRight') {
    project.switchProject(e.key);
  } else if (e.key === 'ArrowUp') {
    adminLink.focus();
  } else if (e.key === 'ArrowDown') {
    addTodoBtn.focus();
  }
});

btnContainerForControlProject.addEventListener('keydown', (e) => {
  const btns = document.querySelectorAll('.btn-for-control-project');
  const activeElement = document.activeElement;
  const currentIndex = Array.from(btns).indexOf(activeElement);
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (currentIndex < btns.length - 1) {
      btns[currentIndex + 1].focus();
    } else {
      btns[0].focus();
    }
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (currentIndex > 0) {
      btns[currentIndex - 1].focus();
    } else {
      btns[btns.length - 1].focus();
    }
  }
});

projectTitleInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
    createBtn.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
    cancelCreateBtn.focus();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    project.createProject();
  }
});

cancelCreateBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    projectTitleInput.focus();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    createBtn.focus();
  }
});

createBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    projectTitleInput.focus();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    cancelCreateBtn.focus();
  }
});

editTitleInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
    editBtn.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
    cancelEditBtn.focus();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    project.editProject();
  }
});

cancelEditBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    editTitleInput.focus();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    editBtn.focus();
  }
});

editBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    editTitleInput.focus();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    cancelEditBtn.focus();
  }
});

cancelDeleteBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    deleteBtn.focus();
  }
});

deleteBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    cancelDeleteBtn.focus();
  }
});

addTodoBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    projectTitleBtn.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const firstItem = document.querySelector('.todo-item');
    firstItem.focus();
  }
});

title.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    addBtn.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    description.focus();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const projectList = project.getProjectList();
    todo.addTodoToProject(projectList);
  }
});

description.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    title.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    dueDate.focus();
    dueDate.showPicker();
  }
});

dueDate.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      description.focus();
    } else {
      time.focus();
      time.showPicker();
    }
  }
});

time.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      dueDate.focus();
      dueDate.showPicker();
    } else {
      priority.focus();
      priority.showPicker();
    }
  }
});

priority.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      time.focus();
      time.showPicker();
    } else {
      cancelAddBtn.focus();
    }
  }
});

cancelAddBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    priority.focus();
    priority.showPicker();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    addBtn.focus();
  }
});

addBtn.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    cancelAddBtn.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    title.focus();
  }
});

todoContainer.addEventListener('keydown', (e) => {
  const todoItems = document.querySelectorAll('.todo-item');
  const activeElement = document.activeElement;
  const currentIndex = Array.from(todoItems).indexOf(activeElement);
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (currentIndex < todoItems.length - 1) {
      todoItems[currentIndex + 1].focus();
    } else {
      adminLink.focus();
    }
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (currentIndex > 0) {
      todoItems[currentIndex - 1].focus();
    } else {
      addTodoBtn.focus();
    }
  }
});

adminLink.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems[todoItems.length - 1].focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    projectTitleBtn.focus();
  }
});

btnContainerForControlTodo.addEventListener('keydown', (e) => {
  const btns = document.querySelectorAll('.btn-for-control-todo');
  const activeElement = document.activeElement;
  const currentIndex = Array.from(btns).indexOf(activeElement);
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (currentIndex < btns.length - 1) {
      btns[currentIndex + 1].focus(); 
    } else {
      btns[0].focus();
    }
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (currentIndex > 0) {
      btns[currentIndex - 1].focus();
    } else {
      btns[btns.length - 1].focus();
    }
  }
});

titleForEdit.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    editBtnForTodo.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    descriptionForEdit.focus();
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const projectList = project.getProjectList();
    todo.editTodo(projectList);
  }
});

descriptionForEdit.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    titleForEdit.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    dueDateForEdit.focus();
    dueDateForEdit.showPicker();
  }
});

dueDateForEdit.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      descriptionForEdit.focus();
    } else {
      timeForEdit.focus();
      timeForEdit.showPicker();
    }
  }
});

timeForEdit.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      dueDateForEdit.focus();
      dueDateForEdit.showPicker();
    } else {
      priorityForEdit.focus();
      priorityForEdit.showPicker();
    }
  }
});

priorityForEdit.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();

    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      timeForEdit.focus();
      timeForEdit.showPicker();
    } else {
      cancelEditBtnForTodo.focus();
    }
  }
});

cancelEditBtnForTodo.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    priorityForEdit.focus();
    priorityForEdit.showPicker();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    editBtnForTodo.focus();
  }
});

editBtnForTodo.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    cancelEditBtnForTodo.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    titleForEdit.focus();
  }
});

cancelDeleteBtnForTodo.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    deleteBtnForTodo.focus();
  }
});

deleteBtnForTodo.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    cancelDeleteBtnForTodo.focus();
  }
});

export function updateContent(projectTitle, projectList) {
  let currentList = [];

  for (let i = 0; i < projectList.length; i++) {
    const list = projectList[i];

    if (list[0].project === projectTitle) {
      currentList = projectList[i];
    }
  }
  
  renderTodo(projectTitle, currentList);
  console.log(projectList);
  const todoItems = document.querySelectorAll('.todo-item');

  todoItems.forEach((item) => {
    const projectList = project.getProjectList();
    
    item.addEventListener('click', (e) => {
      todo.openControlTodo(e,projectList);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        todo.openControlTodo(e, projectList);
      }
    });
  });

  localStorage.setItem('projectList', JSON.stringify(projectList));
}

// some default items
const todoOne = todoGenerator(
  'Daily life',
  'unchecked',
  'Clean the rooms',
  'Clean the living room and the bathroom.',
  'Sat 08-02-2025',
  '10:30 am',
  'medium',
);

const todoTwo = todoGenerator(
  'Daily life',
  'unchecked',
  'Buy foods',
  'Go to XYZ store and get eggs, rice and vegetables.',
  'Sun 08-03-2025',
  '5:30 pm',
  'high',
);

const todoThree = todoGenerator(
  'Daily life',
  'unchecked',
  'Watch videos',
  'Watch some English videos on YouTube to brush up my listening skill.',
  'Sun 08-03-2025',
  '9:00 pm',
  'low',
);

const todoFour = todoGenerator(
  'My work',
  'unchecked',
  'Attend the meeting',
  'Attend the team meeting and discuss about the progress of the project.',
  'Mon 08-04-2025',
  '1:30 pm',
  'medium',
);

const todoFive = todoGenerator(
  'My work',
  'unchecked',
  'Complete the project',
  'Finish styling the page and fix some minor bugs.',
  'Tue 08-05-2025',
  '5:00 pm',
  'high',
);

const storedList = JSON.parse(localStorage.getItem('projectList'));
const projectList = project.getProjectList();

if (storedList.length >= 1) {
  for (let i = 0; i < storedList.length; i++) {
    const list = storedList[i];
    project.createProject(projectList, list[0].project);

    for (let j = 0; j < list.length; j++) {
      const currentTodo = list[j];

      if (currentTodo.id === 0) {
        break;
      }
      
      const todoItem = todoGenerator(
        currentTodo.project,
        currentTodo.check,
        currentTodo.title,
        currentTodo.description,
        currentTodo.dueDate,
        currentTodo.time,
        currentTodo.priority,
      );
      todo.addTodoToProject(projectList, todoItem);
    }
  }
} else {
  project.createProject(projectList, 'Daily life');
  todo.addTodoToProject(projectList, todoOne);
  todo.addTodoToProject(projectList, todoTwo);
  todo.addTodoToProject(projectList, todoThree);
  project.createProject(projectList, 'My work');
  todo.addTodoToProject(projectList, todoFour);
  todo.addTodoToProject(projectList, todoFive);
}

project.switchProject();

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

projectTitleBtn.addEventListener('click', () => {
  if (projectTitleBtn.textContent === 'Start Project') {
    project.openCreateProject();
  } else {
    project.openControlProject();
  }
});

cancelProjectBtn.addEventListener('click', project.closeControlProject);
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
  btn.addEventListener('click', (e) => project.switchProject(e.target));
});

addTodoBtn.addEventListener('click', todo.openAddTodo);
cancelAddBtn.addEventListener('click', todo.closeAddTodo);

addBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.addTodoToProject(projectList);
});

cancelTodoBtn.addEventListener('click', todo.closeControlTodo);

completeTodoBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.completeTodo(projectList);
});

editTodoBtn.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.openEditTodo(projectList);
});

cancelEditBtnForTodo.addEventListener('click', todo.closeEditTodo);

editBtnForTodo.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.editTodo(projectList);
});

deleteTodoBtn.addEventListener('click', todo.openDeleteTodo);
cancelDeleteBtnForTodo.addEventListener('click', todo.closeDeleteTodo);

deleteBtnForTodo.addEventListener('click', () => {
  const projectList = project.getProjectList();
  todo.deleteTodo(projectList);
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

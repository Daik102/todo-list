import './styles.css';
import { projectController } from './project-controller';
import { todoGenerator, todoController } from './todo-controller';
import { renderTodo } from './render';

const project = projectController();
const todo = todoController();
// For project-controller.
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
// For todo-controller.
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
// For keyboard support.
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const btnContainerForProject = document.querySelector('.btn-container-for-control-project');
const btnContainerForTodo = document.querySelector('.btn-container-for-control-todo');
const projectTitleInput = document.getElementById('project-title');
const editTitleInput = document.getElementById('edit-project-title');
const dueDate = document.getElementById('due-date');
const time = document.getElementById('time');
const priority = document.getElementById('priority');
const todoContainer = document.getElementById('todo-container');
const link = document.querySelector('.link');
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
arrowBtns.forEach((btn) => btn.addEventListener('click', project.switchProject));
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

document.addEventListener('keydown', (e) => project.handleArrowKey('initial', e));
projectTitleBtn.addEventListener('keydown', (e) => project.handleArrowKey('projectTitleBtn', e));
leftBtn.addEventListener('keydown', (e) => project.handleArrowKey('leftBtn', e));
rightBtn.addEventListener('keydown', (e) => project.handleArrowKey('rightBtn', e));
btnContainerForProject.addEventListener('keydown', (e) => project.handleArrowKey('btnContainerForProject', e));
projectTitleInput.addEventListener('keydown', (e) => project.handleArrowKey('projectTitleInput', e));
cancelCreateBtn.addEventListener('keydown', (e) => project.handleArrowKey('cancelCreateBtn', e));
createBtn.addEventListener('keydown', (e) => project.handleArrowKey('createBtn', e));
editTitleInput.addEventListener('keydown', (e) => project.handleArrowKey('editTitleInput', e));
cancelEditBtn.addEventListener('keydown', (e) => project.handleArrowKey('cancelEditBtn', e));
editBtn.addEventListener('keydown', (e) => project.handleArrowKey('editBtn', e));
cancelDeleteBtn.addEventListener('keydown', (e) => project.handleArrowKey('cancelDeleteBtn', e));
deleteBtn.addEventListener('keydown', (e) => project.handleArrowKey('deleteBtn', e));
addTodoBtn.addEventListener('keydown', (e) => todo.handleArrowKey('addTodoBtn', e));

title.addEventListener('keydown', (e) => {
  const projectList = project.getProjectList();
  todo.handleArrowKey('title', e, projectList);
});

description.addEventListener('keydown', (e) => todo.handleArrowKey('description', e));
dueDate.addEventListener('keydown', (e) => todo.handleArrowKey('dueDate', e));
time.addEventListener('keydown', (e) => todo.handleArrowKey('time', e));
priority.addEventListener('keydown', (e) => todo.handleArrowKey('priority', e));
cancelAddBtn.addEventListener('keydown', (e) => todo.handleArrowKey('cancelAddBtn', e));
addBtn.addEventListener('keydown', (e) => todo.handleArrowKey('addBtn', e));
todoContainer.addEventListener('keydown', (e) => todo.handleArrowKey('todoContainer', e));
link.addEventListener('keydown', (e) => todo.handleArrowKey('link', e));
btnContainerForTodo.addEventListener('keydown', (e) => todo.handleArrowKey('btnContainerForTodo', e));

titleForEdit.addEventListener('keydown', (e) => {
  const projectList = project.getProjectList();
  todo.handleArrowKey('titleForEdit', e, projectList);
});

descriptionForEdit.addEventListener('keydown', (e) => todo.handleArrowKey('descriptionForEdit', e));
dueDateForEdit.addEventListener('keydown', (e) => todo.handleArrowKey('dueDateForEdit', e));
timeForEdit.addEventListener('keydown', (e) => todo.handleArrowKey('timeForEdit', e));
priorityForEdit.addEventListener('keydown', (e) => todo.handleArrowKey('priorityForEdit', e));
cancelEditBtnForTodo.addEventListener('keydown', (e) => todo.handleArrowKey('cancelEditBtnForTodo', e));
editBtnForTodo.addEventListener('keydown', (e) => todo.handleArrowKey('editBtnForTodo', e));
cancelDeleteBtnForTodo.addEventListener('keydown', (e) => todo.handleArrowKey('cancelDeleteBtnForTodo', e));
deleteBtnForTodo.addEventListener('keydown', (e) => todo.handleArrowKey('deleteBtnForTodo', e));

export function updateContent(projectTitle, projectList) {
  renderTodo(projectTitle, projectList);
  
  const todoItems = document.querySelectorAll('.todo-item');

  todoItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      todo.openControlTodo(e.target, projectList);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        todo.openControlTodo(e.target, projectList);
      }
    });
  });

  project.saveProjectList(projectList);
}
// For initial loading.
const projectList = JSON.parse(localStorage.getItem('projectList')) || project.getProjectList();

if (projectList.length >= 1) {
  project.updateProjectList(projectList);
} else {
  // Some default items.
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

  project.createProject(projectList, 'Daily life');
  todo.addTodoToProject(projectList, todoOne);
  todo.addTodoToProject(projectList, todoTwo);
  todo.addTodoToProject(projectList, todoThree);
  project.createProject(projectList, 'My work');
  todo.addTodoToProject(projectList, todoFour);
  todo.addTodoToProject(projectList, todoFive);
  project.switchProject();
}

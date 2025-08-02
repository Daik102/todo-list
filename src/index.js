import './home.css';
import { projectController, updateForProjectController } from './project-controller.js';
import { todoGenerator, addTodo, todoController, updateForTodoController } from './todo-controller.js';
import { renderTodo } from './render.js';

export function updateProjectList(title, list, fromStorage) {
  let projectTitle;
  let projectList = [];
  let currentList = [];
  let listIndex;
  let initialLoading;

  if (!title && !list) {
    initialLoading = true;
  }

  if (list) {
    projectList = list;
  } else {
    projectList = project.getProjectList();
  }

  if (title) {
    projectTitle = title;
  } else if (projectList[0]) {
    projectTitle = projectList[0][0].project;
  }

  projectList.forEach((list, i) => {
    if (list[0].project === projectTitle) {
      listIndex = i;
    }
  });

  if (listIndex !== undefined) {
    currentList = projectList[listIndex];
  }
  
  if (fromStorage) {
    projectList.forEach((list) => {
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
  
  const getProjectList = () => projectList;
  
  console.log(projectList);
  renderTodo(projectTitle, currentList);
  todo.prepareOpenControlTodo(currentList);

  if (initialLoading) {
    initialLoading = false;
  } else {
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  return {getProjectList};
}

const project = projectController();
const add = addTodo();
const todo = todoController();
updateForProjectController();
updateForTodoController();

// some default items
const todoOne = todoGenerator('Daily life', 'unchecked', 'Clean the rooms', 'Clean the living room and the bathroom.', 'Sat 08-02-2025', '10:30 am', 'medium');
const todoTwo = todoGenerator('Daily life', 'unchecked', 'Buy foods', 'Go to XYZ store and get eggs, rice and vegetables.', 'Sun 08-03-2025', '5:30 pm', 'high');
const todoThree = todoGenerator('Daily life', 'unchecked', 'Watch videos', 'Watch some English videos on YouTube to brush up my listening skill.', 'Sun 08-03-2025', '9:00 pm', 'low');
const todoFour = todoGenerator('My work', 'unchecked', 'Attend the meeting', 'Attend the team meeting and discuss about the progress of the project.', 'Mon 08-04-2025', '1:30 pm', 'medium');
const todoFive = todoGenerator('My work', 'unchecked', 'Complete the project', 'Finish styling the page and fix some minor bugs.', 'Tue 08-05-2025', '5:00 pm', 'high');

// localStorage.removeItem('projectList');
const storedList = JSON.parse(localStorage.getItem('projectList'));

if (storedList) {
  updateProjectList(storedList[0][0].project, storedList, 'fromStorage');
} else {
  project.createProject('Daily life');
  add.addTodoToProject(todoOne);
  add.addTodoToProject(todoTwo);
  add.addTodoToProject(todoThree);
  project.createProject('My work');
  add.addTodoToProject(todoFour);
  add.addTodoToProject(todoFive);
  project.switchProject('', 'initialLoading');
}

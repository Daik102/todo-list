import { updateContent } from './index';
import { format, compareAsc } from 'date-fns';

export function todoGenerator(
  project,
  check,
  title,
  description,
  dueDate,
  time,
  priority,
) {
  return {
    id: crypto.randomUUID(),
    project,
    check,
    title,
    description,
    dueDate,
    time,
    priority,
  };
}

function formatTime(time) {
  let hours = time[0];
  const minutes = time[1];
  
  if (time[2] === 'am') {
    if (hours === '12') {
      hours = (Number(hours) - 12).toString();
    }

    if (Number(hours) < 10) {
      hours = '0' + hours;
    }
  } else {
    if (hours !== '12') {
      hours = (Number(hours) + 12).toString();
    }
  }

  return {
    hours,
    minutes,
  };
}

function formatDateAndTime(dueDate, time) {
  const dueDateInput = dueDate.value
    .split('-')
    .map((item) => Number(item));
  const timeInput = time.value.split(':');
  const hours = timeInput[0];
  const minutes = timeInput[1];
  let dueDateValue = '';
  let timeValue = '';

  if (dueDate.value) {
    dueDateValue = format(new Date(dueDateInput), 'EEE MM-dd-yyyy');
  }

  if (time.value) {
    timeValue = format(new Date(2025, 7, 28, hours, minutes), 'h:mm aaa');
  }

  return {
    dueDateValue,
    timeValue,
  };
}

function reorderList(list) {
  const date = [];

  for (let i = 0; i < list.length; i++) {
    const todo = list[i];
    const time = formatTime(todo.time.replace(' ', ':').split(':'));
    const hours = time.hours;
    const minutes = time.minutes;
    const dateElement = todo.dueDate
      .slice(4)
      .split('-')
      .map((item) => Number(item));
    dateElement[0] -= 1;
    date.push([
      new Date(dateElement[2], dateElement[0], dateElement[1], hours, minutes),
      i,
    ]);
  }

  const reorderedList = date
    .sort(compareAsc)
    .map((item) => list[item[1]]);
  return reorderedList;
}

export function todoController() {
  const dialogAddTodo = document.querySelector('.dialog-add-todo');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const dueDate = document.getElementById('due-date');
  const time = document.getElementById('time');
  const priority = document.getElementById('priority');
  const alertNoTodoTitle = document.querySelector('.alert-no-todo-title');
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const dialogControlTodo = document.querySelector('.dialog-control-todo');
  const dialogEditTodo = document.querySelector('.dialog-edit-todo');
  const dialogDeleteTodo = document.querySelector('.dialog-delete-todo');
  const alertNoEditTitle = document.querySelector('.alert-no-edit-todo-title');
  const titleForEdit = document.getElementById('title-for-edit');
  const descriptionForEdit = document.getElementById('description-for-edit');
  const dueDateForEdit = document.getElementById('due-date-for-edit');
  const timeForEdit = document.getElementById('time-for-edit');
  const priorityForEdit = document.getElementById('priority-for-edit');
  const todoDescription = document.querySelector('.todo-description');

  let projectTitle = '';
  let listIndex = 0;
  let id = '';
  let checkMark = {};
  let currentTodo = {};

  const openAddTodo = () => {
    dialogAddTodo.showModal();
  };

  const closeAddTodo = () => {
    dialogAddTodo.close();
    title.value = '';
    description.value = '';
    dueDate.value = '';
    time.value = '';
    priority.value = '';
    alertNoTodoTitle.classList.remove('visible');
  };

  const addTodoToProject = (projectList, todoItem) => {
    let newTodo = {};
    projectTitle = projectTitleBtn.textContent;

    if (todoItem) {
      newTodo = todoItem;
    } else {
      if (title.value === '') {
        alertNoTodoTitle.classList.add('visible');
        return;
      }

      const check = 'unchecked';
      const formatResult = formatDateAndTime(dueDate, time);
      const dueDateValue = formatResult.dueDateValue;
      const timeValue = formatResult.timeValue;
      
      newTodo = todoGenerator(
        projectTitle,
        check,
        title.value,
        description.value,
        dueDateValue,
        timeValue,
        priority.value,
      );
    }
    
    for (let i = 0; i < projectList.length; i++) {
      const list = projectList[i];

      if (list[0].project === projectTitle) {
        listIndex = i;
      }
    }

    if (projectList[listIndex][0].id === 0) {
      projectList[listIndex] = [];
    }
    
    projectList[listIndex].push(newTodo);
    
    if (projectList[listIndex].length >= 2) {
      const reorderedList = reorderList(projectList[listIndex]);
      projectList[listIndex] = reorderedList;
    }

    updateContent(projectTitle, projectList);
    closeAddTodo();
  };

  const openControlTodo = (e, projectList) => {
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
    } else if (
      e.target.classList.contains('todo-due-date') ||
      e.target.classList.contains('todo-time')
    ) {
      id = e.target.parentElement.parentElement.dataset.id;
      checkMark = e.target.parentElement.previousElementSibling.children[0];
    } else {
      id = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
      checkMark = e.target.parentElement.parentElement;
    }

    projectTitle = projectTitleBtn.textContent;
    
    for (let i = 0; i < projectList.length; i++) {
      const list = projectList[i];
      
      if (list[0].project === projectTitle) {
        for (let j = 0; j < list.length; j++) {
          const todo = list[j];

          if (todo.id === id) {
            if (todo.description === '') {
              todoDescription.classList.add('no-todo-description');
              todoDescription.textContent = 'No description';
            } else {
              todoDescription.classList.remove('no-todo-description');
              todoDescription.textContent = todo.description;
            }
          }
        }
      }
    }

    dialogControlTodo.showModal();
  };

  const closeControlTodo = () => {
    dialogControlTodo.close();
  };

  const completeTodo = (projectList) => {
    projectTitle = projectTitleBtn.textContent;

    for (let i = 0; i < projectList.length; i++) {
      const list = projectList[i];

      if (list[0].project === projectTitle) {
        for (let j = 0; j < list.length; j++) {
          const todo = list[j];

          if (todo.id === id) {
            if (todo.check === 'unchecked') {
              todo.check = 'checked';
            } else {
              todo.check = 'unchecked'
            }

            checkMark.classList.toggle('checked');
          }
        }
      }
    }
    
    updateContent(projectTitle, projectList);
    closeControlTodo();
  };

  const openEditTodo = (projectList) => {
    closeControlTodo();
    projectTitle = projectTitleBtn.textContent;

    for (let i = 0; i < projectList.length; i++) {
      const list = projectList[i];

      if (list[0].project === projectTitle) {
        for (let j = 0; j < list.length; j++) {
          const todo = list[j];

          if (todo.id === id) {
            currentTodo = projectList[i][j];
            listIndex = i;
          }
        }
      }
    }
    
    const date = currentTodo.dueDate.slice(4).split('-');
    const currentDueDate = date[2] + '-' + date[0] + '-' + date[1];
    const time = formatTime(currentTodo.time.replace(' ', ':').split(':'));
    const currentTime = time.hours + ':' + time.minutes;
    
    titleForEdit.value = currentTodo.title;
    descriptionForEdit.value = currentTodo.description;
    dueDateForEdit.value = currentDueDate;
    timeForEdit.value = currentTime;
    priorityForEdit.value = currentTodo.priority;

    dialogEditTodo.showModal();
  };

  const closeEditTodo = () => {
    dialogEditTodo.close();
    alertNoEditTitle.classList.remove('visible');
  };

  const editTodo = (projectList) => {
    if (titleForEdit.value === '') {
      alertNoEditTitle.classList.add('visible');
      return;
    }

    const formatResult = formatDateAndTime(dueDateForEdit, timeForEdit);
    const dueDateValue = formatResult.dueDateValue;
    const timeValue = formatResult.timeValue;

    currentTodo.title = titleForEdit.value;
    currentTodo.description = descriptionForEdit.value;
    currentTodo.dueDate = dueDateValue;
    currentTodo.time = timeValue;
    currentTodo.priority = priorityForEdit.value;

    projectTitle = projectTitleBtn.textContent;

    if (projectList[listIndex].length >= 2) {
      const reorderedList = reorderList(projectList[listIndex]);
      projectList[listIndex] = reorderedList;
    }
    
    updateContent(projectTitle, projectList);
    closeEditTodo();
  };

  const openDeleteTodo = () => {
    dialogControlTodo.close();
    dialogDeleteTodo.showModal();
  };

  const closeDeleteTodo = () => {
    dialogDeleteTodo.close();
  };

  const deleteTodo = (projectList) => {
    projectTitle = projectTitleBtn.textContent;

    for (let i = 0; i < projectList.length; i++) {
      const list = projectList[i];

      if (list[0].project === projectTitle) {
        for (let j = 0; j < list.length; j++) {
          const todo = list[j];

          if (todo.id === id) {
            listIndex = i;
            projectList[listIndex].splice(j, 1);
          }
        }
      }
    }

    if (!projectList[listIndex][0]) {
      projectList[listIndex].push({ id: 0, project: projectTitle });
    }

    updateContent(projectTitle, projectList);
    closeDeleteTodo();
  };

  return {
    openAddTodo,
    closeAddTodo,
    addTodoToProject,
    openControlTodo,
    closeControlTodo,
    completeTodo,
    openEditTodo,
    closeEditTodo,
    editTodo,
    openDeleteTodo,
    closeDeleteTodo,
    deleteTodo,
  };
}

import { updateProjectList } from './index';
import { format,
         compareAsc
} from "date-fns";

export function todoGenerator(project, check, title, description, dueDate, time, priority) {
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

export function addTodo() {
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
  let listIndex;

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
    projectList = update.getProjectList();

    let newTodo = todoGenerator(projectTitle, check, title.value, description.value, dueDateValue, timeValue, priority.value);

    if (defaultTodo) {
      newTodo = defaultTodo;
    }

    projectList.forEach((list, i) => {
      if (list[0].project === projectTitle) {
        listIndex = i;
      }
    });

    if (projectList[listIndex][0].id === 0) {
      projectList[listIndex] = [];
    }

    projectList[listIndex].push(newTodo);

    if (projectList[listIndex][1]) {
      const reorderedList = reorderList(projectList[listIndex]);
      projectList[listIndex] = reorderedList;
    }

    updateProjectList(projectTitle, projectList);
    closeAddTodo();
  }
  addBtn.addEventListener('click', addTodoToProject);
  
  return {addTodoToProject};
}

export function todoController() {
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
  let listIndex;
  let editIndex;
  let id;
  let checkMark;
  let currentDescription;
  let currentTodo;

  const prepareOpenControlTodo = (currentList) => {
    const todoItem = document.querySelector('.todo-item');
    
    if (currentList[0]) {
      if (currentList[0].id === 0) {
        return;
      }

      if (currentList[1]) {
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems.forEach((item) => {
          item.addEventListener('click', openControlTodo);
        });
      } else {
        todoItem.addEventListener('click', openControlTodo);
      }
    }
  };

  const openControlTodo = (e) => {
    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();

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
    
    projectList.forEach((list) => {
      if (list[0].project === projectTitle) {
        list.forEach((todo) => {
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
    
    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();

    projectList.forEach((list) => {
      if (list[0].project === projectTitle) {

        list.forEach((todo) => {
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
      }
    });
    
    updateProjectList(projectTitle, projectList);
    closeControlTodo(e);
  };
  finishTodoBtn.addEventListener('click', finishTodo);

  const openEditTodo = (e) => {
    e.preventDefault();
    closeControlTodo(e);

    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();

    projectList.forEach((list, i) => {
      if (list[0].project === projectTitle) {
        listIndex = i;

        list.forEach((todo, j) => {
          if (todo.id === id) {
            editIndex = j;
          }
        });
      }
    });

    currentTodo = projectList[listIndex][editIndex];
    
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

    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();

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
    
    if (dueDateForEdit.value !== '') {
      dueDateValue = format(new Date(dueDateInput), 'EEE MM-dd-yyyy');
    }   
    if (timeForEdit.value !== '') {
      timeValue = format(new Date(2025, 7, 28, hours, minutes), 'h:mm aaa');
    }

    currentTodo = projectList[listIndex][editIndex];

    currentTodo.title = titleForEdit.value;
    currentTodo.description = descriptionForEdit.value;
    currentTodo.dueDate = dueDateValue;
    currentTodo.time = timeValue;
    currentTodo.priority = priorityForEdit.value;

    if (projectList[listIndex][1] !== undefined) {
      const reorderedList = reorderList(projectList[listIndex]);
      projectList[listIndex] = reorderedList;
    }
    
    updateProjectList(projectTitle, projectList);
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

    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();

    projectList.forEach((list, i) => {
      if (list[0].project === projectTitle) {
        listIndex = i;

        list.forEach((todo, i) => {
          if (todo.id === id) {
            projectList[listIndex].splice(i, 1);
          }
        });
      }
    });

    if (projectList[listIndex][0] === undefined) {
      const idObject = {id: 0, project: projectTitle};
      projectList[listIndex].push(idObject);
    }
    
    updateProjectList(projectTitle, projectList);
    closeDeleteTodo(e);
  };
  deleteBtn.addEventListener('click', deleteTodo);
  
  return {prepareOpenControlTodo};
};

let update;

export function updateForTodoController() {
  update = updateProjectList();
}
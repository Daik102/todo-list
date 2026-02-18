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
  const completeTodoBtn = document.querySelector('.complete-todo-btn');
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
  // For keyboard support.
  const cancelAddBtn = document.querySelector('.cancel-add-btn-for-project');
  const addBtn = document.querySelector('.add-btn-for-project');
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const adminLink = document.querySelector('.admin-link');
  const cancelEditBtnForTodo = document.querySelector('.cancel-edit-btn-for-todo');
  const editBtnForTodo = document.querySelector('.edit-btn-for-todo');
  const cancelDeleteBtnForTodo = document.querySelector('.cancel-delete-btn-for-todo');
  const deleteBtnForTodo = document.querySelector('.delete-btn-for-todo');

  let projectTitle = '';
  let listIndex = 0;
  let id = '';
  let checkMark = {};
  let currentTodo = {};

  const openAddTodo = () => {
    dialogAddTodo.showModal();
  };

  const closeAddTodo = (projectList) => {
    dialogAddTodo.close();
    title.value = '';
    description.value = '';
    dueDate.value = '';
    time.value = '';
    priority.value = '';
    alertNoTodoTitle.classList.remove('visible');

    if (projectList) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
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
    console.log(projectList);
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

  const openControlTodo = (target, projectList) => {
    if (target.classList.contains('todo-item')) {
      id = target.dataset.id;
      checkMark = target.children[0].children[0];
    } else if (target.classList.contains('todo-title-row')) {
      id = target.parentElement.dataset.id;
      checkMark = target.children[0];
    } else if (target.classList.contains('check-mark-svg')) {
      id = target.parentElement.parentElement.parentElement.dataset.id;
      checkMark = target.parentElement;
    } else if (target.classList.contains('todo-title')) {
      id = target.parentElement.parentElement.dataset.id;
      checkMark = target.previousElementSibling;
    } else if (target.classList.contains('todo-due-date-container')) {
      id = target.parentElement.dataset.id;
      checkMark = target.previousElementSibling.children[0];
    } else if (
      target.classList.contains('todo-due-date') ||
      target.classList.contains('todo-time')
    ) {
      id = target.parentElement.parentElement.dataset.id;
      checkMark = target.parentElement.previousElementSibling.children[0];
    } else {
      id = target.parentElement.parentElement.parentElement.parentElement.dataset.id;
      checkMark = target.parentElement.parentElement;
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

            if (todo.check === 'unchecked') {
              completeTodoBtn.textContent = 'Complete!';
            } else {
              completeTodoBtn.textContent = 'Undo';
            }
          }
        }
      }
    }

    dialogControlTodo.showModal();
  };

  const closeControlTodo = (projectList) => {
    dialogControlTodo.close();

    if (projectList) {
      const projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
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

  const closeEditTodo = (projectList) => {
    dialogEditTodo.close();
    alertNoEditTitle.classList.remove('visible');

    if (projectList) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
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

  const closeDeleteTodo = (projectList) => {
    dialogDeleteTodo.close();

    if (projectList) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
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

  const handleArrowKey = (element, e, projectList) => {
    if (element === 'addTodoBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        projectTitleBtn.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const firstItem = document.querySelector('.todo-item');
        firstItem.focus();
      }
    } else if (element === 'title') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        addBtn.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        description.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        addTodoToProject(projectList);
      }
    } else if (element === 'description') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        title.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        dueDate.focus();
        dueDate.showPicker();
      }
    } else if (element === 'dueDate') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          description.focus();
        } else {
          time.focus();
          time.showPicker();
        }
      }
    } else if (element === 'time') {
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
    } else if (element === 'priority') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          time.focus();
          time.showPicker();
        } else {
          cancelAddBtn.focus();
        }
      }
    } else if (element === 'cancelAddBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        priority.focus();
        priority.showPicker();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        addBtn.focus();
      }
    } else if (element === 'addBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        cancelAddBtn.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        title.focus();
      }
    } else if (element === 'todoContainer') {
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
    } else if (element === 'adminLink') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const todoItems = document.querySelectorAll('.todo-item');
        todoItems[todoItems.length - 1].focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        projectTitleBtn.focus();
      }
    } else if (element === 'btnContainerForTodo') {
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
    } else if (element === 'titleForEdit') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        editBtnForTodo.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        descriptionForEdit.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        editTodo(projectList);
      }
    } else if (element === 'descriptionForEdit') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        titleForEdit.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        dueDateForEdit.focus();
        dueDateForEdit.showPicker();
      }
    } else if (element === 'dueDateForEdit') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          descriptionForEdit.focus();
        } else {
          timeForEdit.focus();
          timeForEdit.showPicker();
        }
      }
    } else if (element === 'timeForEdit') {
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
    } else if (element === 'priorityForEdit') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();

        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          timeForEdit.focus();
          timeForEdit.showPicker();
        } else {
          cancelEditBtnForTodo.focus();
        }
      }
    } else if (element === 'cancelEditBtnForTodo') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        priorityForEdit.focus();
        priorityForEdit.showPicker();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        editBtnForTodo.focus();
      }
    } else if (element === 'editBtnForTodo') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        cancelEditBtnForTodo.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        titleForEdit.focus();
      }
    } else if (element === 'cancelDeleteBtnForTodo') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        deleteBtnForTodo.focus();
      }
    } else if (element === 'deleteBtnForTodo') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        cancelDeleteBtnForTodo.focus();
      }
    }
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
    handleArrowKey,
  };
}

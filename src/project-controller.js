import { updateContent } from "./index";

export function projectController() {
  const dialogControlProject = document.querySelector('.dialog-control-project');
  const dialogCreateProject = document.querySelector('.dialog-create-project');
  const dialogEditProject = document.querySelector('.dialog-edit-project');
  const dialogDeleteProject = document.querySelector('.dialog-delete-project');
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const arrowBtns = document.querySelectorAll('.arrow-btn');
  const projectTitleBtn = document.querySelector('.project-title-btn');
  const projectTitleInput = document.getElementById('project-title');
  const editTitleInput = document.getElementById('edit-project-title');
  const alertNoProjectTitle = document.querySelector('.alert-no-project-title');
  const alertNoEditTitle = document.querySelector('.alert-no-edit-project-title');
  const alertDuplicatedTitle = document.querySelector('.alert-duplicated-title');
  const alertDuplicatedEditTitle = document.querySelector('.alert-duplicated-edit-title');
  // For keyboard support.
  const adminLink = document.querySelector('.admin-link');
  const cancelCreateBtn = document.querySelector('.cancel-create-btn');
  const createBtn = document.querySelector('.create-btn-for-project');
  const cancelEditBtn = document.querySelector('.cancel-edit-btn-for-project');
  const editBtn = document.querySelector('.edit-btn-for-project');
  const cancelDeleteBtn = document.querySelector('.cancel-delete-btn-for-project');
  const deleteBtn = document.querySelector('.delete-btn-for-project');

  let projectTitle = '';
  let projectList = [];

  const openControlProject = () => {
    dialogControlProject.showModal();
  };

  const closeControlProject = (e) => {
    dialogControlProject.close();

    if (e) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
  };

  const openCreateProject = () => {
    closeControlProject();
    dialogCreateProject.showModal();
  };

  const closeCreateProject = (e) => {
    dialogCreateProject.close();
    projectTitleInput.value = '';
    alertNoProjectTitle.classList.remove('visible');
    alertDuplicatedTitle.classList.remove('visible');

    if (e) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
  };

  const createProject = (lists, title) => {
    // Check if this function was run manually or by initial loading.
    if (title) {
      projectList = lists;
      projectTitle = title;
    } else {
      projectTitle = projectTitleInput.value;
      
      if (projectTitle === '') {
        alertDuplicatedTitle.classList.remove('visible');
        alertNoProjectTitle.classList.add('visible');
        return;
      }

      for (let i = 0; i < projectList.length; i++) {
        const list = projectList[i];

        if (list[0].project === projectTitleInput.value) {
          alertNoProjectTitle.classList.remove('visible');
          alertDuplicatedTitle.classList.add('visible');
          return;
        }
      }
    }
    
    const newProject = [{ id: 0, project: projectTitle }];
    projectList.push(newProject);

    if (addTodoBtn.classList.contains('hidden')) {
      addTodoBtn.classList.remove('hidden');
    }
    
    if (projectList.length >= 2) {
      arrowBtns.forEach((btn) => btn.classList.add('visible'));
    }

    updateContent(projectTitle, projectList);
    closeCreateProject();
  };

  const openEditProject = () => {
    closeControlProject();
    projectTitle = projectTitleBtn.textContent;
    editTitleInput.value = projectTitle;
    dialogEditProject.showModal();
  };

  const closeEditProject = (e) => {
    dialogEditProject.close();
    editTitleInput.value = '';
    alertNoEditTitle.classList.remove('visible');
    alertDuplicatedEditTitle.classList.remove('visible');

    if (e) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
  };

  const editProject = () => {
    const oldProjectTitle = projectTitleBtn.textContent;
    const newProjectTitle = editTitleInput.value;

    if (newProjectTitle === '') {
      alertDuplicatedEditTitle.classList.remove('visible');
      alertNoEditTitle.classList.add('visible');
      return;
    } else if (oldProjectTitle !== newProjectTitle) {
      for (let i = 0; i < projectList.length; i++) {
        const list = projectList[i];

        if (list[0].project === editTitleInput.value) {
          alertNoEditTitle.classList.remove('visible');
          alertDuplicatedEditTitle.classList.add('visible');
          return;
        }
      }

      for (let i = 0; i < projectList.length; i++) {
        const list = projectList[i];

        if (list[0].project === oldProjectTitle) {
          for (let j = 0; j < list.length; j++) {
            const todo = list[j];
            todo.project = newProjectTitle;
          }
        }
      }
    }

    updateContent(newProjectTitle, projectList);
    closeEditProject();
  };

  const openDeleteProject = () => {
    closeControlProject();
    dialogDeleteProject.showModal();
  };

  const closeDeleteProject = (e) => {
    dialogDeleteProject.close();

    if (e) {
      projectTitle = projectTitleBtn.textContent;
      updateContent(projectTitle, projectList);
    }
  };

  const deleteProject = () => {
    for (let i = 0; i < projectList.length; i++) {
      const list = projectList[i];

      if (list[0].project === projectTitle) {
        projectList.splice(i, 1);

        if (projectList[0] === undefined) {
          projectTitle = 'Start Project';
          addTodoBtn.classList.add('hidden');
        } else if (projectList.length === 1) {
          projectTitle = projectList[0][0].project;
          arrowBtns.forEach((btn) => (btn.classList.remove('visible')));
        } else {
          if (!projectList[i]) {
            projectTitle = projectList[0][0].project;
          } else {
            projectTitle = projectList[i][0].project;
          }
        }
      }
    }

    updateContent(projectTitle, projectList);
    closeDeleteProject();
  };

  const switchProject = (arrowBtn) => {
    if (!arrowBtn) {
      projectTitle = projectList[0][0].project;
    } else {
      projectTitle = projectTitleBtn.textContent;
      let listIndex = 0;
      
      for (let i = 0; i < projectList.length; i++) {
        const list = projectList[i];
        
        if (list[0].project === projectTitle) {
          if (arrowBtn === 'left-btn' || arrowBtn === 'ArrowLeft') {
            listIndex = i - 1;

            if (listIndex < 0) {
              listIndex = projectList.length - 1;
            }
          } else {
            listIndex = i + 1;
            
            if (listIndex >= projectList.length) {
              listIndex = 0;
            }
          }
        }
      }

      projectTitle = projectList[listIndex][0].project;

      if (arrowBtn === 'ArrowLeft' || arrowBtn === 'ArrowRight' || arrowBtn === 'ArrowUp' || arrowBtn === 'ArrowDown') {
        const leftBtn = document.querySelector('.left-btn');
        const rightBtn = document.querySelector('.right-btn');

        if (arrowBtn === 'ArrowLeft' || arrowBtn === 'ArrowUp') {
          leftBtn.focus();
        } else {
          rightBtn.focus();
        }
      }
    }
    
    updateContent(projectTitle, projectList);
  };

  const updateProjectList = (list) => {
    projectList = list;
    projectTitle = projectList[0][0].project;
    
    if (addTodoBtn.classList.contains('hidden')) {
      addTodoBtn.classList.remove('hidden');
    }

    if (projectList.length >= 2) {
      arrowBtns.forEach((btn) => btn.classList.add('visible'));
    }

    updateContent(projectTitle, projectList);
  };

  const getProjectList = () => projectList;
  const saveProjectList = (projectList) => localStorage.setItem('projectList', JSON.stringify(projectList));

  const handleArrowKey = (element, e) => {
    if (element === 'projectTitleBtn') {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        switchProject(e.key);
      } else if (e.key === 'ArrowUp') {
        adminLink.focus();
      } else if (e.key === 'ArrowDown') {
        addTodoBtn.focus();
      }
    } else if (element === 'leftBtn') {
      if (e.key === 'ArrowLeft') {
        switchProject(e.key);
      } else if (e.key === 'ArrowRight') {
        projectTitleBtn.focus();
      } else if (e.key === 'ArrowUp') {
        adminLink.focus();
      } else if (e.key === 'ArrowDown') {
        addTodoBtn.focus();
      }
    } else if (element === 'rightBtn') {
      if (e.key === 'ArrowLeft') {
        projectTitleBtn.focus();
      } else if (e.key === 'ArrowRight') {
        switchProject(e.key);
      } else if (e.key === 'ArrowUp') {
        adminLink.focus();
      } else if (e.key === 'ArrowDown') {
        addTodoBtn.focus();
      }
    } else if (element === 'btnContainerForProject') {
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
    } else if (element === 'projectTitleInput') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        createBtn.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        cancelCreateBtn.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        createProject();
      }
    } else if (element === 'cancelCreateBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        projectTitleInput.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        createBtn.focus();
      }
    } else if (element === 'createBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        projectTitleInput.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        cancelCreateBtn.focus();
      }
    } else if (element === 'editTitleInput') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        editBtn.focus();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        cancelEditBtn.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        editProject();
      }
    } else if (element === 'cancelEditBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        editTitleInput.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        editBtn.focus();
      }
    } else if (element === 'editBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        editTitleInput.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        cancelEditBtn.focus();
      }
    } else if (element === 'cancelDeleteBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        deleteBtn.focus();
      }
    } else if (element === 'deleteBtn') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        cancelDeleteBtn.focus();
      }
    }
  };

  return {
    openControlProject,
    closeControlProject,
    openCreateProject,
    closeCreateProject,
    createProject,
    openEditProject,
    closeEditProject,
    editProject,
    openDeleteProject,
    closeDeleteProject,
    deleteProject,
    switchProject,
    updateProjectList,
    getProjectList,
    saveProjectList,
    handleArrowKey,
  };
}

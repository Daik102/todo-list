import { updateProjectList } from './index';

export function projectController() {
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
  const alertDuplicatedTitle = document.querySelector('.alert-duplicated-title');
  const alertDuplicatedEditTitle = document.querySelector('.alert-duplicated-edit-title');

  let projectTitle;
  let projectList = [];
  let duplicatedTitle;
  let duplicatedEditTitle;

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
    alertDuplicatedTitle.style.visibility = 'hidden';
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

    if (projectTitle === '') {
      alertDuplicatedTitle.style.visibility = 'hidden';
      alertNoProjectTitle.style.visibility = 'visible';
      return;
    }

    projectList = update.getProjectList();

    projectList.forEach((list) => {
      if (list[0].project === projectTitleInput.value) {
        duplicatedTitle = true;
      }
    });

    if (duplicatedTitle) {
      alertNoProjectTitle.style.visibility = 'hidden';
      alertDuplicatedTitle.style.visibility = 'visible';
      duplicatedTitle = false;
      return;
    }

    const newProject = [];
    const idObject = { id: 0, project: projectTitle };
    newProject.push(idObject);

    if (addTodoBtn.classList.contains('hidden')) {
      addTodoBtn.classList.replace('hidden', 'visible');
    }

    projectList.push(newProject);

    if (projectList[1] !== undefined) {
      arrowBtns.forEach((btn) => {
        btn.style.visibility = 'visible';
      });
    }

    updateProjectList(projectTitle, projectList);
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
    alertDuplicatedEditTitle.style.visibility = 'hidden';
  };

  cancelEditBtn.addEventListener('click', closeEditProject);

  const editProject = (e) => {
    e.preventDefault();

    const oldProjectTitle = projectTitleBtn.textContent;
    const newProjectTitle = editTitleInput.value;

    if (newProjectTitle === '') {
      alertDuplicatedEditTitle.style.visibility = 'hidden';
      alertNoEditTitle.style.visibility = 'visible';
      return;
    }

    projectList = update.getProjectList();

    projectList.forEach((list) => {
      if (list[0].project === editTitleInput.value) {
        duplicatedEditTitle = true;
      }
    });

    if (duplicatedEditTitle) {
      alertNoEditTitle.style.visibility = 'hidden';
      alertDuplicatedEditTitle.style.visibility = 'visible';
      duplicatedEditTitle = false;
      return;
    }

    projectList.forEach((list) => {
      if (list[0].project === oldProjectTitle) {
        list.forEach((todo) => {
          todo.project = newProjectTitle;
        });
      }
    });

    updateProjectList(newProjectTitle, projectList);
    closeEditProject(e);
  };

  editBtn.addEventListener('click', editProject);

  const openDeleteProject = (e) => {
    e.preventDefault();
    closeControlProject(e);
    dialogDeleteProject.showModal();
  };

  deleteProjectBtn.addEventListener('click', openDeleteProject);

  const closeDeleteProject = (e) => {
    e.preventDefault();
    dialogDeleteProject.close();
  };

  cancelDeleteBtn.addEventListener('click', closeDeleteProject);

  const deleteProject = (e) => {
    e.preventDefault();

    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();
    let listIndex;

    projectList.forEach((list, i) => {
      if (list[0].project === projectTitle) {
        if (i === 0) {
          listIndex = 0;
        } else {
          listIndex = i - 1;
        }

        projectList.splice(i, 1);
      }
    });

    if (projectList[0] === undefined) {
      projectTitle = 'Start Project';
      addTodoBtn.classList.replace('visible', 'hidden');
    } else if (projectList.length === 1) {
      projectTitle = projectList[0].project;
      arrowBtns.forEach((btn) => (btn.style.visibility = 'hidden'));
    } else {
      projectTitle = projectList[listIndex][0].project;
    }

    updateProjectList(projectTitle, projectList);
    closeDeleteProject(e);
  };

  deleteBtn.addEventListener('click', deleteProject);

  const switchProject = (arrowBtn, initialLoading) => {
    projectTitle = projectTitleBtn.textContent;
    projectList = update.getProjectList();
    let listIndex;

    if (initialLoading === 'initialLoading') {
      if (projectList[0] === undefined) {
        projectTitle === 'Start Project';
      } else {
        projectTitle = projectList[0][0].project;
        listIndex = 0;
      }
    }

    if (arrowBtn) {
      if (arrowBtn.classList.contains('left-btn')) {
        projectList.forEach((list, i) => {
          if (list[0].project === projectTitle) {
            listIndex = i - 1;
          }
          if (listIndex < 0) {
            listIndex = projectList.length - 1;
          }
        });
      } else if (arrowBtn.classList.contains('right-btn')) {
        projectList.forEach((list, i) => {
          if (list[0].project === projectTitle) {
            listIndex = i + 1;
          }
          if (listIndex === projectList.length) {
            listIndex = 0;
          }
        });
      }
    }
    if (projectList[0] !== undefined) {
      projectTitle = projectList[listIndex][0].project;
    }

    updateProjectList(projectTitle, projectList);
  };

  arrowBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => switchProject(e.target));
  });

  return {
    createProject,
    getProjectList,
    switchProject,
  };
}

let update;

export function updateForProjectController() {
  update = updateProjectList();
}

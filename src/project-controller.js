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

  const closeCreateProject = () => {
    dialogCreateProject.close();
    projectTitleInput.value = '';
    alertNoProjectTitle.classList.remove('visible');
    alertDuplicatedTitle.classList.remove('visible');
    projectTitle = projectTitleBtn.textContent;
    updateContent(projectTitle, projectList);
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

  const closeEditProject = () => {
    dialogEditProject.close();
    editTitleInput.value = '';
    alertNoEditTitle.classList.remove('visible');
    alertDuplicatedEditTitle.classList.remove('visible');
    projectTitle = projectTitleBtn.textContent;
    updateContent(projectTitle, projectList);
  };

  const editProject = () => {
    const oldProjectTitle = projectTitleBtn.textContent;
    const newProjectTitle = editTitleInput.value;

    if (newProjectTitle === '') {
      alertDuplicatedEditTitle.classList.remove('visible');
      alertNoEditTitle.classList.add('visible');
      return;
    } else if (oldProjectTitle === newProjectTitle) {
      closeEditProject();
      return;
    }
    
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

    updateContent(newProjectTitle, projectList);
    closeEditProject();
  };

  const openDeleteProject = () => {
    closeControlProject();
    dialogDeleteProject.showModal();
  };

  const closeDeleteProject = () => {
    dialogDeleteProject.close();
    projectTitle = projectTitleBtn.textContent;
    updateContent(projectTitle, projectList);
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
          if (projectList.length === i) {
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
      if (projectList[0] === undefined) {
        projectTitle === 'Start Project';
      } else {
        projectTitle = projectList[0][0].project;
      }
    } else {
      let listIndex = 0;
      
      for (let i = 0; i < projectList.length; i++) {
        const list = projectList[i];

        if (list[0].project === projectTitle) {
          if (arrowBtn.classList.contains('left-btn')) {
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
    }

    updateContent(projectTitle, projectList);
  };

  const getProjectList = () => projectList;

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
    getProjectList,
  };
}

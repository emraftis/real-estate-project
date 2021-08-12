export default {
  projects(state) {
    return state.projects;
  },
  hasProjects(state) {
    return state.projects && state.projects.length > 0;
  },
  counter(state) {
    return state.projectsCounter;
  },
};

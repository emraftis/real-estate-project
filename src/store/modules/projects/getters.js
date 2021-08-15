export default {
  projects(state) {
    const creatorId = localStorage.userId;
    return state.projects.filter((project) => project.creatorId === creatorId);
  },
  hasProjects(_, getters) {
    return getters.projects && getters.projects.length > 0;
  },
  counter(state) {
    return state.projectsCounter;
  },
};

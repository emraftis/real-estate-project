export default {
  projects(state) {
    const creatorId = localStorage.userId;
    return state.projects.filter((project) => project.creatorId === creatorId);
  },
};

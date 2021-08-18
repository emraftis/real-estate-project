export default {
  //returns projects for a given userId
  projects(state) {
    const creatorId = localStorage.userId;
    return state.projects.filter((project) => project.creatorId === creatorId);
  },
};

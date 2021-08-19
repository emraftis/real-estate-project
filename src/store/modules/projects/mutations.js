export default {
  createProject(state, payload) {
    state.projects.push(payload);
  },
  setProjects(state, payload) {
    state.projects = payload;
  },
  refreshProjects(state, payload) {
    state.projects = state.projects.filter(
      (project) => project.projectKey === payload
    );
  },
};

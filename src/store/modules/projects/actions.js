export default {
  async createProject(context, data) {
    //parse the data to create the object for Firebase
    const userId = localStorage.getItem("userId");
    const projectData = {
      projectId: data.projectId,
      projectName: data.projectName,
      description: data.description,
      projectNOI: data.projectNOI,
      projectValue: data.projectValue,
      annualRevenue: data.annualRevenue,
      annualExpenses: data.annualExpenses,
      vacancyAllowance: data.vacancyAllowance,
      managementFee: data.managementFee,
      structuralAllowance: data.structuralAllowance,
      capRate: data.capRate,
    };

    //posts the projectData to Firebase
    const response = await fetch(
      `https://real-estate-project-14317-default-rtdb.firebaseio.com/${userId}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          ...projectData,
          creatorId: userId,
        }),
      }
    );

    //error handling
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to Create");
      throw error;
    }

    //commits the data using createProject() mutation
    context.commit("createProject", {
      ...projectData,
      creatorId: userId,
    });
  },

  async fetchProjects(context) {
    //fetches all projects for a the user's specific userId
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `https://real-estate-project-14317-default-rtdb.firebaseio.com/${userId}.json`
    );

    //error handling
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to Find Projects"
      );
      throw error;
    }

    //sets the projects (VueX state) for the current user.
    const projects = [];
    for (const key in responseData) {
      const project = {
        projectId: responseData[key].projectId,
        projectName: responseData[key].projectName,
        description: responseData[key].description,
        projectNOI: responseData[key].projectNOI,
        projectValue: responseData[key].projectValue,
        annualRevenue: responseData[key].annualRevenue,
        annualExpenses: responseData[key].annualExpenses,
        vacancyAllowance: responseData[key].vacancyAllowance,
        managementFee: responseData[key].managementFee,
        structuralAllowance: responseData[key].structuralAllowance,
        capRate: responseData[key].capRate,
        creatorId: userId,
      };
      projects.push(project);
    }
    context.commit("setProjects", projects);
  },
};

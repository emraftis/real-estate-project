export default {
  async createProject(context, data) {
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

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to Create");
      throw error;
    }

    //Create Google Sheets w/ relevant data

    //

    context.commit("createProject", {
      ...projectData,
      creatorId: userId,
    });
  },

  async fetchProjects(context) {
    const userId = localStorage.getItem("userId");
    const response = await fetch(
      `https://real-estate-project-14317-default-rtdb.firebaseio.com/${userId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to Find Projects"
      );
      throw error;
    }

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

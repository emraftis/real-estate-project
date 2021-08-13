export default {
  async createProject(context, data) {
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
      maintenanceAllowance: data.maintenanceAllowance,
      capRate: data.capRate,
    };

    const response = await fetch(
      `https://real-estate-project-14317-default-rtdb.firebaseio.com/90210.json`,
      {
        method: "POST",
        body: JSON.stringify({ ...projectData, creatorId: 90210 }),
      }
    );

    console.log(response);

    context.commit("createProject", {
      ...projectData,
      creatorId: 90210,
    });
  },
  async fetchProjects(context) {
    const response = await fetch(
      `https://real-estate-project-14317-default-rtdb.firebaseio.com/90210.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      //error
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
        maintenanceAllowance: responseData[key].maintenanceAllowance,
        capRate: responseData[key].capRate,
      };
      projects.push(project);
    }
    context.commit("setProjects", projects);
  },
};

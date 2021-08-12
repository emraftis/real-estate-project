export default {
  createProject(context, data) {
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

    context.commit("createProject", {
      ...projectData,
      creatorId: 90210,
    });
  },
};

import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      projects: [
        {
          projectName: "Project 1",
          projectId: 100,
          creatorId: 90210,
          type: "single-tenant-commercial",
          googleSheetsLink: null,
          projectNOI: 25000,
          projectValue: 850000,
          tenants: [
            {
              unit: "1",
              tenantName: "Subway",
              leaseRate: 25,
              squareFoot: 5000,
              otherIncome: 0,
              recoverableExpenses: 50000,
              NNN: true,
            },
          ],
          notRecoverableExpenses: 5000,
          vacancyAllowance: 0.05,
          managementFeePercent: 0.03,
          maintenancePercent: 0.02,
        },
        {
          projectName: "Project 2",
          projectId: 101,
          creatorId: 90210,
          type: "multi-tenant-commercial",
          googleSheetsLink: null,
          projectNOI: 50000,
          projectValue: 2000000,
          tenants: [
            {
              unit: "1",
              tenantName: "Subway",
              leaseRate: 25,
              squareFoot: 2000,
              otherIncome: 0,
              recoverableExpenses: 20000,
              NNN: true,
            },
            {
              unit: "2",
              tenantName: "Evan's Restaurant",
              leaseRate: 20,
              squareFoot: 4500,
              otherIncome: 5000,
              recoverableExpenses: 30000,
              NNN: true,
            },
            {
              unit: "3",
              tenantName: "Learning Center",
              leaseRate: 30,
              squareFoot: 1500,
              otherIncome: 0,
              recoverableExpenses: 10000,
              NNN: true,
            },
          ],
          notRecoverableExpenses: 7000,
          vacancyAllowance: 0.05,
          managementFeePercent: 0.03,
          maintenancePercent: 0.02,
        },
      ],
    };
  },
  mutations,
  getters,
  actions,
};

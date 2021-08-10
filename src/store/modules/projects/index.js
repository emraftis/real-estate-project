import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      projects: [
        {
          name: "Project 1",
          googleSheetsLink: null,
          annualRentalIncome: 100000,
          vacancyAllowance: 0.05,
          otherIncome: 10000,
          recoverableExpenses: 25000,
          notRecoverableExpenses: 5000,
          managementFeePercent: 0.03,
          maintenancePercent: 0.02,
        },
        {
          name: "Project 2",
          googleSheetsLink: null,
          annualRentalIncome: 250000,
          vacancyAllowance: 0.05,
          otherIncome: 0,
          recoverableExpenses: 60000,
          notRecoverableExpenses: 7000,
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

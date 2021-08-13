import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      userId: 90210,
      projects: [
        // {
        //   projectId: 100,
        //   creatorId: 90210,
        //   projectName: "Restaurant",
        //   description:
        //     "Project 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum bibendum lorem sed blandit. Morbi viverra ultricies erat nec accumsan. Suspendisse et lacinia nibh. Integer cursus hendrerit ipsum a semper. Etiam dignissim nunc at diam congue, ut venenatis dolor iaculis. Nulla facilisi. Fusce a placerat sem. Vivamus nulla leo, sollicitudin in tincidunt sit amet, finibus nec libero. Curabitur lorem nisl, commodo quis elit ac, aliquam sodales odio. Quisque pharetra dignissim lacinia. Morbi congue mollis nibh, at lacinia nisi vulputate eget. Aenean vel odio at elit vestibulum consectetur. Donec vulputate mattis laoreet. Quisque est dolor, venenatis nec purus quis, porta luctus elit. Suspendisse ultrices a lorem eu semper. Nulla dui risus, rhoncus vel nibh a, scelerisque euismod ante. Cras efficitur eu elit vel cursus.",
        //   googleSheetsLink: null,
        //   projectNOI: 50000,
        //   projectValue: 850000,
        //   annualRevenue: 150000,
        //   annualExpenses: 80000,
        //   vacancyAllowance: 0.05,
        //   managementFee: 0.03,
        //   maintenanceAllowance: 0.02,
        //   capRate: 0.085,
        // },
        // {
        //   projectId: 200,
        //   creatorId: 90210,
        //   projectName: "Retail Strip Mall",
        //   description:
        //     "Project 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum bibendum lorem sed blandit. Morbi viverra ultricies erat nec accumsan. Suspendisse et lacinia nibh. Integer cursus hendrerit ipsum a semper. Etiam dignissim nunc at diam congue, ut venenatis dolor iaculis. Nulla facilisi. Fusce a placerat sem. Vivamus nulla leo, sollicitudin in tincidunt sit amet, finibus nec libero. Curabitur lorem nisl, commodo quis elit ac, aliquam sodales odio. Quisque pharetra dignissim lacinia. Morbi congue mollis nibh, at lacinia nisi vulputate eget. Aenean vel odio at elit vestibulum consectetur. Donec vulputate mattis laoreet. Quisque est dolor, venenatis nec purus quis, porta luctus elit. Suspendisse ultrices a lorem eu semper. Nulla dui risus, rhoncus vel nibh a, scelerisque euismod ante. Cras efficitur eu elit vel cursus.",
        //   googleSheetsLink: null,
        //   projectNOI: 85000,
        //   projectValue: 2000000,
        //   annualRevenue: 150000,
        //   annualExpenses: 80000,
        //   vacancyAllowance: 0.05,
        //   managementFee: 0.03,
        //   maintenanceAllowance: 0.02,
        //   capRate: 0.065,
        // },
      ],
    };
  },
  mutations,
  getters,
  actions,
};

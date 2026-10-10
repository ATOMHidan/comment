const Application = require('@waline/vercel');
const { decorateDashboard } = require('./account-ui.cjs');

const waline = Application({
  plugins: [],
  async postSave(comment) {
    // do what ever you want after comment saved
  },
});

module.exports = (request, response) => {
  decorateDashboard(request, response);
  return waline(request, response);
};

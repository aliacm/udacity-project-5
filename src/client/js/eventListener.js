const { handleSubmit } = require("./formHandler");

const addEventListener = (function () {
    document.getElementById("button").addEventListener('click', handleSubmit)
})();

export { addEventListener }
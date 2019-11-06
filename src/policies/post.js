const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {
  
  new() {
    return this.user != null;
  }
  
  create() {
    return this.new();
  }

  show() {
    return true;
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
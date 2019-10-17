const ApplicationPolicy = require("./application");

module.exports = class CommentPolicy extends ApplicationPolicy {

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  destroy() {
    return this._isAdmin();
  }

}
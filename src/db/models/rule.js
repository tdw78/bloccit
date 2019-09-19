'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    ruleId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "ruleId",
     }
    }
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
        foreignKey: "ruleId",
        onDelete: "CASCADE",
    });
  };
  return Rule;
};
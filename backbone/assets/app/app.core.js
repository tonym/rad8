define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'app/plugins/core/app.prototype',
  'app/plugins/core/app.config.prototype',
  'app/plugins/core/app.filter.prototype',
  'app/plugins/core/app.navigation.prototype',
  'app/plugins/core/app.workspace.prototype'
], function(
  $,
  _,
  Backbone,
  Bootstrap,
  AppPrototype,
  AppConfigPrototype,
  AppFilterPrototype,
  AppNavigationPrototype,
  AppWorkspacePrototype
) {

  'use strict';

  var Core = {};

  _.merge(Core, AppPrototype);
  _.merge(Core, AppConfigPrototype);
  _.merge(Core, AppFilterPrototype);
  _.merge(Core, AppNavigationPrototype);
  _.merge(Core, AppWorkspacePrototype);

  return Core;

});

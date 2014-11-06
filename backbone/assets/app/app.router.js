define([
  'underscore',
  'backbone',
  'app.core',
  'app.backbone.router',
  'jquery.chosen'
], function(
  _,
  Backbone,
  AppCore,
  BackboneRouterPrototype
) {

  'use strict';

  var AppRouter = Backbone.Router.extend({

    routes : AppCore.Config.get('routes'),

    initialize : function() {

      var self = this;

      this.on('route', function(module, options) {
        var _options = { segments : options };
        self.loadModule(module, _options);
      });

      Backbone.history.start({ pushState : self.hasPushState() });

    }

  });

  _.merge(AppRouter.prototype, AppCore);
  _.merge(AppRouter.prototype, BackboneRouterPrototype);

  return AppRouter;

});
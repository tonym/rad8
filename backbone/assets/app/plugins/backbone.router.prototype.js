/**
 * @file backbone.router.prototype.js
 * @author tmaxymillian
 * @alias BackboneRouterPrototype
 */

define([
  'underscore',
  'backbone',
  'app/plugins/core/app.prototype',
  'jquery.chosen'
], function(
  _,
  Backbone,
  AppPrototype
) {

  'use strict';

  var Prototype = {

    loadModule : function(module, options) {

      var self = this;
      var _options = {};
      var redirect = [];
      var _module = module;
      this.clearMessages();
      this.clearActive();

      if(typeof module === 'string' && module.match('redirect:')) {

        redirect = module.split(':');
        Backbone.history.navigate(redirect[1], true);

      }
      else {

        _options = this.prepareOptions(options);

        self.setActive();
        window.scrollTo(0, 0);

        if(_options.hasOwnProperty('modules')) {
          _module = _options.modules[module];
        }

        require([_module], function(Module) {
          if(self[_module]) {
            if(_options.reset) {
              self[_module].initialize(_options);
            }
            else {
              self[_module].render(_options);
            }
          }
          else {
            self[_module] = new Module(_options);
          }
        });
      }

      return this;

    },

    /**
     * Backbone must know about all elements on a page so
     * it can handle the click event. If the workspace changes
     * new links could be added to the page. This method
     * binds the click event to links in the workspace.
     * If default behavior of a link is desired, add the
     * class 'ignore' to the link.
     *
     * @method setControls
     */
    setControls : function(options) {

      var self = this;

      $('body').undelegate('a', 'click');
      $('body').delegate('a',
        'click', function(e) {

        var elem = $(this);
        var ignore = elem.hasClass('ignore');

        if(self.hasHashChange()) {
          e.preventDefault();
          if(!ignore) {
            self.navigate(elem.attr('href'), {trigger : true});
          }
        }
        else {
          if(ignore) {
            e.preventDefault();
          }
        }
      });

      /**
       * Fix for IE hover.
       */
      if(!this.hasPushState()) {
        $('a').on('click', function() { $(this).blur(); });
      }

    },

    setActive : function() {

      var active = $('.nav li[name="' + Backbone.history.getFragment() + '"]');
      this.clearActive();
      active.addClass('active');
      active = null;

      return this;

    },

    clearActive : function() {

      $('.nav li').removeClass('active');

      return this;

    },

    handleRefresh : function() {

      var self = this;

      $('.refresh-content').off('click');
      $('.refresh-content').on('click', function() {
        self.refreshView();
      });

      return this;
    },

    prepareOptions : function(options) {

      var self = this;

      var _options = {
        modules : self.Config.get('modules'),
        success : function() {
          self.setControls();
          self.handleRefresh();
        }
      };

      return this._prepareOptions(_options,
                                    this.Config.get('app'),
                                    this.Config.get('router'),
                                    options);

    }

  };

  _.merge(Prototype, AppPrototype);

  return Prototype;

});

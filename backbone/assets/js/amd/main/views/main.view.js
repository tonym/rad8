/**
 * @file main.view.js
 * @author tmaxymillian
 * @alias MainView
 * @mixes MainPrototype
 */

define([
  'jquery',
  'underscore',
  'backbone',
  '../collections/main.collection',
  '../plugins/main.prototype',
  'mustache',
  'require.text!../templates/main.header.template.html',
  'require.text!../templates/main.body.template.html',
  'require.text!../templates/main.footer.template.html',
], function(
  $,
  _,
  Backbone,
  MainCollection,
  MainPrototype,
  Mustache,
  mainHeaderTemplate,
  mainBodyTemplate,
  mainFooterTemplate
) {

  'use strict';

  var View = Backbone.View.extend({

    /**
     * Constructor
     *
     * @method
     */
    initialize : function(options) {

      var self = this;
      var _options = this.prepareOptions(options);

      this.clearMessages();

      this.fetchMainData({
        complete : function() {
          self.render(_.extend(_options, {
            success : function() {
              self.start();
            }
          }));
        }
      });

    },

    /**
     * Render the template and replace the #workspace HTML
     *
     * @method
     */
    render : function(options) {

      var self = this;
      var _options = {};
      var header = Mustache.render(options.hasOwnProperty('header') ? options.header : mainHeaderTemplate, this.mainData.attributes);
      var body = Mustache.render(options.hasOwnProperty('body') ? options.body : mainBodyTemplate, this.mainData.attributes);
      var footer = Mustache.render(options.hasOwnProperty('footer') ? options.footer : mainFooterTemplate, this.mainData.attributes);

      _options = _.extend({
        partial : body,
        complete : function() {
          self.trigger('rendered');
          self.restart();
        }
      }, options);

      this.clearAll();

      this.replaceHeader(header);

      this.replaceFooter(footer);

      this.replaceBody(_options);

      return this;

    },

    /**
     * One time event hanlders
     * start() binds event handlers, but is called
     * only once per instance
     *
     * @method
     */
    start : function() {

      var self = this;

      this.off();

      // Event handlers go here

      return this;

    },

    /**
     * Bind event handlers each time the view is rendered
     *
     * @method
     */
    restart : function() {

      var self = this;

      // Event handlers go here

      return this;

    }

  });

  _.merge(View.prototype, MainPrototype);

  return View;

});

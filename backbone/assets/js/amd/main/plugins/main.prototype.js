/**
 * @file main.prototype.js
 * @alias SupportPrototype
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'app.core',
  '../collections/main.collection'
], function(
  $,
  _,
  Backbone,
  AppCore,
  MainCollection
) {

  'use strict';

  var Prototype = {

    api : {
      stories : 'stories',
      story : '<story>'
    },

    links : {
      root : '/'
    },

    tabs : {

    },

    /**
     * Main data objects
     *
     * @property {object} mainData
     */
    mainStories : {},
    mainStory : {},

    /**
     * Fetch main data model
     *
     * @method
     * @param {object} (options)
     */
    fetchMainStories : function(options) {

      var _options = this.prepareOptions(options);

      this.mainStories = new MainCollection();

      this.mainStories.url = this.Navigation.getServiceLink(this.api.stories);

      return this._fetchData('mainStories', _options);

    },

    fetchMainStory : function(story, options) {

      var _options = this.prepareOptions(options);

      _options.unshift = true;

      this.mainStory = new MainCollection();

      this.mainStory.url = this.Navigation.getServiceLink(this.api.story.replace(this.api.story, story));

      return this._fetchData('mainStory', _options);

    },

    /**
     * Wrapper for _prepareOptions
     * Since options are always optional, use
     * a wrapper for _prepareOptions so defaults
     * can be added.
     *
     * @method
     * @param {object} (options)
     */
    prepareOptions : function(options) {

      var defaults = { reset : true,
                       unshift : false };

      return this._prepareOptions(defaults, options);

    }

  };

  _.merge(Prototype, AppCore);

  return Prototype;

});
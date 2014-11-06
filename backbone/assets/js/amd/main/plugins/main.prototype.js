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

    },

    links : {
      root : '/'
    },

    tabs : {

    },

    /**
     * Main data object
     *
     * @property {object} mainData
     */
    mainData : {},

    /**
     * Fetch a support data model
     *
     * @method
     * @param {object} (options)
     */
    fetchMainData : function(options) {

      var _options = this.prepareOptions(options);

      this.mainData = new MainCollection();

      this.mainData.url = this.Navigation.getAPILink(this.api.contact);

      _options = _.extend(_options, {
        reset : true,
        unshift : true
      });

      return this._fetchData('mainData', _options);

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

      return this._prepareOptions(options);

    }

  };

  _.merge(Prototype, AppCore);

  return Prototype;

});
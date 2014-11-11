/**
 * @file app.navigation.prototype.js
 * @alias AppNavigationPrototype
 * @namespace Navigation
 */

define([
  'jquery',
  'underscore',
  './app.prototype',
  './app.config.prototype',
  'require.text!app/templates/app.navigation.pills.template.html',
  'require.text!app/templates/app.navigation.tabs.template.html',
  'mustache'
], function(
  $,
  _,
  AppPrototype,
  AppConfigPrototype,
  appNavigationPillsTemplate,
  appNavigationTabsTemplate,
  Mustache
) {

  'use strict';

  var Prototype = {

    Navigation : {

      templates : {
        pills : Mustache.parse(appNavigationPillsTemplate),
        tabs : Mustache.parse(appNavigationTabsTemplate)
      },

      /**
       * Get a fully qualified link
       *
       * @method
       * @param {string} link
       * @returns {string} link
       */
      getLink : function(link, options) {

        var _options = this.prepareOptions(options);

        return _link.charAt(0) === '/' ? _link : _options.siteUrl + _link;

      },

      getServiceLink : function(link, options) {

        var _link = '' + link;
        var _options = this.prepareOptions(
          typeof options === 'string' ? { service : options } : options);

        return _link.charAt(0) === '/' ? _link : this.Config.get('services.' + _options.service + '.host') + _link;

      },

      /**
       * Get a collection of links, such as for a navbar
       *
       * @method
       * @param {object} links
       * @param {object} (options)
       * @returns {object}
       */
      getLinks : function(options) {

        var _options = {};
        var ret = {};

        _options = this.prepareOptions(options.links ? options : { links : options });

        for(var link in _options.links) {
          ret[link] = this.getLink(_options.links[link]);
        }

        return ret;

      },

      getPills : function(options) {

        var _options = this.prepareOptions(options);

        return this.templates.pills(_options);

      },

      getTabs : function(options) {

        var _options = this.prepareOptions(options);

        if(_options.tabs.length === 1) {
          _options.singleTab = true;
        }

        return this.templates.tabs(_options);

      },

      prepareOptions : function(options) {

        var _options = {
          justified : true,
          singleTab : false,
          siteUrl : this.Config.get('siteUrl'),
          service : 'default',
          pills : [],
          tabs : [],
        };

        return this._prepareOptions(_options, this.Config.get('navigation'), options);

      }

    }

  };

  _.merge(Prototype.Navigation, AppPrototype);
  _.merge(Prototype.Navigation, AppConfigPrototype);

  return Prototype;

});

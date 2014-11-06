/**
 * @file app.prototype.js
 */

define([
  'underscore',
  'backbone'
], function(
  _,
  Backbone,
  moment
) {

  'use strict';

  var Prototype = {

    activeCollection : false,

    /**
     * Many methods throughout the app can accept an options
     * object as an argument, but it's optional. This method
     * takes an argument of any type, and returns a JS
     * object.
     *
     * prepareOptions can take any number of arguments, so
     * you can batch option objects if you like, and the
     * method will spin through the arguments array and
     * return a single object
     *
     * prepareOptions(obj1, obj2, ... objN);
     *
     * @method
     * @protected
     * @param {...object}
     * @returns {object}
     */
    _prepareOptions : function() {

      var _options = {};

      for(var i = 0; i < arguments.length; i++) {
        if(typeof arguments[i] === 'object') {
          _.merge(_options, arguments[i]);
        }
      }

      return _options;
    },

    /**
     * Callback methods. For all methods that use
     * callbacks, the callback function is passed
     * to the appropriate handleCallback method.
     *
     * @property {object} handleCallback
     */
    handleCallback : {

      /**
       * Success callback. Call this method on
       * successful completion of something and
       * pass it the caller's options object.
       *
       * @method
       * @param {object} options
       * @returns this
       * @this parent
       */
      success : function(options) {
        if(options.hasOwnProperty('success') &&
          typeof options.success === 'function') {
          options.success();
        }

        return this;
      },

      /**
       * Error callback. Call this method on
       * unsuccessful completion of something and
       * pass it the caller's options object.
       *
       * @method
       * @param {object} e Error object
       * @param {object} options
       * @returns this
       * @this parent
       */
      error : function(e, options) {
        if(options.hasOwnProperty('error') &&
          typeof options.error === 'function') {
          options.error(e);
        }

        return this;
      },

      /**
       * Complete callback. Call this method at the
       * end of something. Complete should run at
       * complete regardless of success or error
       *
       * @method
       * @param {object} options
       * @returns this
       * @this parent
       */
      complete : function(options) {
        if(options.hasOwnProperty('complete') &&
          typeof options.complete === 'function') {
          options.complete();
        }

        return this;
      }
    },

    _patch : function(modelId, options) {

      var self = this;
      var model = this[options.collection].get(modelId);

      if(!options.url) {
        options.url =
          self.Navigation.getAPILink(
            self.api[model.get('type')].replace('<id>', model.get('id'))
          );
      }

      return model.save(options.attrs, options);

    },

    /**
     * Make an asynchronous request to the API
     *
     * Fetch data from a collection. For the options, some classes
     * may need default values and can provide a pre process function.
     * The funtion can be specified in the options as property
     * 'prepareOptions' and given the function name.
     * If not specified in the options, the function name is
     * assumed to be _prepareOptions.
     * If prepareOptions doesn't exist, the method will
     * call _prepareOptions directly.
     *
     * @method
     * @protected
     * @param {object} collection -The collection to fetch
     * @param {object} options
     */
    _fetchData : function(collection, options) {

      var self = this;
      var _options = options.hasOwnProperty('prepareOptions') ?
        options.prepareOptions(options) :
        typeof this.prepareOptions === 'function' ?
        this.prepareOptions(options) :
        this._prepareOptions(options);

      this[collection].fetch({
        reset : _options.reset,
        cache : false,
        headers : { 'Application-Version' : self.Config.get('appVersion') },
        success : function(result) {
          self[collection] = _options.unshift ? result.at(0) : result;
          self.handleCallback.success(_options);
        },
        error : function(model, response) {
          self[collection] = {};
          if(self.trigger) {
            self.trigger('fetched:error');
          }
          self.handleCallback.error(model, _options);
        },
        complete : function() {
          self.handleCallback.complete(_options);
          self = null;
          _options = null;
        }
      });

      return this;

    },

    /**
     * Refresh the current view
     *
     * @return {object} this
     */
    refreshView : function() {

      var target = Backbone.history.fragment;
      var self = this;
      var router = new Backbone.Router();

      Backbone.history.fragment = '/';
      router.navigate(target, { trigger : true, replace: true });
      target = null;
      self = null;

      return this;

    },

    /**
     * Browser detection methods
     */

    /**
     * Detects pushState method.
     * Useful for identifying modern browsers, and for
     * providing traditional page navigation for IE < 9
     *
     * @method
     * @returns {boolean}
     */
    hasPushState : function() {
      if(typeof history.pushState === 'function') {
        return true;
      }
      return false;
    },

    isJSON : function(json) {
      var ret = true;
      try {
        JSON.parse(json);
      }
      catch(e) {
        ret = false;
      }
      return ret;
    },

    parseJSON : function(json) {

      var ret;

      try {
        ret = JSON.parse(json);
      }
      catch(e) {
        ret = json;
      }

      return ret;

    },

    /**
     * Check for hashChange event (location.hash)
     * Useful for detecting IE > 7
     *
     * @method
     * @returns {boolean}
     */
    hasHashChange : function() {
      if('onhashchange' in window) {
        return true;
      }
      return false;
    },

    /**
     * Getter and setter
     *
     * Use _get and _set instead of get and set to prevent overloading
     */

    /**
     * Setter
     *
     * @protected
     * @param {string} key - The property to set
     * @param {any} value - The value to assign
     * @return {object} this
     */
    _set : function(key, value) {

      if(this.hasOwnProperty(key)) {
        this[key] = value;
      }

      return this;

    },

    /**
     * Getter
     *
     * @protected
     * @param  {string} key - The property to get
     * @return {any} The property value
     */
    _get : function(key) {

      return this[key];

    }

  };

  return Prototype;

});
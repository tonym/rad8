/**
 * @file app.config.prototype.js
 * @author tmaxymillian
 * @alias AppConfigPrototype
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'module',
  'require.text!config/config.json'
], function(
  $,
  _,
  Backbone,
  module,
  config
) {

  'use strict';

  /**
   * Prepare the app config. Configuration settings are
   * in a local file (config.json), which is included by
   * require.js, but the worldwide configuration is also
   * needed, and supplied by the server API. As an API
   * endpoint, and not a static file, require.js cannot
   * include it. So it's done here.
   *
   * Start by parsing the local config file, then use
   * jQuery ajax() to get the worldwide config. Doing it
   * this way allows for a synchronous request (required
   * because config values may be needed right away), and
   * the result is cached by the browser (so the request
   * only happens once, then is loaded from cache), and
   * the result is parsed as JSON.
   *
   * When the result is returned, spin through it and
   * delete any empty or null properties. This let's the
   * app defer to local defaults if nothing is provided
   * by the server.
   */
  var _config, configAPI;

  _config = JSON.parse(config);

  /**
   * Set the appVersion. appVersion is passed in require.config
   * in main.js
   */
  _config.appVersion = module.config().appVersion ?
    module.config().appVersion : '';

  /**
   * This is the implementation wide config
   * For UI to a dedicated service or application
   * this allows for an application or API configuration.
   */
  if(module.config().api && module.config().api.config) {
    configAPI = module.config().api.config;
  }
  else if((_config.api && _config.api.config)) {
    configAPI = _config.api.config;
  }
  else {
    configAPI = '';
  }

  /**
   * If a config api endpoint is specified, go get it,
   * then merge it into the config we already have.
   */
  if(configAPI) {
    $.ajax({
      url : configAPI,
      dataType : 'json',
      success : function(result) {
        for(var key in result) {
          if(result[key] === '' || result[key] === null || typeof result[key] === 'undefined') {
            delete result[key];
          }
        }
        _config = _.merge(_config, result);
      },
      async : false
    });
  }

  var Prototype = {

    /**
     * Config class. Can be moved to its own prototype, but more so
     * using a class (such as it is) keeps the getters in thier own
     * scope. Even though the configuration can still be accessed
     * directly, this pattern anticipates eventual IE support for
     * Javascript getters and setters (all other browsers support
     * it now) at which point the configuration can be stored in
     * a closure for true private properties.
     */
    Config : {

      config : _config,

      get : function(name) {

        var ret = this.config;
        var keys = name.split('.');

        for(var i = 0; i < keys.length; i++) {
          if(ret[keys[i]] && ret[keys[i]] !== 'undefined') {
            ret = ret[keys[i]];
          }
          else {
            ret = false;
            break;
          }
        }

        return ret;

      },

      getAll : function() {
        return this.config;
      }

    },

    /**
     * Error class. Error messages are a component of the configuration
     * and is created here as a way to access this specific property
     * of the configuration.
     */
    Error : {

      config : _config,

      get : function(errorCode) {

        var _errorCode, _errorMessage;
        var _error = this._parseJSON(errorCode);

        var _options = _.merge({
          error : {
            standard : '',
            codeIdentifier : 'code',
            messageIdentifier : 'message'
          }
        }, this.config);

        if(typeof _error === 'object') {
          _errorCode = _error.hasOwnProperty(_options.error.codeIdentifier) ?
            _error[_options.error.codeIdentifier] : 0;
          _errorMessage = _error.hasOwnProperty(_options.error.messageIdentifier) ?
            _error[_options.error.messageIdentifier] : '';
          if(!_errorMessage) {
            _errorMessage = _options.error.standard ? _options.error.standard : _error;
          }
        }
        else {
          _errorCode = '' + _error;
          _errorMessage = _options.error.hasOwnProperty(_error) ?
            _options.error[_error] :
              _options.error.standard ? _options.error.standard : _error;
        }

        return _errorMessage;

      },

      _parseJSON : function(json) {

        var ret;

        try {
          ret = JSON.parse(json);
        }
        catch(e) {
          ret = json;
        }

        return ret;

      }

    }

  };

  return Prototype;

});
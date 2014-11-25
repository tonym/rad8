/**
 * @file  config.prototype.js
 */

define([
  'requireText!config/config.json'
], function(
  config
){

  'use strict';

  var _config = JSON.parse(config);

  var Prototype = {

    Config : {

      _config : _config,

      get : function(name) {

        var ret = this._config;
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

        return this._config;

      }

    }

  };

  return Prototype;

});
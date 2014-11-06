/**
 * @file backbone.model.prototype.js
 * @author tmaxymillian
 * @alias BackboneModelPrototype
 */

define([
  'underscore'
], function(
  _
) {

  'use strict';

  var Prototype = {

    /**
     * Set the attributes of a model from an object
     * of attribute(s).
     *
     * @method
     * @param {object} options
     * @returns {object} this
     */
    setAttributes : function(options) {

      var _options = options;

      for(var key in _options) {
        if(_options[key] === '') {
          _options[key] = this.defaults[key];
        }
      }

      this.set(_options);

      return this;

    },

    /**
     * Test if a model matches filter criteria
     *
     * @method
     * @param {object} options
     * @returns {boolean}
     */
    isMatch : function(options) {

      var self = this;
      var filter = {};
      var ret = true;
      var filterKey;

      _.extend(filter, options);

      function _matched(key) {

        var _matchedRet = false;
        var val = self.get(key);
        var sel = filter[key].value;

        if (val === null) {
          return false;
        }
            
        /**
         * If the selector (the value you are comparing the model
         * attribute value, val, against) is a date, the dates
         * should have the same time. This incantation ensures
         * both sel and val have dates with time 00:00:00
         */
        if(sel instanceof Date) {
          sel = new Date(sel.getUTCFullYear(), sel.getUTCMonth(), sel.getUTCDate());
          val = new Date(val);
          val = new Date(val.getUTCFullYear(), val.getUTCMonth(), val.getUTCDate());
        }

        /**
         * The actual comparison. The list of available operators
         * and possible values is documented in AppFilterPrototype
         * See core/app.filter.prototype.js for info.
         */
        switch(filter[key].comparator) {
        case 'eq':
          if(val === sel) {
            _matchedRet = true;
          }
          break;
        case 'ne':
          if(val !== sel) {
            _matchedRet = true;
          }
          break;
        case 'gt':
          if(val > sel) {
            _matchedRet = true;
          }
          break;
        case 'ge':
          if(val >= sel) {
            _matchedRet = true;
          }
          break;
        case 'lt':
          if(val < sel) {
            _matchedRet = true;
          }
          break;
        case 'le':
          if(val <= sel) {
            _matchedRet = true;
          }
          break;
        case 'range':
          if(val >= Number(sel[0]) && val <= Number(sel[1])) {
            _matchedRet = true;
          }
          break;
        case 'string':
          val = String(val).toLowerCase();
          sel = String(sel).toLowerCase();
          if(sel === 'all') {
            if(typeof val === 'string' &&
                (val.length > 0 && val !== 'undefined' && val !== 'null')) {
              _matchedRet = true;
            }
          }
          else if(sel === 'none') {
            if((typeof val === 'string' &&
                (val.length === 0 || val === 'undefined' || val === 'null')) ||
                typeof val !== 'string' || !val) {
              _matchedRet = true;
            }
          }
          else {
            if(val === sel) {
              _matchedRet = true;
            }
          }
          break;
        case 'like':
          if(typeof val !== 'boolean' &&
            String(val).toLowerCase().match(String(sel).toLowerCase())) {
            _matchedRet = true;
          }
          break;
        }

        return _matchedRet;
      }

      /**
       * Label the loop. Since we nest a loop within, and since
       * we can stop everything once we get a difinitive match
       * or unmatch, the label can be called in a break statement
       * to bail on the entire block.
       */
      outer:
      for(var key in filter) {
        filterKey = key && key !== 'all' ? key.split(',') : [];
        if(filterKey.length === 1 &&
          filter[filterKey[0]].value !== null && !_matched(filterKey[0])) {
          ret = false;
          break outer;
        }
        else if(filterKey.length > 1) {
          ret = false;
          for(var i = 0; i < filterKey.length; i++) {
            if(filter[filterKey[i]].value !== null && _matched(filterKey[i])) {
              ret = true;
              break outer;
            }
          }
        }
        else if(filterKey.length === 0 && filter[key].value !== null) {
          ret = false;
          for(var k in this.defaults) {
            filter[k] = filter[key];
            if(_matched(k)) {
              ret = true;
              delete filter[k];
              break outer;
            }
            else {
              delete filter[k];
            }
          }
        }
      }

      return ret;

    }

  };

  return Prototype;

});

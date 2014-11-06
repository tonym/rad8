/**
 * @file backbone.collection.prototype.js
 * @author tmaxymillian
 * @alias BackboneCollectionPrototype
 * @mixes AppPrototype
 */

define([
  'underscore',
  'app/plugins/core/app.prototype',
  'app/plugins/core/app.config.prototype'
], function(
  _,
  AppPrototype,
  AppConfigPrototype
) {

  'use strict';

  var Prototype = {

    /**
     * List of keys to sort by.
     * Keys are sorted in array order.
     *
     * @property {array}
     */
    sortKey : ['last_modified'],

    /**
     * Determines which direction to sort
     * (asc or desc)
     *
     * Add an item for each sort in the
     * sortKey list.
     *
     * @property {array}
     */
    sortOrder : ['desc'],

    /**
     * List of filters to apply to collection
     *
     * @property {object}
     */
    filters : {},

    /**
     * Timestamp for record edits.
     * The edit time can be set anytime
     * a new marker is needed. The marker
     * is to identify activity that has happened
     * since a specific point in time. Typically,
     * this is at session start so all edits, updates
     * or action items can be identified in the UI.
     *
     * @property {date}
     */
    editTime : new Date(),

    /**
     * The sort method.
     * Uses Backbone.Collection.sort()
     *
     * @method
     * @param {object} [options]
     */
    sortData : function(options) {

      var self = this;
      var _options = this._prepareOptions(options);

      /**
       * Backbone does not provide callbacks. Use
       * an eventhandler to know when to call
       * the success callback. Error and complete
       * callbacks are not used here
       */
      this.off('sort');
      this.on('sort', function() {
        self.trigger('sorted:data');
        self.handleCallback.success(_options);
      });

      /**
       * The comparator.
       *
       * Backbone.Collection.sort() does not provide a comparator (it does, but
       * it is a no-op function), so the comparator is defined here.
       *
       * The comparator must account for all data types, but Backbone.Collection.sort()
       * expects numbers. Not a problem for numbers, booleans or dates, but strings
       * must be converted to numbers. This is done using the stringNegate() function.
       *
       * @function
       * @param {string|number|boolean|date}
       * @param {string|number|boolean|date}
       */
      this.comparator = function(a, b) {
        var arg, arga, argb, str, els, ret;
        var aSort = [];
        var bSort = [];
        var stringNegate = function(arg) {
          str = arg.toLowerCase();
          str = str.split('');
          str = _.map(str, function(letter) {
            return String.fromCharCode(-(letter.charCodeAt(0)));
          });
          return str;
        };
        for(var i = 0; i < self.sortKey.length; i++) {
          arg = self.sortKey[i];
          arga = a.get(arg);
          argb = b.get(arg);

          if(self.sortOrder[i] === 'asc') {
            arga = isNaN(arga) ? arga.toLowerCase() : arga;
            argb = isNaN(argb) ? argb.toLowerCase() : argb;
            aSort.push(arga);
            bSort.push(argb);
          }
          else {
            arga = isNaN(arga) ? stringNegate(arga) : -arga;
            argb = isNaN(argb) ? stringNegate(argb) : -argb;
            aSort.push(arga);
            bSort.push(argb);
          }
        }
        els = [aSort, bSort];

        ret = els[0] > els[1] ?  1
          : els[0] < els[1] ? -1
          : 0;

        return ret;
      };
      this.sort();
    },

    /**
     * Similiar to Backbone.Collection.pluck(), but can pluck
     * multiple attributes from each model.
     *
     * @method
     * @param {object|array}
     */
    pluckMany : function (attrs) {
      return _.map(this.models, function (model) {
        var str = '';
        _.each(_.pick(model.attributes, attrs), function(value) {
          str += value + ' ';
        });
        /**
         * trim() not implemented in IE < 9.
         * Use jQuery trim for compatability
         */
        return $.trim(str);
      });
    },

    match : function() {

      var self = this;
      var filter = {};

      _.extend(filter, self.filters);

      return this.filter(function(model) {
        return model.isMatch(filter);
      });
    }

  };

  _.merge(Prototype, AppPrototype);
  _.merge(Prototype, AppConfigPrototype);

  return Prototype;

});
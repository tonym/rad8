/**
 * @file main.collection.js
 * @alias MainCollection
 */

define([
  'jquery',
  'underscore',
  'backbone',
  '../models/main.model'
], function(
  $,
  _,
  Backbone,
  MainModel
) {

  'use strict';

  var Collection = Backbone.Collection.extend({
    model : MainModel
  });

  return Collection;

});

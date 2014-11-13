/**
 * @file main.js
 */

(function() {

  'use strict';

  require.config({
    paths : {
      'app.core'                     : 'app/app.core',
      'app.backbone.collection'      : 'app/plugins/backbone.collection.prototype',
      'app.backbone.model'           : 'app/plugins/backbone.model.prototype',
      'app.backbone.router'          : 'app/plugins/backbone.router.prototype',
      'app.router'                   : 'app/app.router',
      'backbone'                     : 'app/lib/backbone/backbone',
      'bootstrap'                    : 'app/lib/bootstrap/dist/js/bootstrap.min',
      'jquery'                       : 'app/lib/jquery/dist/jquery.min',
      'jquery.chosen'                : 'app/lib/chosen/chosen.jquery.min',
      'moment'                       : 'app/lib/moment/min/moment.min',
      'mustache'                     : 'app/lib/mustache/mustache',
      'require.text'                 : 'app/lib/require_text/text',
      'toastr'                       : 'app/lib/toastr/toastr.min',
      'underscore'                   : 'app/lib/lodash/dist/lodash.min'
    },
    shim : {
      'backbone' : {
        deps : ['jquery', 'underscore']
      },
      'bootstrap' : {
        deps : ['backbone']
      },
      'jquery.chosen' : {
        deps : ['jquery']
      }
    },
    waitSeconds : 0
  });

}());
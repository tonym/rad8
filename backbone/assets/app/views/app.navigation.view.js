/**
 * @file app.navigation.view.js
 * @author tmaxymillian
 * @alias AppNavigationView
 */

define([
  'jquery',
  'underscore',
  'backbone'
], function(
  $,
  _,
  Backbone
) {

  'use strict';

  /**
   * NavigationView provides methods for styling the navigation and
   * navigation event handlers.
   *
   * @name NavigationView
   * @class
   */
  var View = Backbone.View.extend({

    data : {},

    initialize : function() {

      this.start();

    },

    start : function() {

      /**
       * Navigation listener
       * All links are handled by this event handler
       * except A elements with a data-bypass attribute.
       * There are few data-bypass links, so the code
       * uses negative logic instead of labeling all
       * links with an attribute or class to identify
       * navigation.
       */
      $('a:not([data-bypass])').on('click', function(e) {
        var href = {
          prop: $(this).prop('href'),
          attr: $(this).attr('href'),
          ignore: $(this).hasClass('ignore')
        };
        //var root = location.protocol + '//' + location.host + app.root;
        if (href.prop) {
          e.preventDefault();
          if(!href.ignore) {
            Backbone.history.navigate(href.attr, true);
          }
        }
      });

      $('#control-menu-mobile').on('click', function() {
        var nav = $('.nav-main');
        if(nav.css('display') === 'block') {
          nav.css('display', 'none');
          $(this).removeClass('btn-inverse');
        }
        else {
          nav.css('display', 'block');
          $(this).addClass('btn-inverse');
        }
      });

      $('.nav-main').on('click', function() {
        var control = $('#control-menu-mobile');
        //$(this).hide();
        control.removeClass('btn-inverse');
      });

    },

    renderBadges : function() {
      var badges = [];
      var json, $target;
      if(this.data.each) {
        this.data.each(function(record) {
          json = record.toJSON();
          if(isNaN(badges[json.type])) {
            badges[json.type] = 1;
          }
          else {
            badges[json.type]++;
          }
        });
      }
      $('span.badge-nav').remove();
      for(var key in badges) {
        $target = $('[data-type=' + key + '] .k-nav-alert');
        $target.html('<a href="javascript:alert(\'alerts click\');">' +
                     '<span class="badge badge-important badge-nav">' +
                     badges[key] + '</span></a>');
      }
    },

    removeBadges : function() {
      $('.k-nav-alert').html('');
    },

    setActive : function() {
      var segments = Backbone.history.getFragment().split('/');
      var active = $('a[href="/' + segments[0] + '/' + segments[1] + '"]');
      this.clearActive();
      active.addClass('active');
      active.siblings('.k-arrow-down').removeClass('hidden');
      segments = null;
      active = null;
    },

    clearActive : function() {
      $('.nav-main a').removeClass('active');
      $('.k-arrow-down').addClass('hidden');
    },

    removeActive : function() {
      $('.k-nav-active').addClass('hidden');
    }
  });

  return View;

});

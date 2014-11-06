/**
 * @file app.filter.prototype.js
 * @alias AppFilterPrototype
 * @namespace Filter
 *
 * The filter prototype provides filtering for a Backbone collection
 * of Backbone models.
 *
 * How to use
 *
 * The filter prototype is loaded automatically as part of the core
 * UI, however, its use is opt-in, meaning the filter must be attached
 * to a collection before it will filter. Like this:
 *
 *    this.Filter.attach(myCollection, {options});
 *
 * where myCollection is the Backbone collection to filter, and options
 * is a JSON object of various options (see below).
 *
 * How it works
 *
 * This prototype does not need including. It is included with the
 * core prototype and is always available in the Filter namespace.
 * Filter methods are, therefore, referenced as this.Filter.methodName().
 *
 * The core includes Filter, not only because of its use in almost
 * every view, but because each collection and view has it's own
 * filter methods that make it work.
 *
 * (for reference, see files app/plugins/backbone.collection.prototype.js,
 * and app/plugins/backbone.model.prototype.js for the private methods
 * associated with filter. Since these are private methods and not part
 * of the UI API, we will speak no more of them here.)
 *
 * The filter itself, i.e. this file, relies on HTML attributes in the
 * form controls to set and change the applied filters. When a control is
 * clicked or changed, the event handlers bound to the controls by the
 * Filter.attach method will fire and filter the attached collection.
 *
 * A callback function, specified as a property in the options argument
 * is then called. The callback function is what should actually render
 * the filtered collection in the view.
 *
 * You can have as many filter controls as you like. Filter keeps
 * all settings in a JSON object and can apply as many filters as
 * your imagination allows. Filter also remembers state, so if
 * a complex set of filters is set up for a given view, it will
 * be there if the user browses away, then comes back.
 *
 * Step by step
 *
 * 1. The Markup
 *
 * To use Filter, first add some controls to your view and give it
 * the Filter attributes:
 *
 *     <input type="text"
 *         class="filter"
 *         value=""
 *         data-filter-key="first_name"
 *         data-filter-comparator="eq">
 *
 * The 4 attributes in the example are reqiured:
 *     class="filter" tells Filter it is a filter control element.
 *     value="" tells Filter what value to use when filtering. When
 *         the value changes, Filter automatically does its thing.
 *     data-filter-key="first_name" tells Filter which field
 *         in a Backbone model to compare against. No value tells
 *         Filter to use all possible field to compare against
 *         (data-filter-key=""). A comma delimited list allows multiple
 *         field filtering (data-filter-key="name,company_name,primary_email")
 *     data-filter-comparator="eq" tells Filter how to compare the
 *         entered value with the Backbone model field.
 *
 * Possible values for data-filter-comparator, and their associated operators:
 *
 *     eq     : strict equal : ===
 *     ne     : strict not equal : !==
 *     lt     : less than : <
 *     le     : less than or equal : <=
 *     gt     : greater than : >
 *     ge     : greater than or equal : >=
 *     range  : value is within a specified number range : >= a && <= b
 *     string : test if value is a string, or if it matches a given string
 *              Special values for string:
 *                'all' : returns true if value is a string and is not
 *                        an empty string
 *                'none' : returns true if value is not a string, or is
 *                         an empty string
 *                String : a value to match. Any string other than 'all'
 *                         or 'none' will return if String === value
 *
 * When selecting an operator, remember that the Backbone model
 * value is compared to the HTML element value. Selecting the
 * lt (less than) operator means you are keeping all models where
 * the model value is less than the entered HTML value.
 *
 * 2. The Javascript
 *
 * Let's assume we have a collection called users.
 * The JS statment to filter users is:
 *
 *     this.Filter.attach(users);
 *
 * That's it. You're done. However, you might want to update the display.
 * Many times a view will have a render method to do this. Simply pass a
 * reference to it (or whatever method you use to render the view) as an option:
 *
 *     this.Filter.attach(users, { complete : render });
 *
 * If your render method has scope references (if it uses the keyword 'this'),
 * you can bind a context to the callback:
 *
 *     this.Filter.attach(users, { complete : _.bind(render, this) });
 *
 * Now your filters will manage themselves based on events triggered by the
 * attached controls. The display of filtered data, however, is opt-in. So far
 * we've added a callback function, and it is in this function that the filter
 * is applied to data. You can roll whatever methods you like, or use
 * the Backbone Collection prototype method match(). Filter is built to work
 * hand in hand with match(), so if you don't feel like writing your own filter
 * methods from scratch, just call match() and let it handle the rest.
 *
 *   var users = this.users.match();
 *
 * Note that collections are not filtered in place. Instead match() filters,
 * then returns a clone so if something goes wrong the original, unfiltered
 * collection is preserved. That's why there is a variable assignment in
 * the above example.
 *
 * 3. Additional features
 *
 * Clearing the filters.
 *
 * To clear all filters, add an HTML element (a button,
 * link, or anything with a click event) and give it a class of filter-clear:
 *
 *     <button class="filter-clear">Clear all filters</button>
 *
 * Once attached to a collection, clicking the button will reset all filters
 * and the collection.
 *
 * Displaying the filter count
 *
 * Filter can display the filter count, with a descriptive popover. This
 * is enabled by default. To disable, add this to your Filter.attach options:
 *
 *     showFilterCount : false
 *
 * To make the filter count show, add an HTML element for the count, and
 * give it the class filter-count. As a rule, Filter will hide the element
 * if no filters are set, and show the element with the count if filters
 * are set.
 *
 *     <span class="filter-count hidden"></span>
 *
 * In the real world, you might use a Bootstrap badge for the filter count
 *
 *     <span class="filter-count hidden badge"></span>
 *
 * To give the filters friendly names, add the data-filter-text attribute
 * to your filter control. The control from above would look like this:
 *
 *     <input type="text"
 *         class="filter"
 *         value=""
 *         data-filter-key="first_name"
 *         data-filter-comparator="eq"
 *         data-filter-text="First Name">
 *
 * If no text is specified, Filter will create text based on the filter
 * count (filter1, filter2, etc.)
 *
 * Advanced use
 *
 * Specifying options
 *
 * Filter.attach accepts options for any of it's values.
 * The possible options and their default values are:
 *
 *     filter : '.filter' : The class assigned to each filter control
 *         (note, filter is a class selector, not a class name)
 *     filterClear : '.filter-clear' : The class assigned to the clear control
 *         (note, filterClear is a class selector, not a class name)
 *     searchReset : '.search-reset : The control to clear the search box'
 *         (note, searchReset is a class selector, not a class name)
 *     searchInput : '.search-input' : The search box
 *         (note, searchInput is a class selector, not a class name)
 *     key : 'data-filter-key' : The HTML attribute where the model field is declared
 *     comparator : 'data-filter-comparator' : The HTML attribute declaring comparison operator
 *     dateClass : 'dateinput' : The class assigned to date inputs so the datepicker will work
 *         (note, Filter does not provide a date picker, but needs to know the date picker
 *          class so the field can be updated or reset, and values formatted as human
 *          readable dates).
 *         (note, dateClass is a class name, not a class selector)
 *     showFilterCount : true : Show the filters in a popover
 *     filterCount : '.filter-count' : The element that is the filter count
 *         (note, filterCount is a class selector, not a class name)
 *     filterCountText : 'data-filter-text' : The HTML attribute containing filter display name
 *     events : 'mouseup change update' : Which events to bind
 *     complete : null : The callback function. Executes when the filter is complete
 *
 * Config example (see above for definitions):
 *
 * filter : {
 *   filter : {string} '.filter' jQuery selector,
 *   filterClear : {string} '.filter-clear' jQuery selector,
 *   searchReset : {string} '.search-reset' jQuery selector,
 *   searchInput : {string} '.search-input' jQuery selector,
 *   key : {string} 'data-filter-key',
 *   comparator : {string} 'data-filter-comparator',
 *   dateClass : {string} 'dateInput',
 *   showFilterCount : {boolean} true,
 *   filterCount : {string} '.filter-count' jQuery selector,
 *   filterCountText : {string} 'data-filter-text',
 *   events : {string} 'mouseup change update',
 *   complete : {function} null
 * }
 *
 * Options example (see above for definitions):
 *
 * {
 *   filter : {string} '.filter' jQuery selector,
 *   filterClear : {string} '.filterClear' jQuery selector,
 *   searchReset : {string} '.search-reset' jQuery selector,
 *   searchInput : {string} '.search-input' jQuery selector,
 *   key : {string} 'data-filter-key',
 *   comparator : {string} 'data-filter-comparator',
 *   dateClass : {string} 'dateInput',
 *   showFilterCount : {boolean} true,
 *   filterCount : {string} '.filter-count' jQuery selector,
 *   filterCountText : {string} 'data-filter-text',
 *   events : {string} 'mouseup change update',
 *   complete : {function} null
 * }
 *
 * Suppose your application uses class 'glDatePicker' for the date elements, class
 * 'user-filter' as the filter class (because maybe there are several collections
 * in the view with separate filters), and you prefer to use the 'name' attribute
 * to identify the filter key. The markup and JS then looks like this:
 *
 *     <input type="text"
 *         name="last_login"
 *         value=""
 *         class="user-filter glDatePicker"
 *         data-filter-text="Last Login"
 *         data-filter-comparator="gt">
 *
 *     this.Filter.attach(users, {
 *         filter : '.user-filter',
 *         dateClass : 'glDatePicker',
 *         key : 'name',
 *         complete : _.bind(render, this)
 *     });
 *
 * When the input value changes, the users collection will be filtered
 * and return a collection of all users who have logged in after,
 * but not on, the specified date. (Comparator 'gt' says give me all
 * models whose last login date is greater than the date I've entered)
 */

define([
  'jquery',
  'underscore',
  './app.prototype',
  './app.config.prototype',
  'moment'
], function(
  $,
  _,
  AppPrototype,
  AppConfigPrototype,
  moment
) {

  'use strict';

  var Prototype = {

    Filter : {

      /**
       * Attach a filter to a collection
       *
       * @method attach
       * @param {object} collection
       * @param {object} [options]
       */
      attach : function(collection, options) {

        /**
         * The filter control element jQuery object
         */
        var filter = $();

        /**
         * The clear control jQuery object
         */
        var filterClear = $();

        /**
         * The search input
         */
        var searchInput = $();

        /**
         * The search input reset control
         */
        var searchReset = $();

        /**
         * @this Filter
         */
        var self = this;

        /**
         * Overwrite the default options with options param
         * Don't worry. If an option isn't provided, the
         * default will be used.
         */
        var _options = this.prepareOptions(options);

        /**
         * The filter, filterClear and search jQuery objects
         */
        filter = $(_options.filter);
        filterClear = $(_options.filterClear);
        searchInput = $(_options.searchInput);
        searchReset = $(_options.searchReset);
        searchReset.prop('disabled', true);

        /**
         * clear all the set filters
         *
         * @private
         */
        function _clearFilters() {
          for(var key in collection.filters) {
            delete collection.filters[key];
          }
          filter.not('button').not(':radio').not('.' + _options.sliderClass).val('');
          $('.btn').has(_options.filter).removeClass('active');
          filter.filter('.' + _options.sliderClass).val([0, 1000000000000]);
          filter.filter(function() {
            return $(this).val() === '';
          }).parent('.btn').addClass('active');
          filter.trigger('chosen:updated');
          collection.userCount = [];
          _setFilters();
          if(self.Pagination) {
            self.Pagination.set('offset', 0);
          }
          self.handleCallback.complete(_options);
        }

        /**
         * Set the filters to the last entered setting
         * This is used to preserve state. When a user
         * surfs away from the view, then returns to it
         * this function will configure the filter just
         * as she left it.
         *
         * @private
         */
        function _setFilters() {
          var dateFormat = self.Config.get('dateFormat');
          var elem = $('button' +  _options.filter);
          elem.removeClass('active');
          elem = $('button' +  _options.filter + '[value=""]');
          elem.addClass('active');
          for(var key in collection.filters) {
            elem = $('button[' + _options.key + '="' + key +
              '"][value="' + collection.filters[key].value + '"]');
            elem.addClass('active');
            elem.siblings().removeClass('active');

            elem = $('input[' + _options.key + '="' + key + '"]');
            elem.val(collection.filters[key].value);

            elem = $('.' + _options.dateClass + '[' + _options.key + '="' + key + '"]');
            elem.val(moment(collection.filters[key].value).format(dateFormat));

            elem = $('.' + _options.sliderClass + '[' + _options.key + '="' + key + '"]');
            elem.val(collection.filters[key].value);

            $('option[value="' + collection.filters[key].value + '"]')
              .attr('selected', 'selected')
              .trigger('chosen:updated');
          }
          if(_options.showFilterCount) {
            self._setFilterCount(collection, _options);
          }
        }

        _setFilters();

        /**
         * The event handler for the filter controls
         */
        filter.off(_options.events);
        filter.on(_options.events, function() {
          var elem, key, text, value, comparator;
          elem = $(this);
          key = elem.attr(_options.key);
          if(elem.hasClass(_options.searchInput.replace('.', ''))) {
            if(searchInput.val().length) {
              searchReset.prop('disabled', false);
            }
            else if(!searchInput.val().length && searchInput.is(':focus')) {
              searchReset.prop('disabled', true);
            }
          }
          if(elem.val() === '') {
            delete collection.filters[key];
          }
          else {
            value = elem.val();
            if(elem.hasClass(_options.dateClass)) {
              value = new Date(value);
            }
            comparator = elem.attr(_options.comparator);
            text = elem.attr(_options.filterCountText);
            collection.filters[key] = {};
            collection.filters[key].value = value;
            collection.filters[key].comparator = comparator;
            collection.filters[key].text = text;
          }
          if(_options.showFilterCount) {
            self._setFilterCount(collection, _options);
          }
          if(self.Pagination) {
            self.Pagination.set('offset', 0);
          }
          self.handleCallback.complete(_options);
        });
        $('input.' + _options.dateClass).off('mouseup');

        searchReset.off();
        searchReset.on('click', function() {
          searchInput.blur();
          searchInput.val('');
          searchInput.trigger('update');
          searchReset.prop('disabled', true);
        });

        $('input' + _options.searchInput).off('mouseup');

        /**
         * The event handler for the filter clear control
         */
        filterClear.off();
        filterClear.on('click', _.bind(_clearFilters, self));

        return this;

      },

      /**
       * Count the applied filters, and show the count in an
       * HTML element. Show very brief details of each set
       * filter in a popover
       *
       * @method
       * @protected
       * @param {object} collection
       * @param {object} options
       * @returns this
       */
      _setFilterCount : function(collection, options) {

        var dateFormat = this.Config.get('dateFormat');

        /**
         * The popover arguments object
         */
        var args = {};
        var filterCount = 0;
        var filterValue = '';
        var filterText = '';

        /**
         * The filter count HTML element jQuery oject
         */
        var elem = $(options.filterCount);

        args.content = '';

        /**
         * Loop through the filters, counting them and preparing the popover
         */
        for(var key in collection.filters) {
          filterCount++;
          filterValue = collection.filters[key].value;
          if(filterValue instanceof Date) {
            filterValue = moment(filterValue).format(dateFormat);
          }
          filterText = collection.filters[key].text;
          if(!filterText || filterText === 'undefined') {
            filterText = 'filter' + filterCount;
          }
          args.content += '<p>' + filterText + ': ' + filterValue + '</p>';
        }

        /**
         * Get the popover arguments right
         */
        args.title     = filterCount + ' Filters Applied';
        args.html      = true;
        args.trigger   = 'hover';
        args.placement = 'left';
        args.container = 'body';

        /**
         * Event handler to prevent a hide event from bubbling.
         * This is needed when there are no filters set, and
         * class 'hidden' is added to the filter count
         * HTML element, when the filter count element is
         * in a modal, tab, accordion, or anything else that
         * can be hidden.
         */
        elem.off('hide');
        elem.on('hide', function(e) {
          e.stopPropagation();
        });

        /**
         * Show, or hide, the filter count element based
         * on the number of filters set.
         */
        elem.html(filterCount);
        if(filterCount) {
          elem.removeClass('hidden');
          elem.popover('destroy');
          elem.popover(args);
        }
        else {
          elem.addClass('hidden');
        }

        return this;

      },

      prepareOptions : function(options) {

        var _options = {
          filter          : '.filter',
          filterClear     : '.filter-clear',
          searchInput     : '.search-input',
          searchReset     : '.search-reset',
          key             : 'data-filter-key',
          comparator      : 'data-filter-comparator',
          dateClass       : 'dateinput',
          sliderClass     : 'slider',
          showFilterCount : true,
          filterCount     : '.filter-count',
          filterCountText : 'data-filter-text',
          events          : 'mouseup keyup change update',
          searchKeys      : {}
        };

        return _.merge(_options, this.Config.get('filter'), options);

      }

    }

  };

  _.merge(Prototype.Filter, AppPrototype);
  _.merge(Prototype.Filter, AppConfigPrototype);

  return Prototype;

});
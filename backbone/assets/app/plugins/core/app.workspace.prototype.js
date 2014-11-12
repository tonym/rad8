/**
 * @file app.workspace.prototype.js
 * @alias AppWorkspacePrototype
 * @mixes AppPrototype
 * @mixes AppFilterPrototype
 */

define([
  'mustache',
  'require.text!app/templates/app.flash_message.template.html',
  'require.text!app/templates/app.spinner.template.html'
], function(
  Mustache,
  appFlashMessageTemplate,
  appSpinnerTemplate
) {

  'use strict';

  var Prototype = {

    /**
     * Create a container for the workspace content
     *
     * @property {string} partial
     */
    partial : '',

    /**
     * DOM selectors for the various parts of the workspace
     * Note: These IDs are only references so your selectors
     * don't need specified in the Config, unless you want them too.
     * There is no style provided by App for anything, so, while
     * the ID's may be semantic, you have to write the CSS.
     */
    dom : {
      workspaceBody : {
        selector   : '#workspace-body',
        descriptor : 'body'
      },
      workspaceFixed : {
        selector   : '#workspace-fixed',
        descriptor : 'fixed'
      },
      workspaceFooter : {
        selector   : '#workspace-footer',
        descriptor : 'footer'
      },
      workspaceHeader : {
        selector   : '#workspace-header',
        descriptor : 'header'
      },
      workspaceMessage : {
        selector   : '#workspace-message',
        descriptor : 'workspaceMessage'
      }
    },

    /**
     * Templates
     *
     * @property {object} templates
     */
    templates : {
      message : appFlashMessageTemplate,
      spinner : appSpinnerTemplate
    },

    /**
     * Classes for flash messages
     * This is what gets put in the CLASS attribute
     * of the message HTML element, and conforms
     * to Bootstrap classes. Extend/override in Config
     *
     * @property {object} messageClasses
     * @property {string} success
     * @property {string} error
     * @property {string} warning
     * @property {string} caution
     * @property {string} alert
     */
    messageClasses : {
      success : 'alert-success',
      error   : 'alert-danger',
      warning : 'alert-warning',
      info    : 'alert-info',
      undo    : 'alert-info'
    },

    /**
     * Array of flash messages. Push messages to this array
     * and pass to this.showMessages() to show all messages
     *
     * @property {array} messages
     */
    messages : [],

    /**
     * Generic replacement method.
     * Accepts target and partial so _render is
     * not called directly.
     *
     * @method
     * @param {object} options - must contain selector, may contain partial
     *                           and any callback functions
     */
    replace : function(options) {

      var _options = this.prepareWorkspaceOptions(options);

      this._render(_options, _options);

      return this;

    },

    /**
     * Replace the innerHTML of this.dom.workspaceBody
     *
     * @method
     * @param {object} options
     */
    replaceBody : function(options) {

      var _options = this.prepareWorkspaceOptions(options);

      this._render(_options.dom.workspaceBody, _options);

      return this;

    },

    /**
     * Replace the innerHTML of this.dom.workspaceHeader
     *
     * @method
     * @param {object} options
     */
    replaceHeader : function(options) {

      var _options = this.prepareWorkspaceOptions(options);

      this._render(_options.dom.workspaceHeader, _options);

      return this;

    },

    /**
     * Replace the innerHTML of this.dom.workspaceFixed
     *
     * @method
     * @param {object} options
     */
    replaceFixed : function(options) {

      var _options = this.prepareWorkspaceOptions(options);

      this._render(_options.dom.workspaceFixed, _options);

      return this;

    },

    /**
     * Replace the innerHTML of this.dom.workspaceFooter
     *
     * @method
     * @param {object} options
     */
    replaceFooter : function(options) {

      var _options = this.prepareWorkspaceOptions(options);

      this._render(_options.dom.workspaceFooter, _options);

      return this;

    },

    /**
     * Iterate over the messages array and show
     * flash messages in array order
     *
     * Each message is an object with 2 properties,
     * type, the type of error in this.messageClasses, and
     * message, the text of the message.
     *
     * {
     *   type : 'success',
     *   message : 'Action completed'
     * }
     *
     * @method
     * @returns this
     */
    showMessages : function(options) {

      var self = this;
      var messageOptions = {};
      var _options = this.prepareWorkspaceOptions(options);

      this.partial = '';

      for(var i = 0; i < this.messages.length; i++) {
        messageOptions = {
          message : this.messages[i].message,
          messageClass : _options.messageClasses[this.messages[i].type]
        };
        this.partial += this.templates.message(messageOptions);
      }

      this._render(_options.dom.workspaceMessage, {
        complete : function() {
          self.messages = [];
          messageOptions = null;
        }
      });

      this._scrollUp();

      return this;

    },

    showSpinner : function() {

      this.replaceBody({
        partial : Mustache.render(this.templates.spinner) });

      return this;

    },

    /**
     * Clear innerHTML of all workspace elements and messages
     */
    clearAll : function() {
      this.replaceBody('');
      this.replaceHeader('');
      this.replaceFixed('');
      this.replaceFooter('');
      this.clearMessages('');
    },

    /**
     * Add a flash message to the message list
     *
     * This method addes a message either in object format:
     *    {
     *      type : 'messageType',
     *      message : 'messageText'
     *    }
     * or a message number (if using message number, the messages
     * should be in your config under 'messages'),
     * or by message text. If submitting just a message string, the
     * message type will always be 'info';
     *
     * @method
     * @param {object|number|string} message
     * @returns this
     */
    addMessage : function(message) {

      var _message = {
        type : 'info',
        message : ''
      };

      if(typeof message === 'object') {
        _message = this._prepareOptions(_message, message);
      }
      else if(typeof message === 'number') {
        _message = this.Config.get('messages.' + message);
      }
      else {
        _message.message = message;
      }

      this.messages.push(_message);

      return this;

    },

    /**
     * Remove flash messages from display and empty
     * the messages array
     *
     * @method
     * @returns this
     */
    clearMessages : function(options) {

      var _options = this.prepareWorkspaceOptions(options);

      $(_options.dom.workspaceMessage.selector).hide();

      this.messages = [];

      return this;

    },

    /**
     * Sometimes the height of the fixed workspace header
     * will change. When this happens, the padding-top
     * of the workspace body must recalculate. This method
     * does that.
     *
     * @method
     * @returns this
     */
    setWorkspaceBodyPadding : function(options) {

      var _options = this.prepareWorkspaceOptions(options);


      if($(_options.dom.workspaceFixed.selector).css('position') === 'fixed') {
        $(_options.dom.workspaceData.selector).css('padding-top',
          $(_options.dom.workspaceHeader.selector).outerHeight() + 10);
      }

      return this;

    },

    /**
     * Options are just that, optional, but all workspace
     * methods that use options require a 'partial' property,
     * so before calling this.prepareWorkspaceOptions(), make
     * sure whatever options are prepared have a partial.
     *
     * Note that this.prepareWorkspaceOptions() can take any number
     * of arguments and will parse them in order, therefore
     * there is no need to check for 'partial' in options
     * because if it is there, it's parsed last and will
     * overwrite the default 'partial'
     *
     * @method
     * @param {object} [options]
     * @returns {object}
     * @private
     */
    prepareWorkspaceOptions : function(options) {

      var self = this;

      var _options = {
        partial        : self.partial,
        dom            : self.dom,
        messageClasses : self.messageClasses
      };

      if(typeof options === 'string') {
        options = { partial : options };
      }

      return this._prepareOptions(_options, this.Config.get('app'), options);

    },

    /**
     * Render whatever content needs it. The universal
     * workspace renderer.
     *
     * @method
     * @param {string} element - The selector of the target DOM object
     * @param {object} [options]
     * @private
     */
    _render : function(element, options) {
      var self = this;
      var _options = this.prepareWorkspaceOptions(options);
      var elem = $(element.selector);
      elem.css('height', 'auto');
      elem.html(_options.partial).fadeIn({
        duration : 0.1,
        complete : function() {
          self.setWorkspaceBodyPadding();
          self.handleCallback.success(_options);
        },
        fail : function(e) {
          self.handleCallback.error(e, _options);
        },
        always : function() {
          elem.css('opacity', 1);
          self.handleCallback.complete(_options);
          _options.partial = null;
        }
      });
    }

  };

  return Prototype;

});
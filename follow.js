(function (window, document, $, undefined) {
  'use strict';
  
  /**
   * Follow banner in the sidebar
   * @type {Object}
   */
  var follow = window.follow = {
    settings: {
      start: null,
      end: null,
      startOffset: 40,
      endOffset: 100,
      $wrapper: $('[data-follow]'),
      $main: $('main'),
      $body: $('body')
    },

    // Reset all the stuff that this object has added to dom
    reset: function () {
      follow.settings.$wrapper.css('width', '');
      follow.settings.$body.removeClass('follow-fixed').removeClass('follow-sticked');
    },

    // Calculate banner settings
    calculateSettings: function () {
      follow.settings.$wrapper.css('width', follow.settings.$wrapper.parent().width() + 'px' );
      follow.settings.start = follow.settings.$wrapper.offset().top - startOffset;
      follow.settings.end = follow.settings.$main.offset().top + follow.settings.$main.outerHeight() - follow.settings.$wrapper.outerHeight() - endOffset;
    },

    /**
     * Bind the scroll event and add the class to the body according to scroll position
     * @return {void}
     */
    scroll: function () {
      follow.reset();
      
      follow.calculateSettings();
      $(window).off('scroll.follow')
        .on('scroll.follow', function (e) {
          var scrollY = window.scrollY;
          if (scrollY < follow.settings.start) {
            follow.settings.$body.removeClass('follow-fixed').removeClass('follow-sticked');
          }
          if (scrollY > follow.settings.start) {
            follow.settings.$body.addClass('follow-fixed').removeClass('follow-sticked');
          }
          if (scrollY > follow.settings.end) {
            follow.settings.$body.addClass('follow-sticked');
          }
        });
    },

    /**
     * Init the scroll functionality
     * @return {void}
     */
    init: function () {
      if (!follow.settings.$wrapper.length) {
        return;
      }
      follow.scroll();
      $(window).trigger('scroll.follow');
    }
  }

})(this, this.document, this.jQuery);

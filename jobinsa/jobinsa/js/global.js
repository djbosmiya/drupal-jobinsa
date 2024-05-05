/**
 * @file
 * Global utilities.
 *
 */
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.jobinsa = {
    attach: function(context, settings) {
      var final_total = 0;
      var stepdown = '<div class="dec">-</div>';
      var stepup = '<div class="inc">+</div>';
      var $lis = $('.paragraphs-subform .field--name-field-jour2 fieldset');
      if ($lis.length >= 1) {
        $lis.parents('.paragraphs-subform').addClass("width-sub");
      } else {
        $lis.parents('.paragraphs-subform').removeClass("width-sub");
      }
      $('body', context).once('jobinsa').each(function() {
        $('.product-list-wrapper .form-type-number input').before(stepdown);
        $('.product-list-wrapper .form-type-number input').after(stepup);
      });

      $('.inc').once().on('click', function(e) {
        let el = $(this).prev();
        let value = parseInt(el.val()) + 1;
        el.val(value);
        $(this).prev().addClass('number-hover');

        var click = $(this).prev();
        console.log(click);
        get_subtotal(click);

      });


      $('.dec').once().on('click', function(e) {
        let el = $(this).next();
        if (parseInt(el.val()) > 1) {
          let value = parseInt(el.val()) - 1;
          el.val(value);
          $(this).next().addClass('number-hover');
        }

        var click = $(this).next();
        get_subtotal(click);
      });


      function get_subtotal(click) {
        var total = 0;
        var count = click.val();
        var id = click.attr('id');
        var split = id.split('_');
        var sub_product_id = split[3];
        var product_price = $('#subproduct_id_price_' + sub_product_id).text();
        var product_price_split = product_price.split(' ');
        var price = product_price_split[0];
        total = price * count;
        if (total > 0) {
          $('#subproduct_id_total_' + sub_product_id).val(total + ' CHF');
        } else {
          $('#subproduct_id_total_' + sub_product_id).val(total + ' CHF');
        }

        calc_total();
      }

      function calc_total() {
        var sum = 0;
        $("#edit-product .subtotal-field").each(function() {
          var product_total = $(this).val();
          var product_total_split = product_total.split(' ');
          var subtotal = product_total_split[0];
          if(subtotal > 0) {
            sum += parseInt(subtotal);
          }
        });
        $('#final-total-price').val(sum + ' CHF');
      }


      $(".table-striped .form-number").keyup(function(){
        var product_number = $(this).val();
        var total = 0;
        $(this).addClass('number-hover');
        //var count = click.val();
        var id = $(this).attr('id');
        var split = id.split('_');
        var sub_product_id = split[3];
        var product_price = $('#subproduct_id_price_' + sub_product_id).text();
        var product_price_split = product_price.split(' ');
        var price = product_price_split[0];
        total = price * product_number;
        if (total > 0) {
          $('#subproduct_id_total_' + sub_product_id).val(total + ' CHF');
        } else {
          $('#subproduct_id_total_' + sub_product_id).val(total + ' CHF');
        }

        calc_total();

      });

      /* navigation mobile class add */
      $('.navbar-toggler').once().on('click', function(e) {
        $('body').toggleClass('sticky-menu');
        $('.submenu-level2').css('left', '100%');
      });

      $('.nav-item.menu-item--active-trail').parents('.has-ultimenu').addClass('ultimenu-active-parent');

      $(".submenu-level2").prepend("<div></div>");
      var classmenu;

      $('.product-main-wrap > ul span').once().on('click', function(e) {
        classmenu = $(this).attr('class');
        var class_name_arr = classmenu.split(' ');
        var class_name = class_name_arr[0];
        $(this).parents('.navbar-nav').parent().find('.block-' + class_name).css('left', '0%');
      });

      $('.service-main-wrap > ul span').once().on('click', function(e) {
        classmenu = $(this).attr('class');
        var class_name_arr = classmenu.split(' ');
        var class_name = class_name_arr[0];
        $(this).parents('.navbar-nav').parent().find('.block-' + class_name).css('left', '0%');
      });

      $(".submenu-level2 > div").once().on('click', function(e) {
        $(this).parents('.submenu-level2').css('left', '100%');
      });

      /* scroll */
      $("a.scroll-icon[href^='#']").once().on('click', function(e) {
        $(this).addClass('active');
        var id = $(this).attr('href');
        var $id = $(id);
        if ($id.length === 0) {
          return;
        }
        e.preventDefault();
        var pos = $id.offset().top + 20;
        $('body, html').animate({
          scrollTop: pos
        }, 500);
      });

      /* search form */
      $(".search-icon-wrap").once().on('click', function(e) {
        e.preventDefault();
        $(".search-block-form.block-search-form-block").slideToggle(200);
        $('#edit-keys').focus();
      });

      /* add class mobile */
      $(".view-materiel-grand-format-listing .view-header").once().on('click', function(e) {
        $('.view-materiel-grand-format-listing .view-filters').toggle();
      });
      $(".view-taxonomy-produit-filter .view-header").once().on('click', function(e) {
        $('.view-taxonomy-produit-filter .view-content').toggle();
      });

      /* popup code */
      var nodeid;
      nodeid = $('#myModal').data('nodeid');
      if (document.cookie.indexOf('visited=true') == -1) {
        // load the overlay
        jQuery("#myModal").modal('show');
        const date = new Date();
        var day = 1000 * 60 * 60 * 24 * 7;
        date.setTime(date.getTime() + day);
        let expires = date.toUTCString();
        document.cookie = "visited=true;expires=" + expires;
        document.cookie = "nodeid=" + nodeid;
      } else if ((document.cookie.indexOf('visited=true') == 1) && (document.cookie.indexOf('nodeid=' + nodeid) == -1)) {
        jQuery("#myModal").modal('show');
        const date = new Date();
        var day = 1000 * 60 * 60 * 24 * 7;
        date.setTime(date.getTime() + day);
        let expires = date.toUTCString();
        document.cookie = "visited=true;expires=" + expires;
        document.cookie = "nodeid=" + nodeid;
      }


      /* radio button class */
      $(document).on('change', '.material-list-page-wrap  input.form-radio', function() {
        $(document).ajaxComplete(function(event, request, settings) {
          $(".material-list-page-wrap .form-radios").find("input[name='field_product_category_target_id']:checked").parent().addClass("selected");
        });
      });
      $(".material-list-page-wrap .form-radios").find("input[name='field_product_category_target_id']:checked").parent().addClass("selected");

      /* placeholder for search page */
      $("#search-form #edit-keys").attr("placeholder", "Tapez votre recherche");

     /* add hover class */
     $('.yellow-text-link-wrap .yellow-text-link').parents('.notre-offre-item').addClass('yellow-link-hover');

    }
  };

})(jQuery, Drupal);
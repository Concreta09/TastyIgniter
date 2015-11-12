$(function() {
    $('#side-menu').metisMenu();
});


//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse')
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse')
        }

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    $(document).on('click', '.sidebar-toggle', function() {
        if ($('#wrapper > .navbar').hasClass('hide-menu')) {
            $('#wrapper > .navbar').removeClass('hide-menu');
            $("#page-wrapper, #footer").css("margin-left", "220px");
        } else {
            $('#wrapper > .navbar').addClass('hide-menu');
            $("#page-wrapper, #footer").css("margin-left", "46px");
        }
    })
})

// Image Manager
function mediaManager(field) {
    var height = (this.window.innerHeight > 0) ? this.window.innerHeight-100 : this.screen.height-100;
    $(window).bind("load resize", function() {
        var height = (this.window.innerHeight > 0) ? this.window.innerHeight-100 : this.screen.height-100;
        $('#media-manager iframe').css("height", (height) + "px");
    });

    $('#media-manager').remove();

    var iframe_url = js_site_url('image_manager?popup=iframe&field_id=') + encodeURIComponent(field) + '&sub_folder=' + $('#' + field).attr('value');

	$('body').append('<div id="media-manager" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
		+ '<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header">'
		+ '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
		+ '<h4 class="modal-title">Image Manager</h4>'
		+ '</div><div class="modal-body wrap-none">'
		+ '<iframe name="media_manager" src="'+ iframe_url +'" width="100%" height="' + height + 'px" frameborder="0"></iframe>'
		+ '</div></div></div></div>');

	$('#media-manager').modal('show');

	$('#media-manager').on('hide.bs.modal', function (e) {
		if ($('#' + field).attr('value')) {
			$.ajax({
				url: js_site_url('image_manager/resize?image=') + encodeURIComponent($('#' + field).attr('value')) + '&width=120&height=120',
				dataType: 'json',
				success: function(json) {
					var thumb = $('#' + field).parent().parent().find('.thumb');
					$(thumb).attr('src', json);
				}
			});
		}
	});
};

// Override summernote image manager
$(document).ready(function() {
    $('.note-editor button[data-event=\'showImageDialog\']').attr('data-toggle', 'imageManager').removeAttr('data-event');

    $(document).on('click', '.note-editor button[data-toggle=\'imageManager\']', function() {
        $('#media-manager').remove();

        $(this).parents('.note-editor').find('.note-editable').focus();

        var height = ($(window).innerHeight() > 0) ? $(window).innerHeight()-100 : $(window).height()-100;
        $(window).bind("load resize", function() {
            var height = ($(window).innerHeight() > 0) ? $(window).innerHeight()-100 : $(window).height()-100;
            $('#media-manager iframe').css("height", (height) + "px");
        });

        var iframe_url = js_site_url('image_manager?popup=iframe');

        $('body').append('<div id="media-manager" class="modal" tabindex="-1" data-parent="note-editor" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            + '<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'
            + '<h4 class="modal-title">Image Manager</h4>'
            + '</div><div class="modal-body wrap-none">'
            + '<iframe name="media_manager" src="'+ iframe_url +'" width="100%" height="' + height + 'px" frameborder="0"></iframe>'
            + '</div></div></div></div>');

        $('#media-manager').modal('show');
    });
});

// Load messages and activities top navbar dropdown content
$(function(){
    $('.dropdown-messages .menu-body').load(js_site_url('messages/latest'));
    $('.dropdown-activities .menu-body').load(js_site_url('activities/latest'));
})

// Panel Table Filter Button Toggle
$(function(){
	$('#page-wrapper').on('click', '.panel-table .btn-filter', function(e) {
		var $this = $(this),
		$panel = $this.parents('.panel'),
        $panelFilter = $panel.find('.panel-filter');

        $panel.find('.panel-filter').slideToggle(function() {
            if ($panelFilter.is(':visible')) {
                $('.panel-table .btn-filter').addClass('active');
            } else {
                $('.panel-table .btn-filter').removeClass('active');
            }
        });
	});
})

// Alert Collapsible
$(function() {
    var alertMsgs = $('.alert-collapsible .alert-hide');
    var dropdownButton = $('.btn-dropdown');
    alertMsgs.hide();

    //Click dropdown
    dropdownButton.click(function() {
        //current button
        var currentButton = $(this);
        alertMsgs.slideToggle(400, function() {
            //Completed slidetoggle
            if(alertMsgs.is(':visible')) {
                currentButton.html('<i class="fa fa-chevron-up text-muted"></i>');
            } else {
                currentButton.html('<i class="fa fa-chevron-down text-muted"></i>');
            }
        })
    });
})

// Checkbox button toggle
$(function () {
    $('.button-checkbox').each(function () {
        // Setting
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'fa fa-check-square-o'
                },
                off: {
                    icon: 'fa fa-square-o'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
            }
        }
        init();
    });
});
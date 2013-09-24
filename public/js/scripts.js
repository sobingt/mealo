
	/***
	 Filter for the mealo items
	***/

	jQuery('#mealo-filter input').click(function() {
		jQuery('#mealo-filter input').removeClass('current');
		jQuery(this).addClass('current');
		var filter = jQuery(this).attr('id');
		if ( filter === 'all' ) {
			jQuery('.mealo-listing').slideDown('fast');
			jQuery('.mealo-listing-small').slideDown('fast');
		} else {
			jQuery('.mealo-listing').slideUp('fast');
			jQuery('.mealo-listing-small').slideUp('fast');
			jQuery('.mealo-listing.' + filter).slideDown('fast');
			jQuery('.mealo-listing-small.' + filter).slideDown('fast');
		}
	});




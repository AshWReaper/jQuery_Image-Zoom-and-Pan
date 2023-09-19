jQuery(document).ready(function() {
    injectProductZoom('.woocommerce-product-gallery__image img'); // example usage
    injectProductZoom('.gallery-item img'); // example usage
})

/****
   Function to add "zoom & pan" feature to images
   call the function with the image element's selector
****/
function injectProductZoom(imageSelector) {
    if (jQuery(imageSelector).length > 0) {
	console.log('Adding Zoom & Pan Feature To Selected Image/s');
	var originX = 0;
	var originY = 0;
	var iconHTML = '<div class="injected-zoom-icon" style="position:absolute;top:50%;left:50%;cursor:pointer;background:white;padding:20px;"><i class="fa fa-search-plus" aria-hidden="true"></i></div>';
	
	jQuery(imageSelector)
	    .wrap('<div class="injected-zoom-2" style="overflow:hidden;">')
	    .wrap('<div class="injected-zoom-1" style="position:relative; z-index:999">')
	    .after(iconHTML)
            .on("mouseover", function() {
		jQuery(this).css("transform", "scale(2)");
		jQuery(this).parent().children('.injected-zoom-icon').hide();
            })
            .on("mouseout", function() {
		jQuery(this).css("transform", "scale(1) translate(0, 0)");
		jQuery(this).parent().children('.injected-zoom-icon').show();
            })
            .on("mousemove", function(e) {
		var rect = this.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;

		// Calculate the transform-origin coordinates
		originX = (x / rect.width) * 100;
		originY = (y / rect.height) * 100;

		// Panning (translating the zoomed image)
		var moveX = (originX - 50) * -2;
		var moveY = (originY - 50) * -2;

		jQuery(this).css("transform", `scale(2) translate(${moveX}px, ${moveY}px)`);
            });

    }
}

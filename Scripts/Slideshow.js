/**
 * Create a slideshow
 * TODO make this non-static/configurable
 */
const IMAGE_URLS = [
        'https://photos.smugmug.com/1T61T7/Frosh-Week-1T6/Day-1/Matriculation/i-JDSxNRb/0/62924396/X2/IMG_0803-X2.jpg',
        'https://photos.smugmug.com/1T61T7/Other-Events/Last-Suds/i-b2nsKdv/0/ed15dbe2/X2/IMG_7023.edit-X2.jpg',
        'https://photos.smugmug.com/1T61T7/Godiva-Week/Godivas-Resurection-/i-BfNcZms/0/60022f5d/X2/IMG_0013-X2.jpg'
];

$(() => {

    var slideshowDiv = $('#photo-slideshow')[0];

    if (typeof slideshowDiv === "undefined")
        return;

    for (var i = 0; i < IMAGE_URLS.length; i++) {
        
        var url = IMAGE_URLS[i];

        $(slideshowDiv).append($(CreateSlide(i, url)));
    }

    /**
     * Closure function for scrolling. Parameter: direction as a string "left" or 
     * "right".
     */
    var scroll = (function() {

        var index = 0;

        var maxIndex = $('#photo-slideshow').children().last()
                .data('slideshow-index');

        return (direction) => {

            if (direction === "left" && index > 0) {

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .addClass('hidden');

                index--;

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .removeClass('hidden');

            }

            if (direction === "right" && index < maxIndex) {

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .addClass('hidden');
                
                index++;

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .removeClass('hidden');

            }

        };

    })();

    // Create click listeners
    $('.slideshow-button#left').click(() => {scroll('left')});
    $('.slideshow-button#right').click(() => {scroll('right')});


    // View first slide.
    $('#photo-slideshow').children().first().removeClass('hidden');

});

function CreateSlide (index, url) {
    return '<img src="'+  url + '" data-slideshow-index="' + index + 
            '" class="hidden slideshow-image"/>';
}


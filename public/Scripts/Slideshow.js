/**
 * Create a slideshow
 * TODO make this non-static/configurable
 */
const IMAGE_PATH = "/Images/slideshow/{0}.jpg";

const NUM_IMAGES = 7;

const SLIDE_TIME = 2000;

var nextSlideDate;

function resetSlideDate() {
    nextSlideDate = Date.now() + SLIDE_TIME;
}

resetSlideDate();

(function() {

    var slideshowDiv = $('#photo-slideshow')[0];

    if (typeof slideshowDiv === "undefined")
        return;

    for (var i = 0; i < NUM_IMAGES; i++) {
        
        var url = IMAGE_PATH.replace('{0}', i);

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

        return function (direction) {

            if (direction === "left" && index > 0) {

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .addClass('hidden');

                index--;

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .removeClass('hidden');

            }

            if (direction === "right") {

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .addClass('hidden');
                
                if (index < maxIndex)
                    index++;
                else
                    index = 0;

                $(".slideshow-image[data-slideshow-index='" + index + "'")
                        .removeClass('hidden');

            }

        };

    })();

    // Create click listeners
    $('.slideshow-button#left').click(function(){
        scroll('left');
        resetSlideDate();
    });
    $('.slideshow-button#right').click(function(){
        scroll('right');
        resetSlideDate();
    });


    // View first slide.
    $('#photo-slideshow').children().first().removeClass('hidden');

    setInterval(function(){
        if (Date.now() > nextSlideDate) {
            scroll('right');
            nextSlideDate = Date.now() + SLIDE_TIME;
        }
    }, SLIDE_TIME/2);

})();

function CreateSlide (index, url) {
    return '<img src="'+  url + '" data-slideshow-index="' + index + 
            '" class="hidden slideshow-image"/>';
}


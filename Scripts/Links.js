/**
 * Render all links on page load.
 */
$(() => {
    $('.link').click((event) => {
        location.href = $(event.target).data('link');
    })
})
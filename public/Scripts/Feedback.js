$(() => {

    var emailCleared = false;

    $("input[type=email]").click((e) => {
        if (!emailCleared) {
            emailCleared = true;
            $(e.target).attr("value", "");
            $(e.target).removeClass("uninitialized");
        }
    })
})
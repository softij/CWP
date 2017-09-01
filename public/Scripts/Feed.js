var feed = document.getElementById("feed");
var count = 0;
var done = 0;
var timeOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
};
function getPosts(count) {
    var url = "http://skule.ca/digest/api.php/user/" + feed.getAttribute("uid") + "/" + count;
    var data;
    fetch(url).then(function(response) {
        return response.json();
        //return response.text();
    }).then((json) => {
        data = json;
        //console.log(data);
        if (data.length < 20) done = 1;
        for (var j=0; j < data.length; j++) {
            var embed = data[j].type === "pv" ? data[j].is_video === "1" ?
                `<div class="post-image">
                    <iframe class="youtube" src="` + data[j].url + `"></iframe>
                </div>` :
                `<div class="post-image">
                    <figure class="image">
                        <img src="` + data[j].url + `" alt="Image">
                    </figure>
                </div>` :
                "";
            var start = new Date(data[j].event_start);
            var end = new Date(data[j].event_end);
            var timestamp = new Date(data[j].timestamp);
            var body = `<p>` + data[j].body + `</p>`;
            var time = data[j].type === "event" ?
                `<p class="subtitle"><i>` + start.toLocaleTimeString("en-us", timeOptions) + " -<br> " + end.toLocaleTimeString("en-us", timeOptions) + `</i></p>` : "";
            var str = `
                <div class="post">
                    ` + embed + `
                    <div class="post-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title">` + data[j].title + `</p>
                                ` + time + `
                                <p class="subtitle"><a href="http://digest.skule.ca/u/` + data[j].uid + `">` + data[j].name + `</a></p>
                            </div>
                        </div>

                        <div class="content">
                            ` + body + `
                            <div class="post-footer">
                                <small>` + timestamp.toLocaleTimeString("en-us", timeOptions) + `</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            feed.insertAdjacentHTML('beforeend', str);
        }
    });
}
getPosts(count);
$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100 && !done) getPosts(count);
});

//CYCLE THROUGH BACKGROUND COLOURS
var cores = ['#CEE7D4', '#DD4445', '#EC7853', '#DEDEA9', '#79C9A8'];
//var cores = ['#FF4E50','#FC913A','#F9D423','#EDE574','#E1F5C4']
function cor() {
    document.querySelector('body').style.background = cores[Math.floor(Math.random() * cores.length)];
}

//CYCLE THROUGH TWEETS
var divs = $('div[id^="tweet"]').hide(),
    i = 0;

(function cycle() {
    divs.eq(i).fadeIn(400)
        .delay(5000)
        .fadeOut(400, cycle);
    i = ++i % divs.length;
    cor();
})();

//UPDATE DIVS WITH NEW TWEETS
function refresh() {
    $.get("/refresh", function(response) {
        console.log("**************** refreshed *******************")
        for (j = 0; j < response.length; j++) {
            k = response[j].index
            console.log(response[j].text, response[j].person, response[j].url[0])
            $("#txt" + k).text(response[j].text);
            $("#author" + k).text(response[j].person);
            if (response[j].images[0] == "#") { //NO IMAGE
                $("#img" + k).attr("src", "#");
                // $("#img" + k).setAttribute("onerror", "this.style.display='none'");
                $("#conimg" + k).attr("class", "center-image");
                $("#txttweet" + k).attr("class", "col-lg-12");
                $("#imgtweet" + k).attr("class", "col-lg-0");
                $("#containertweet" + k).attr("class", "containerN");
                console.log("> no image")
            } else {  //YES IMAGE
                $("#img" + k).attr("src", response[j].images[0]);
                // $("#img" + k).removeAttribute("onerror");
                $("#conimg" + k).attr("class", "center-image dashed");
                $("#txttweet" + k).attr("class", "col-lg-6");
                $("#imgtweet" + k).attr("class", "col-lg-6");
                $("#containertweet" + k).attr("class", "containerY");
                console.log("> image!");
            }
            //console.log($("#link" + k).text)
            if (response[j].url.length != 0) {
                $("#link" + k).attr("href", response[j].url[0]);
                $("#link" + k).show();
            } else {
                $("#link" + k).hide();
            }
        }
    });
}
refresh()
window.setInterval(refresh, 180000);
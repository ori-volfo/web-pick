window.Webpick = function(side, seconds, target, links){
    console.log('Connect Ok');
    const SERVER_HOST = 'http://127.0.0.1:8080';
    const LOCAL_HOST = location.host;
    var popup = {};
    var linksArr = [].slice.call(document.querySelectorAll('a'));

    switch(links){
        case 'internal':
            linksArr = linksArr.filter( function(link){return LOCAL_HOST.indexOf(link.host) > -1});
            break;
        case 'external':
            linksArr = linksArr.filter( function(link){return LOCAL_HOST.indexOf(link.host) == -1});
            break;
        case 'all':
        default:
    }
    linksArr.forEach(function(link){
        link.addEventListener("click",function(e){
            e.preventDefault();
            var href = e.target.href;
            showAd();
        });
    });
    function showAd(){
        var url_safe_side = encodeURIComponent(side);
        var url = SERVER_HOST+"/popup.html?side="+url_safe_side;
        popup = window.open(url, target);
        setTimeout(function(){
            console.log(popup);
            popup.postMessage('Hello 123', SERVER_HOST);
        }, 200);

    }

    function receiveMessage(event)
    {

        console.log(event);
    }
    window.addEventListener("message", receiveMessage, false);

};
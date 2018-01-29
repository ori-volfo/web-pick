window.Webpick = function(side, seconds, target, links){
    console.info('Connect success');
    const SERVER_HOST = 'http://127.0.0.1:8080';
    const LOCAL_HOST = location.host;
    var popup = {};
    var clickHref;
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
            clickHref = e.currentTarget.href;
            showAd();
        });
    });
    function showAd(){
        var url = SERVER_HOST+"/popup.html";
        popup = window.open(url, target);
        var params = JSON.stringify({clickHref: clickHref, side: side, seconds: seconds, eventOrigin: LOCAL_HOST});
        setTimeout(function(){
            popup.postMessage(params, SERVER_HOST);
        }, 500);

    }

    // function receiveMessage(event)
    // {
    //
    //     console.log(event);
    // }
    // window.addEventListener("message", receiveMessage, false);

};
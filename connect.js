window.Webpick = function(side, seconds, target, links){
    console.log('Connect success');
    const SERVER_HOST = 'http://127.0.0.1:8080';
    const LOCAL_HOST = location.host;
    var popup = {};
    var clickHref;
    var linksArr = [].slice.call(document.querySelectorAll('a'));

    // Filter unnecessary links
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
        var params = JSON.stringify({clickHref: clickHref, side: side, seconds: seconds, eventOrigin: LOCAL_HOST, target: target});

        if(target === '_blank'){ // Open ad in new tab
            popup = window.open(url, target);
        }
        else{ // Open ad in current tab, as an iFrame
            var iframe = document.createElement('iframe');
            setAttributes(iframe,{'src':url,'id':'ifrm','style': 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000000'});
            document.body.appendChild(iframe);
            document.body.setAttribute('style','overflow: hidden');
            popup = iframe.contentWindow;
        }

        setTimeout(function(){
            popup.postMessage(params, SERVER_HOST);
        }, 300);

    }

    function receiveMessage(event)
    {
        // block possible messages from 3rd party sites in iFrame
        if(event.origin.indexOf(SERVER_HOST) === -1){return}

        var message = JSON.parse(event.data);
        if(message.action === 'close_ad'){
            var ifrm = document.getElementById('ifrm');
            ifrm.parentNode.removeChild(ifrm);
            window.location = message.redirectUrl;
        }
    }
    window.addEventListener("message", receiveMessage, false);

};

// Set multiple attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
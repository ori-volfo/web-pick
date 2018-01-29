(function(){
    function receiveMessage(event){
        var message = JSON.parse(event.data);
        // block possible messages from iFrame
        if(event.origin.indexOf(message.eventOrigin) === -1){return}

        // button side determined by API
        var button = document.querySelector("button.btn");
        button.setAttribute("style", "float:"+message.side+";display:block");

        // Countdown to redirect
        var seconds = message.seconds;
        var interval = setInterval(function(){
            document.getElementById("time").innerHTML = seconds;
            seconds--;
            if(seconds === 0){
                clearInterval(interval);
                window.location = message.clickHref;
            }
        },1000);

        // Go directly to desired link
        button.addEventListener("click",function(){
            window.location = message.clickHref;
        });
        // event.source.postMessage("message here",
        //     event.origin);
    }

    window.addEventListener("message", receiveMessage, false);
})();

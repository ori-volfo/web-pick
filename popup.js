(function(){
    function receiveMessage(event){
        var message = JSON.parse(event.data);
        // block possible messages from 3rd party sites in iFrame
        if(event.origin.indexOf(message.eventOrigin) === -1){return}

        // Button side as determined by API
        var button = document.querySelector("button.btn");
        button.setAttribute("style", "float:"+message.side+";display:block");

        // Countdown to redirect
        var seconds = message.seconds;
        var interval = setInterval(function(){
            document.getElementById("time").innerHTML = seconds;
            seconds--;
            if(seconds === 0){
                clearInterval(interval);
                redirect();
            }
        },1000);

        // Go directly to desired link
        button.addEventListener("click",function(){
            redirect();
        });


        function redirect(){
            if(message.target === '_blank'){ // The new tab is redirected to the link
                window.location = message.clickHref;
            }
            else{ // Send message to parent window to close iFrame and redirect
                var callbackMessage = JSON.stringify({action:'close_ad',redirectUrl:message.clickHref});
                event.source.postMessage(callbackMessage,
                    event.origin);
            }
        }
    }

    window.addEventListener("message", receiveMessage, false);
})();

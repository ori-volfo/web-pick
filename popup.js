// (function(){
//
// })();
window.onload = function(){

    function receiveMessage(event){

console.log(event);
        event.source.postMessage("message here",
            event.origin);
    }

    window.addEventListener("message", receiveMessage, false);
};

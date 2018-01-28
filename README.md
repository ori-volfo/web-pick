# Web-pick
Ad Server Simulator Plugin

## Dependencies Instalation
#### Update your local package index:
`sudo apt-get update`

#### Install Node.js:
`sudo apt-get install nodejs`

#### Install Node Package Manager:
`sudo apt-get install npm`

#### Global installation of http-server
`npm install http-server -g`

## Project Installation
Download the project do a designated folder 

## Run
* In terminal, go to project folder and run the command `http-server` 
* To inject the script, paste following lines to your Dev-tool console and press enter:
    ```
    var s = document.createElement("script");
    s.src = "http://127.0.0.1:8080/connect.js";
    document.body.appendChild(s);
    ```
* To run the script, initiate the plugin by declaring the following object in the console:
**window.Webpick(** _[String side],[Int seconds],[String target],[String links]_ **)**
    
    - Side: Where the continue button will appear. options: left / right.
    - Seconds: The amount of time the ad would appear, in seconds.
    - Target: The tab that the add would appear in. options: _self / _blank.
    - Links (optional): The type of links that will open the ad. options: internal / external / all. Default is all.
    
    an example for a valid input:
    `window.Webpick('right',10,'_blank','external')`
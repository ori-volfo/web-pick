# Web-pick
Ad Server Simulator

## Dependencies Instalation
#### Update your local package index:
`sudo apt-get update`

#### Install Node.js:
`sudo apt-get install nodejs`

#### Install Node Package Manager:
`sudo apt-get install npm`

#### Global installation of http-server
`npm install http-server -g`

## Ad Server Installation
TBD

## Run
copy and paste following lines to your Dev-tool console and press enter:

```
var s = document.createElement("script");
s.src = "http://127.0.0.1:8080/connect.js";
document.body.appendChild(s);
```

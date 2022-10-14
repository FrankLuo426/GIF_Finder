function bgChange(thisColor) {
    if(thisColor.options[thisColor.selectedIndex].text == "Black")
    {
        document.bgColor = "#0B0B0B";
        document.querySelector("h1").style.color = "#296bce";
        document.querySelector("h2").style.color = "#296bce";
        document.getElementById("status").style.color = "#296bce";
        document.getElementById("content").style.backgroundColor = "#0B0B0B";
        document.getElementById("credits").style.color = "#296bce";
        document.getElementById("contentP").style.color = "#296bce";
        let pList = document.querySelectorAll("p");
        for(i=0;i<pList.length;i++)
        {
            pList[i].style.color = "#296bce";
        }
    }
    else
    {
        document.bgColor = "Black";
        document.querySelector("h1").style.color = "#194280";
        document.querySelector("h2").style.color = "#194280";
        document.getElementById("status").style.color = "#194280";
        document.getElementById("content").style.backgroundColor = "#f0f0f0";
        document.getElementById("credits").style.color = "#194280";
        document.getElementById("contentP").style.color = "#194280";
        
        let pList = document.querySelectorAll("p");
        for(i=0;i<pList.length;i++)
        {
            pList[i].style.color = "#194280";
        }
    }
}

//create a GIF search buttton
function GIFsearchButtonClicked() {
    //#1 above - this URL is the Giphy Search endpoint. Here's an example of another endpoint, the Giphy "Trending" endpoint:
    const GIF_Search_URL = "https://api.giphy.com/v1/gifs/search?";
    //url to store the value
    //require api_key, q, limit, offset, rating, lang,  random_id.
    //the first one is the GIF_URL
    let url = GIF_Search_URL;
    //decleasr some required value
    let api_key = "tH7NkuJUOcVVGQ7yoFMoUkTgppTJUEY9";
    //parse in the api_key
    url += "api_key=" + api_key;
    //get and parse the search item
    let item = document.querySelector("#searchGIF").value;
    if(item == '')
    {
        document.querySelector("#status").innerHTML = "You must enter a term to serach!";
    }

    displayTerm = item;
    //fix the search item problem
    item = item.trim();
    item = encodeURIComponent(item);
    //make sure the item greater than 1
    if (item.length < 1) {
        return;
    }
    //parse in item
    url += "&q=" + item;

    //set and parse in the limit 
    let limit = document.querySelector("#limitGIF").value;
    url += "&limit=" + limit;

    //update
    document.querySelector("#status").innerHTML = "Searching For GIF '" + displayTerm + "'";

    getData(url);

}

function TrendingRsearchButtonClicked() {
    //#1 above - this URL is the Giphy Search endpoint. Here's an example of another endpoint, the Giphy "Trending" endpoint:
    const Trend_Search_URL = "https://api.giphy.com/v1/gifs/trending?";
    //parse in the api_key
    let url = Trend_Search_URL;
    let api_key = "tH7NkuJUOcVVGQ7yoFMoUkTgppTJUEY9";
    url += "api_key=" + api_key;

    let limit = document.querySelector("#limitGIF").value;
    url += "&limit=" + limit;

    document.querySelector("#status").innerHTML = "Searching For Trending GIF!";
    getData(url);
}


function RandomSearchButtonClicked() {
    //#1 above - this URL is the Giphy Search endpoint. Here's an example of another endpoint, the Giphy "Trending" endpoint:
    const Random_Search_URL = "https://api.giphy.com/v1/gifs/random?";
    //parse in the api_key
    let url = Random_Search_URL;
    let api_key = "tH7NkuJUOcVVGQ7yoFMoUkTgppTJUEY9";
    url += "api_key=" + api_key;

    let limit = document.querySelector("#limitGIF").value;
    url += "&limit=" + limit;

    document.querySelector("#status").innerHTML = "Searching For Random GIF!";
    getData(url);
}

//Downloading the data with XHR
function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.open("GET", url);
    xhr.send();
}

//Create the callback functions
function dataLoaded(e) {
    let xhr = e.target;

    //puty texxt into an obj
    let obj = JSON.parse(xhr.responseText);

    if (obj == null || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "No Result Found..."
        document.querySelector("#content").innerHTML = "";
        return;
    }
    else if(obj.data.length == undefined)
    {
        let result = obj.data;
        let bigString = "";

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "img/no-image-found.png";

        let url = result.url;
        let rating = result.rating.toUpperCase();
        var line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title= '${result.id}'/></a>`;

        //info
        let title = result.title;
        let source = result.source;

        line += `<button class="copyButton" onclick="copyText('${url}')">Copy URL</button>`;
        line += `<button class="infoButton" onclick="moreInfo('${title}', '${source}', '${rating}')">More Info</button></div>`;
        bigString += line;

        document.querySelector("#content").innerHTML += bigString;

        document.querySelector("#status").innerHTML = "Success!";
        document.querySelector(".contentP").innerHTML = "A random result added!";

        return;
    }

    let results = obj.data;
    let bigString = "";
    document.querySelector("#content").innerHTML = "";

    let temp = 1;

    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "img/no-image-found.png";

        let url = result.url;
        let rating = result.rating.toUpperCase();
        var line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title= '${result.id}'/></a>`;

        //info
        let title = result.title;
        let source = result.source;

        line += `<button class="copyButton" onclick="copyText('${url}')">Copy URL</button>`;
        line += `<button class="infoButton" onclick="moreInfo('${title}', '${source}', '${rating}')">More Info</button></div>`;
        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "Success!";
    document.querySelector(".contentP").innerHTML = results.length +" results added!";
}

//copy url
function copyText(url) {
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', url);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 9999);

    if (document.execCommand("Copy", "false", "null")) {
        alert("Copy Success!");
    } else {
        alert("Copy Failed...")
    }
}

//more info
function moreInfo(title, source, rating) {
    line = "<p>MORE INFO</p>";
    line += `<p>Title: ${title}</p>`;
    line += `<p>Source: ${source}</p>`;
    line += `<p>Rating: ${rating}</p>`;
    
    document.getElementById("infoWindow").style.visibility="visible";
    document.getElementById("infoCloseButton").style.visibility="visible";
    document.querySelector("#infoWindow").innerHTML = line;
}

function infoButtonClicked() {
    document.getElementById("infoWindow").style.visibility="hidden";
    document.getElementById("infoCloseButton").style.visibility="hidden";
}

function ClearButtonClicked(){
    document.querySelector("#content").innerHTML = "";
    document.querySelector(".contentP").innerHTML = "All results have cleared!";
}

//Get the button:
 let mybutton = document.querySelector("#myBtn");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
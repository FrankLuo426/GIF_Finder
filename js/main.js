function bgChange(thisColor) {
    newColor = thisColor.options[thisColor.selectedIndex].text;
    document.bgColor = newColor;
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
    document.querySelector("#status").innerHTML = "<b>Searching For GIF '" + displayTerm + "'</b>";

    getData(url);

}

function STICKERsearchButtonClicked() {
    //#1 above - this URL is the Giphy Search endpoint. Here's an example of another endpoint, the Giphy "Trending" endpoint:
    const STICKER_Search_URL = "https://api.giphy.com/v1/stickers/search?";
    //url to store the value
    //require api_key, q, limit, offset, rating, lang,  random_id.
    //the first one is the GIF_URL
    let url = STICKER_Search_URL;
    //decleasr some required value
    let api_key = "tH7NkuJUOcVVGQ7yoFMoUkTgppTJUEY9";
    //parse in the api_key
    url += "api_key=" + api_key;
    //get and parse the search item
    let item = document.querySelector("#searchSTICKER").value;
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
    let limit = document.querySelector("#limitSTICKER").value;
    url += "&limit=" + limit;

    //update
    document.querySelector("#status").innerHTML = "<b>Searching For STICKER: '" + displayTerm + "'</b>";

    getData(url);
}



//Downloading the data with XHR
function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}
//Create the callback functions
function dataLoaded(e) {
    let xhr = e.target;

    //puty texxt into an obj
    let obj = JSON.parse(xhr.responseText);
    if (obj == null || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No Result</b> "
    }

    let results = obj.data;
    let bigString = "";
    let contentString = "Here are " + results.length + " results for " + displayTerm;

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;
        let rating = result.rating.toUpperCase();
        let title = result.title;

        var line = `<div class='result'><a target='_blank' href='${url}'><img src='${smallURL}' title= '${result.id}'/></a>`;
        line += `<p>Rating: ${rating}</p>`;
        line += `<button class="copyButton" onclick="copyText('${url}')">Click here to copy URL</button></div>`;
        line += `<button class="copyButton" onclick="moreinfo('${result}')">More INFO</button></div>`;
        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector(".contentP").innerHTML = contentString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
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
function moreinfo(result) {
    console.log(result.data);
    let url = result.url;
    let title = result.title;
    let username = result.username;
    let source = result.source;
    let update_datetime = result.update_datetime;
    line = "<p>MORE INFO</p>";
    line += `<p>Title: '${title}'</p>`;
    line += `<p>URL: '${url}'</p>`;
    line += `<p>User Name: '${username}'</p>`;
    line += `<p>Source: '${source}'</p>`;
    line += `<p>Update Time: '${update_datetime}</p>`;
    document.querySelector("#moreinfo").innerHTML = line;
}

function dataError(e) {

}
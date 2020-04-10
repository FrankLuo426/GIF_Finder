//create a GIF search buttton
function GIFsearchButtonClicked(){
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

function STICKERsearchButtonClicked(){
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
function getData(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET",url);
    xhr.send();
}
//Create the callback functions
function dataLoaded(e){
    let xhr = e.target;


    //puty texxt into an obj
    let obj = JSON.parse(xhr.responseText);
    if (obj == null || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No Result</b> "
    }

    let results = obj.data;
    let bigString = "<p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_small.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;
        let rating = result.rating.toUpperCase();
        let title = result.title;

        //copy url
        function copyText(){
            let URLtext = result.url;
            URLtext.select();
            URLtext.setSelectionRange(0, 99999);
            document.execCommand("copy");
            alert("Copied the text: " + copyText.value);
        }

        var line = `<div class='result'><img src='${smallURL}' title= '${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>'${title}'</a></span>`;
        line += `<p>Rating: ${rating}</p></div>`;
        line += `<button class="copyButton" onclick="copyText()">Click here to copy URL</button>`;
        bigString += line;
    }



    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b>";
}
function dataError(e){

}
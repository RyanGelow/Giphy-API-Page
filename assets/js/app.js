
// Function for dumping the JSON content for each button into the div
function displayGiphyInfo() {
    var search = $(this).text();
    console.log(search);
    var searchURL = `https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=${search}&rating`;
    
    
    $.ajax({
        url: searchURL,
        method: "GET"
    }).then(function(response) {
        var index = Math.floor(Math.random()*25);
        console.log(index);
        var animatedURL = response.data[index].images.fixed_height.url;
        var stillURL = response.data[index].images.fixed_height_still.url;
        var rating = response.data[index].rating;
        console.log(rating);
        console.log(response);
        //create new image html
        var $card = $('<div>')
        var $actionGif = $("<img>");
        let $addRating = $('<p>')

        //assign source image element to image source attribute with alt name
        $actionGif.attr("src", animatedURL);
        $actionGif.attr("data-still", stillURL);
        $actionGif.attr("data-animate", animatedURL);
        $actionGif.attr("data-state", "animate");
        $actionGif.attr("alt", search + " action image");
        $addRating.text(`Rating: ${rating}`);
        $card.append($actionGif)
        $actionGif.append($addRating);
        $actionGif.addClass('pr-2 pb-2');

        //run new image html prepended to #images div
        $(".giphy-dump").prepend($actionGif);

        $(".giphy-dump img").on("click", function() {
            let state = $(this).attr('data-state');
            console.log(state);
            if(state === "still") {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
                console.log("still: ")
            }else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
                console.log("animate: ")
            }
        })
    })
}
// List for all actions to be started with and added on to.
var actions = ["Jump", "Hike", "Run", "Zap", "Rock Out", "Party"];

// Function for displaying giphy data
function renderButtons() {
    
    $("#buttons-view").empty();
    
    // Looping through the array of movies
    for (var i = 0; i < actions.length; i++) {

        // Dynamically generated buttons for each movie in the array
        var a = $("<button>");
        // Adding a class of giphy to our button
        a.addClass("btn btn-outline-info giphy mx-1");
        // Adding a data-attribute
        a.attr("type", "button");
        // a.attr("data-name", actions[i]);
        // Providing the initial button text
        a.text(actions[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}
renderButtons();
// This function handles events where one button is clicked
$("#add-giphy").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var action = $("#giphy-input").val().trim();

    // Adding the movie from the textbox to our array
    actions.push(action);
    console.log(actions);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

  // Function for displaying the giphy info
  // Using $(document).on instead of $(".giphy").on to add event listeners to dynamically generated elements
$(document).on("click", ".giphy", displayGiphyInfo);
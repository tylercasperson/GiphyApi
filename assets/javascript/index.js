$(document).ready(function(){

    var interests = ['Language', 'Linguistics', 'Batmetal', 'Marvel', 'DC', 'Spiderverse', 'Joss Whedon', 'Sword Art Online', 'Firefly', 'Codeing', 'Technology', 'Marching Band', 'Music', 'Percussion', 'Relaxing', 'Food', 'Lacrosse', 'Space', 'Ocean', 'Analytics', 'Innovation', 'Puzzle'];

    $.each(interests, function(index, value){
        var interestButton = value.split(' ').join('+');
        $(".buttonControl").append("<button class='interestBtn' '" + interestButton + "'>" + value + "</button>");
    });

    function addInterest() {
        var extraInterest = $("#extraInterest").val();
        interests.push(extraInterest);
        $("<button class='interestBtn' " + extraInterest + "'>" + extraInterest + "</button>").appendTo(".buttonControl");
    }

    $("#addInterest").on("click", function() {
        addInterest();
    })

    $(document).on("click", ".interestBtn", function(){
        //$(".put-gifs-here").empty();
        //$(".interestPressed").empty();
        var interestSelected = this.innerText.split(' ').join('');
        var interestText = interestSelected.split('+').join(' ');
        $(".interestPressed").text(interestText);
        var searchResults = interestSelected.split(' ').join('+');
        var apiKey = '341brSZeNdOBupfirSPMM0EhINDwg7tj';
        var rating = 'pg-13';
        var limit = 100;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchResults + "&limit=" + limit + "&offset=0&rating=" + rating + "&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                var imgArray = response.data;

                for (var i = 0; i < 10; i++){
                    var stillPicture = imgArray[i].images.fixed_height_still.url;
                    var movingPicture = imgArray[i].images.fixed_height.url;

                    var outerDiv = $("<div class='w3-card-4 gifCard'>");
                    var imgDiv = $("<img " + "src=" + stillPicture + " data-still=" + stillPicture + " data-animate=" + movingPicture + " data-state='still' class='gif' />");
                    var wordDiv = $("<div class='w3-container w3-center'>");
                    var titleTag = $("<p>" + imgArray[i].title + "</p>");
                    var ratingTag = $("<p>Rating: " + imgArray[i].rating + "</p>");
                    var interestTag = $("<p class='" + interestSelected + "'>Interst: " + interestSelected + "</p>");

                    var imageCard = outerDiv.append(imgDiv).append(wordDiv).append(titleTag).append(ratingTag).append(interestTag);
                    $(".put-gifs-here").prepend(imageCard);     
            }
        });
    });

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");

        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } 
        if(state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
});

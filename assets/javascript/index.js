
$(document).ready(function(){

    var interests = ['Music', 'Language', 'Linguistics', 'Epic Rap Battles of History', 'Batmetal', 'Marvel', 'DC', 'Spiderverse', 'Joss Whedon', 'Sword Art Online', 'Firefly', 'Codeing', 'Technology', 'Marching Band', 'Music', 'Percussion', 'Relaxing', 'Food', 'Lacrosse', 'Atlatl', 'Space', 'Ocean', 'Analytics', 'Innovation', 'Puzzle'];

    $.each(interests, function(index, value){
        var interestButton = value.split(' ').join('+');
        $(".buttonControl").append("<button class='" + interestButton + "'>" + value + "</button>");
    });

    function addInterest() {
        var extraInterest = $("#extraInterest").val();
        interests.push(extraInterest);
        $("<button class='" + extraInterest + "'>" + extraInterest + "</button>").appendTo(".buttonControl");
    }

    $("#addInterest").on("click", function() {
        addInterest();
    })

    $(".buttonControl").children().on("click",function(){
        $(".holder").text(2);
        //$(".put-gifs-here").empty();
        //$(".interestPressed").empty();
        var interestSelected = $(this).attr("class").split('+').join(' ');
        $(".interestPressed").text(interestSelected);
        console.log(interestSelected);
        var searchResults = interestSelected.split(' ').join('+');
        console.log(searchResults);
        var apiKey = '341brSZeNdOBupfirSPMM0EhINDwg7tj';
        var rating = 'pg-13';
        var limit = 100;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchResults + "&limit=" + limit + "&offset=0&rating=" + rating + "&lang=en";

        $("img").on("click", function(){
            var state = $(this).attr("data-state");
            console.log(this);

            if(state === "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } 
            if(state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                var imgArray = response.data;
                console.log(imgArray);
                console.log((parseInt($("." + interestSelected).length))-1);

                for (var i = 0; i < 10; i++){
                    console.log('i: ' + i)
                    var stillPicture = imgArray[i].images.fixed_height_still.url;
                    var movingPicture = imgArray[i].images.downsized_small.mp4;
                    var imageUrl = imgArray[i].images.stillPicture;
                    console.log((imgArray[i].rating));

                    var outerDiv = $("<div class='w3-card-4 gifCard'>");
                    var imgDiv = $("<img " + "src=" + stillPicture + " data-still=" + stillPicture + " data-animate=" + movingPicture + " data-state='still' class='gif' />");
                    var wordDiv = $("<div class='w3-container w3-center'>");
                    var titleTag = $("<p>" + imgArray[i].title + "</p>");
                    var ratingTag = $("<p>Rating: " + imgArray[i].rating + "</p>");
                    var interestTag = $("<p class='" + interestSelected + "'>Interst: " + interestSelected + "</p>");

                    var imageCard = outerDiv.append(imgDiv).append(wordDiv).append(titleTag).append(ratingTag).append(interestTag);
                    $(".put-gifs-here").prepend(imageCard);     
            }

            $("img").on("click", function(){
                var state = $(this).attr("data-state");
                console.log(this);
    
                if(state === "still"){
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                    console.log($(this));
                    console.log('1');
                } 
                if(state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                    console.log($(this));
                    console.log('2');
                }
            })

        });
    });        
});

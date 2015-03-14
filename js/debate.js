$( document ).ready(function() {

   // Set up and draw the 1st level
   setupGame(16);

   // Attatch event handlers
   $("#startGameButton").on("click",function(){
	   $("#brackets").css({"-webkit-transform": "scale(3)"});
   });

   // testcode

});


function setupGame(gameSize) {

   // First do some cleanup
   $(".matches").empty();
   $("#brackets").css({"-webkit-transform": "scale(1)"});
   $("#numTopics").html(gameSize);
   
   // Assign a random number to each set in the topics list
   for (var i=0; i<Topics.length; i++) {
      var num = Topics[i][0];  // taking into account the weight of each set
      if (num == 0) {
         Topics[i][0] = Math.random();
      } else {
         Topics[i][0] = num * Math.random();
      }
   }
   
   // Sort the topics list by the randomly generated values
   Topics.sort( function(a,b) { return (a[0] < b[0]) ? 1 : ((b[0] < a[0]) ? -1 : 0); } );

   // Set up each of the 4 brackets
   var bracketSize = gameSize / 4;
   for (var i=0; i<4; i++) {
      var $bracket = $("#bracket" + (i+1)),
            $matches = $bracket.find(".matches");
      
      for (var j=0; j<bracketSize/2; j++) {
         var $match = $("<div class='match'></div>");
         $match.append("<div class='topic'>" + Topics[j+(i*bracketSize/2)][1][0] + "</div>");
         $match.append("<div class='versus'>vs.</div>");
         $match.append("<div class='topic'>" + Topics[j+(i*bracketSize/2)][1][1] + "</div>");
         $matches.append($match);
      }
   }
}

/* -------------------- */
/* Current state */
var Current = {
   //topicMap: {}
}


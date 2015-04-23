$( document ).ready(function() {

	// Set up and draw the 1st level
	setupGame(16);

	// Attatch event handlers
	$("#startGameButton").on("click",function(){
		$("#brackets").css({"-webkit-transform": "scale(3)"});
	});

	// When a topic is selected, advance it to the next round
	$(document).on("click", ".topic", function(){
		
		// Get a handle on the topic's parent match
		var $match = $(this).parent()
		
		// If the match isn't already decided, continue
		if (! $match.is(".decided")) {

			// Get a handle to the round and bracket numbers
			var roundNum = getPrefixedNumberFromClassList( $match.parent(), "round-") * 1,
				bracketNum = getPrefixedNumberFromClassList( $(this).parents(".bracket"), "bracket-") * 1;

			// Set the match as decided
			$match.addClass("decided");
				
			if ($match.has(".selected").length) {
				$match.find(".selected").removeClass("selected");
			}
			$(this).addClass("selected");
		
			// Promote the selected topic to the correct match in the next round
			// Find which match this is within the round
			var matchInCurrentRound = getPrefixedNumberFromClassList($match, "match-"),
				matchInNextRound = Math.ceil(matchInCurrentRound/2),
				nextRound = getPrefixedNumberFromClassList($match.parent(), "round-") * 1 + 1;
		
			console.log(".bracket-" + bracketNum + " .round-" + nextRound + " match-" + matchInNextRound);
			$(".bracket-" + bracketNum + " .round-" + (roundNum + 1) + " .match-" + matchInNextRound).append(
				"<div class='topic'>" + $(this).html() + "</div>"
			);

		}
		
	});

	// testcode

});

function getPrefixedNumberFromClassList(element, prefix) {
	var value = false;
	var classList = $(element).attr("class").split(/\s+/);
	$.each( classList, function(index, item){
		if (item.indexOf(prefix) != -1) {
			value = item.substring(prefix.length);
		}
	});
	return value;
}


function setupGame(gameSize) {

   // First do some cleanup
   $(".round").remove();
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
      var $bracket = $(".bracket-" + (i+1)),
	   numMatches = bracketSize/2;
      
	  // Add enough rounds to each bracket to get to the semi-final
	  var roundNum = 1;
	  while (numMatches >= 1) {
		  var $round = $("<div class='round round-" + roundNum + "'></div>");
		  $bracket.append($round);

		  // And fill each round with the right number of matches
	      for (var j=0; j<numMatches; j++) {
	          var $match = $("<div class='match match-" + (j+1) + "'></div>");
			  
			  // If this is the first round within a bracket, fill it with matches from the weighted and sorted Topics
			  if ($bracket.find(".round").length == 1) {
		          $match.append("<div class='topic'>" + Topics[j+(i*bracketSize/2)][1][0] + "</div>");
		          // $match.append("<div class='versus'>vs.</div>");
		          $match.append("<div class='topic'>" + Topics[j+(i*bracketSize/2)][1][1] + "</div>");
			  }
			  $round.append($match);
		  }
		  roundNum++;
		  numMatches = numMatches / 2;
	  }
   }
}

/* -------------------- */
/* Current state */
var Current = {
   //topicMap: {}
}


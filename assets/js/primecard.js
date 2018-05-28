$( function(){
		
	var navp = $('#primecard');
	$(window).scroll(function(){
		if (  $(window).scrollTop() == 0 ) {
			navp.css('opacity','0');
			
		}else {
			navp.css('display','block');
			navp.css('opacity','1');
		}
	});
	
	$( "#primecard" ).click(function() {	
		
			$("#cardbox").show();		
			$(".flip").removeClass('change');	
			$(".flip").addClass('rubberBand');
			$(".fgh").show();
			$(".cashbox").show();
		
		setTimeout(function() {
			$(".front").removeClass('rr');
			$(".back").removeClass('rr');
		},2400);			
		
		setTimeout(function() {
			$(".c1").addClass('coin1');
			$(".c2").addClass('coin2');
			$(".c3").addClass('coin3');
			$(".c4").addClass('coin2');
			$(".c5").addClass('coin1');
			$(".c6").addClass('coin3');
		},2600);	
		
		ev.preventDefault();

	});
		
	$( ".flip, .cardclose" ).click(function() {	
			$(".flip").removeClass('rubberBand');
			$(".flip").addClass('change');
			$(".fgh").hide();
			$(".cashbox").hide();
			$(".front").addClass('rr');
			$(".back").addClass('rr');
		    $(".c1").removeClass('coin1');
			$(".c2").removeClass('coin2');
			$(".c3").removeClass('coin3');
			$(".c4").removeClass('coin2');
			$(".c5").removeClass('coin1');
			$(".c6").removeClass('coin3');

			setTimeout(function() {
				$("#cardbox").hide();
				$(".popup2").addClass('fill').addClass('animated');
			},1000);
		
	});
	
	$(document).keyup(function(e){
		if(e.keyCode === 27){
				$(".flip").removeClass('rubberBand');
				$(".flip").addClass('change');
				$(".fgh").hide();
				$(".cashbox").hide();
				$(".front").addClass('rr');
				$(".back").addClass('rr');
				$(".c1").removeClass('coin1');
				$(".c2").removeClass('coin2');
				$(".c3").removeClass('coin3');
				$(".c4").removeClass('coin2');
				$(".c5").removeClass('coin1');
				$(".c6").removeClass('coin3');

				setTimeout(function() {
					$("#cardbox").hide();
					$(".popup2").addClass('fill').addClass('animated');
				},1000);
		}	
	});	
	
});

//start functions on page ready/change

$(document).on("ready page:change", function() {
	
	//backstretch_image()
	//odometer_set()
	tag_cloud_init();
	nice_scrollbar();
	set_valign();
	social_plugin();
	validate_forms();

	   $('input').iCheck({
	    checkboxClass: 'icheckbox_flat-blue',
	    radioClass: 'iradio_flat-blue'
	  });
	
});

// LOADER START/STOP - function for loader image. When page is fully load i hide loader image in html div <div class='loader'>
$(window).load(function() {
	$(".loader_container").fadeOut(1000).hide(); // fadeOut for loading animation ( preloader )
	$(".loader_container").css('z-index','-1');
	
	// some scripts that need to be init after load ( mainly for IE browsers )
	init_modal()
	nice_scrollbar()
	set_valign()
	init_tooltipster()
	validate_contact_form()
});
 
 // All Rights Reserved Mostafa Kassem


 $( ".Cap" ).submit(function( e )  {

      e.preventDefault();  

    var $form = $(this);

        $form.find(".actions").fadeOut("slow");
        $form.find('button[type="submit"]').attr('disabled','disabled');

     $.ajax({
        url: $form.attr('action'),
        type:'POST',
        data: $form.serialize(),
        dataType: "json",
        success: function(data){ 
          if(data.captcha) {
          	$('#myModal3').modal('hide');
        	$("#Rock").submit();

			// fadeIn content after modal is closed
				$('.c1-pattern').fadeIn(500);
				$('.top-buttons').fadeIn(500);

          }else{
			generate_3('information', 'Seems like captcha code is wrong!');
          }
        }
      });
 
});

function social_plugin(){
	// social plugin for sharing Your page on social media */
	
	// IN HTML FILE, use:
	// data-url= "" - for url to share
	// data-title= "" - for title in shared element
	// data-description= "" - for description in shared element
	// data-media="" - for og:image in shared element
	$('.prettySocial').prettySocial();
}

// init tag cloud plugi. You can change options reading doc on https://github.com/indyarmy/jQuery.awesomeCloud.plugin
function tag_cloud_init(){
	
	// pixelRatio for "printMultiplier" 1 for standard LCD, 3 for Retina displays 
	if ( window.devicePixelRatio > 1 ){
		var settings = {
		        "size" : {
		            "grid" : 4,
					"normalize" : true
		        },
		        "options" : {
	            
		            "printMultiplier" : 3 // 3 retina 1 for normal
		        },
				"color" : {
			    
				    "start" : "#B6B6B6", // color of the smallest font, if options.color = "gradient""
				    "end" : "#E5E5E5" // color of the largest font, if options.color = "gradient"
				},
		        "font" : "Raleway", // font family
		        "shape" : "Circle" // shape for tag cloud
		    }
	}else{
			var settings = {
			        "size" : {
			            "grid" : 4,
						"normalize" : true
			        },
			        "options" : {

			            "printMultiplier" : 1 // 3 retina 1 for normal
			        },
					"color" : {

					    "start" : "#B6B6B6", // color of the smallest font, if options.color = "gradient""
					    "end" : "#E5E5E5" // color of the largest font, if options.color = "gradient"
					},
			        "font" : "Raleway", // font family
			        "shape" : "Circle" // shape for tag cloud
			    }
		
	}
	$( ".tag-cloud" ).awesomeCloud( settings )
}


//function for init tooltipster plugin - more info and options on bootstrap page "tooltip" section
function init_tooltipster(){
	$('[data-toggle="tooltip"]').tooltip()
}

// bootstrap modal initialization
function init_modal(){
	
	// button for modal with icons with animations for content. More about modal in bootstrap modal section
	$('.button9-1').on('click',function(){
		
		//init and fadeOut main content
		$('#myModal').modal()
		$('.c1-pattern').fadeOut(500)
		$('.top-buttons').fadeOut(500)
		
	});
	
	// button for modal with contact form with animations for content
	$('#contactBtn').on('click',function(){
		
		//init and fadeOut main content
		$('#myModal2').modal()
		$('.c1-pattern').fadeOut(500)
		$('.top-buttons').fadeOut(500)
	})

	$('#eventBtn').on('click',function(){
		
		//init and fadeOut main content
		$('#myModal3').modal()
		$('.c1-pattern').fadeOut(500)
		$('.top-buttons').fadeOut(500)
	})
	
	// set fadeIn for content of page after modal is closed 
	$('.btn-close-modal').on('click',function(){
		
		// fadeIn content after modal is closed
		$('.c1-pattern').fadeIn(500)
		$('.top-buttons').fadeIn(500)
		
	});
	
	
	// callbacks for vertival align for bootstrap modal - see bootstrap documentation for more informations - shown.bs.modal is fired after modal is fully showed
	$('#myModal').on('shown.bs.modal', function (e) {
		// vertical align content for modal and reinit scrollbar
		
		set_valign_modal()
	});

	$('#myModal2').on('shown.bs.modal', function (e) {
	    // vertical align content for modal and reinit scrollbar
		
		set_valign_modal()
	});

	$('#myModal3').on('shown.bs.modal', function (e) {
	    // vertical align content for modal and reinit scrollbar
		
		set_valign_modal()
	});
	
}


// IMAGE BACKGROUND PLUGIN - for responsive behavior. It set background with slide for images - You can put as many images as You want. 
// If You put only one, there will be no slider and static background
function backstretch_image(){

	$(".c1").backstretch([
	    "img/wallpapers_blured.jpg"
	  ], {duration: 4000, fade: 1000});
}


// function for counter on main page. This function remember number and start from last number after page is reloaded (localstorage only). 
// Put data form database if You want to have that same number for every user
function jq_cookie(value){
	localStorage.setItem('users_count',value);
}


// plugin for counter - https://github.com/HubSpot/odometer
function odometer_set(){
	
	//get number setted from localstorage
	var local = localStorage.getItem('users_count');
	
	// first numer on first page load. You can set whatever You want
	if ( local < 1000){
		local = 1000
	}
	
	// set variable name for odometerCounter and use number from localStorage
	var exampleOdometerValue = local;
	
	//init odometer with some not default settings
	var exampleOdometer = new Odometer({ el: $('.odometer')[0], format: 'd', theme: 'minimal', value: exampleOdometerValue });
	    exampleOdometer.render();
		
	// how often number should be updated . Of course You can also set ajax request and get number from data base
	setInterval(function(){
	      exampleOdometer.update(exampleOdometerValue++); // add +1 to Your counter
		  jq_cookie(exampleOdometerValue) // save last updated value in localstorage
	}, 3000);
}


// CUSTOM SCROLL BAR PLUGIN - this plugin put custom scroll for browsers. If You want change behavior, 
// look at https://github.com/inuyaksa/jquery.nicescroll and in file jquery.nicescroll.js 
function nice_scrollbar(){
	$("html").niceScroll({cursorcolor:"#00A8FF"});  // scroll for page
	$("#myModal").niceScroll({cursorcolor:"#00A8FF"}); // scroll for modal 1
	$("#myModal2").niceScroll({cursorcolor:"#00A8FF"}); // scroll for modal 2
}





// small plugin for vertical align in middle
$.fn.vAlignDiv = function(div) {
  return this.each(function(i){
  var ah = $(this).height();
  var ph = $(div).height();
  var mh = (ph - ah) / 2;
  if(mh>0) {
    $(this).css('margin-top', mh);
  } else {
    $(this).css('margin-top', 0);
  }
})
}

// set valign for some page elements
function set_valign(){
	$('.c1-main-container').vAlignDiv('.c1');
	$(window).resize(function(){
		$('.c1-main-container').vAlignDiv('.c1');	
	});
}

// set valign after modal is loaded
function set_valign_modal(){
	
	$('.modal-content-1').vAlignDiv('.dialog-1'); // for 1 modal with icons
	$('.modal-content-2').vAlignDiv('.dialog-2'); // for 2 modal with contact form
	
	// set valign when window is resized
	$(window).resize(function(){
		$('.c1-main-container').vAlignDiv('.c1');
		$('.modal-content-1').vAlignDiv('.dialog-1'); // for 1 modal with icons
		$('.modal-content-2').vAlignDiv('.dialog-2'); // for 2 modal with contact form
		
	});
}


// generate function that can be used when user click on button or submit something http://ned.im/noty/  WHOLE options can (jQ and CSS) be changed in default.js 
function generate_3(type,text) {
  	var n = noty({
  		text: text,
  		type: type,
		timeout : 3000,  //how long information stay on page
        dismissQueue: true,
		maxVisible: 8,   // how many visible elements can be show on one page
  		layout: 'center',  // layout style - this put information on center of page
  		theme: 'defaultTheme'  // layout theme
  	});
}

// VALIDATION PLUGIN 
function validate_forms(){
	
	//validation for email submit on first page
	$('.validate').submit(function(event){
		
		if ( validator.isEmail( $('#input-email').val()  ) ){
			
			$("#submitMe").attr('disabled' , 'disabled');
		 
		     $.ajax({

		        url: "subscribe.php" ,
		        type:'POST',
		        data: $("#Rock").serialize() ,
		        dataType: "json",
		        success: function(data){ 
		           
		           $("#submitMe").removeAttr('disabled');

				 	 if( data.type ){
				 	 	 if(data.response) {
								generate_3('information', data.response); 
								 if(data.type == 'success'){
								 	$("#RockForm").fadeOut("slow");
										
										var nu = parseInt($("#odometer").html());
										$("#odometer").html( nu - 1);
										setTimeout(function(){ $(".odometer").fadeOut('slow'); $(".odometer").fadeIn('slow');  }, 100);
								 }
				 	 	 }
				 	 }else if(data.captcha) {
							//init and fadeOut main content
							$('#myModal3').modal()
							$('.c1-pattern').fadeOut(500)
							$('.top-buttons').fadeOut(500)
				 	 }

		        }

		      }); 
			
			event.preventDefault();

		}else{
			generate_3('information', 'Email adress in not valid <br> Please write valid email adress');
			event.preventDefault();
		}
	});
}

//validation for contact form
function validate_contact_form(){
	
	
	$('.validate-contact').submit(function(event){
		
		//validate email in contact form
		if ( validator.isEmail( $('.contact-email').val()  ) ){
			
		}else{
			generate_3('information', 'Email adress in not valid <br> Please write valid email adress');
			event.preventDefault();
		}
		
		//validate name in contact form
		if (validator.isAlphanumeric( $('.contact-sender').val()  ) ){
			
		}else{
			generate_3('information', 'Name can only contain letters and numbers');
			event.preventDefault();
		}
		
		//validate content in contact form
		if (validator.isAlphanumeric( $('.contact-content').val()  ) ){
			
		}else{
			generate_3('information', 'Content can only contain letters and numbers and cant be blank');
			event.preventDefault();
		}
		
		//if everything is valid, run Your sending email function
		if ( validator.isAlphanumeric( $('.contact-sender').val() ) && validator.isEmail( $('.contact-email').val() ) &&  $('.contact-content').val() !=''  ){
			alert('Success. Set Your function to send email')
		}
	});
}

'use strict';
var drawpath = function( canvas, pathstr, duration, attr, callback ){
	var guidePath = canvas.path( pathstr ).attr( { stroke: 'none', fill: 'none' } );
	var path = canvas.path( guidePath.getSubpath( 0, 1 ) ).attr( attr );
	var totalLength = guidePath.getTotalLength( guidePath );
	//var lastPoint = guidePath.getPointAtLength( 0 );
	var startTime = new Date().getTime();
	var intervalLength = 50;
	var result = path;

	var intervalId = setInterval( function()
	{
		var elapsedTime = new Date().getTime() - startTime;
		var thisLength = elapsedTime / duration * totalLength;
		var subpathstr = guidePath.getSubpath( 0, thisLength );
		attr.path = subpathstr;

		path.animate( attr, intervalLength );
		if ( elapsedTime >= duration )
		{
			clearInterval( intervalId );
			if ( callback !== undefined ) { callback(); }
			guidePath.remove();
		}
	}, intervalLength );
	return result;
};


var green = '#00A85D';
var bullets = document.getElementById('slidecount').getElementsByTagName('li');
var windowHeight = $(window).height();

$(document).ready(function(){

	if ( $('body').hasClass('home') || $('body').hasClass('story') ) {

		window.mySwipe = new Swipe(document.getElementById('slider'), {
			startSlide: 0,
			speed: 1000,
			auto: 3000,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			callback: function(index) {
				if ($(window).width() > 480) {
					if (index === 0) {
						logo.animate({fill: green}, 500);
						nextbutton.animate({stroke: green}, 500);
						prevbutton.animate({stroke: green}, 500);
						$('#nav a.heading').css({color: green}, 500);
					} else if (index === 1) {
						logo.animate({fill: '#fff'}, 500);
						nextbutton.animate({stroke: '#fff'}, 500);
						prevbutton.animate({stroke: '#fff'}, 500);
						$('#nav a.heading').css({color: '#ffffff'}, 500);
					} else {
						logo.animate({fill: '#000'}, 500);
						nextbutton.animate({stroke: '#000'}, 500);
						prevbutton.animate({stroke: '#000'}, 500);
						$('#nav a.heading').css({color: '#000000'}, 500);
					}
				}
			},
			transitionEnd: function(pos) {
				var i = bullets.length;
				while (i--) {
					bullets[i].className = ' ';
				}
				bullets[pos].className = 'on';
			}
		});

	} else if ($('body').hasClass('single')) {

		window.mySwipe = new Swipe(document.getElementById('slider'), {
			startSlide: 0,
			speed: 1000,
			auto: 3000,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			transitionEnd: function(pos) {
				var i = bullets.length;
				while (i--) {
					bullets[i].className = ' ';
				}
				bullets[pos].className = 'on';
			}
		});

	}

	var slideElement = $('#slider').load(function(){
		$(this).height();
	});

	var sliderHeight = slideElement[0].clientHeight;
	console.log(sliderHeight);
	console.log(slideElement);

	// Centres the arrows for the slider
	var centreArrows = function(){
		var sliderHeight = $('#slider').height();
		var windowHeight = $(window).height();
		var halfBrowserHeight = $(window).height() / 2;
		var halfSliderHeight = $('#slider').height() / 2;
		if($('body').hasClass('home') || $('body').hasClass('story')) {
			$('a#next, a#prev').css({ top: halfBrowserHeight });
			if(windowHeight > sliderHeight) {
				$('a#next, a#prev').css({ top: halfSliderHeight });
			}
		} else {
			$('a#next, a#prev').css({ 'margin-top': -(sliderHeight/2 + 20) });
		}
	};

	// Set the more button positioning
	var moreButton = function(){
		var windowHeight = $(window).height();
		if(sliderHeight > windowHeight) {
			$('a#more').css({bottom: '0px', position: 'fixed' });
		} else {
			$('a#more').css({bottom: 'auto',  position: 'absolute'});
		}
	};

	// on window resize
	$(window).resize(function(){
		var sliderHeight = $('#slider').height();
		moreButton();
		centreArrows();
		if(!$('body').hasClass('single')){
			$('#slidecount').css({ top : sliderHeight - 100 });
		}
	});
	
	moreButton();
	centreArrows();

	if(!$('body').hasClass('single')){
		$('#slidecount').css({ top : sliderHeight - 100 });
	}


	$(window).scroll(function(){
		moreButton();
		if ($(window).scrollTop() >= (sliderHeight - windowHeight) ) {
			$('a#more').css({ bottom: 'auto',  position: 'absolute'});
		}
	});

	if($('body').hasClass('single')){
		$('#slidecount').css({ bottom : '60px'});
	} else {
		$('#slidecount').css({ top : sliderHeight - 100 });
	}

	$('a#prev').on('click', function(e){
		e.preventDefault();
		mySwipe.prev();
	});

	$('a#next').on('click', function(e){
		e.preventDefault();
		mySwipe.next();
	});

	$('a#more').on('click', function(){
		var sliderHeight = $('#slider').height();
		$(window).scrollTo(sliderHeight, 500, {easing: 'easeInOutCubic'});
	});


	$('a.eye').hover(
		function(){
			$(this).transition({ x: '-3px', y: '-3px' }, 200).stop( true, true );
		}, function(){
			$(this).transition({ x: '0px', y: '0px' }, 200);
		}
	);

	$('a.cart').hover(
		function(){
			$(this).transition({ x: '3px', y: '3px' }, 200).stop( true, true );
		}, function(){
			$(this).transition({ x: '0px', y: '0px' }, 200);
		}
	);


	// Mutant Ninja Turtle
	// Logo
	var r = new Raphael(document.getElementById('logo'), 160, 50);
	var logo = r.path('M46.639,18.774c0.316,0.397,0.493,0.859,0.493,1.321c0,1.377-1.188,2.217-2.284,2.217 c-0.713,0-1.349-0.335-1.792-0.954c-0.805-1.159-1.764-1.376-3.366-1.376c-2.558,0-3.855,1.132-3.855,3.366v21.667 c0,1.306-0.909,2.22-2.221,2.22c-1.077,0-2.222-0.781-2.222-2.22V17.822c0-2.4,3.145-2.916,4.153-1.208 c1.21-0.696,2.876-1.012,4.145-1.012C41.115,15.602,44.645,15.904,46.639,18.774z M63.8,42.906c-2.38,0-3.913-1.555-3.913-3.975 v-18.76h3.544c1.487,0,2.286-1.118,2.286-2.165c0-1.103-0.782-2.228-2.286-2.228h-3.544V4.995c0-1.461-1.089-2.229-2.164-2.229 c-1.306,0-2.221,0.919-2.221,2.229v10.783h-1.522c-1.306,0-2.224,0.92-2.224,2.228c0,1.07,0.763,2.165,2.224,2.165h1.522v18.76 c0,5.039,3.256,8.303,8.298,8.303c1.331,0,2.222-0.867,2.222-2.164C66.021,44,65.262,42.906,63.8,42.906z M75.768,15.602 c-1.08,0-2.224,0.773-2.224,2.221V45.07c0,1.486,1.149,2.164,2.224,2.164c1.069,0,2.226-0.678,2.226-2.164V17.822 C77.993,16.375,76.845,15.602,75.768,15.602z M75.768,2.766c-1.08,0-2.224,0.782-2.224,2.229v2.023c0,1.391,1.131,2.225,2.224,2.225 s2.226-0.834,2.226-2.225V4.995C77.993,3.547,76.845,2.766,75.768,2.766z M121.848,42.906c-2.267,0-3.852-1.631-3.852-3.975V4.995 c0-1.448-1.149-2.229-2.226-2.229c-1.074,0-2.226,0.782-2.226,2.229v33.937c0,4.97,3.339,8.303,8.303,8.303 c1.344,0,2.288-0.887,2.288-2.164C124.136,44.029,123.334,42.906,121.848,42.906z M100.338,16.24l-0.205-0.051 c-1.221-0.344-2.402,0.344-2.744,1.537c-0.291,1.04,0.152,2.285,1.506,2.671l0.107,0.033c2.207,0.92,3.625,3.051,3.625,5.428 c0,1.453,1.146,2.226,2.227,2.226c1.074,0,2.164-0.765,2.164-2.226C107.018,21.519,104.397,17.742,100.338,16.24z M94.004,42.524 l-0.117-0.062c-2.201-0.915-3.628-3.045-3.628-5.43V25.857c0-2.405,1.443-4.545,3.688-5.451l0.03-0.019 c1.362-0.405,1.781-1.641,1.499-2.661c-0.274-0.974-1.114-1.629-2.086-1.629c-0.215,0-0.438,0.025-0.612,0.08l-0.18,0.044 c-4.083,1.488-6.729,5.274-6.729,9.636v11.176c0,4.054,2.433,7.73,6.192,9.353l0.174,0.085c0.179,0.075,0.406,0.175,0.423,0.18 c0.271,0.113,0.533,0.17,0.802,0.17c1.066,0,1.797-0.867,2.023-1.678C95.791,44.053,95.24,43.076,94.004,42.524z M104.854,34.744 c-1.098,0-2.227,0.863-2.227,2.289c0,2.365-1.414,4.496-3.616,5.424l-0.169,0.082c-1.386,0.41-1.721,1.604-1.443,2.604 c0.273,0.951,1.151,1.64,2.1,1.64c0.184,0,0.373-0.029,0.561-0.076l0.357-0.149c4.01-1.501,6.602-5.234,6.602-9.523 C107.018,35.543,105.904,34.744,104.854,34.744z M147.128,37.494c-0.962,0-1.718,0.537-2.064,1.499 c-0.59,1.697-1.773,2.96-3.362,3.583l-0.289,0.141c-0.178,0.087-0.333,0.16-0.47,0.274c-1,0.849-0.849,2.286-0.127,3.132 c0.419,0.49,0.961,0.753,1.579,0.753c0.271,0,0.565-0.056,0.849-0.159l0.272-0.171c2.755-1.085,4.861-3.31,5.819-6.177l0.042-0.174 c0.052-0.197,0.099-0.363,0.099-0.552C149.476,38.311,148.26,37.494,147.128,37.494z M143.412,16.328l-0.169-0.088 c-0.924-0.344-1.821-0.118-2.428,0.592c-0.722,0.847-0.873,2.287,0.127,3.13c0.137,0.123,0.292,0.189,0.47,0.274l0.557,0.283 c2.15,0.961,3.552,3.078,3.552,5.384v3.357h-12.372v-3.357c0-2.376,1.513-4.574,3.709-5.451l0.443-0.17 c0.186-0.084,0.341-0.16,0.473-0.273c1-0.849,0.848-2.285,0.127-3.133c-0.414-0.49-0.962-0.755-1.579-0.755 c-0.274,0-0.562,0.055-0.825,0.151l-0.189,0.066c-3.917,1.556-6.545,5.396-6.545,9.564V37.07c0,4.139,2.59,7.921,6.456,9.473 l0.113,0.126l0.15,0.048c0.283,0.104,0.576,0.159,0.854,0.159c0.613,0,1.16-0.263,1.58-0.753c0.716-0.846,0.867-2.283-0.134-3.132 c-0.131-0.114-0.282-0.188-0.466-0.274l-0.154-0.074l-0.199-0.066c-2.282-0.857-3.813-3.073-3.813-5.506v-3.359h14.536 c1.179,0,2.226-1.035,2.226-2.225v-5.582C149.91,21.51,147.42,17.844,143.412,16.328z M3.415,24.616c0.601,0,1.428-0.225,1.984-1.33 c0.655-1.474,1.724-2.46,3.121-2.927c0,0,0.379-0.084,0.489-0.113c0.196-0.062,0.368-0.131,0.515-0.235 c0.528-0.339,0.869-0.892,0.951-1.547c0.071-0.561-0.06-1.158-0.366-1.627c-0.349-0.535-0.832-0.853-1.443-0.94 c-0.283-0.038-0.841,0.041-0.968,0.065c-2.085,0.56-4.885,1.959-6.37,5.444c-0.163,0.33-0.255,0.684-0.255,0.99 C1.073,23.726,2.285,24.616,3.415,24.616z M23.163,42.831c-1.325-0.216-1.994-0.321-1.994-5.159V25.339 c0-3.759-2.271-7.238-5.793-8.86l-0.097-0.038c-0.242-0.073-0.57-0.153-0.769-0.167h-0.088c-0.609,0-1.129,0.238-1.549,0.703 c-0.521,0.582-0.734,1.431-0.546,2.176c0.104,0.416,0.325,0.773,0.637,1.056c0.065,0.062,0.184,0.17,0.952,0.462 c1.796,0.962,2.866,2.802,2.866,4.914c0,1.17,0,1.244-1.313,1.678c-1.159,0.396-2.576,0.679-4.073,0.973 C6.356,29.232,0.09,30.478,0.09,37.371v0.301c0,4.768,2.958,8.328,7.744,9.285c0.13,0.023,0.562,0.1,0.798,0.1l0.096-0.01 c0.596-0.049,1.033-0.33,1.382-0.863c0.307-0.475,0.444-1.07,0.366-1.641C10.39,43.897,10.053,43.35,9.524,43 c-0.065-0.037-0.269-0.169-0.989-0.311c-2.582-0.574-4.062-2.381-4.062-4.956v-0.306c0-3.631,4.629-4.451,8.715-5.168 c1.312-0.24,2.575-0.461,3.595-0.773v5.518c0,2.141-1.148,4.111-2.968,5.129c-0.294,0.152-0.679,0.345-0.851,0.505 c-0.991,0.887-0.845,2.392-0.091,3.229c0.406,0.453,0.88,0.58,1.243,0.632c0.53,0.085,1.199-0.207,1.296-0.25 c0.97-0.446,1.847-1.032,2.617-1.748c0.894,1.456,2.32,2.319,4.418,2.695l0.43,0.006c1.291,0,2.162-0.892,2.162-2.222 C25.04,43.783,24.352,42.991,23.163,42.831z');
	logo.attr({ fill: '#00A85D', stroke: 'none'});

	// Cart Icon
	var c = new Raphael(document.getElementById('cart'), 80, 80);
	var cartCircle = c.circle(40, 40, 30).attr({stroke: 'none', fill: '#fff', opacity: '.7'});
	var cartIcon = ['M37.099,36.687c0-2.031,1.416-3.97,3.301-3.97c2.339,0,3.416,2.308,3.416,4.628v2.021H31.755l2.638,7.917h11.215l2.638-7.917'];
	drawpath( c, cartIcon, 1000, { stroke: green, 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none', 'fill-opacity': 0 });
	var cartBox = c.rect(0, 0, 80, 80).attr({stroke: 'none', fill: '#ff0000', opacity: 0});

	if($('body').hasClass('story')){

		$('#storytitle').css({
			'margin-top' : -(($('#slides').height() / 2) + 125)
		});

		$(window).resize(function(){
			$('#storytitle').css({
				'margin-top' : -(($('#slides').height() / 2) + 125)
			});
		});

		// Page Title Story
		var storyTitle = new Raphael(document.getElementById('storytitle'), 250, 250);
		var frame = storyTitle.path('M228,166.574V238H22v-71.425c0-64.714,41.165-121.696,102.997-155.058 C186.828,44.879,228,101.858,228,166.574z');
		frame.attr({fill: '#fff', stroke: 'none'});
		var frameInner = storyTitle.path('M218.5,165.932V228.5h-187v-62.567 c0-57.682,34.799-111.489,93.497-144.772C183.698,54.445,218.5,108.253,218.5,165.932z');
		frameInner.attr({fill: 'none', stroke: green });

		frame.mouseover(function(){
			frame.animate({
				transform: 's1.05t0,-2'
			}, 150, '>');
			frameInner.animate({
				transform: 's.95t0,1'
			}, 150, '>');
		});

		$('#storytitle h1').mouseover(function(){
			frame.animate({
				transform: 's1.05t0,-2'
			}, 150, '>');
			frameInner.animate({
				transform: 's.95t0,1'
			}, 150, '>');
		});

		frame.mouseout(function(){
			frame.animate({
				transform: ''
			}, 150, '>');
			frameInner.animate({
				transform: ''
			}, 150, '>');
		});

		frame.click(function(){
			$(window).scrollTo(sliderHeight, 500, {easing: 'easeInOutCubic'});
		});
		$('#storytitle h1').click(function(){
			$(window).scrollTo(sliderHeight, 500, {easing: 'easeInOutCubic'});
		});
	}

	// Footer Logo
	var smallLogo = new Raphael(document.getElementById('small-logo'), 80, 80);
	var circleLogo = smallLogo.circle(40, 40, 30).attr({stroke: 'none', fill: '#fff', opacity: 1});
	var logoLetter = smallLogo.path('M30.981,32.646c0-0.239,0.072-0.517,0.199-0.775c1.163-2.727,3.354-3.823,4.986-4.261 c0.099-0.02,0.536-0.081,0.757-0.052c0.479,0.069,0.857,0.317,1.13,0.736c0.24,0.368,0.342,0.834,0.287,1.273 c-0.064,0.513-0.331,0.946-0.745,1.21c-0.115,0.083-0.249,0.137-0.403,0.186c-0.086,0.022-0.383,0.088-0.383,0.088 c-1.094,0.366-1.93,1.138-2.443,2.291c-0.436,0.864-1.083,1.041-1.553,1.041C31.929,34.384,30.981,33.687,30.981,32.646z  M48.27,48.641c-1.037-0.169-1.561-0.252-1.561-4.038v-9.653c0-2.941-1.777-5.665-4.533-6.935L42.1,27.985 c-0.189-0.057-0.446-0.119-0.602-0.131H41.43c-0.478,0-0.884,0.186-1.212,0.55c-0.408,0.456-0.575,1.12-0.427,1.703 c0.081,0.325,0.254,0.605,0.498,0.826c0.051,0.048,0.144,0.134,0.745,0.361c1.406,0.754,2.243,2.194,2.243,3.847 c0,0.915,0,0.974-1.028,1.312c-0.906,0.311-2.016,0.531-3.188,0.762c-3.945,0.781-8.85,1.756-8.85,7.15v0.236 c0,3.73,2.315,6.518,6.062,7.268c0.102,0.018,0.439,0.077,0.625,0.077l0.075-0.007c0.466-0.039,0.809-0.259,1.082-0.676 c0.24-0.372,0.348-0.838,0.287-1.284c-0.067-0.505-0.331-0.935-0.745-1.208c-0.051-0.029-0.21-0.132-0.774-0.243 c-2.021-0.449-3.179-1.864-3.179-3.88v-0.238c0-2.842,3.623-3.484,6.821-4.045c1.027-0.188,2.016-0.36,2.813-0.605v4.318 c0,1.676-0.898,3.219-2.322,4.015c-0.23,0.119-0.531,0.27-0.666,0.395c-0.776,0.694-0.661,1.872-0.071,2.528 c0.318,0.354,0.688,0.454,0.972,0.494c0.416,0.066,0.939-0.162,1.015-0.195c0.759-0.35,1.445-0.809,2.048-1.368 c0.7,1.14,1.816,1.815,3.459,2.109l0.336,0.005c1.011,0,1.692-0.697,1.692-1.739C49.739,49.385,49.2,48.766,48.27,48.641z');
	logoLetter.attr({ fill: '#00A85D', stroke: 'none' });
	var logoBox = smallLogo.rect(0, 0, 80, 80).attr({stroke: 'none', fill: '#ff0000', opacity: 0});

	// Slider next button
	var next = new Raphael(document.getElementById('next'), 40, 35);
	var nextbutton = next.path('M 4 4 l 18 14 M 4 31 l 12 -8').attr({stroke: green, 'stroke-width': 5, 'stroke-linecap': 'round' });
	var nextbuttonbox = next.rect(0, 0, 40, 35).attr({stroke: 'none', fill: '#ff0000', opacity: 0});

	// Slider prev button
	var prev = new Raphael(document.getElementById('prev'), 40, 35);
	var prevbutton = prev.path('M 4 4 l 18 14 M 4 31 l 12 -8').attr({stroke: green, 'stroke-width': 5, 'stroke-linecap': 'round' }).rotate(180,16,17);
	var prevbuttonbox = prev.rect(0, 0, 40, 35).attr({stroke: 'none', fill: '#ff0000', opacity: 0});

	if($('body').hasClass('single')){
		nextbutton.attr({stroke: '#fff'});
		prevbutton.attr({stroke: '#fff'});
	}

	nextbuttonbox.hover(function(){
		nextbutton.animate({path: 'M 4 4 l 24 15 M 4 31 l 15 -7'}, 100);
	}, function(){
		nextbutton.animate({path: 'M 4 4 l 18 14 M 4 31 l 12 -8'}, 100);
	});

	prevbuttonbox.hover(function(){
		prevbutton.animate({path: 'M 4 4 l 24 15 M 4 31 l 15 -7'}, 100);
	}, function(){
		prevbutton.animate({path: 'M 4 4 l 18 14 M 4 31 l 12 -8'}, 100);
	});

	logoBox.hover(function(){
		circleLogo.animate({
			r : 40,
			opacity: '.7'
		}, 250, 'elastic');

	}, function(){
		circleLogo.animate({
			r : 30,
			opacity: 1
		}, 350, 'elastic');
	});

	cartBox.hover(function(){
		cartCircle.animate({
			r : 35,
			opacity: 1
		}, 250, 'elastic');
	}, function(){
		cartCircle.animate({
			r : 30,
			opacity: '.7'
		}, 350, 'elastic');
	});







}); // End of document ready


if($('body').hasClass('details')) {

	var initialize = function () {

		var mapOptions = {
			center: new google.maps.LatLng(53.343147,-6.262339),
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var stylin = [{
			'stylers': [{
				'visibility': 'off'
			}
			]
		},{
			'featureType': 'road',
			'elementType': 'geometry.fill',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'color': '#ffffff' },
				{ 'weight': 2 }
			]
		},{
			'featureType': 'landscape.natural',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'color': '#f2f1ea' }
			]
		},{
			'featureType': 'poi.park',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'color': '#d6e7e0' }
			]
		},{
			'featureType': 'transit.line',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'weight': 0.6 },
				{ 'color': '#eccbc9' }
			]
		},{
			'featureType': 'road',
			'elementType': 'labels.text.fill',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'color': '#808080' }
			]
		},{
			'featureType': 'road.highway',
			'elementType': 'geometry.fill',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'weight': 4 }
			]
		},{
			'featureType': 'road.arterial',
			'elementType': 'geometry.fill',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'weight': 3 }
			]
		},{
			'featureType': 'water',
			'stylers': [
				{ 'visibility': 'on' },
				{ 'color': '#71d0f6' }
			]
		},{
		}];

		map.setOptions({styles: stylin});

		var companyLogo = new google.maps.MarkerImage('images/marker.png',
		  new google.maps.Size(35,53),
		  new google.maps.Point(0,0),
		  new google.maps.Point(20,50)
		);
		var companyShadow = new google.maps.MarkerImage('images/logo_shadow.png',
		  new google.maps.Size(130,50),
		  new google.maps.Point(0,0),
		  new google.maps.Point(65, 50)
		);
		var companyPos = new google.maps.LatLng(53.342336,-6.262344);
		var companyMarker = new google.maps.Marker({
			position: companyPos,
			map: map,
			icon: companyLogo,
			shadow: companyShadow,
			title:'Company Title'
		});


		var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h1>Article Design ltd.</h1>'+
		'<div id="bodyContent">'+
			'<div class="map-left"><p><span>Where we are</span><br/>22 Powerscourt Townhouse,<br/>South William St, Dublin 2<br/>01 679 9268<br/>items@articledublin.com</p></div>' +
			'<div class="map-right"><p><span>We are open</span><br/>Mon–Wed: 10.30–18.00 <br/>Thursday: 10.30–19.00 <br/>Fri-Sat: 10.30–18.00 <br/>Sunday: 13.00–17.00</p></div>' +
		'</div>'+
		'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 700
		});

		google.maps.event.addListener(companyMarker, 'click', function() {
			infowindow.open(map,companyMarker);
		});
		infowindow.open(map,companyMarker);

	};

	google.maps.event.addDomListener(window, 'load', initialize);

}


directives.directive('ngParallax', function(){
	return {
		restrict: 'A',
	    controller: ['$scope', '$window', function($scope, $window){
	    	$scope.parallaxElements = [];

	    	$scope.$on('$destroy', function(){
		    	recursive = false;
		    });

	    	var recursive = true;

	    	var getSupportedPropertyName = function(properties) {
			    for (var i = 0; i < properties.length; i++) {
			        if (typeof document.body.style[properties[i]] != "undefined") {
			            return properties[i];
			        }
			    }
			    return null;
			};

			var is_touch_device = function() {
				return 'ontouchstart' in window || 'onmsgesturechange' in window; 
			};

			var transforms = ['transform', 
			                  'msTransform', 
			                  'webkitTransform', 
			                  'mozTransform', 
			                  'oTransform'],
			                  transform = getSupportedPropertyName(transforms);

			var viewportTop = null,
				windowHeight = null,
				viewportBottom = null,
				distance = null,
				sym = null,
				x = null;

			var scrollEvent = function(){
			    if(!is_touch_device()){
			        viewportTop = $window.scrollY;
			        windowHeight = $window.innerHeight;
			        viewportBottom = windowHeight+viewportTop;
			 
			        var elements = $scope.parallaxElements;

			        angular.forEach(elements, function(value, key){
			        	value = value[0];

			        	if (value.getAttribute('centerer') === 'true') {
			        		x = '-50%';
			        	} else {
			        		x = 0;
			        	}

			            distance = viewportTop * value.getAttribute('speed');

			            if(value.getAttribute('direction') === 'up'){ 
			            	sym = '-'; 
			            
			            } else { 
			            	sym = ''; 
			            }
			            
			            angular.element(value).css(transform,'translate3d(' + x + ', ' + sym + distance +'px,0)');
			        });
			 
			    }
			}; 

			var draw = function() {
		        if (recursive) {
		        	requestAnimationFrame(draw);
		        	scrollEvent();
		        };
		    }
		    
		    draw();
	    }]
	}
});

directives.directive("ngParallaxE", function () {
	return {
		restrict: "A",
		compile: function compile(tElement, tAttrs, transclude) {
			return {
				pre: function preLink(scope, iElement, iAttrs, controller) {
					scope.parallaxElements.push(iElement);
				}
			}
		}
	}
});
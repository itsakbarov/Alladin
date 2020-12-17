/*!
 * gaBasicSlider v1.0.1
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 * 
 * Copyright (c) 2018 Greg Arutunyan
 */

;(function(){
    if(window.gaBasicSlider)
        throw new Error("gaBasicSlider alredy exists");

    // Constructor
    window.gaBasicSlider = function(params) {
        // Slider defaults
        var defaults = {
            slider: null,
            btnNext: null,
            btnPrevious: null,
            indicators: null,
            animate: true,
            animationDelay: 6000, // milliseconds
            animationDuration: 500 // milliseconds
        }

        // Private instance variables

        var instance = {
            params : extend(defaults, params),
            currentIndex : 0,
            // animation variables
            interval : null,
            timeout : null, // used with delayAnimation
            // touch variables
            touchXStart : null,
            touchXCurrent : null,
            touchYStart : null,
            touchYCurrent : null
        };

        // Public methods

        this.start = function() {
            instance.params.animate = true;
            startAnimation(instance);
        }

        this.stop = function() {
            instance.params.animate = false;
            stopAnimation(instance);
        }

        // Start the slider up
        if(instance.params.slider && instance.params.slider.children.length > 1)
            init(instance);
    }

    // Private

    function init(instance) {
        // setup the slider CSS
        setup(instance);

        // add slider event handlers
        addSliderEventHandlers(instance);

        // add indicators
        addIndicators(instance);

        // add next and previous buttons
        addNextPreviousBtns(instance);

        // update active states 
        updateActiveStates(instance);

        // start animation
        startAnimation(instance);
    }

    function setup(instance){
        var slider = instance.params.slider;

        // Prepare the parent
        slider.className += ' gabs-initiated';
        slider.style.position = 'relative';
        slider.style.overflow = 'hidden';
        slider.style.padding = '0';

        // Children base css
        for(var i = 0; i < slider.children.length; i++) {
            slider.children[i].style.width = '100%';
            slider.children[i].style.position = 'absolute';
            slider.children[i].style.top = '0';
            slider.children[i].style.left = '0';
            slider.children[i].style[js.boxSizing] = 'border-box';
            slider.children[i].style.willChange = css.transform;

            if(i == 0) {
                // prevent slider from collapsing
                slider.children[0].style.position = 'relative';

                // update z-index for animation
                slider.children[0].style.zIndex = '2';
            } else {
                // update z-index for animation
                slider.children[i].style.zIndex = '1';
            }
        }

        // dispatch initiated event
        var event = new Event('initiated');
        slider.dispatchEvent(event);
        
    }

    function addSliderEventHandlers(instance) {
        // Mouse events

        instance.params.slider.addEventListener('mouseover', function(e){
            stopAnimation(instance);
        });

        instance.params.slider.addEventListener('mouseout', function(e){
            startAnimation(instance);
        });

        // Touch events

        instance.params.slider.addEventListener('touchstart', function(e){
            EventTouchStart(e, instance);
        });

        instance.params.slider.addEventListener('touchmove', function(e){
            EventTouchMove(e, instance);
        });

        instance.params.slider.addEventListener('touchend', function(e){
            EventTouchEnd(e, instance);
        });
    }
    
    function addIndicators(instance) {
        // if an indicators element isn't present return
        if (!instance.params.indicators) return;
        
        function indicatorInit(index) {
            // add click handler to the indicators
            this.addEventListener('click', function(e){
                e.preventDefault();
                slideToIndex(instance, {
                    toIndex : index,
                    moveBackward : instance.currentIndex > index
                });
                delayAnimation(instance);
            });
            
            // update indicator css
            this.style.cursor = 'pointer';
        }

        // create indicators if none are present
        if(!instance.params.indicators.children.length) {
            for (var i = 0; i < instance.params.slider.children.length; i++) {
                // create the indicator html
                instance.params.indicators.insertAdjacentHTML('beforeend', '<span class="gabs-indicator">&bull;</span>');
            }
        }
        
        // add click handler and css to the indicators
        for(var i = 0; i < instance.params.indicators.children.length; i++) {
            indicatorInit.call(instance.params.indicators.children[i], i)
        }
    }

    function addNextPreviousBtns(instance){
        // Add click event to the next button
        if(instance.params.btnNext) {
            instance.params.btnNext.addEventListener('click', function(e){
                slideToIndex(instance, {toIndex : getNextIndex(instance)});
                delayAnimation(instance);
            });
        }

        // Add click event to the previous button
        if(instance.params.btnPrevious) {
            instance.params.btnPrevious.addEventListener('click', function(e){
                slideToIndex(instance, {
                    toIndex : getPreviousIndex(instance),
                    moveBackward : true
                });
                delayAnimation(instance);
            });
        }
    }
    
    function updateActiveStates(instance) {
        // update current indicator
        if(instance.params.indicators) {
            // Remove the gabs-active class from all the children elements
            for(var i = 0; i < instance.params.indicators.children.length; i++){
                instance.params.indicators.children[i].className =
                instance.params.indicators.children[i].className.replace(' gabs-active', '');
            }
            
            // Add the gabs-active class to the active child element
            instance.params.indicators.children[instance.currentIndex].className += ' gabs-active';
        }
    }

    function startAnimation(instance) {
        if(instance.params.animate) {
            stopAnimation(instance);

            instance.interval = setInterval(function(){
                slideToIndex(instance, {toIndex : getNextIndex(instance)});
            }, instance.params.animationDelay)

            // start animation event
            var event = new Event('start');
            instance.params.slider.dispatchEvent(event);
        }
    }

    function stopAnimation(instance) {
        if(instance.interval || instance.timeout) {
            clearInterval(instance.interval);
            clearInterval(instance.timeout);

            instance.interval = null;
            instance.timeout = null;

            // stop animation event
            var event = new Event('stop');
            instance.params.slider.dispatchEvent(event);
        }
    }

    function getPreviousIndex(instance) {
        var index = instance.currentIndex - 1;
        return (index < 0) ? instance.params.slider.children.length - 1 : index;
    }

    function getNextIndex(instance) {
        var index = instance.currentIndex + 1;
        return (index == instance.params.slider.children.length) ? 0 : index;
    }

    /**
     * Slide to the specified index
     * 
     * @param {Object}  instance 
     * @param {Object}  args 
     * @param {Integer} args.toIndex 
     * @param {Boolean} args.moveBackward - True to move backward 
     */

    function slideToIndex(instance, args) {
        // Determine which direction to slide left, right or stay in place
        var xPos = null;
        if (args.toIndex == instance.currentIndex) {
            xPos = '0%';
        } else {
            xPos = args.moveBackward ? '100%' : '-100%';
        }

        // Animate
        doAnimation(instance, {
            toIndex : args.toIndex,
            xPos : xPos,
            useTransition: true,
            moveBackward: args.moveBackward
        })

        // Update the current index
        instance.currentIndex = args.toIndex;
        updateActiveStates(instance);
    }

    /**
     * Animation
     * 
     * @param {Object}  instance 
     * @param {Object}  args 
     * @param {String}  args.toIndex 
     * @param {String}  args.xPos 
     * @param {Boolean} args.useTransition - When true we transition to xPos instead of just moving to xPos
     * @param {Boolean} args.moveBackward - True to move backward 
     */

    function doAnimation(instance, args) {
        var currentIndex = instance.currentIndex;

        // offsetPercent is the amount toIndex will move in the background
        // as currentIndex moves in the forground (creates parallax feel)
        var offsetPercent = 5;

        // Preparing slides
        for(var i = 0; i < instance.params.slider.children.length; i++) {
            // remove transition
            instance.params.slider.children[i].style[js.transition] = 'none';
            
            if(currentIndex != args.toIndex) {
                // update z index
                if(i == args.toIndex) {
                    instance.params.slider.children[args.toIndex].style.zIndex =  '2';
                } else if (i == currentIndex) {
                    instance.params.slider.children[currentIndex].style.zIndex =  '3';
                } else {
                    instance.params.slider.children[i].style.zIndex = '1';
                }

                // setup parallax
                if(i != currentIndex) {
                    // get current transform value
                    var currentTransform = instance.params.slider.children[i].style[js.transform];
                    if (currentTransform) currentTransform = currentTransform.match(/\d+/)[0];
                    
                    // isParallaxing will be true for the toIndex slide that is being slightly animated in the
                    // background while the currentIndex slide is being touch dragged or animated in the foreground
                    var isParallaxing = !(!currentTransform || currentTransform == 100 || currentTransform == offsetPercent);

                    // position off screen slides so they are ready for parallax animation
                    if(args.moveBackward) {
                        if(!isParallaxing)
                            instance.params.slider.children[i].style[js.transform] = 'translateX(-' + offsetPercent + '%)';
                    } else {
                        if(!isParallaxing)
                            instance.params.slider.children[i].style[js.transform] = 'translateX(' + offsetPercent + '%)';
                    }
                }
            }
        }
        
        function slide(){
            // add transition style
            if (args.useTransition) {
                // currentIndex
                instance.params.slider.children[currentIndex].style[js.transition] = css.transform + ' ' + instance.params.animationDuration + 'ms';
                // toIndex
                instance.params.slider.children[args.toIndex].style[js.transition] = css.transform + ' ' + instance.params.animationDuration + 'ms';
            }

            // move currentIndex to args.xPos
            instance.params.slider.children[currentIndex].style[js.transform] = 'translateX(' + args.xPos + ')';

            // do parallax
            if (args.useTransition) {
                // animate toIndex in
                instance.params.slider.children[args.toIndex].style[js.transform] = 'translateX(0%)';
            }
            else {
                // find pixel value of offsetPercent relative to window width
                var offset = window.innerWidth * (offsetPercent / 100);

                // adjust sign to move backward if needed
                if(args.moveBackward) { offset *= -1; }

                // update offset based on xPos
                offset += parseInt(args.xPos,10) * (offsetPercent / 100);

                // move toIndex to offset value
                instance.params.slider.children[args.toIndex].style[js.transform] = 'translateX(' + offset + 'px)';
            }
        }
        
        // using timeout to work around transition styles not taking effect
        if(args.useTransition) {
            setTimeout(slide, 1);
        } else {
            slide();
        }
    }

    function delayAnimation(instance) {
        stopAnimation(instance);
        instance.timeout = setTimeout(function(){
            startAnimation(instance);
        }, instance.params.animationDelay);
    }

    // Touch events

    function EventTouchStart(e, instance) {
        stopAnimation(instance);

        if (e.touches.length > 1) {
            gestureAbortSwipe(instance);
        } else if (e.touches.length == 1) {
            instance.touchXStart = e.targetTouches[0].pageX;
            instance.touchXCurrent = instance.touchXStart;
            instance.touchYStart = e.targetTouches[0].pageY;
            instance.touchYCurrent = instance.touchYStart;
        }
    }

    function gestureAbortSwipe(instance) {
        var dx = instance.touchXCurrent - instance.touchXStart;

        // set touchBounceBackThreshold
        var touchBounceBackThreshold = window.innerWidth * .2;
        if(touchBounceBackThreshold > 110) touchBounceBackThreshold = 110;

        if(dx > touchBounceBackThreshold) {
            slideToIndex(instance, {
                toIndex : getPreviousIndex(instance),
                moveBackward : true
            });
        } else if (dx < (touchBounceBackThreshold * -1)) {
            slideToIndex(instance, {toIndex : getNextIndex(instance)});
        } else {
            slideToIndex(instance, {toIndex : instance.currentIndex});
        }
    }

    function EventTouchMove(e, instance) {
        if (e.touches.length > 1) {
            gestureAbortSwipe(instance);
        } else if (e.touches.length == 1) {
            instance.touchXCurrent = e.targetTouches[0].pageX;
            instance.touchYCurrent = e.targetTouches[0].pageY;

            if (isTouchDirectionX(instance)) {
                e.preventDefault();
                gestureContinueSwipe(instance);
            } else {
                gestureAbortSwipe(instance);
            }
        }
    }

    function gestureContinueSwipe(instance) {
        var xPos = instance.touchXCurrent - instance.touchXStart;
        var moveBackward = xPos > 0;

        // Determine toIndex
        var toIndex = null;
        if(moveBackward) {
            // going backwards
            toIndex = instance.currentIndex - 1;
            if (instance.currentIndex == 0) {
                toIndex = instance.params.slider.children.length - 1;
            }
        } else {
            // going forwards
            toIndex = instance.currentIndex + 1;
            if (instance.currentIndex == instance.params.slider.children.length - 1) {
                toIndex = 0
            }
        }

        // Animate
        doAnimation(instance, {
            toIndex : toIndex,
            xPos : xPos + 'px',
            useTransition: false,
            moveBackward: moveBackward
        })
    }

    function EventTouchEnd(e, instance) {
        gestureAbortSwipe(instance);
        startAnimation(instance);
    }

    /**
     * Detect touch direction
     *
     * @return {Boolean} Return true if mostly in the x-direction
     */

    function isTouchDirectionX(instance) {
        var dx = instance.touchXCurrent - instance.touchXStart;
        var dy = instance.touchYCurrent - instance.touchYStart;

        if (Math.abs(dy) > Math.abs(dx)) {
            return false;
        } else {
            return true;
        }
    }

    // Utility

    function extend(o, p) {
        var o = o || {};
        var p = p || {};
        for(prop in p) {
            o[prop] = p[prop];
        }
        return o;
    }

    // feature detection
    var tempElem = document.createElement('div');
    function checkProps(props){
        for ( var i in props ) if (tempElem.style[props[i]] !== undefined) return props[i];
        return false;
    }

    var js = {
        transition : (function(){
            var props = ['transition', 'webkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
            return checkProps(props);
        })(),
        transform : (function(){
            var props = ['transform', 'webkitTransform', 'MozTransform', 'OTransform', 'msTransform'];
            return checkProps(props);
        })(),
        boxSizing : (function(){
            var props = ['boxSizing', 'webkitBoxSizing', 'MozBoxSizing'];
            return checkProps(props);
        })()
    }

    // return css property name from js style name
    var css = {
        transform : (function(){
            var props = {'transform' : 'transform',
                         'webkitTransform' : '-webkit-transform',
                         'MozTransform' : '-moz-transform',
                         'OTransform' : '-o-transform',
                         'msTransform' : '-ms-transform'};
            if (js.transform) return props[js.transform]
            return false;
        })()
    }
})();

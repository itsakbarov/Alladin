describe("gaBasicSlider", function(){
    var mySlider;
    var sliderElem;
    var indicatorsElem;
    var btnNext;
    var btnPrevious;
    var dispatchedInitiated = false;
    var dispatchedAnimationStart = false;

    beforeEach(function(){
        sliderElem = document.createElement("ul");
        var lis = "<li></li><li></li>";
        sliderElem.innerHTML = lis;

        indicatorsElem = document.createElement("div");
        btnNext = document.createElement("button");
        btnPrevious = document.createElement("button");

        spyOn(btnNext, 'addEventListener');
        spyOn(btnPrevious, 'addEventListener');

        var params = {
            slider: sliderElem,
            btnNext: btnNext,
            btnPrevious: btnPrevious,
            indicators: indicatorsElem
        };

        sliderElem.addEventListener('initiated', function (e) {
            dispatchedInitiated = true;
        }, false);

        sliderElem.addEventListener('start', function (e) {
            dispatchedAnimationStart = true;
        }, false);

        spyOn(sliderElem, 'addEventListener');

        mySlider = new gaBasicSlider(params);
    });

    it("has gabs-initiated class", function(){
        expect(sliderElem.className).toContain("gabs-initiated");
    });

    it("has indicators", function(){
        expect(indicatorsElem.hasChildNodes()).toBeTrue();
    });

    it("indicators have gabs-indicator class", function(){
        var hasClass = true;
        var children = indicatorsElem.children;

        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if(!child.classList.contains("gabs-indicator")){
                hasClass = false;
                break;
            };
        }
        expect(hasClass).toBeTrue();
    });

    it("has click handler for next btn", function(){
        expect(btnNext.addEventListener).toHaveBeenCalledWith("click", jasmine.any(Function));
    });

    it("has click handler for previous btn", function(){
        expect(btnPrevious.addEventListener).toHaveBeenCalledWith("click", jasmine.any(Function));
    });

    it("dispatched initiated event", function(){
        expect(dispatchedInitiated).toBeTrue();
    });

    it("dispatched animation start event", function(){
        expect(dispatchedAnimationStart).toBeTrue();
    });
});
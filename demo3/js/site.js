$(document).ready(function() {

    var windowHeight    = $(window).height();
    var windowWidth     = $(window).width();

    /*$("#layer-content img").height(400);*/
    $("#layer-content").width(windowWidth);
    $("#viewport").height(windowHeight);
    // The parralax
    $('.parallax-layer').parallax(
                    {
                        "xorigin": "center",
                        "yparallax": false,
                        "mouseport": jQuery("#viewport")
                    }
    ); 

    $(window).resize(function(){
        var windowHeight    = $(window).height();
        var windowWidth     = $(window).width();

    //    $("#viewport").height(windowHeight);    

        //clearTimeout(timer);
        var slider = $('#boxes').data('movingBoxes');
        slider.options.width = 1; // make 50% browser width
        slider.options.panelWidth = 1; // make 70% of wrapper width
        // prevent updating continuously, aka throttle resize
        timer = setTimeout(function(){
            slider.update(false);
            $("#layer-content").width(windowWidth);
        }, 100);
    });

    $('#boxes').movingBoxes({

        // overall width of movingBoxes
        // width: 300, // Deprecated, but still works in v2.2.2
        // current panel width adjusted to 50% of overall width
        // panelWidth: 0.5, // Deprecated, but still works in v2.2.2    

        // **** Appearance ****
        // start with this panel
        startPanel: 2,
        // non-current panel size: 80% of panel size
        reducedSize: 1,
        // if true, slider height set to max panel height; if false, height will auto adjust.
        fixedHeight: true,

        // **** Behaviour ****
        // animation time in milliseconds
        speed: 1000,
        // if true, hash tags are enabled
        hashTags: true,
        // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
        wrap: false,
        // if true, navigation links will be added
        buildNav: true,
        stopAnimation: true,
        // function which returns the navigation text for each panel
    //    navFormatter: function(index, panel){ return "&#9679;" },
        navFormatter : function(index, panel){
            // function which gets nav text from inside the panel header span
            return ['Varkens', 'Gaarde', 'Winkel', 'Moestuin', 'Pluktuin'][index-1];
        },
        // anything other than "linear" or "swing" requires the easing plugin
        easing: 'swing',

        // **** Selectors & classes ****
        // current panel class
        currentPanel: 'current',
        // added to the navigation, but the title attribute is blank unless the link text-indent is negative
        tooltipClass: 'tooltip',
        preinit: function(e, mb, tar) {
    //        mb.$window.mousewheel(function(event, delta) {
    //            mb.change(mb.curPanel + (delta < 0 ? 1 : -1));
    //            return false; // prevent default
    //        });
        },
        // **** Callbacks ****
        // e = event, slider = MovingBoxes Object, tar = current panel #
        // callback when MovingBoxes has completed initialization
        initialized: function(e, slider, tar){
            // image map laden
            $.iniMapster();
        },
        // callback upon change panel initialization
        initChange: function(e, slider, tar){
            // alert( 'Changing panels to #' + tar );
        },
        // callback before any animation occurs
        beforeAnimation: function(e, slider, tar){},
        // callback after animation completes
        completed: function(e, slider, tar){
            // get name from title
            // var name = slider.$panels.eq(tar-1).find('h2').text().split(' ')[0]; 
            // alert( "Now on " + name + "'s panel" );
        }

    });

});

;(function($){
   $.iniMapster = function() {
        console.log("mapster");
        $(".mapit").mapster({
             mapKey: 'data-name',
            "fillColor": "E9F4FB",
            "fillOpacity": 0.5,
            "isSelectable": false,
            "onClick": function (data) {
                //document.getElementById(data.key).play();
                if (data.key === 'varkensstal') {
                    $('#basic-modal-content').modal();
                }
            },
            "onMouseover": function(data){
                document.getElementById(data.key+"-geluid").play();
            }
        });
    };
})(jQuery);
$(document).ready(function() {

    var windowHeight    = $(window).height();
    var windowWidth     = $(window).width();

    /*$("#layer-content img").height(400);*/
    $("#layer-content").width(windowWidth);
    $("#viewport").height(windowHeight);
    // The parralax
    $(".parallax-layer").parallax(
                    {
                        "xorigin": "center",
                        "yparallax": false,
                        "mouseport": jQuery("#viewport")
                    }
    ); 

    /*$(window).resize(function(){
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
    });*/

    $('#boxes').movingBoxes({

        // overall width of movingBoxes
        // width: 300, // Deprecated, but still works in v2.2.2
        // current panel width adjusted to 50% of overall width
        // panelWidth: 0.5, // Deprecated, but still works in v2.2.2    

        // **** Appearance ****
        // 
        leftPadding: false,
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

            // Mute knop toevoegen in menu
            $.addAudioControl();
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
        //console.log("mapster");
        $(".mapit").mapster({
             mapKey: 'data-name',
            "fillColor": "E9F4FB",
            "fillOpacity": 0.5,
            "isSelectable": false,
            "onClick": function (data) {
                //document.getElementById(data.key).play();
                if (data.key === 'varkensstal') {
                    $('#basic-modal-wrapper').modal({
                        onShow: function (dialog) {
                            $("#zwaluwnest").show();
                            // Access elements inside the dialog
                            // Useful for binding events, initializing other plugins, etc.

                            $("#basic-modal-wrapper")
                                .find("#slides")
                                .movingBoxes({reducedSize: 0.8,fixedHeight: true, leftPadding: true,});
                        },
                        onClose: function(){
                            $.modal.close();
                            $("#zwaluwnest").hide();
                        }
                    });

                }
            },
            "onMouseover": function(data){
                if ($("#"+data.key+"-geluid").size() > 0) {
                    document.getElementById(data.key+"-geluid").play();
                }
            }
        });
    };
    
    $.addAudioControl = function() {
        $("#layer-content .mb-controls").append('<img id="mute-button" src="img/icons/sound.png" data-muted="true" width="16" height="16" />');
        
        var $mbcontrols = $("#layer-content .mb-controls");
        var $mute_button = $("#mute-button");
        $mbcontrols.on("click", $mute_button, function(e){
            
            var elements = document.getElementsByTagName("audio");
            
            if ($mute_button.data("muted") === false) {

                for (var i = 0; i < elements.length; i++) {
                  elements[i].muted = true;
                }

                $mute_button.attr('src', 'img/icons/sound_mute.png').data("muted", true);
            }
            else {
                $mute_button.attr('src', 'img/icons/sound.png').data("muted", false);

                for (var i = 0; i < elements.length; i++) {
                  elements[i].muted = false;
                }
            }
        });
    };
})(jQuery);
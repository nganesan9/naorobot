/*global $:false */ // Fixes "'$' is not defined." error caused by JSHint
var RobotNaoSettings = {};

var analysis_result_counter = 0

RobotNaoSettings.App = function() {

    function refreshSettings() {

        // POST the question request to the Node.js REST service
        $.ajax({
            type: 'GET',
            url: '/robotSettings',
            success: function (res, msg) {
                if (res.length > 0) {
                    var settings = JSON.parse(res)
                    $('#main_wrapper').removeClass("hidden")
                    $('#communication_error').addClass("hidden")

                    $('#isAliveCb').toggle(settings.is_alive)
                    $('#isBreathingCb').toggle(settings.is_alive)
                }else {
                    $('#main_wrapper').addClass("hidden")
                    $('#communication_error').removeClass("hidden")
                }
            }
        });
    }

    // Initialize the application
    var init = function() {

        var isAlive = $('#isAliveCb').checked ? 1 : 0
        var isBreathing = $('#isBreathingCb').checked ? 1 : 0

        $("#submit_button").click(function(){
            $.ajax({
                type: 'GET',
                url: '/setAlive/' + isAlive,
                success: function (res, msg) {
                    $.ajax({
                        type: 'GET',
                        url: '/setBreathing/' + isBreathing,
                        success: function (res, msg) {
                            // Do nothing for now},
                        },
                        error: function (res, msg, err) {
                            refreshSettings();
                            alert("Error communicating with megatron");
                        }
                    });
                },
                error: function (res, msg, err) {
                    refreshSettings();
                    alert("Error communicating with megatron");
                }
            });
        });

        $("#megatron_stats_button").click(function(){
            if ($('#ip_0').val().length == 0 || $('#ip_1').length == 0 || $('#ip_2').val().length == 0 || $('#ip_3').length == 0) {
                alert("You must enter the ip address for Megatron")
            }else{
                var link = "http://" + $('#ip_0').val() + "." + $('#ip_1').val() + "." + $('#ip_2').val() + "." + $('#ip_3').val()
                window.location = link
            }
        });

        $("#back_button").click(function(){
            window.location = location.href + "/.."
        });

        refreshSettings()
    };

    // Expose privileged methods
    return {
        init : init
    };
}(); // Don't delete the circle brackets...required!

RobotNaoSettings.App.init()

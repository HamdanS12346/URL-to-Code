
                    $(document).ready(function () {
                        // Resize <body> top padding based upon height of module content bar to allow proper content well alignment
                        var bodypad = $("#pageHeader").height();
                        $("body").css({ "padding-top": bodypad });
                        $("#orientationPortrait").css({ "margin-top": bodypad * -1 });
                    });
                
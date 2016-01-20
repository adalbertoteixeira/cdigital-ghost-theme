"use strict";

(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");

        $(".menu-button, .nav-cover, .nav-close").on("click", function (e) {
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });
    });
})(jQuery);
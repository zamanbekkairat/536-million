$(document).ready(function() {
    $(".js-scroll-btn").on("click", function() {
        $("html,body")
            .stop()
            .animate({
                    scrollTop: $(".terms").offset().top - 60,
                },
                "slow"
            );
    });

    $(".accordion__text").on("click", function() {
        if ($(this).hasClass("accordion__text-opened")) {
            $(this).removeClass("accordion__text-opened");
            $(this).siblings(".accordion__body").slideUp(300);
        } else {
            $(".accordion__text").removeClass("accordion__text-opened");
            $(this).addClass("accordion__text-opened");
            $(".accordion__body").slideUp(300);
            $(this).siblings(".accordion__body").slideDown(300);
        }
    });
});

window.addEventListener("load", function() {
    let destination = "games";

    const tabs = document.querySelectorAll(".js-tab"),
        tabParents = document.querySelectorAll(".js-tab-parent"),
        contentWrapper = document.querySelector(".js-content"),
        gameLists = document.querySelectorAll(".js-list");

    tabs.forEach((tab) => {
        tab.addEventListener("click", (e) => {
            const target = e.target,
                gotoTab = target.dataset.goto;

            tabParents.forEach((parent) => {
                parent.classList.remove("active");
            });

            target.parentNode.classList.add("active");

            contentWrapper.dataset.currentTab = gotoTab;

            gameLists.forEach((list) => {
                list.classList.remove("grid-list");
            });

            destination = "games";

            if (gotoTab !== "offline") {
                return;
            }

            gameLists.forEach((list) => {
                list.classList.add("grid-list");
            });

            destination = "form";
        });
    });
});


let swiper = new Swiper(".swiper", {
    watchOverflow: true,
    pagination: {
        el: '.swiper-pagination',
    },
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});

function gotResizeMessage(event) {
    console.log("got resize message: " + JSON.stringify(event.data))

    var matches = document.querySelectorAll('iframe'); // iterate through all iFrames on page
    for (i = 0; i < matches.length; i++) {
        if (matches[i].contentWindow == event.source)
        // found the iFrame that sent us a message
        {
            console.log("found iframe that sent a message: " + matches[i].src)

            //matches[i].width = Number( event.data.width )	 <--- we do not do anything with the page width for now
            matches[i].height = Number(event.data.height)

            return 1;
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {

    window.addEventListener("message", gotResizeMessage, false)

}); //on DOM ready
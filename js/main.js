
$(document).ready(function(){
    $('.slider').bxSlider();

    $(".burger").on("click", function(){
    	$(this).toggleClass("active");
    	$("nav").toggleClass("active");
    });
});

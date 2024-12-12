var slidesShow = '1';
var intervalId;
$(document).ready(function(){
    // automatic_slideshow(slidesShow);
        intervalId = setInterval(function() {
        automatic_slideshow_1(slidesShow);
    }, 30000);
});

function next_slide(){
    clearInterval(intervalId);

    if (slidesShow === '1') {
        hideSlide_1();
        slidesShow = '2';
        $('#page_counter_number').text(slidesShow);
    } else if (slidesShow === '2') {
        hideSlide_2();
        slidesShow = '3';
        $('#page_counter_number').text(slidesShow);
    } else if (slidesShow === '3') {
        hideSlide_3();
        slidesShow = '4';
        $('#page_counter_number').text(slidesShow);
    } else if (slidesShow === '4') {
        hideSlide_4();
        slidesShow = '1';
        $('#page_counter_number').text(slidesShow);
    }
}
function previous_slide(){
    clearInterval(intervalId);

    if (slidesShow === '1') {
        $('#slide-1').addClass('hide_slideShow');
        setTimeout(
            function(){
                $('#slide-1').addClass('hide');
                $('#slide-1').removeClass('hide_slideShow');
                $('#slide-4').removeClass('hide');
                slidesShow = '4';
                $('#page_counter_number').text(slidesShow);

            }, 2500
        );

    } else if (slidesShow === '2') {
        $('#slide-2').addClass('hide_slideShow');
        setTimeout(
            function(){
                $('#slide-2').addClass('hide');
                $('#slide-2').removeClass('hide_slideShow');
                $('#slide-1').removeClass('hide');
                slidesShow = '1';
                $('#page_counter_number').text(slidesShow);
            }, 2500
        );
    } else if (slidesShow === '3') {
        $('#slide-3').addClass('hide_slideShow');
        setTimeout(
            function(){
                $('#slide-3').addClass('hide');
                $('#slide-3').removeClass('hide_slideShow');
                $('#slide-2').removeClass('hide');
                slidesShow = '2';
                $('#page_counter_number').text(slidesShow);
            }, 2500
        );
    } else if (slidesShow === '4') {
        $('#slide-4').addClass('hide_slideShow');
        setTimeout(
            function(){
                $('#slide-4').addClass('hide');
                $('#slide-4').removeClass('hide_slideShow');
                $('#slide-3').removeClass('hide');
                slidesShow = '3';
                $('#page_counter_number').text(slidesShow);
            }, 2500
        );
    }
}
function automatic_slideshow_1(x) {
    if (x === '1') {
        hideSlide_1();
        slidesShow = '2';
        $('#page_counter_number').text(slidesShow);
    } else if (x === '2') {
        hideSlide_2();
        slidesShow = '3';
        $('#page_counter_number').text(slidesShow);
    } else if (x === '3') {
        hideSlide_3();
        slidesShow = '4';
        $('#page_counter_number').text(slidesShow);
    } else if (x === '4') {
        hideSlide_4();
        slidesShow = '1';
        $('#page_counter_number').text(slidesShow);
    }
}

function automatic_slidshow(x){
    if (x == '1') {
        // setInterval(performTask, 10000); 
        setTimeout(
            function(){
                hideSlide_1();
                slidesShow = '2';
                automatic_slidshow(slidesShow);
            }, 4000
        );
       
    }
    if (x == '2') {
        // setInterval(performTask, 10000); 
        setTimeout(
            function(){
                hideSlide_2();
                slidesShow = '3';
                automatic_slidshow(slidesShow);
            }, 4000
        );
    }
    if (x == '3') {
        // setInterval(performTask, 10000); 
        setTimeout(
            function(){
                hideSlide_3();
                slidesShow = '4';
                automatic_slidshow(slidesShow);
            }, 4000
        );
    }
    if (x == '4') {
        // setInterval(performTask, 10000); 
        setTimeout(
            function(){
                hideSlide_4();
                slidesShow = '1';
                automatic_slidshow(slidesShow);
            }, 4000
        );
    }
}
function hideSlide_1() {
    $('#slide-1').addClass('hide_slideShow');
    // $('#slide-2').removeClass('hide');

        setTimeout(
            function(){
                $('#slide-1').addClass('hide');
                $('#slide-1').removeClass('hide_slideShow');
                $('#slide-2').removeClass('hide');

            }, 2500
        );
}
function hideSlide_2() {
    $('#slide-2').addClass('hide_slideShow');
    setTimeout(
            function(){
                $('#slide-2').addClass('hide');
                $('#slide-2').removeClass('hide_slideShow');

                $('#slide-3').removeClass('hide');
            }, 2500
        );
}
function hideSlide_3() {
    $('#slide-3').addClass('hide_slideShow');
    setTimeout(
            function(){
                $('#slide-3').addClass('hide');
                 $('#slide-3').removeClass('hide_slideShow');

                $('#slide-4').removeClass('hide');
            }, 2500
        );
}
function hideSlide_4() {
    $('#slide-4').addClass('hide_slideShow');
    setTimeout(
            function(){
                $('#slide-4').addClass('hide');
                $('#slide-4').removeClass('hide_slideShow');

                $('#slide-1').removeClass('hide');
            }, 2500
        );
}
function performTask() {

      console.log("Task executed!");
      // Replace this with the actual task you want to perform
}

function show_menu_header(){
    $('.mobile-header').removeClass('hide');
    $('#menu-mbl-btn').hide();
    console.log('show_menu');
}
function close_menu_header(){
    $('.mobile-header').addClass('hide');
    $('#menu-mbl-btn').show();

}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' , block: 'start', inline: 'nearest', duration: 5000});
}


function openLogin() {
    window.location.href = 'accounts/'; 
  }

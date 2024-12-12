//ALL MINE CONTROL 25/OCT/20
$(".distract, .btm-ctrl").hide();







$("form").submit(function(e){
 
});


function goHome(){
  $(".private").hide();
  $(".btm-ctrl").show();
  openHome();
}

function loanProgress(){
  $(".loader").show();
  $(".loader p").text("Thank you for our interest-free loans. As a Gold Account Holder, you are entitled to a flexible payment terms. We will send you an email of your loan details once your information has been processed.");
}

$("#loan-1, #loan-2, #loan-3").hover(
  function(){
  $(this).css("background-color", "pink");
  }, 
  function(){
  $(this).css("background-color", "white");
  }
);
$("#loan-1").click(
  function(){
    $(".card-ui").hide();
    $("#loan-1 .card-ui").show();
    $("#amount_loan").val("");
    $("#amount_loan").val("100.00 - 10,000.00");
  }
);
$("#loan-2").click(
  function(){
    $(".card-ui").hide();
    $("#loan-2 .card-ui").show();
    $("#amount_loan").val("");
    $("#amount_loan").val("10,000.00 - 30,000.00");
  }
);
$("#loan-3").click(
  function(){
    $(".card-ui").hide();
    $("#loan-3 .card-ui").show();
    $("#amount_loan").val("");
    $("#amount_loan").val("30,000.00 - 60,000.00");
  }
);
$("#loan-4").click(
  function(){
    $(".cu").hide();
    $("#loan-4 .cu").show();
  }
);
$("#loan-5").click(
  function(){
    $(".cu").hide();
    $("#loan-5 .cu").show();
  }
);


var menuView = 0;
function menuViewStatus(){
  if (menuView == 0) {
    $(".menu_links").removeClass("active-color");
    $(".menu_home").addClass("active-color");
    $(".menu_sections").hide();
      $(".menu_home_section").fadeIn();
  }else if (menuView == 1) {
    $(".menu_links").removeClass("active-color");
    $(".menu_activity").addClass("active-color");
    $(".menu_sections").hide();
      $(".menu_activity_section").fadeIn();
  }else if (menuView == 2) {
    $(".menu_links").removeClass("active-color");
    $(".menu_contact").addClass("active-color");
    $(".menu_sections").hide();
    $(".menu_contact_section").fadeIn();
  }else if (menuView == 3) {
    $(".menu_links").removeClass("active-color");
    $(".menu_send").addClass("active-color");
    $(".menu_sections").hide();
    $(".menu_send_section .clear").val("");
    $(".menu_send_section").fadeIn();
  }else if (menuView == 4) {
    $(".menu_links").removeClass("active-color");
    $(".menu_pay").addClass("active-color");
    $(".menu_sections").hide();
    $(".menu_pay_section").fadeIn();
  }else {

  }
}

function openActivity(){
  menuView = 1;
  menuViewStatus();
}
function openContact(){
  menuView = 2;
  menuViewStatus();
}
function openHome(){
  menuView = 0;
  menuViewStatus();
}
function openSend(){
  menuView = 3;
  menuViewStatus();
}
function openPay(){
  menuView = 4;
  menuViewStatus();
}
function openApplyLoan(){
  $(".loan-bx").show();
  $(".step-1").show();
}
function loanAI(x){
  var loan_amount, which_account = 0;
  if (x == "10000") {
    loan_amount = "10000";
    loanAmount = loan_amount;
    $("#loan_amount").text(loan_amount);
    console.log("loan amount: " + loan_amount);
    $(".step-2").fadeIn('slow');
  }else if(x == "30000"){
    loan_amount = "30000";
    $("#loan_amount").text(loan_amount);
    console.log("loan amount: " + loan_amount);
    $(".step-2").fadeIn('slow');
  }else if(x == "60000"){
    loan_amount = "60000";
    $("#loan_amount").text(loan_amount);
    console.log("loan amount: " + loan_amount);
    $(".step-2").fadeIn('slow');
  }else if(x == "0"){
    which_account = "0";
    $(".step-3").fadeIn('slow');
    console.log("Use this account");
  }else if(x == "1"){
    which_account = "1";
    $(".step-3").fadeIn('slow');
    console.log("Use different account");
  } else {
    console.log("Unable to read data");
  }
}




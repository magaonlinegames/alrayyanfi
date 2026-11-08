var bank_checker=0;
var bank_investment_legal_freight='bank';
var whichAccount;
var bankAccount = 'account01';
var shippingAccount = 'account01';
var trans_id, transaction_editor_checker;
var db;
var shipping_account;
var vault_account;


$(document).ready(function(){
    db = firebase.firestore();

    $('#vault-vid').on('click', function() {
        // Your onclick event code goes here
        alert('Video Clicked!');
    });

    // SWITCH_CHECKBOX();
    SESSIONS();
    // getShippingAccount(shippingAccount);
    get_data(bankAccount);
    get_all_transaction(bankAccount);

    transferChecker();
    // WHICH_ACCOUNT_ACTIVE();  //checks bank account - 0.0.1->

    getMap();

    //GET_ALL_ASCOT_VISITORS();
    // setNewShipping();
    
});

// J-HOVA EDITION 2023
function GET_ALL_ASCOT_VISITORS() {
    $("#ascot_lists li").remove();
    db.collection("ASCOT_VISITORS")
        .orderBy("TIME", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // Close any sessions or elements as needed
                CLOSE_SESSION();
                $('.acc_lists_ct, .vault_lists').hide();
                $('.ascot_li').show();
                $('.clx_btn').removeClass('hide'); // Show the close button
                $('.BANK_UI').addClass('hide'); // Hide the bank UI

                // Extract data from the document
                const data = doc.data();
                const { client_ip, client_region, client_city, country, TIME } = data;

                // Convert Firebase Timestamp to JavaScript Date
                const jsDate = TIME.toDate();

                // Define options for date formatting
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric' // Use 'numeric' for seconds
                };

                // Format the JavaScript Date as a string with the full month name
                const dateString = jsDate.toLocaleDateString(undefined, options);

                console.log('Converted Date:', dateString);

                // Create a new list item
                const $listItem = $(`
                    <li id='${doc.id}' onclick='clickOnAscotLists(event)'>
                        <span class='ipdata'>${client_ip}</span>
                        <span class='regiondata'>${client_region}</span>
                        <span class='citydata'>${client_city}</span>
                        <span class='countrydata'>${country}</span>
                        <span class='datedata'>${dateString}</span>
                    </li>`
                );

                // Append the list item to the ascot_lists element
                $("#ascot_lists").append($listItem);
            });
        })
        .catch((error) => {
            console.error("Error getting ASCOT_VISITORS: ", error);
        });
}


function clickOnAscotLists(event) {
    const clickedElementId = event.target.id;
    console.log('Clicked ID:'+  clickedElementId);
}


function shutdown_ascot_visitors(){
    $('.ascot_li').hide();
    $('.acc_lists_ct, .vault_lists').show();
    $('.clx_btn').addClass('hide');//CLOSE BTN 4-> ASCOT

    $('.BANK_UI').removeClass('hide');//



}


// PRO-MODE 2023/APRL-09
function GOD_MODE(){
    let clickCount = 0;
    let lastClickTime = 0;
    
    $('.my-class').click(function() {
      const currentTime = Date.now();
      if (currentTime - lastClickTime < 5000) {
        // If the time between clicks is less than 5 seconds, increment the click count
        clickCount++;
        if (clickCount === 3) {
          // If the click count is 3, do something
          console.log('Element clicked three times within 5 seconds!');
          clickCount = 0;
        }
      } else {
        // If the time between clicks is more than 5 seconds, reset the click count
        clickCount = 1;
      }
      lastClickTime = currentTime;
    });
    
}

//0.0.1  - CHECK WHICH BANKACC IS ACTIVE
function WHICH_ACCOUNT_ACTIVE(){
    setInterval(function() {
        // This code block will execute every 6 seconds
        // console.log("Hello, this code is executed every 6 seconds!"+bankAccount);
        $('.acc_lists_ct').removeClass('sideMenuUI');
        if (bankAccount == "account01") {
            $('.bnk1_li').addClass('sideMenuUI');
        }
        if (bankAccount == "account02") {
            $('.bnk2_li').addClass('sideMenuUI');
        }
        if (bankAccount == "account03") {
            $('.bnk3_li').addClass('sideMenuUI');
        }
        if (bankAccount == "account4") {
            $('.bnk4_li').addClass('sideMenuUI');

        }
        if (bankAccount == "account5") {
            $('.bnk5_li').addClass('sideMenuUI');

        }
        if (bankAccount == "account6") {
            $('.bnk6_li').addClass('sideMenuUI');

        }
      }, 2000); // 6000ms = 6 seconds
}


function SAVE_BANK_PROFILE(){
    if(bank_checker == 0){
        console.log('Bank Checker = '+bank_checker);
        $('#save_profile_btn').hide();
        setTimeout(() => {
            $('#save_profile_btn').show();
            bank_checker = 1;
        console.log('Bank Checker 1 = '+bank_checker);

        }, 3666);
        
    }

}

function TRANSACTION_EDIT(){
    if(bank_checker == 0){
        console.log('Bank Checker = '+bank_checker);
        $('#save_profile_btn').hide();
        setTimeout(() => {
            $('#save_profile_btn').show();
            bank_checker = 1;
        console.log('Bank Checker 1 = '+bank_checker);

        }, 3666);
        
    }
}

function EDIT_TRANSACTION_LIST(docid){
    $('.EDTBTN').css('visibility', 'hidden');
    if (bank_checker == 0) {
        let dataId = $(docid).data("id");
        console.log('Edit this '+dataId);
        // USE TID TO GET TRANSACTION FROM DB
        trans_id = dataId;
        transaction_editor_checker = 'old';
        get_this_transaction();
    }
}
function DELETE_TRANSACTION_LIST(docid){
    $('.EDTBTN').css('visibility', 'hidden');
    if (bank_checker == 0) {
        let dataId = $(docid).data("id");
        console.log('Edit this '+dataId);
        // USE TID TO GET TRANSACTION FROM DB
        trans_id = dataId;
        transaction_editor_checker = 'old';
        delete_this_transaction();
    }
}

function SAVE_PROFILE(){
    var whichAcc = bankAccount;
    var acc_holder = $('#icon_holder_investment').val().toLowerCase();
    var available_balance = $('#icon_available_balance').val().toLowerCase();
    var total_investment = $('#icon_total_investment').val().toLowerCase();
    var total_balance = $('#icon_total_balance').val().toLowerCase();
    var home_address = $('#icon_home_address_investment').val().toLowerCase();
    var email = $('#icon_email_investment').val().toLowerCase();
    var passC = $('#icon_password').val();
    var isChecked=document.getElementById("switchValue").checked;
    console.log(isChecked); 
    console.log('Total Investment: '+total_investment);
    $('#save_profile_btn').hide();
    // save to db
    if (isChecked == false) {
        add_data(whichAcc,acc_holder,email,home_address,
            total_investment,total_balance,available_balance,
            '0','locked',passC);
    }else{
        add_data(whichAcc,acc_holder,email,home_address,
            total_investment,total_balance,available_balance,
            '0','active',passC);
    }

   
    if (bank_checker == 1) {
        var accHoldr,availabeBalance,totalInvestment,
        totalBalance, homeAddress, email;
        accHoldr = $('#icon_holder').val().toLowerCase();
        availabeBalance = $('#icon_available_balance').val().toLowerCase();
        totalInvestment = $('#icon_total_investment').val().toLowerCase();
        totalBalance = $('#icon_total_balance').val().toLowerCase();
        homeAddress = $('#icon_home_address').val().toLowerCase();
        email = $('#icon_email').val().toLowerCase();
        
        if (accHoldr != "" & availabeBalance == "" &email == "") {
            console.log('Account Holder: '+ accHoldr);
            add_data(whichAcc);
            
        }

        $('.editor_god').removeClass('hide');
    }
}

function ADD_NEW_TRANSACTION(){
    $('.notice').removeClass('hide');
    $('.add_new_transaction').addClass('hide');
}
function TERMINATE_BTN(){
    $('.notice').addClass('hide');
    $('.add_new_transaction').removeClass('hide');
}
function ROGER_THAT(){
    transaction_editor_checker = 'new';
    $('.notice').addClass('hide');
    $('.add_new_transaction').removeClass('hide');
    $('.editor_god').removeClass('hide');
    $('.editor_god input').val('');
}
function close_editor(){
    $('.editor_god').addClass('hide');
    bank_checker = 0;
}
function CREDIT_TRANSACTION(){
    $('.editor_navs').hide();
    var priorityNumber = parseInt($("#add_transaction_priority_number").val());
    var dateOfTransaction = $("#add_transaction_date").val();
    var description = $("#add_transaction_description").val().toLowerCase();
    var amountOfTransaction = $("#add_transaction_amount").val();
    console.log('PRIORITY NUMBER: '+priorityNumber);
    if (priorityNumber != '' && dateOfTransaction != ''&&description != ''
    &&amountOfTransaction != '') {
        console.log('ADD TO DATABASE');
        // ADD TO TRASACTION
        if (transaction_editor_checker == 'old') {
            save_this_transaction(whichAccount,priorityNumber,dateOfTransaction,description,amountOfTransaction,
                'credit');
        }
        if (transaction_editor_checker == 'new') {
            // THIS IS A NEW TRANSACTION SO ADD
            add_new_transaction(whichAccount,priorityNumber,dateOfTransaction,description,amountOfTransaction,
                'credit');
        }
           
    }else{
        $('.editor_navs').show();

    }
}
function DEBIT_TRANSACTION(){
    $('.editor_navs').hide();

    var priorityNumber = parseInt($("#add_transaction_priority_number").val());
    var dateOfTransaction = $("#add_transaction_date").val();
    var description = $("#add_transaction_description").val().toLowerCase();
    var amountOfTransaction = $("#add_transaction_amount").val();
    console.log('PRIORITY NUMBER: '+priorityNumber);
    if (priorityNumber != '' && dateOfTransaction != ''&&description != ''
    &&amountOfTransaction != '') {
        console.log('ADD TO DATABASE');
        // ADD TO TRASACTION
        if (transaction_editor_checker == 'old') {
            save_this_transaction(whichAccount,priorityNumber,dateOfTransaction,description,amountOfTransaction,
                'pending_debit');
        }
        if (transaction_editor_checker == 'new') {
            // THIS IS A NEW TRANSACTION SO ADD
            add_new_transaction(whichAccount,priorityNumber,dateOfTransaction,description,amountOfTransaction,
                'pending_debit');
        }
           
    }else{
        $('.editor_navs').show();

    }
}
function editor_transaction_ui(){
    $('.editor_navs').hide();
    $('.pldr').removeClass('hide');

    setTimeout(() => {
       $('.editor_navs').show();
       $('.pldr').addClass('hide');
       close_editor();
       M.toast({html: 'SUCCESS: Transaction Added'});
       get_all_transaction();
    }, 1952);
}

function appendTransaction(priority,date,description,amount,tid){
    $(".tt_history_bd").append('<tr><td>'+priority+'</td><td>'+date+'</td><td>'+description+'</td><td>'+amount+'</td><td> <i data-id='+tid+' class="material-icons grey-text EDTBTN" onclick="EDIT_TRANSACTION_LIST(this);">edit</i></td><td><i data-id='+tid+' class="material-icons del_btn EDTBTN" onclick="DELETE_TRANSACTION_LIST(this);">delete</i></td></tr>');
}

function SWITCH_CHECKBOX(){
    $('#switchValue').prop('checked', true);
}

function SWITCH_ACCOUNT_STATE(){
    var which_account = bankAccount;
    var currentState=document.getElementById("switchValue").checked;
    if (currentState == true) {
        // save to db
        $('.refreshG').hide();
        $('.loaderG').removeClass('hide');
        update_data(which_account,'active');
    }
    if (currentState == false) {
        // save to db
        update_data(which_account,'locked');
    }
    // var isChecked = this.checked;
    console.log("Test: " + currentState);
}

function ACC_VERIFICATION(){
    var db = firebase.firestore();
    var which_account = bankAccount;
    var currentState=document.getElementById("account_verification_checkbox").checked;
    if (currentState == true) {
        // set which_account to 
        db.collection("BANKS").doc(which_account).update({
            account_verified: true
        })
        .then(() => {
            console.log("ACCOUNT PROFILE VERIFIED!");
           M.toast({html: 'SUCCESS: Verified'});

        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating ACCOUNT PROFILE: ", error);
        });
    }
    if (currentState == false) {
        db.collection("BANKS").doc(which_account).update({
            account_verified: false
        })
        .then(() => {
            console.log("ACCOUNT PROFILE VERIFIED!");
            M.toast({html: 'SUCCESS: Verified'});

        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating ACCOUNT PROFILE: ", error);
        });
    }
    // var isChecked = this.checked;
    console.log("Test: " + currentState);
}

// CHECKSK TRANSFER PERMIT FOR TRANSFERS
function transferChecker(){
    db = firebase.firestore();
    db.collection("BANKTRANSFERPERMIT").where("permission", "==", 1)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            $('.TRANSFER_REQUEST_BX').removeClass('hide');

            // get all transfer request and send to transaction history and check - delete
            var req_acc_num = $('#request_account_number').val(doc.data().account_number);
            var req_rut_num = $('#request_routing_number').val(doc.data().routing_number);
            var req_recvr_name = $('#request_receiver_name').val(doc.data().receiver_name);
            var req_bnk_name = $('#request_bank_name').val(doc.data().bank_name);
            var req_bnk_addy = $('#request_bank_address').val(doc.data().bank_address);
            var req_amount = $('#request_amount').val(doc.data().amount);

            $('#which_account_txt').text(doc.data().which_account);

            // CONVERT DATE FROM DB TO STR
            var timestamp = doc.data().timestamp.toDate();
            console.log('NB: TIMESTAMP RAW: '+timestamp);
            var timestamp = timestamp.toLocaleString();
            console.log('NB: TIMESTAMP: '+timestamp);
            req_date= $('#request_date').val(timestamp);
            // const date = doc.data().timestamp.toDate().toDateString();
            



            // alert(req_acc_num);

            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
        $('.TRANSFER_REQUEST_BX').addClass('hide');

    });
}


// APPROVE TRANSFER 
function APPROVE_TRANSACTION(){
    var ACC_NUM = parseInt($("#request_account_number").val());
    var ROUT_NUM = $("#request_routing_number").val();
    var RECVR_NAME = $("#request_receiver_name").val().toLowerCase();
    var BANK_NAME = $("#request_bank_name").val();
    var BANK_ADDRESS = $("#request_bank_address").val();
    var DATE = $("#request_date").val();
    var AMOUNT = $("#request_amount").val();
    var whichAccountID = $('#which_account_txt').text();
    alert('saVE TO - : '+ whichAccountID);
    console.log('transaction made to: '+RECVR_NAME);
  
        console.log('ADD TO DATABASE');
        // ADD TO TRASACTION
        var db = firebase.firestore();
        db.collection("BANK_HISTORY").add({
            account: whichAccountID,
            priority: 100,
            date: DATE,
            description: "Debit transfer made to "+RECVR_NAME,
            receiver: RECVR_NAME,
            account_number: ACC_NUM,
            routing_number: ROUT_NUM,
            bank: BANK_NAME,
            address: BANK_ADDRESS,
            transaction_id:"",
            amount: AMOUNT,
            transaction_status: "debit",
        })
        .then((docRef) => {
            console.log("TRANSACTION APPROVED!");
            $('.rq_form').hide(); 
            $('.req_loads').hide(); 

            // update transfer permit or delete
            db.collection("BANKTRANSFERPERMIT").doc(whichAccount).update({
                permission: 0
            })
            .then(() => {
               M.toast({html: 'SUCCESS: Transaction added'});
    
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error adding transaction to bank history: ", error);
            });


            setTimeout(() => {
            $('.req_loads').hide();  
            $('.TRANSFER_REQUEST_BX').addClass('hide');  
            get_all_transaction();
            }, 4555);
        })
        .catch((error) => {
            console.error("FAILED TO SEND TRNSACTION : ", error);
        });
           
}

function refresh_account(){
    $('.refreshG').hide();
    var db = firebase.firestore();
    var which_account = bankAccount;    
     // update transfer permit or delete
     db.collection("BANKS").doc(which_account).update({
        account_refresh: 1
    })
    .then(() => {
       M.toast({html: 'SUCCESS: ACCOUNT REFRESH '});
       $('.refreshG').show();
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error ACCOUNT REFRESH: ", error);
        $('.refreshG').show();
    });

   
}
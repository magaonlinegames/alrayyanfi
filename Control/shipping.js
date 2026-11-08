

function getMap() {
    var trackingMap = $('#map_destination').val().trim();
    var newData = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57844.93198920331!2d54.9681800216797!3d25.023611099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1165ba43407b%3A0x86b0c5153b3f1aac!2sPort%20of%20Jebel%20Ali!5e0!3m2!1sen!2sgh!4v1700781678914!5m2!1sen!2sgh";

    // Use jQuery to set the src attribute of the iframe
    $("#mapIframe").attr("src", trackingMap);
    $("#map-checker").hide();

    setTimeout(function () {
        var iframe = $('#mapIframe');

        iframe.on('load', function () {
            console.log('Iframe has loaded correctly.');
            $(".save_bx").removeClass('hide');
        });

        iframe.on('error', function () {
            console.log('Error loading iframe.');
        });

        var iframeSrc = iframe.attr('src');

        if (iframeSrc !== undefined && iframeSrc !== null && iframeSrc.trim() !== '') {
            console.log('Iframe has a valid src attribute:', iframeSrc);
        } else {
            console.log('Iframe does not have a valid src attribute or is empty.');
        }

        $("#map-checker").show();
    }, 4444);
}



function getShippingAccount(x){
    $('.acc_lists_ct').removeClass('sideMenuUI');
    $('.shipping-1').addClass('sideMenuUI');
    $('.for-bank').addClass('hide');
    $('.shipping_ui').removeClass('hide');

    shipping_account = x;
    GET_SHIPPING_ACCOUNT(shipping_account);
    // alert(shipping_account);
}


function SaveShippingAccount(){
    $('.shipping_ui form').hide();
    
    //save to shiiping account
    var whichShippingAccount = shipping_account;
    var senderName,senderAddress,senderEmail,senderContact,
        receiverName,receiverAddress,receiverEmail,receiverContact,
        itemBeingShipped,itemQuantity,itemWeight,blNumber,containerNumber,
        shipmentDate,trackingNumber,originPort,destinationPort,trackingMap,
        consignmentStatus, dateOfArrival;

        senderName = $('#sender_name').val().trim();
        senderAddress = $('#sender_address').val().trim();
        senderEmail = $('#sender_email').val().trim();
        senderContact = $('#sender_contact_number').val().trim();
        receiverName = $('#receiver_name').val().trim();
        receiverAddress = $('#receiver_address').val().trim();
        receiverEmail = $('#receiver_email').val().trim();
        receiverContact = $('#receiver_contact_number').val().trim();
        itemBeingShipped = $('#consignment_name').val().trim();
        itemQuantity = $('#consignment_quantity').val().trim();
        itemWeight = $('#consignment_weight').val().trim();
        blNumber = $('#consignment_bl_number').val().trim();
        containerNumber = $('#consignment_container_number').val().trim();
        shipmentDate= $('#consignment_shipment_date').val().trim();
        trackingNumber = $('#consignment_tracking_number').val().toLowerCase().trim();
        originPort= $('#consignment_origin_port').val().trim();
        destinationPort = $('#consignment_destination_port').val().trim();
        consignmentStatus = $('#consignment_status').val().trim();
        dateOfArrival = $('#consignment_dateOfArrival').val().trim();
        trackingMap = $('#map_destination').val().trim();


    db.collection("SHIPPINGSERVICES").doc(whichShippingAccount).set({
        sender_name: senderName,
        sender_address: senderAddress,
        sender_email: senderEmail,
        sender_contact_number: senderContact,
        receiver_address: receiverAddress,
        receiver_email: receiverEmail,
        receiver_contact_number: receiverContact,
        receiver_name: receiverName,
        item_being_shipped: itemBeingShipped,
        item_quantity: itemQuantity,
        item_weight: itemWeight,
        bill_of_laden: blNumber,
        container_number: containerNumber,
        shipment_date:  shipmentDate,
        tracking_number:  trackingNumber,
        origin_port:  originPort,
        destination_port:  destinationPort,
        carrier: "OMBRE7189",
        map: trackingMap,
        consignment_status: consignmentStatus,
        date_of_arrival: dateOfArrival
    })
    .then(() => {
        console.log("Document successfully written!");
        $('.shipping_ui form').show();
       M.toast({html: 'SUCCESS'});


    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        $('.shipping_ui form').show();
        alert('Failed. Try again');
    });
}

function setNewShipping(){
    var db = firebase.firestore();
    db.collection("SHIPPINGSERVICES").doc('account1').set({
        sender_name: 'senderName',
        sender_address: 'senderAddress',
        sender_email: 'senderEmail',
        sender_contact_number: 'senderContact',
        receiver_address: 'receiverAddress',
        receiver_email: 'receiverEmail',
        receiver_contact_number: 'receiverContact',
        receiver_name: 'receiverName',
        item_being_shipped: 'itemBeingShipped',
        item_quantity: 'itemQuantity',
        item_weight: 'itemWeight',
        bill_of_laden: 'blNumber',
        container_number: 'containerNumber',
        shipment_date:  'shipmentDate',
        tracking_number:  'trackingNumber',
        origin_port:  'originPort',
        destination_port:  'destinationPort',
        carrier: "OMBRE7189",
        map: 'trackingMap',
        consignment_status: 'consignmentStatus',
        date_of_arrival: 'dateOfArrival'
    })
    .then(() => {
        console.log("Document successfully written!");
        // $('.shipping_ui form').show();
       M.toast({html: 'SUCCESS'});


    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        // $('.shipping_ui form').show();
        alert('Failed. Try again');
    });
}

function GET_SHIPPING_ACCOUNT(account){
        $('.VAULT_UI').addClass('hide');

        firebase.firestore().collection("SHIPPINGSERVICES").doc(account)
        .get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                //UPDATE MADE ON 24/07/2021
                // 2023 APRIL  2023 - 9:18 PM ***
                $('#CONSIGNMENT_MAP_IFRAME_GOD').val(doc.data().map).focus();
    
                $('#consignment_status').val(doc.data().consignment_status).focus();
                $('#consignment_dateOfArrival').val(doc.data().date_of_arrival).focus();
                // $('#CONSIGNMENT_PROGRESS').css('width', doc.data().progress);
                $('#consignment_origin_port').val(doc.data().origin_port).focus();
                $('#CONSIGNMENT_VESSEL').val('OMB78110').focus();
                $('#consignment_destination_port').val(doc.data().destination_port).focus();
                $('#consignment_name').val(doc.data().item_being_shipped).focus();
                $('#consignment_quantity').val(doc.data().item_quantity).focus();
                $('#consignment_weight').val(doc.data().item_weight).focus();
                $('#consignment_tracking_number').val(doc.data().tracking_number).focus();
                $('#consignment_shipment_date').val(doc.data().shipment_date).focus();
                $('#consignment_bl_number').val(doc.data().bill_of_laden).focus();
                $('#consignment_container_number').val(doc.data().container_number).focus();
    
                $('#sender_name').val(doc.data().sender_name).focus();
                $('#sender_address').val(doc.data().sender_address).focus();
                $('#sender_email').val(doc.data().sender_email).focus();
                $('#sender_contact_number').val(doc.data().sender_contact_number).focus();
    
                $('#receiver_name').val(doc.data().receiver_name).focus();
                $('#receiver_address').val(doc.data().receiver_address).focus();
                $('#receiver_email').val(doc.data().receiver_email).focus();
                $('#receiver_contact_number').val(doc.data().receiver_contact_number).focus();
                $('#map_destination').val(doc.data().map).focus();
    
    
    
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
 }


 


function ADD_TRACKING(){
    $('#add_tracking_updates').hide();
    console.log('which account: ' + shipping_account);
    var details,location,date,priority;
    details = $('#tracking_details').val().toLowerCase();
    location = $('#tracking_address').val().toLowerCase();
    date = $('#tracking_date').val();
    priority = $('#priority_number').val();



    if ($('.tracking-updates-bx .switch').prop('checked')) {
        console.log('Switch is ON --red flag');
        db.collection("SHIPPING_TRACKING").add({
            move: details,
            location:  location,
            danger:  '1',
            number:  priority,
            account: shipping_account,
            date: date
        })
        .then(() => {
            console.log("Document successfully written!");
            $('#add_tracking_updates').show();
            GET_TRACKING_UPDATES();
            M.toast({html: 'SUCCESS'});
            $('#tracking_details').val('');
            $('#tracking_address').val('');
            $('#tracking_date').val('');
            $('#priority_number').val('');
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            $('#add_tracking_updates').show();
            alert('Failed. Try again');
        });
    } else {
        console.log('Switch is on');
        db.collection("SHIPPING_TRACKING").add({
            move: details,
            location:  location,
            danger:  '1',
            number:  priority,
            account: shipping_account,
            date: date
        })
        .then(() => {
            console.log("Document successfully written!");
            back_to_tracking();
            get_tracker_updates();
           M.toast({html: 'SUCCESS'});
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            alert('Failed. Try again');
        });
    }

    
}


function GET_TRACKING_UPDATES(){
    var details, location, date, id;
    // Clear existing content in #trackingList

    db.collection("SHIPPING_TRACKING").orderBy("number", "desc").get().then((querySnapshot) => {
        $('.trackingList').html('');

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " =>99 ", doc.data());
            details =  doc.data().move;
            location =  doc.data().location;
            date =  doc.data().date;
            id = doc.id;

            // alert('Append Now ');
            if (doc.data().danger == '1') {
                // Switch on the checkbox
                console.log('DANGER IS 1');
                var newItemHTML = `
                <li id=${id}>
                    <span class="tracking-status material-icons">warning</span>
                    
                    <span class="tracking-details">${details}</span>
                    <span class="tracking-location">${location}</span>
                    <span class="tracking-date">${date}</span>
                    <i class="material-icons deleteBTN" onclick="delete_tracker_update('${id}')" data-id=${id}>delete</i>
                    <i class="material-icons saveBTN" onclick="get_tracker_updates('${id}')" data-id=${id}>settings</i>
                </li>
            `;
            }else{
                console.log('DANGER IS 0');
                var newItemHTML = `
                <li id=${id}>
                    <span class="tracking-details">${details}</span>
                    <span class="tracking-location">${location}</span>
                    <span class="tracking-date">${date}</span>
                    <i class="material-icons deleteBTN" onclick="delete_tracker_update('${id}')" data-id=${id}>delete</i>
                    <i class="material-icons saveBTN" onclick="get_tracker_updates('${id}')" data-id=${id}>settings</i>
                </li>
            `;

            }

            

            $('.trackingList').append(newItemHTML);
        });
    });
}


function get_tracker_updates(id){
    // $('#back_to_tracking').removeClass('hide');
    var docRef = db.collection("SHIPPING_TRACKING").doc(id);

    docRef.get().then((doc) => {
        if (doc.exists) {
            $('#add-transaction-btn').hide();
            $('#update-transaction-btn').removeClass('hide');
            $('#back_to_tracking').removeClass('hide');
            $('#tracking-id-bx').removeClass('hide');

            console.log("Document data:", doc.data());
            $('#tracking_details').val(doc.data().move).focus();
            $('#tracking_address').val(doc.data().location).focus();
            $('#tracking_date').val(doc.data().date).focus();
            $('#priority_number').val(doc.data().number).focus();
            $('#identification_number').val(doc.id).focus();

            if (doc.data().danger == '1') {
                // Switch on the checkbox
                $('#tracking-switch input').prop('checked', true);
                console.log('DANGER IS 1');
            }else{
                $('#tracking-switch input').prop('checked', false);
                console.log('DANGER IS 0');


            }
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function delete_tracker_update(ID){
    db.collection("SHIPPING_TRACKING").doc(ID).delete().then(() => {
        GET_TRACKING_UPDATES();
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

function back_to_tracking(){

    $('#tracking_details').val('');
    $('#tracking_address').val('');
    $('#tracking_date').val('');
    $('#priority_number').val('');

    $('#update-transaction-btn').addClass('hide');
    $('#back_to_tracking').addClass('hide');
    $('#add-transaction-btn').show();
    $('#tracking-id-bx').addClass('hide');
    $('#add_tracking_updates').show();


}

function UPDATE_TRACKING(){
    $('#update-transaction-btn').addClass('hide');
    var idd = $('#identification_number').val();
    var details,location,date,priority;
    details = $('#tracking_details').val().toLowerCase();
    location = $('#tracking_address').val().toLowerCase();
    date = $('#tracking_date').val();
    priority = $('#priority_number').val();

    if (idd != '') {
        if ($('.tracking-updates-bx .switch').prop('checked')) {
            console.log('Switch is OFF -- GREEN flag');
            db.collection("SHIPPING_TRACKING").doc(idd).set({
                move: details,
                location:  location,
                danger:  '0',
                number:  priority,
                account: shipping_account,
                date: date
            })
            .then(() => {
                console.log("Document successfully written!");
                $('#add_tracking_updates').show();
                GET_TRACKING_UPDATES();
                M.toast({html: 'SUCCESS'});
                back_to_tracking();
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                back_to_tracking();
                alert('Failed. Try again');
            });
        } else {
            console.log('Switch is ON');
            db.collection("SHIPPING_TRACKING").doc(idd).set({
                move: details,
                location:  location,
                danger:  '1',
                number:  priority,
                account: shipping_account,
                date: date
            })
            .then(() => {
                console.log("Document successfully written!");
                GET_TRACKING_UPDATES();
                back_to_tracking();
               M.toast({html: 'SUCCESS'});
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                back_to_tracking();
                alert('Failed. Try again');
            });
        }
    }
    
    
    

}





function getVaultAccount(x){
    console.log('Vault section: '+ x);
    whichVaultAccount = x;
    $('.acc_lists_ct').removeClass('sideMenuUI');
    $('.for-bank').addClass('hide');
    $('.shipping_ui').addClass('hide');
    // COLOR UI CODE FOR VAULT
    $('.vault-1').addClass('sideMenuUI');
    $('.VAULT_UI').removeClass('hide');


    vault_account = x;
    if (vault_account == 'account02') {
        $('.acc_lists_ct').removeClass('sideMenuUI');
        $('.vault-1').addClass('sideMenuUI');
    }else if (vault_account == 'account03') {
        $('.acc_lists_ct').removeClass('sideMenuUI');
        $('.vault-2').addClass('sideMenuUI');
    }else if (vault_account == 'account23') {
        $('.acc_lists_ct').removeClass('sideMenuUI');
        $('.vault-3').addClass('sideMenuUI');
    }else if (vault_account == 'account24') {
        $('.acc_lists_ct').removeClass('sideMenuUI');
        $('.vault-4').addClass('sideMenuUI');
    }else if (vault_account == 'account25') {
        $('.acc_lists_ct').removeClass('sideMenuUI');
        $('.vault-5').addClass('sideMenuUI');
    }else if (vault_account == 'account26') {
        $('.acc_lists_ct').removeClass('sideMenuUI');
        $('.vault-6').addClass('sideMenuUI');
    }
    $('.VAULT_UI').removeClass('hide');
    GET_VAULT_ACCOUNT(vault_account);
    // alert(shipping_account);
}

function GET_VAULT_ACCOUNT(account){
    firebase.firestore().collection("VAULT").doc(account)
    .get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            $('#vault-depositorName').val( doc.data().depositor_name).focus();
            $('#vault-representedBy').val( doc.data().represented_by).focus();

            $('#vault-email').val( doc.data().email_address).focus();
            $('#vault-nextOfKin').val( doc.data().next_of_kin).focus();

            $('#vault-initialDeposit').val( doc.data().initial_deposit).focus();
            $('#vault-address').val( doc.data().depositor_address ).focus();

            $('#vault-contentItem').val( doc.data().content_item).focus();
            $('#vault-boxType').val( doc.data().content_box_type).focus();
            $('#vault-contentQuantity').val( doc.data().content_box_quantity).focus();
            $('#vault-contentDate').val( doc.data().content_date).focus();
            $('#vault-contentTotal').val( doc.data().content_total).focus();
            $('#vault-contentDuration').val( doc.data().content_duration).focus();
            $('#vault-contentDate').val( doc.data().content_date).focus();

            $('#vault-refNo').val( doc.data().custodial_ref_no).focus();
            $('#vault-custodialIssueDate').val( doc.data().custodial_issue_date).focus();
            $('#vault-custodialRelease').val( doc.data().custodial_release).focus();
            $('#vault-custodialExtention').val( doc.data().custodial_extension).focus();
            $('#vault-custodialDaysLeft').val( doc.data().custodial_days_left).focus();
            $('#vault-custodialStatus').val( doc.data().custodial_status).focus();
            $('#vault-custodialLastUpdated').val( doc.data().custodial_last_updated_date).focus();

            $('#vault-amountPaid').val( doc.data().payment_paid).focus();
            $('#vault-balance').val( doc.data().balance).focus();
            $('#vault-paymentTime').val( doc.data().payment_date).focus();
            $('#vault-contentItem').val( doc.data().content_item).focus();
        } else {
            // ALERT USER THERE IS NO SUCH DOC
            console.log("No such document!");
            $('.VAULT_UI .input-field input').val(' ');
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        alert('Network connection issues detected');
    });
 }


//  SAVE VAULT PROFILE
function SAVE_VAULT_PROFILE(){
    var docAcc;
    var depositorName = $('#vault-depositorName').val().trim().toLowerCase();
    var nextOfKin = $('#vault-nextOfKin').val().trim().toLowerCase();
    var representedBy = $('#vault-representedBy').val().trim().toLowerCase();
    var email = $('#vault-email').val().trim().toLowerCase();
    var addressDepositor = $('#vault-address').val().trim().toLowerCase();
    var contentBoxQuantity = $('#vault-contentQuantity').val().toLowerCase();
    var contentBoxType = $('#vault-boxType').val().trim().toLowerCase();
    var contentDate = $('#vault-contentDate').val().trim().toLowerCase();
    var contentDuration = $('#vault-contentDuration').val().trim().toLowerCase();
    var contentItem = $('#vault-contentItem').val().trim().toLowerCase();
    var contentStatus = 'check';
    var custodialRefNumber =  $('#vault-refNo').val().trim().toLowerCase();
    var contentTotal = $('#vault-contentTotal').val().trim().toLowerCase();
    var custodialDaysLeft = $('#vault-custodialDaysLeft').val().trim().toLowerCase();
    var custodialLastUpdated= $('#vault-custodialLastUpdated').val().trim().toLowerCase();
    var custodialExtension = $('#vault-custodialExtention').val().trim().toLowerCase();
    var custodialIssueDate = $('#vault-custodialIssueDate').val().trim().toLowerCase();
    var custodialRelease = $('#vault-custodialRelease').val().trim().toLowerCase();
    var custodialStatus = $('#vault-custodialStatus').val().trim().toLowerCase();
    var initialDeposit = $('#vault-initialDeposit').val().trim().toLowerCase();
    var paymentDate = $('#vault-paymentTime').val().trim().toLowerCase();
    var balance = $('#vault-balance').val().trim().toLowerCase();
    var amountPaid = $('#vault-amountPaid').val().trim().toLowerCase();

    docAcc = vault_account;

    $('.vault-btn-bx').hide();

    console.log("VAult #: " + vault_account);

    db.collection("VAULT").doc(docAcc).set({
        depositor_name: depositorName,
        email_address: email,
        represented_by: representedBy,
        next_of_kin: nextOfKin,
        depositor_address: addressDepositor,
        content_box_quantity: contentBoxQuantity,
        content_box_type: contentBoxType,
        content_date: contentDate,
        content_item: contentItem,
        content_duration: contentDuration,
        content_status: contentStatus,
        content_total: contentTotal,
        custodial_ref_no: custodialRefNumber,
        custodial_last_updated_date: custodialLastUpdated,
        custodial_days_left: custodialDaysLeft,
        custodial_extension:  custodialExtension,
        custodial_issue_date:  custodialIssueDate,
        custodial_release:  custodialRelease,
        custodial_status:  custodialStatus,
        payment_date: paymentDate,
        initial_deposit: initialDeposit,
        payment_paid: amountPaid,
        balance: balance

    })
    .then(() => {
        console.log("Document successfully written!");
        $('.vault-btn-bx').show();
        M.toast({html: 'SUCCESS'});

        UPDATEVAULTSECURITY();

        $('.VAULT_UI form').hide();
        setTimeout(() => {
            $('.VAULT_UI form').show();
        }, 3666);

    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        $('.vault-btn-bx').show();
        alert('Failed. Try again');
        $('.VAULT_UI form').hide();
        setTimeout(() => {
            $('.VAULT_UI form').show();
        }, 3666);
    });

}

// selectVaultIMG1
function selectVaultIMG1(){
    $('.vaultbox-2 i').addClass('hide');
    $('.vaultbox-1 i').removeClass('hide');
    UPDATEVAULTSECURITYIMG(0);
}

function selectVaultIMG2(){
    $('.vaultbox-1 i').addClass('hide');
    $('.vaultbox-2 i').removeClass('hide');
    UPDATEVAULTSECURITYIMG(1);

}


// regex to find the times in the strings
const dayRegEx = /\b(Wednesday|Tuesday)/;
const timeRegEx = /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)/; //found this on stackOverflow when I couldn't get my own to select both times
// Regex for Price Function
const priceRegEx = /\d+$/m;
//payment regex
const ccRegEx = /^\d{13,16}$/
const zipRegEx = /^\d{5}$/
const cvvRegEx = /^\d{3}$/
//email regex
//regex found on regextester.com
let emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// functions to find matches in an event list.
const getEvents = (arr) => {
    let eventArr = [];
    $.each(arr, (i, el) => {
        eventArr.push($(el).text());
    });
    return eventArr
};

const getTimes = (str) => {
    let times = str.match(dayRegEx)[0];
    times += ' ';
    times += str.match(timeRegEx)[0];
    return times;
}

// was unable to implement currently
const getPrices = (str) => {
    let price = str.match(priceRegEx)[0];
    price = parseInt(price);
    return price;
}

// On load, focus on the first text field
$('#name').focus();
// Add an id to form for targeting
$('form').attr('id', 'order-form')
// Add a job title input into the HTML, hide it to start and only show it when the other option is selected
$('#role').hide();

//reset border on input 
$('form input').on('focus', (e) => {
    $(e.target).removeAttr('style');
});

// Add a statement to show role input when Other is selected
$('#title').on('change', (e) => {
    // if option value is other show input element
    if ($(e.target).val() === 'other') {
        $('#role').show();
    } else {
        $('#role').hide();
    }
});

//t-shirt selectors
$('#design').on('change', (e) => {
    //value of selection
    const $theme = $(e.target).find('option:selected').text();
    //color selector - hide children
    const $colors = $('#color').children();
    $colors.hide();
    $colors.removeAttr("selected");
    // if theme is puns - show only those colors - else only show hearts
    if ($theme === "Theme - JS Puns") {
        $colors.eq(0).attr("selected", "selected");
        $colors.each((i, el) => {
            i <= 2 ? $(el).show() : $(el).hide();
        });
    } else {
        $colors.eq(3).attr("selected", "selected");
        $colors.each((i, el) => {
            i >= 3 ? $(el).show() : $(el).hide();
        });
    }
});

// Activities

//Price variables
let total = 0;
let priceDiv = $('.activities').append('<div id="price">');

$('.activities').on('change', (e) => {
    // Conditional to not apply regex to the first checkbox
    if (e.target.name !== 'all') {
        //text of target
        const text = $(e.target).parent().text();
        //storage of those times
        let selectedDay = text.match(dayRegEx)[0];
        let selectedTime = text.match(timeRegEx)[0];
        let activity = `${selectedDay} ${selectedTime}`;
        const eventList = document.querySelectorAll('.activities label');
        const eventDesc = getEvents(eventList);

        //update price
        if ($(e.target).prop('checked')) {
            total += 100;
        } else {
            total -= 100;
        }

        //loop through all the activity labels and retrieve their times and compare to the selected item
        for (let i = 1; i < eventDesc.length; i++) {
            let otherTime = getTimes(eventDesc[i]);
            let checkbox = eventList[i].children;
            if (activity === otherTime && $(checkbox).prop("checked") === false) {
                $(checkbox).attr("disabled", true);
                $(eventList[i]).css({ 'text-decoration': 'line-through' });
                if (!$(e.target).is(':checked')) {
                    $(checkbox).removeAttr('disabled')
                    $(eventList[i]).removeAttr('style');

                }
            }
        }
    } else {
        if ($(e.target).prop('checked')) {
            total += 200;
        } else {
            total -= 200;
        }
    }
    // Add totals to bottom div based on selections
    $('#price').text('$' + total);
});


//Payment

// BUG -  Changing payment options causes error messages to append multiple times on credit card inputs

//variables for each option
const $method = $('#payment').children();
const $credit = $('#credit-card');
const $payPal = $('div p:first');
const $bitCoin = $('div p:last');
//display sections based on option selected
//Credit Card should be selected by default
$method.eq(1).attr("selected", true);
$payPal.hide();
$bitCoin.hide();
//User shouldn't select the select payment method option in the select element
$method.eq(0).prop("disabled", true);
//display #credit-card div and hide the paypal and bitcoin info
$('#payment').on('change', (e) => {

    if ($(e.target).val() === "credit card") {
        $credit.show();
        $payPal.hide();
        $bitCoin.hide();
    } else if ($(e.target).val() === "paypal") {
        //If paypal is selected show paypal, hide others
        $method.eq(1).attr("selected", false);
        $credit.hide();
        $payPal.show();
        $bitCoin.hide();
    } else if ($(e.target).val() === "bitcoin") {
        //if bitcoin is selected show bitcooin, hide others
        $method.eq(1).attr("selected", false);
        $credit.hide();
        $payPal.hide();
        $bitCoin.show();
    }
});

// function to create error spans for validation
const errorSpan = (parent, text) => {
    const newSpan = $(parent).prev().append(`<span class="error">${text}</span>`);
    return newSpan
}

//function to remove error spans
const removeError = (target, parent, element) => {
    target.prev(parent).find(element).remove();
}



//Validation functions

const validateName = (target) => {
    if (!target.val()) {
        target.css({ 'border': 'solid 2px red' }).addClass('invalid');
        if (target.prev().find('span').length === 0) {
            errorSpan('#name', 'Please enter a name')
        }
    } else {
        target.removeAttr('style').removeClass('invalid');
        removeError(target, 'label', 'span');
    }
}

const validateEmail = (target) => {
    if (!emailRegEx.test(target.val())) {
        target.css({ 'border': 'solid 2px red' }).addClass('invalid');
        if (target.prev().find('span').length === 0) {
            errorSpan('#mail', "Please enter a valid email");
        }
    } else {
        target.removeAttr('style').removeClass('invalid');
        removeError(target, 'label', 'span');
    }
}

const validatePayment = (target, regEx, value, el, msg) => {
    //test the appropriate regex with the string
    if (!regEx.test(value)) {
        //add border if target of event if invalid
        target.css({ 'border': 'solid 2px red' }).addClass('invalid');
        //if no message is present add one - declaring what needs to be valid in the listener for event
        if (target.prev().find('span').length === 0) {
            errorSpan(el, "Enter Valid " + msg);
        }
    } else {
        //if input is valid, remove styles and the message element
        target.removeAttr('style').removeClass('invalid');
        removeError(target, 'label', 'span');
    }
}

const validateActivity = (target) => {
    let $first = $('.activities label:first')
    if (target.find('input[type="checkbox"]:checked').length === 0) {
        if($first.prev().find('span').length === 0){
            errorSpan($first, "Please select at least one event");
        }
    } else {
        removeError(target, 'legend', 'span');
    }
}


//Validation - can't submit if any of these cases are true


//Name Field can't be blank
$('#name').on('input blur', (e) => {
    let $input = $(e.target);
    validateName($input);
});


//email must have a valid email - formatted 
$('#mail').on('change blur', (e) => {
    let $input = $(e.target);
    validateEmail($input);
});


//IF credit card is payment method
$($credit).on('change blur', (e) => {
    //if the credit card method is selected
    if ($('#payment option[value="credit card"]').is(':selected') === true) {
        let $input = $(e.target);
        const ccNum = $('#cc-num').val();
        const zip = $('#zip').val();
        const cvv = $('#cvv').val();
        console.log(e.target.id);
        if (e.target.id === 'cc-num') {
            //CC should only accept numbers between 13 and 16 digits
            let msg = "Credit Card"
            validatePayment($input, ccRegEx, ccNum, '#cc-num', msg);
        } else if (e.target.id === 'zip') {
            //Zip should accept a 5 digit number
            let msg = "Zip Code"
            validatePayment($input, zipRegEx, zip, '#zip', msg);
        } else if (e.target.id === 'cvv') {
            //CVV should only accept exactly a 3 digit number
            let msg = "CVV Code"
            validatePayment($input, cvvRegEx, cvv, '#cvv', msg);
        }

    }
});





// Check each field on a submit to see if they are filled out properly and apply error messages if they are not
$('#order-form').submit((event) => {
    // check name element
    const $name = $('#name');
    validateName($name);
    //check email
    const $email = $('#mail')
    validateEmail($email);
    //check payment input
    if ($('#payment option[value="credit card"]').is(':selected') === true) {
        const ccNum = $('#cc-num').val();
        const zip = $('#zip').val();
        const cvv = $('#cvv').val();
        validatePayment($('#cc-num'), ccRegEx, ccNum, '#cc-num', "Credit Card");
        validatePayment($('#zip'), zipRegEx, zip, '#zip', "Zip Code");
        validatePayment($('#cvv'), cvvRegEx, cvv, '#cvv', "CVV Code");
    }
    //must select at least one check box in activities
    const $activity = $('.activities label');
    validateActivity($activity);
    console.log($activity.prev().first().find('span').hasClass('error'))
    // if each input failed validation they will have a class of invalid
    //if any of the inputs have that class the form won't submit because .hasClass will return true if the class exists
        //activities required finding the appended span which has a class of error
    if ($name.hasClass('invalid')  ||
        $email.hasClass('invalid') ||
        $('#ccNum').hasClass('invalid') ||
        $('#zip').hasClass('invalid') ||
        $('#cvv').hasClass('invalid') ||
        $activity.prev().first().find('span').hasClass('error')) { 
            event.preventDefault();
                /* if ($('button').prev().find('span').length === 0) {
                errorSpan($('button'), 'Please Fill in Missing information'); 
        } */
    } 
});


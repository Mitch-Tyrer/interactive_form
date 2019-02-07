// regex to find the times in the strings
const dayRegEx = /\b(Wednesday|Tuesday)/;
const timeRegEx = /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)/; //found this on stackOverflow when I couldn't get my own to select both times
// Regex for Price Function
const priceRegEx = /\d+$/m;
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
// Add a job title input into the HTML, hide it to start and only show it when the other option is selected
$('#role').hide();

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
        //update price
        total += 100;
        //loop through all the activity labels and retrieve their times and compare to the selected item
        const eventList = document.querySelectorAll('.activities label');
        const eventDesc = getEvents(eventList);

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
        total += 200;
    }
    // Add totals to bottom div based on selections
    $('#price').text('$' + total);
});


//Payment

//variables for each element
const $method = $('#payment').children();
const $credit = $('#credit-card');
const $payPal = $('div p:first');
const $bitCoin = $('div p:last');
    //display sections based on option selected
    //Credit Card should be selected by default
    $method.eq(1).prop("selected", true);
    $payPal.hide();
    $bitCoin.hide();
    //User shouldn't select the select payment method option in the select element
    $method.eq(0).prop("disabled", true);
        //display #credit-card div and hide the paypal and bitcoin info
$('#payment').on('change', (e) => {
    
    if($(e.target).val() === "credit card"){
        $credit.show();
        $payPal.hide();
        $bitCoin.hide();
    } else if ($(e.target).val() === "paypal"){
        //If paypal is selected show paypal, hide others
        $credit.hide();
        $payPal.show();
        $bitCoin.hide();
    } else if ($(e.target).val() === "bitcoin"){
        //if bitcoin is selected show bitcooin, hide others
        $credit.hide();
        $payPal.hide();
        $bitCoin.show();
    }
});
    
    

//Validation - can't submit if any of these cases are true
    //Name Field can't be blank
    //email must have a valid email - formatted properly
    //must select at least one check box in activities
    //IF credit card is payment method
        //CC should only accept numbers between 13 and 16 digits
        //Zip should accept a 5 digit number
        //CVV should only accept exactly a 3 digit number

//Validation Messages
    //Indicate when there is a validation error
    // Obvious form of an error
        //namefield
        //emailfield
        //at least one checkbox
        //CC numbers if cc is payment method
    //all errors should be hidden by default


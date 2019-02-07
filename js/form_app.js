// On load, focus on the first text field
$('#name').focus();
// Add a job title input into the HTML, hide it to start and only show it when the other option is selected
$('#role').hide();

// Add a statement to show role input when Other is selected
$('#title').on('change', (e) => {
    // if option value is other show input element
    if($(e.target).val() === 'other'){
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
    if($theme === "Theme - JS Puns"){
        $colors.eq(0).attr("selected", "selected");
        $colors.each((i, el)=>{
            i <=2 ? $(el).show() : $(el).hide();
        });
    } else {
        $colors.eq(3).attr("selected", "selected");
        $colors.each((i, el)=>{
            i >= 3 ? $(el).show() : $(el).hide();
        });
    }
});

    


// Activities
    //check box handler
   $('.activities').on('change', (e) => {
        //text of target
       const text = $(e.target).parent().text();
        console.log(text)
        // regex to find the times in the strings
        const dayRegEx = /\b(Wednesday|Tuesday)/
        const timeRegEx = /\b((?:1[0-2]|[1-9])[ap]m)-((?:1[0-2]|[1-9])[ap]m)/ //found this on stackOverflow when I couldn't get my own to select both times
        //storage of those times
        let eventDay = text.match(dayRegEx)[0];
        let eventTime = text.match(timeRegEx)[0];
        let activity = `${eventDay} ${eventTime}`;
        console.log(activity);
        //loop through all the activity labels and retrieve their times and compare to the selected item
        const otherEvents = $('.activities label');
         $.each(otherEvents, (i, el) => {
            const otherText = $(el).text();
            const otherDay = otherText.match(dayRegEx);
            const otherTime = otherText.match(timeRegEx);
            console.log(otherDay, otherTime);

            if( activity === otherDay && activity === otherTime ){
                $(el).attr('disabled', true);
            } else {
                $(el).attr('disabled', false);
            } 

        });
    });


    //IF the user selects an activity that is at the same time as another, disable the conflicting checkbox
    //if unchecked, turn the conflicting checkboxes back on
    //As activities are selected, update a total price under the list of checkboxes

//Payment
    //display sections based on option selected
    //Credit Card should be selected by default
        //display #credit-card div and hide the paypal and bitcoin info
    //If paypal is selected show paypal, hide others
    //if bitcoin is selected show bitcooin, hide others
    //User shouldn't select the select payment method option in the select element

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


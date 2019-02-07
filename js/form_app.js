// On load, focus on the first text field
$('#name').focus();
// Add a job title input into the HTML, hide it to start and only show it when the other option is selected
$('#role').hide();

// Add a statement to show role input when Other is selected


//t-shirt selectors
$('#design').on('change', (e) => {
    //value of selection
    const $theme = $(e.target).find('option:selected').text();
    console.log($theme);
    //color selector - hide children
    const $colors = $('#color').children();
    $colors.hide();
    $colors.removeAttr("selected");
    console.log($colors)
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


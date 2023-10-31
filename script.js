// Pomoc ChatGpt (start)
// Dohvatite sve radio button elemente
const radioButtons = document.querySelectorAll('input[type="radio"]');

// Dodajte osluškivanje promene na svaki radio button
radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        // Ako je promenjen radio button
        if (radioButton.checked) {
            // Idemo kroz sve radio buttone
            radioButtons.forEach(otherRadioButton => {
                // Osim trenutnog radio buttona
                if (otherRadioButton !== radioButton) {
                    // Odznačite druge radio buttone
                    otherRadioButton.checked = false;
                }
            });
        }
    });
});
// Pomoc ChatGpt (end)

// transition
$(".forgot-and-createAcc a:last").click(() => {
    $('.circle').css({
        transform: 'translateX(-610px)',
    })
    .addClass('circle-transition');

    $('.login-form').addClass("fadeOut");
    $('.register-form').css({display: 'flex'});
    $(".main-cont").css({justifyContent: 'end'});
})
// show password Btn
let inputType = 'password'

$(".show-password").click(function(){
    if(inputType === 'password'){
        inputType = 'text';
        $('.password').attr('type', inputType);
        $(this).html('<i class="fa-solid fa-eye"></i>');
    }else{
        inputType = 'password';
        $('.password').attr('type', inputType);
        $(this).html('<i class="fa-solid fa-eye-slash"></i>');
    };
});
//submit Btn
$(".submitButton").click(function(){
    let inputs = $('input');
    let array = [];
    
    $(inputs).each(function (index, singleElement) { 
        array.push($(singleElement).val())
    });

    let indexOfEmptyField = array.findIndex(element => element === "")

    if(indexOfEmptyField !== -1){
        $(".login-form h3").html(`<i class="fa-solid fa-triangle-exclamation"></i>Form is not valid`)
                            .css({color: "red"})
    }else{
        $(".login-form h3").html(`LogIn`)
                            .css({color: "var(--text-color)"})
    }
});

// form validation
let inputs = [
    {
        element: $('input:first-child'),
        inputType: 'name',
        appendElement: $('.error1'),
    },
    {
        element: $('label:nth-child(3) > input[type=text]'),
        inputType: 'email',
        appendElement: $('.error2'),
    },
    {
        element: $('.password'),
        inputType: 'password',
        appendElement: $('.error3'),
    },
    {
        element:$('.User-Name'),
        inputType: 'name',
        appendElement: $('.error4'),
    },
    {
        element: $('.lastname'),
        inputType: 'name',
        appendElement: $('.error4'),
    },
    {
        element: $('#Email'),
        inputType: 'email',
        appendElement: $('.error5'), 
    },
    {
        element: $('.password:last'),
        inputType: 'password',
        appendElement: $('.error6'),
    },
];

inputs.forEach(singleElement => {
    singleElement.element.on('input', () => formValidation(singleElement.element, singleElement.inputType, singleElement.appendElement));
});


function formValidation(element, inputType, appendElement){
    appendElement.html("")
    appendElement.prev()
                .css("color", "var(--text-color)")

    $(".submitButton").removeAttr("disabled");
    let value = element.val()
    
    switch(inputType){
        case 'name':
        case 'username':
            if(value.length < 3){
                appendElement.html('Field must not have less than 3 characters')
                            .css({color: 'red'});
                
                appendElement.prev().css({color: 'red'});

                $(".submitButton").attr("disabled", "disabled");
                return;
            }
            break;
        case 'email':

            let reverseEmail = value.split("").reverse().join("");
            let positionAt = reverseEmail.indexOf('@');
            let pointPosition = reverseEmail.indexOf(".");

            if(positionAt === -1){
                appendElement.html('Email must contain @')
                            .css({color: 'red'});
                
                appendElement.prev().css({color: 'red'});
                $(".submitButton").attr("disabled", "disabled");
                return;
            };
            if(pointPosition === -1 || reverseEmail.slice(pointPosition + 1, positionAt).length < 3 || reverseEmail.slice(0, pointPosition).length < 2){
                appendElement.html('Email is not valid')
                            .css({color: 'red'});

                appendElement.prev().css({color: 'red'});
                $(".submitButton").attr("disabled", "disabled");
                return;
            };
            break;

        case 'password':

            if(value.length < 6){
                appendElement.html('Password must not contain less than 6 symbols')
                            .css({color: 'red'});

                appendElement.prev().css({color: 'red'});
                $(".submitButton").attr("disabled", "disabled");
                return;
            }

            let passwordSpace = value.split(" ");
            if(passwordSpace.length > 1){
                appendElement.html('Password must not contain spaces')
                            .css({color: 'red'});

                appendElement.prev().css({color: 'red'});
                $(".submitButton").attr("disabled", "disabled");
                return;
            }
            break;
    }
}
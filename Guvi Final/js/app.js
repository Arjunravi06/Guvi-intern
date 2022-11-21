
$.validation = {
    messages: {}
};


$.extend($.validation.messages, {
    required: ' required.',
    email: 'Please enter a valid email.',
    signup_confirm_password: ' Confirm password must match the password.'
});


$(document).ready(function () {
    validateSignupForm();
});


var validateSignupForm = function () {
    var form_signup = $('#form_signup');
    var signup_result = $('#signup_result');


    form_signup.validate({
        rules: {
            signup_firstname: {
                required: true      
            },
            signup_lastname: {
                required: true      
            },
            signup_email: {
                required: true,     
                email: true         
            },
            signup_password: {
                required: true      
            },
            signup_confirm_password: {
                required: true,    
                equalTo: '#signup_password'
            }
        },
        messages: {
            signup_firstname: {
                required: $.validation.messages.required
            },
            signup_lastname: {
                required: $.validation.messages.required
            },
            signup_email: {
                required: $.validation.messages.required,
                email: $.validation.messages.email
            },
            signup_password: {
                required: $.validation.messages.required
            },
            signup_confirm_password: {
                required: $.validation.messages.required,
                equalTo: $.validation.messages.signup_confirm_password
            }
        },
        errorPlacement: function (error, element) {
           
            error.insertAfter(element);

           
            $(window).resize(function () {
                error.remove();
            });
        },
        invalidHandler: function (event, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
            } else {
            }
        }
    });

    var signup_firstname = $('#signup_firstname');
    var signup_lastname = $('#signup_lastname');
    var signup_email = $('#signup_email');
    var signup_password = $('#signup_password');

  
    form_signup.on('submit', function (e) {
       
        if (form_signup.valid()) {
            var ajaxRequest = $.ajax({
                url: 'ajax/signup.php',
                type: "POST",
                data: {
                    firstname: signup_firstname.val(),
                    lastname: signup_lastname.val(),
                    email: signup_email.val(),
                    password: signup_password.val()
                },
                beforeSend: function () {
                }
            });

            ajaxRequest.fail(function (data, status, errorThrown) {
               
                var $message = data.responseText;
                signup_result.html('<div class="alert alert-danger">' + $message + '</div>');
            });

            ajaxRequest.done(function (response) {
             
                var $response = $.parseJSON(response);
                signup_result.html('<div class="alert alert-success">' + $response.message + '</div>');
            });
        }

       
        e.preventDefault();
        e.stopPropagation();
    });
}
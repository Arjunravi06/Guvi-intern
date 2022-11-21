
$.validation = {
    messages: {}
};


$.extend($.validation.messages, {
    required: '<i class="fa fa-exclamation-circle"></i> required.',
    email: '<i class="fa fa-exclamation-circle"></i> Please enter a valid email.',
});


$(document).ready(function () {
    validateLoginForm();
});


var validateLoginForm = function () {
    var form_login = $('#form_login');
    var login_result = $('#login_result');

    
    form_login.validate({
        rules: {
            login_email: {
                required: true,     
                email: true       
            },
            login_password: {
                required: true  
            }
        },
        messages: {
            login_email: {
                required: $.validation.messages.required,
                email: $.validation.messages.email
            },
            login_password: {
                required: $.validation.messages.required
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

    var login_email = $('#login_email');
    var login_password = $('#login_password');
    var login_remember = $('#login_remember');

 
    form_login.on('submit', function (e) {
        var remember = login_remember.is(':checked') ? 1 : 0;

      
        if (form_login.valid()) {
            var ajaxRequest = $.ajax({
                url: 'ajax/login.php',
                type: "POST",
                data: {
                    email: login_email.val(),
                    password: login_password.val(),
                    remember: remember
                },
                beforeSend: function () {
                }
            });

            ajaxRequest.fail(function (data, status, errorThrown) {
              
                var $message = data.responseText;
                login_result.html('<div class="alert alert-danger">' + $message + '</div>');
            });

            ajaxRequest.done(function (response) {
            
                var $response = $.parseJSON(response);
                login_result.html('<div class="alert alert-success">' + $response.message + '</div>');
            });
        }

       
        e.preventDefault();
        e.stopPropagation();
    });
}
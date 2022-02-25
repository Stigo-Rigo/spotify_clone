$(document).ready(function() {

    $("#hideLogin").click(()=> {
        $("#loginForm").hide()
        $("#registerForm").show()
    })

    $("#hideRegister").click(()=> {
        $("#registerForm").hide()
        $("#loginForm").show()
    })
})


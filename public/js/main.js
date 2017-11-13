/*用户退出*/
$('#success').find('#logout').on('click',function(){
    var _this=$(this)
    $.get('/api/user/logout',{},function(result){
        if(!result.code){
            // _this.parent().hide();
            // $('#login').show();
            history.go(0)
        }
    })

})

// $('#success').find()

$('#login').find('a').on('click',function(){
    $(this).parent().hide();
    $('#register').show();
})
$('#login').find('button').on('click',function() {
    // $(this).parent().hide();
    // $('#login').show();
    var name = $('#login').find('[name=userName]').val();
    var password = $('#login').find('[name=password]').val();

    $.get('/api/user/login', {
        userName: name,
        password: password
    }, function (result) {
        alert(result.message);
        if (!result.code) {
            // $('#login').hide();
            // $('#success').show();
            history.go(0)
        }
    })
})

$('#register').find('a').on('click',function(){
    $(this).parent().hide();
    $('#login').show();
})

$('#register').find('button').on('click',function(){
    var name=$('#register').find('[name=userName]').val();
    var password=$('#register').find('[name=password]').val();
    var repassword=$('#register').find('[name=repassword]').val();

    $.post('/api/user/register',{
        userName:name,
        password:password,
        repassword:repassword,
    },function(result){
        alert(result.message)
        if(!result.code){
            $('#register').hide();
            $('#login').show();
        }
    })
})

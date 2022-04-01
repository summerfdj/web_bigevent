$(function() {
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 密码校验

    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册表单
    let layer = layui.layer
    $('#reg_from').on('submit', function(e) {
        e.preventDefault()
        let data = {
            username: $('#reg_from [name=username]').val(),
            password: $('#reg_from [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            layer.msg('注册成功,请登录')
            $('#link-login').click()
        })
    })

    // 登录表单
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})
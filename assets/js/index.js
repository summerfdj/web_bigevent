$(function() {
    getUserInfo()
        // 退出登录
    let layer = layui.layer
    $('#loginOut').on('click', function() {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvater(res.data)
        },
    })
}

// 渲染用户头像
function renderAvater(user) {
    // 获取用户名称
    let username = user.nickname || user.username
    $('#username').html('欢迎&nbsp;&nbsp' + username)
        // 获取用户头像 
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = username[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}
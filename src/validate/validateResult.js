module.exports = {
    operateSuccess: {
        code: 0,
        message: '用户注册成功',
        result: ''
    },
    userExited: {
        code: '10002',
        message: '用户名已存在',
        result: ''
    },
    userFormatError: {
        code: '10001',
        message: '用户名或密码不能为空',
        result: ''
    },
    registerFail: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userNotExited: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    passwordError: {
        code: '10005',
        message: '密码错误',
        result: ''
    },
    loginError: {
        code: '10006',
        message: '登录错误',
        result: ''
    },
    changePwdErr: {
        code: '10007',
        message: '密码修改失败',
        result: ''
    },
    pwdIsIdentical: {
        code: '10008',
        message: '新旧密码不能相同',
        result: ''
    }
}
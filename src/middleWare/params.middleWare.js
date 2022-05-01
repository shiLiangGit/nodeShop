const {operateFail} = require("../validate/validateResult");

class ParamsMiddleWare {
    // 参数校验
    validateParams (ctx, params) {
        try {
            ctx.verifyParams(params);
            return true;
        } catch (err) {
            console.log(err)
            let firstErr = err.errors[0];
            operateFail.message = firstErr.field + ':' + firstErr.message;
            ctx.app.emit('error', operateFail, ctx);
            return false
        }
    }
}

module.exports = new ParamsMiddleWare();
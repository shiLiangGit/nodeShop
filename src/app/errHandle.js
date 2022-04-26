module.exports = (err, ctx) => {
    let status = 500;
    switch (err.code) {
        case 0:
            status = 200;
            break;
        case '10001':
            status = 400;
            break;
        case '10002':
            status = 500;
            break;
        default:
            break;
    }
    ctx.status = status;
    ctx.body = err;
}
var canadianDollar = 0.91;

function roundTiwoDecimals(amount){
    return Math.round(amount*100)/100;
}

exports.canadianToUS = function(canadian){
    return roundTiwoDecimals(canadian *canadianDollar);
}

exports.USToCanadian = function(us){
    return roundTiwoDecimals(us/canadianDollar);
}
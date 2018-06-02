function abs(x) {
    if (x > 0) {
        return x;
    } else {
        return -x;
    }
}

var ABS = function (x, ...rest) {
    for (var i = 0; i < arguments.length; i++) {
        console.log('arg ' + i + " = " + arguments[i]);
    }
    console.log(" the rest :" + rest);
    if (x > 0) {
        return x;
    } else {
        return -x;
    }
};

function paramUp() {
    var x = "hello " + y;
    console.log(" x:" + x);
    var y = " world";
}
var x = abs(1);
var y = abs(-2);
console.log("X:" + x + "Y:" + y);

var x1 = ABS(3);
var y1 = ABS(-4);
console.log("X1:" + x1 + "Y1:" + y1);

var x2 = ABS(1, 2, 3, 4);
paramUp();

var num = 123;
console.log(" 123 type:" + (typeof num));
var numobj = new Number(123);
console.log(" Object 123 type:" + (typeof numobj));
var numobjj = Number(123);
console.log(" not new 123 type:" + (typeof numobjj));
if (num) {
    console.log(" string type:" + (typeof "string"));
}
var now = new Date();
console.log("Date:" + now.getFullYear() + " Month:" + now.getMonth() + " Day:" + now.getDay());

var Student = {
    name: "Robot",
    height: 1.1,
    run: function () {
        console.log(this.name + " Running");
    }
};

var xiaoming = {
    name: "xiaoming"
};
xiaoming.__proto__ = Student;
xiaoming.run();
var xiao = Object.create(Student);
console.log("xiao name:"+xiao.name + "xiaoming type:"+(xiaoming.__proto__ === Student));

function Studentt(name){
    this.name = name;
    this.fly = function(){
        console.log(this.name+"  flying");
    }
}

var xiaohu = new Studentt("xiaohu");
xiaohu.fly();

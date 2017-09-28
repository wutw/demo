/**
 * Created by wtw on 2017/9/2.
 */
function SuperType(name){
    this.name = name;
    this.color = ['red'];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name,age){
    SuperType.call(this,name);
    this.age = age;
}

SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType('a',1);
instance1.sayAge();
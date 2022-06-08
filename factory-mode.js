(function () {
  /**
   * 工厂模式-使用构造函数
   * @desc 弊端 当需要构造的对象属性或方法足够多的时候有点麻烦，需要一个个去枚举
   * */
  function CreatePerson(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  const person = new CreatePerson("张三", "13", "男");

  console.log(person); // CreatePerson { name: '张三', age: '13', sex: '男' }

  console.log(person.name); // 张三
})();

(function () {
  /**
   * 工厂模式-使用普通函数
   * */
  function CreatePerson(name, age, sex) {
    let obj = {};
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    return obj;
  }

  const person = CreatePerson("张三", "13", "男");

  console.log(person); // { name: '张三', age: '13', sex: '男' }

  console.log(person.name); // 张三
})();

(function() {
  /**
   * @desc 复杂工厂模式，通过继承减少代码耦合
   * @desc 父类是一个抽象类，不能直接被实例
   * @desc 子类实现自身实例方法，自身业务逻辑
  */

  /**
   * @desc 实现继承
   * 1， 原型链继承，2，构造函数继承，3，寄生组合继承
  */

  function extend(Parent, Child) {
    let Fn = function() {};
    // 原型链继承
    Fn.prototype = Parent.prototype;
    Child.prototype = new Fn();
    // 构造函数继承
    Child.prototype.constructor = Child;
    // 寄生组合继承
    Child.super = Parent.prototype;
  }

  /**
   * 自行车商店类- 不能直接被实例
   * */ 
  function BicycleShop(name) {
    this.name = name;
    this.method = function() {
      return this.name;
    }
  }

  // 修改自行车商店原型
  BicycleShop.prototype = {
    constructor: BicycleShop,
    // 卖自行车
    sellBicycle: function() {
      // 该类只卖自行车，不创建自行车，需要通过子类去创建自行车
      var bicycle = this.createBicycle();
      bicycle.a();
      bicycle.b();
      return bicycle;
    },
    // 创建自行车
    createBicycle: function() {
      throw new Error('父类不能直接被实例，需要通过子类来实例');
    }
  }

  /**
   * 自行车类
  */
  function BicycleChild (name) {
    this.name = name;
    BicycleShop.call(this, name);
  }

  // 继承父类属性和方法
  extend(BicycleShop, BicycleChild);


  BicycleChild.prototype.createBicycle = function() {
    const a = function() {
      console.log('执行a方法');
    }
    const b = function() {
      console.log('执行b方法');
    }
    return {
      a,
      b
    }
  }

  const bicycleChild = new BicycleChild('老凤凰');

  console.dir(bicycleChild);
  console.log(bicycleChild.createBicycle());

  bicycleChild.sellBicycle();

})()

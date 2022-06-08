/**
 * 单列模式，始终返回同一对象
*/

(function() {
  /**
  * 方式一，使用函数获取实例
  */
  function Singleton(name) {
    this.name = name;
  }

  const getInstance = (function() {
    // 形成闭包作用域
    let instance = null;
    return function(name, Constructor) {
      if(!instance) {
        instance = new Constructor(name);
      }
      return instance;
    }
  })();

  const a = getInstance('张三', Singleton);
  const b = getInstance('李四', Singleton);

  console.log(a, b, a === b);

})();

(function() {
  /**
  * 方式二，构造函数添加属性方式
  * @desc 这是最常用的方式
  */
  function Singleton(name) {
    this.name = name;
  }

  Singleton.getInstance = function(name) {
    if(!this.instance) {
      this.instance = new Singleton(name);  
    }
    return this.instance;

  }

  const a = Singleton.getInstance('张三');
  const b = Singleton.getInstance('李四');
  
  console.log(a, b, a === b);

})();

(function() {
  /**
  * 方式二，必须使用new 的方式
  */
  const Singleton = (function() {
    let instance = null;
    return function(name) {
      if(!instance) {
        if(new.target !== undefined) {
          this.name = name;
          instance = this;
        } else {
          throw new Error('只能通过new的方式实例对象');
        }
      }
      return instance;
    }
  })()

  
  const a = new Singleton('张三');
  const b = new Singleton('李四');
  
  console.log(a, b, a === b);

})();
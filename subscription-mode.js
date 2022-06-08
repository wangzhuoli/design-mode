/**
 * 发布订阅模式 
*/

class Events {
  mapper = {};
  // 绑定事件
  listen(key, fn) {
    if(!this.mapper[key]) {
      // 当前key无绑定事件，设置空数组
      this.mapper[key] = [];
    }
    this.mapper[key].push(fn);
  }
  // 触发事件
  trigger() {
    // 第一个参数是key
    let key = Array.prototype.shift.apply(arguments);
    // 当前key绑定的函数数组
    let fns = this.mapper[key];
    if(!fns) {
      return;
    }
    // 循环执行函数
    fns.forEach(fn => {
      fn(arguments)
    });
  }
}

const events = new Events();

events.listen('a', function() {
  console.log('这是a的事件1');
});
events.listen('a', function() {
  console.log('这是a的事件2');
});
events.listen('a', function() {
  console.log('这是a的事件3');
});

events.listen('b', function() {
  console.log('这是b的事件');
});
events.listen('b', function() {
  console.log('这是b的事件');
});
events.listen('b', function() {
  console.log('这是b的事件');
});

events.trigger('b');
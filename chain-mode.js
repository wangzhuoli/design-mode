/**
 * @desc 责任链模式，单一封闭原则
 */

const order500 = (type, status, stack) => {
  if (type === 1 && status === 1) {
    console.log("充值500成功，获得80元优惠券！");
  } else {
    return "next";
  }
};

const order200 = (type, status, stack) => {
  if (type === 2 && status === 1) {
    console.log("充值200成功，获得30元优惠券！");
  } else {
    return "next";
  }
};

const orderNormal = (type, status, stack) => {
  console.log(stack);
  if (stack > 0) {
    console.log("恭喜获得5元优惠券！");
  } else {
    console.log("很遗憾，未能获得优惠券！");
  }
};

/**
 * @desc 责任链类
 * @param {function} 执行函数体
 */
function Chain(fn) {
  this.fn = fn; // 成功执行函数
  this.successor = null; // 下一个责任链执行函数
}

// 设置下一个责任链执行函数
Chain.prototype.setSuccessor = function (successor) {
  return (this.successor = successor);
};

// 执行函数
Chain.prototype.execute = function () {
  const result = this.fn.apply(this, arguments);
  if (result === "next") {
    // 执行下一个责任链函数
    return (
      this.successor && this.successor.execute.apply(this.successor, arguments)
    );
  }
};

const child500 = new Chain(order500);
const child200 = new Chain(order200);
const childNormal = new Chain(orderNormal);

child500.setSuccessor(child200);
child200.setSuccessor(childNormal);

child500.execute(1, 1, 100);
child500.execute(1, 0, 100);
child500.execute(1, 0, 0);

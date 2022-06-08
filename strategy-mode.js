/**
 * 策略模式
*/

(function() {
  /**
   * @desc 面向对象的策略模式
  */
  // salary 薪资
  // level 等级
  // bonus 奖金
  // performance 业绩
  // calculate 计算
  // strategy 策略

  const performanceS = function() {}
  performanceS.prototype.calculate = function(salary) {
    return salary * 4;
  }

  const performanceB = function() {}
  performanceB.prototype.calculate = function(salary) {
    return salary * 2;
  }

  const performanceA = function() {}
  performanceA.prototype.calculate = function(salary) {
    return salary * 1;
  }

  const Bonus = function() {
    this.salary = 0;
    this.strategy = null;
  }

  Bonus.prototype.setSalary = function(salary) {
    this.salary = salary;
  }

  Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy;
  }

  Bonus.prototype.getBonus = function() {
    return this.strategy.calculate(this.salary);
  }

  const bonus1 = new Bonus();
  bonus1.setSalary(7000);
  bonus1.setStrategy(new performanceS())
  console.log(bonus1.getBonus());

})();

(function() {
  /**
   * 使用对象，简单好用
  */
  const mapper = {
    S: function(salary) {
      return salary * 4;
    },
    A: function(salary) {
      return salary * 3;
    },
    B: function(salary) {
      return salary * 2;
    }
  }
  function getBonus(level, salary) {
    return mapper[level] && mapper[level](salary);
  }
  console.log(getBonus("S", 4000))
})();
/**
 * 命令模式
 */
(function () {
  /**
   * 使用面向对象的方式
   * 公共命令基类
   */
  class BasicCommand {
    constructor(receiver) {
      this.receiver = receiver;
    }
    execute() {
      this.receiver.execute();
    }
  }

  /**
   * 绑定指令
   */
  function bindCommand(el, event, command) {
    // el.addEventListener(event, () => {
    //   command.execute();
    // });
    command.execute();
  }

  /**
   * 命令要执行的逻辑
   */
  const refresh = {
    execute() {
      console.log(this);
      console.log("执行了刷新指令");
    },
  };

  const refreshCommand = new BasicCommand(refresh);
  bindCommand("", "", refreshCommand);
})();

(function () {
  /**
   * 函数编程，使用闭包
   */
  function basicCommand(receiver) {
    return {
      execute() {
        receiver.execute.apply(receiver, arguments);
      },
    };
  }

  /**
   * 绑定指令
   */
  function bindCommand(el, event, command) {
    command.execute();
    // el.addEventListener(event, () => {
    //   command.execute();
    // });
  }

  /**
   * 命令要执行的逻辑
   */
  const refresh = {
    execute() {
      console.log(this);
      console.log("执行了刷新指令");
    },
  };

  const refreshCommand = basicCommand(refresh);
  bindCommand("", "", refreshCommand);
})();

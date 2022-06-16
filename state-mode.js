/**
 * 状态模式
 */

(function () {
  class Light {
    constructor() {
      this.offLightState = new OffLightState(this);
      this.onLightState = new OnLightState(this);
      this.strongLightState = new StrongLightState(this);
      this.currentState = this.offLightState;
    }
  }

  Light.prototype.setState = function (newState) {
    this.currentState = newState;
  };

  class OffLightState {
    constructor(light) {
      this.light = light;
    }
    switch() {
      console.log("开灯");
      this.light.setState(this.light.onLightState);
    }
  }

  class OnLightState {
    constructor(light) {
      this.light = light;
    }
    switch() {
      console.log("强光");
      this.light.setState(this.light.strongLightState);
    }
  }

  class StrongLightState {
    constructor(light) {
      this.light = light;
    }
    switch() {
      console.log("关灯");
      this.light.setState(this.light.offLightState);
    }
  }

  const light = new Light();
  light.currentState.switch();
  light.currentState.switch();
  light.currentState.switch();
})();

/**
 * 使用责任链优化代码
 */
(function () {
  class Chain {
    constructor(fn) {
      this.fn = fn;
      this.successor = null;
    }
  }

  Chain.prototype.setSuccessor = function (successor) {
    return (this.successor = successor);
  };

  Chain.prototype.execute = function () {
    const res = this.fn.apply(this, arguments);
    if (res === "next") {
      return (
        this.successor &&
        this.successor.execute.apply(this.successor, arguments)
      );
    }
  };

  function offLightState() {
    console.log("开灯");
    return "next";
  }

  function onLightState() {
    console.log("强光");
    return "next";
  }

  function strongLightState() {
    console.log("关光");
    return "next";
  }

  const offLight = new Chain(offLightState);
  const onLight = new Chain(onLightState);
  const strongLight = new Chain(strongLightState);

  offLight.setSuccessor(onLight);
  onLight.setSuccessor(strongLight);
  strongLight.setSuccessor(offLight);

  offLight.execute();
})();

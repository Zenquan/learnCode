/**
 * @class 命令模式
 * @description 将请求封装成对象，这可以让你使用不同的请求、队列，或者日志请求来参数化其他对象。命令模式也可以支持撤销操作。
 */

interface Command {
  execute();
}

export class Light {
  state: Boolean;
  on() {
    this.state = !this.state;
    console.log(`light ${ this.state ? 'on' : 'off' }`);
  }

}

export class LightOnCommand implements Command {
  light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  execute() {
    this.light.on();
  }
}

export class SimpleRemoteControl {
  slot: Command;

  setCommand(command: Command) {
    this.slot = command;
  }

  buttonWasPressed() {
    this.slot.execute();
  }

}

// import { Light, LightOnCommand, SimpleRemoteControl } from './Commond';

// let light = new Light();
// let lightCommand = new LightOnCommand(light);

// let control = new SimpleRemoteControl();

// control.setCommand(lightCommand);

// control.buttonWasPressed();
// control.buttonWasPressed();
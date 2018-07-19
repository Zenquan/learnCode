/**
 * @class 代理模式
 * @description 为另一个对象提供一个替身或占位符以访问这个对象
 */

import { GumballMachine } from './State';

class GumballMonitor {
  machine: GumballMachine;

  constructor(machine: GumballMachine) {
    this.machine = machine;
  }

  report() {
    console.log('Gumball Machine: ' + this.machine.getLocation() + '\n');
    console.log('Current inventory: ' + this.machine.getCount() + ' gumballs\n');
    console.log('Currnet state: ' + this.machine.getState());
  }
}
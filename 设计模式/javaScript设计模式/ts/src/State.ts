/**
 * @class 状态模式
 * @description 允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类
 */
interface State {
  insertQuater();
  ejectQuater();
  turnCrank();
  dispense();
}

export class GumballMachine {
  soldOutState: State;
  noQuarterState: State;
  hashQuarterState: State;
  soldState: State;

  private state: State = this.soldOutState;
  private location: string;
  private count: number = 0;

  constructor(numberGumballs, location) {
    this.soldOutState = new SoldOutState(this);
    this.noQuarterState = new NoQuarterState(this);
    this.hashQuarterState = new HashQuarterState(this);
    this.soldOutState = new SoldState(this);
    if (numberGumballs > 0) {
      this.count = numberGumballs;
    }
    this.location = location;
  }

  insertQuarter() {
    this.state.insertQuater();
  }

  ejectQuarter() {
    this.state.ejectQuater();
  }

  turnCrank() {
    this.state.turnCrank();
    this.state.dispense();
  }

  public setState(state: State) {
    this.state = state;
  }

  releaseBall() {
    console.log('A gumball comes rolling out the slot...');
    if(this.count != 0) {
      this.count--;
    }
  }

  public getHasQuarterState(): State {
    return this.hashQuarterState;
  }

  public getSoldOutState(): State {
    return this.soldOutState;
  }

  public getNoQuarterState(): State {
    return this.noQuarterState;
  }

  public getSoldState(): State {
    return this.soldState;
  }

  public getCount(): number {
    return this.count;
  }

  public getState(): State {
    return this.state;
  }

  public getLocation(): string {
    return this.location;
  }
}
class SoldOutState implements State {
  gumballMachine:  GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuater() {
    console.log(`You can't insert a quarter, the machine is sold out`);
  }

  ejectQuater() {
    console.log(`You can't eject, you haven't inserted a quarter yet`);
  }

  turnCrank() {
    console.log(`You turned, but there's no gumballs`);
  }

  dispense() {
    console.log('No gumball dispensed');
  }
}

class NoQuarterState implements State {
  gumballMachine:  GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuater() {
    console.log('You inserted a quarter');
  }

  ejectQuater() {
    console.log(`You haven't inserted a quarter`);
  }

  turnCrank() {
    console.log(`You turned, but there's no quarter`);
  }

  dispense() {
    console.log('You need pay first');
  }
}

class HashQuarterState {
  gumballMachine:  GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuater() {
    console.log(`You can't insert another quarter`);
  }

  ejectQuater() {
    console.log(`Quarter returned`);
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }

  turnCrank() {
    console.log(`You turned...`);
    this.gumballMachine.setState(this.gumballMachine.getSoldState());
  }

  dispense() {
    console.log('No gumball dispensed');
  }
}

class SoldState {
  gumballMachine:  GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuater() {
    console.log(`Please wait, we're already giving you a gumball`);
  }

  ejectQuater() {
    console.log(`Sorry, you already turned the crank`);
  }

  turnCrank() {
    console.log(`Turning twice doesn't get you another gumball!`);
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if(this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      console.log('Oops, out of gumballs!');
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }
}
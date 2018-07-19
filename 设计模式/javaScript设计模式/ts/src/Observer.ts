/**
 * @class 订阅者模式
 * @description 定义了对象之间的一对多依赖，这样一来，当一个对象改变状态时，它的所有依赖者都会收到通知并自动更新
 */
interface Subject {
  registerObserver(o: Observer);
  removeObserver(o: Observer);
  notifyObserver();
}

interface Observer{
  update(temp: number, humidity: number, pressure: number)
}

interface DisplayElement{
  display();
}

export class WeatherData implements Subject{
  observers: Observer[] = [];
  temperature: number;
  humidity: number;
  pressure: number;

  constructor() {

  }

  registerObserver(o: Observer) {
    this.observers.push(o);
  }

  removeObserver(o: Observer) {
    let index = this.observers.indexOf(o);
    if(index > 0) {
      this.observers.splice(index, 1);
    }
  }

  notifyObserver() {
    for(let o of this.observers) {
      o.update(this.temperature, this.humidity, this.pressure);
    }
  }

  measurementChanged() {
    this.notifyObserver();
  }

  setMeasurements(temp: number, humidity: number, pressure: number) {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementChanged();
  }
}

export class DisplayBoard implements Observer, DisplayElement{
  temperatur: number;
  humidity: number;
  pressure: number;
  weatherData: Subject;
  fun: Function;

  // 添加自定义方法
  constructor(weatherData: Subject, fun:Function) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
    this.fun = fun;
  }

  update(temp: number, humidity: number, pressure: number) {
    this.temperatur = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.fun.apply(this, [this.temperatur, this.humidity, this.humidity]);
    //this.display();
  }

  display() {
    console.log(`当前温度：${this.temperatur}\n当前湿度: ${this.humidity}%\n当前气压: ${this.pressure}\n`);
  }
}

// import { WeatherData, DisplayBoard } from './Observer';

// let weather = new WeatherData();

// function funA (a:number, b:number, c:number) {
//   console.log(`当前温度：${a} 当前湿度: ${b}% 当前气压: ${c}\n`)
// }

// function funB (a:number, b:number, c:number) {
//   console.log(`当前温度：${a}\n 当前湿度: ${b}%\n当前气压: ${c}\n`)
// }


// let board1 = new DisplayBoard(weather, funA);
// let board2 = new DisplayBoard(weather, funB);

// weather.setMeasurements(20, 80, 100);
// weather.setMeasurements(10, 40, 50);

// weather.removeObserver(board2);

// weather.setMeasurements(30, 60, 90);
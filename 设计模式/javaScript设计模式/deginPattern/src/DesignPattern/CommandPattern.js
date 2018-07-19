/* 有时候需要向某些应用发送请求，但是并不知道请求的接受者是谁，也不知道被请求的
操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和接受者能够
消除彼此之间的耦合关系 */


// 定义命令执行的方法
const Actions = {
  attack: () => {
    console.log('attack');
  },
  defence: () => {
    console.log('defence');
  },
  jump: () => {
    console.log('jumb');
  },
  crouch: () => {
    console.log('crouch');
  }
};

// 组装命令
let makeCommand = function(receiver, state) {
  return () => {receiver[state]};
};

//命令
const commands = {
  '119': 'jumb',
  '115': 'crouch',
  '97': 'defense',
  '100': 'attack'
};

//命令栈
let conmmandStack = [];

//根据点击键值，组装命令，并且将它压入命令栈
document.onkeypress = function(ev) {
  let keyCode = ev.keyCode,
      command = makeCommand(Actions, command[keyCode]);
  if (command) {
    command();
    conmmandStack.push(command);
  }
};

// 使用 while循环将每条命令出栈并执行
document.getElementById('replay').onclick = function() {
  let command;
  while(command = conmmandStack.shift()) {
    command();
  }
}

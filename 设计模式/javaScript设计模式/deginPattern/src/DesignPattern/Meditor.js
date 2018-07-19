/* 中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象
   都通过中介者对象通信，而不是相互引用
*/

// 定义Player
function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
};
Player.prototype.win = function() {
  console.log(`${this.name}won!`);
};
Player.prototype.lose = function() {
  console.log(`${this.name}lose!`);
};
Player.prototype.die = function() {
  this.state = 'dead';
  playerDirector.ReceiveMessage('playerDead', this);
};
Player.prototype.remove = function() {
  playerDirector.ReceiveMessage('removePlayer',this);
};
Player.prototype.changeTeam = function(color) {
  playerDirector.ReceiveMessage('changeTeam', this, color);
};

// 玩家工厂
let playerFactory = function(name, teamColor) {
  let newPlayer = new Player(name, teamColor);
  playerDirector.ReceiveMessage('addPlayer',newPlayer);
  return newPlayer;
};

// 中介者
let playerDirector = (function() {
  let players = {},
      operations = {};
  // 增加玩家
  operations.addPlayer = function(player) {
    let teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  };
  // 移除玩家
  operations.removePlayer = function(player) {
    let teamColor = player.teamColor;
        teamPlyers = players[teamColor] || [];
    for (let i = teamPlyers.length - 1;i >= 0;i--){
      if (teamPlyers[i] === player) {
        teamPlyers.splice(i, 1);
      }
    }
  };
  // 玩家换队
  operations.changeTeam = function(player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };
  // 玩家死亡
  operations.playerDead = function(player) {
    let teamColor = player.teamColor,
        teamPlyers = players[teamColor];
    let all_dead = true;
    for (let i = 0, player;player = teamPlyers[i++];){
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }
    if (all_dead === true) {
      for (let i = 0,player; player = teamPlyers[i++];) {
        player.lose();
      }
      for (let color in players) {
        if (color !== teamColor) {
          let teamPlyers = players[color];
          for (let i = 0, player;player = teamPlyers[i++];) {
            player.win();
          }
        }
      }
    }
  };
  let ReceiveMessage = function() {
    let message = Array.prototype.shift.call(arguments);
    operations[message].apply(this,arguments);
  };
  return {
    ReceiveMessage
  }

})();

let player1 = playerFactory('皮蛋', 'red');
let player2 = playerFactory('小乖', 'red');
let player3 = playerFactory('宝宝', 'blue');
let player4 = playerFactory('小强', 'blue');

player1.die();
player2.die();

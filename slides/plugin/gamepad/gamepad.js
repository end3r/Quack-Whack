var gamepadAPI = {
	controller: {},
	turbo: false,
	connect: function(evt) {
		console.dir(evt.gamepad);
		gamepadAPI.controller = evt.gamepad;
		gamepadAPI.turbo = true;
		console.log('Gamepad connected.');
	},
	disconnect: function(evt) {
		gamepadAPI.turbo = false;
		delete gamepadAPI.controller;
		console.log('Gamepad disconnected.');
	},
	update: function() {
		gamepadAPI.buttonsCache = [];
		for(var k=0; k<gamepadAPI.buttonsStatus.length; k++) {
			gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
		}
		gamepadAPI.buttonsStatus = [];
		var c = gamepadAPI.controller || {};
		var pressed = [];
		if(c.buttons) {
			for(var b=0,t=c.buttons.length; b<t; b++) {
				if(c.buttons[b].pressed) {
					pressed.push(gamepadAPI.buttons[b]);
				}
			}
		}
		var axes = [];
		if(c.axes) {
			for(var a=0,x=c.axes.length; a<x; a++) {
				axes.push(c.axes[a].toFixed(2));
			}
		}
		gamepadAPI.axesStatus = axes;
		gamepadAPI.buttonsStatus = pressed;
		return pressed;
	},
	buttonPressed: function(button, hold) {
		var newPress = false;
		if(button != 0 && button != 1) {
			//console.log(button);
		}
		for(var i=0,s=gamepadAPI.buttonsStatus.length; i<s; i++) {
			if(gamepadAPI.buttonsStatus[i] == button) {
				newPress = true;
				console.log(i,gamepadAPI.buttonsStatus[i]);
				if(!hold) {
					for(var j=0,p=gamepadAPI.buttonsCache.length; j<p; j++) {
						if(gamepadAPI.buttonsCache[j] == button) {
							newPress = false;
						}
					}
				}
			}
		}
		return newPress;
	},
	buttons: [ // XBox360 layout
		'DPad-Up','DPad-Down','DPad-Left','DPad-Right',
		'Start','Back','Axis-Left','Axis-Right',
		'LB','RB','Power','A','B','X','Y','B3','B4'
	],
	buttonsCache: [],
	buttonsStatus: [],
	axesStatus: []
};
window.addEventListener("gamepadconnected", gamepadAPI.connect);
window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);

function runAnimation() {
    window.requestAnimationFrame(runAnimation);
    gamepadAPI.update();
    if(gamepadAPI.buttonPressed('DPad-Up')) {
      Reveal.navigateNext();
    }
    if(gamepadAPI.buttonPressed('DPad-Down')) {
      Reveal.navigatePrev();
    }
    // if(gamepadAPI.buttonPressed('B4')) {
    //   Reveal.navigatePrev();
    // }
    // if(gamepadAPI && gamepadAPI.controller && gamepadAPI.controller.buttons) {
    // 	console.log(gamepadAPI.controller.buttons[0]);
    // 	Reveal.navigateNext();
    // }

}
window.requestAnimationFrame(runAnimation);
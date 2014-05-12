(function(input){
	new Incrementable(input);
	
	(input.oninput = function() {
		var length = input.value.length;
		
		input.style.fontSize = length >= 15? (length > 25? '150%' : '200%') : (length <= 10? '400%' : '');
		
		var color = Color.fromString(input.value);
		
		if (!color) {
			return;
		}
		
		document.body.style.background = color;
		
		input.style.color = color.luminance > 50 || color.alpha < .5? 'black' : '';
		
		// tell server to execute 'sendchat' and send along one parameter
		//console.log(+color + 0, (+color).toString(16));
		
		self.socket && socket.emit('color', +color);
	})();
	
})(document.getElementsByTagName('input')[0]);
var btn = document.createElement("BUTTON");
btn.setAttribute("id","mlgb");
var t = document.createTextNode("GOTTA GO FAST M8");
btn.appendChild(t);
btn.onclick = function(){
	stopint = setInterval(function(){Runner.instance_.setSpeed(0.0000000001)},1);
	var ssheet = document.createElement('style');
	ssheet.innerHTML = "#spdt {position: absolute; left: 0; top: 0; font-size: 350%;}";
	document.body.appendChild(ssheet);
	var ptext = document.createElement("P");
	ptext.setAttribute("id","spdt");
	t = document.createTextNode("STOP");
	ptext.appendChild(t);
	document.body.appendChild(ptext);
	setTimeout(function(){
		curi = 0;
		ptext.style.opacity = "0";
		ptext.innerHTML = "SPEED 10000";
		setTimeout(function(){
			notes = [
			[659, 4],
			[659, 4],
			[659, 4],
			[523, 8],
			[0, 16],
			[783, 16],
			[659, 4],
			[523, 8],
			[0, 16],
			[783, 16],
			[659, 4],
			[0, 4],
			[987, 4],
			[987, 4],
			[987, 4],
			[1046, 8],
			[0, 16],
			[783, 16],
			[622, 4],
			[523, 8],
			[0, 16],
			[783, 16],
			[659, 4]
		];

		notes.reverse(); 
		tempo = 100;

		// create web audio api context
		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

		function playMelody(){
			if (notes.length > 0){
				note = notes.pop();
				playNote(note[0],1000*256/(note[1]*tempo));
			}
		}

		function playNote(frequency, duration) {
			curi = curi + 0.045;
			// create Oscillator node
			var oscillator = audioCtx.createOscillator();
			
			oscillator.type = 'square';
			oscillator.frequency.value = frequency; // value in hertz
			oscillator.connect(audioCtx.destination);
			oscillator.start();

			ptext.style.opacity = curi;
				
			setTimeout(
				function(){
					oscillator.stop();
					playMelody();
				}, duration);
		}

		playMelody();
		setTimeout(function(){
			clearInterval(stopint);
			setTimeout(function(){
				ptext.innerHTML = "GO";
				Runner.instance_.setSpeed(10000);
				document.body.removeChild(btn);
			},1000)
		},10000);
		},1000);
	},2000);
};
document.body.appendChild(btn);
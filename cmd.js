var commands = {
	"add": function(args){addgoto(args[0], args[1])},
	"rem": function(args){remove(args[0])},
	"time": function(){time()},
	"r": function(){gototab('http://www.reddit.com/r/dota2/')},
	"re": function(){process('r')},
	"reddit": function(){process('r')},
	"f": function(){gototab('http://facebook.com')},
	"fb": function(){process('f')},
	"facebook": function(){process('f')},
	"t": function(){gototab('http://www.twitch.tv/directory/game/Dota%202')},
	"twitch": function(){process('t')},
	"y": function(){gototab('http://www.youtube.com/feed/subscriptions/u')},
	"yt": function(){process('y')},
	"youtube": function(){process('y')},
	"help": function(args){help(args[0])}
};

window.addEventListener('load', init);

function init() {
	console.log('init');
	print('<span style="color: #fff">--- newtab.cmd --- </span><a href="http://euqsec.com" style="color:#737373">created by @cesque<span>');
	nextLine();
	document.onkeypress = enterPress;
	window.focus();
}

function nextLine() {
	//add a new input next box
	var d = document.createElement('div');
	d.className = 'line';
	var p = document.createElement('p');
	p.innerHTML = '>';
	d.appendChild(p);
	var f = document.createElement('input');
	d.appendChild(f);
	document.getElementById('container').appendChild(d);
	
	//disable them all
	var elements = document.getElementsByTagName('input');
	for (var i=0; i < elements.length-1; i++) {
		elements[i].disabled = 'true';
	}
	focusLast();
	
	console.log('next line');
}

function enterPress(e) {
    if (e.keyCode == 13) {
		submit();
		nextLine();
		console.log('enter pressed');
	}
	console.log('keypressed');
}

function focusLast() {
	var elements = document.getElementsByTagName('input');
	for (var i=0; i < elements.length-1; i++) {
		elements[i].disabled = 'true';
		elements[i].onblur = null;
	}
	elements[elements.length-1].onblur = function() {focusLast();};
	elements[elements.length-1].focus();
}

function submit() {
	var elements = document.getElementsByTagName('input');
	var cmd = elements[elements.length-1].value;
	process(cmd);
}

function process(c) {
	var words = c.split(' ');
	var cmd = words[0];
	words.splice(0,1);
	if(commands[cmd] != null) {
		console.log("running command '" + commands[cmd] + "' with args '" + words + "'");
		commands[cmd](words);
	} else {
		print('Command not found.');
	}
}

function print(text) {
	var d = document.createElement('div');
	d.className = 'line';
	var p = document.createElement('p');
	p.innerHTML = ' ';
	d.appendChild(p);
	var f = document.createElement('p');
	f.className = 'response';
	f.innerHTML = text;
	d.appendChild(f);
	document.getElementById('container').appendChild(d);
}

function goto(url) {
	console.log('going to ' + url);
	print('Navigating to ' + url + '.');
	window.location.href = url;
}

function gototab(url) {
	console.log('going to ' + url);
	print('Opening ' + url + '.');
	openNewBackgroundTab(url);
}

//http://stackoverflow.com/questions/10812628/open-a-new-tab-in-the-background
function openNewBackgroundTab(url){
    var a = document.createElement('a');
    a.href = url;
    var evt = document.createEvent('MouseEvents');
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0,
                                true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}

function remove(command) {
	try {
		if(command === 'rem' || command === 'add') {
			error('Cannot remove system functions.')
			return;
		}
		print("Removing command '" + command + "'.");
		delete commands[command];
	} catch(e) {
		error("Could not execute command.");
	}
}

function add(command, func) {
	console.log(command + ' , ' + func);
	commands[command] = func;
}

function addgoto(command, url) {
	try {
		var s = url;
		if (!s.match(/^[a-zA-Z]+:\/\//))
		{
			s = 'http://' + s;
		}
		console.log(command + ' , ' + s);
		print("Adding command '" + command + "' with URL '" + s + "'.");
		add(command, function(){gototab(s)});
	} catch(e) {
		error("Could not execute command.");
	}
}

function help(cmd) {
	if(cmd != null) {
		if(cmd == 'add') {print('Adds an alias command that loads a URL in a new tab.<br />Syntax: <span style="color: #A6F056">add (alias) (url)</span>'); return;};
		if(cmd == 'rem') {print('Removes a command.<br />Syntax: <span style="color: #A6F056">rem (alias)</span>'); return;};
		if(cmd == 'youtube' || cmd == 'yt' || cmd == 'y')  {print('loads your youtube subscriptions in a new tab.'); return;};
		if(cmd == 'twitch' || cmd == 't')  {print('loads twitch.tv in a new tab.'); return;};
		if(cmd == 'r' || cmd == 're' || cmd == 'reddit')  {print('loads your reddit front page in a new tab.'); return;};
		if(cmd == 'f' || cmd == 'fb' || cmd == 'facebook')  {print('loads facebook in a new tab.'); return;};
		print("No help found for command '" + cmd + "'.");
		return;
	}
	//this is all dumb
	var s = 'Syntax: <span style="color: #A6F056">help (command)</span><br />Commands: ';
	var a = [];
	for(var q in commands) {
		a.push(q);
	}
	s+=a[0];
	for(var i = 1; i<a.length; i++) {
		s+=', ' + a[i];
	}
	s+='.';
	print(s);
}

function error(s) {
	var q = '<span style="color: #ed6161">' + s + '</span>';
	print(q);
}

function time() {
	var now = new Date(); 
	var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
	if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
	print('The time/date is ' + day + '/' + month + '/' + year + ' ' + hour + ':' + minute + '.');
}
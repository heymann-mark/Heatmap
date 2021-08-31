AnimationPlayer.prototype = {
		init : function() {
			this.interval = setInterval(function(){
				if(this.currentFrame < frames){
					++this.currentFrame;
					this.setFrame(this.currentFrame);
					var snapshot = this.data[this.currentFrame];
					this.heatmap.setData(this.data[this.currentFrame]);
				}
			}.bind(this), this.animationSpeed);
			var events = document.createElement('div');
			this.setFrame(0);
			this.interval =
				setInterval(function() {}.bind(this), this.animationSpeed);
		},
		setFrame : function(frame) {
			if(frame< frames){
				this.currentFrame = frame;
				var snapshot = this.data[frame];
				this.heatmap.setData(snapshot);
			}
		}
};
function addCanvas(event, show){//show is true or false

	var events = [];
	var data = {};
	data[event] = true;
	$.ajax({
		url: 'fetchHeatmap.php',
		type: 'POST',
		data: data,
		dataType: "html",
		success: function(response){
    console.log(response);
			var temp = jQuery.parseJSON(response);

			events['event'] = temp['event'];
			for(var j = 0; j < temp[temp['event']]['x'].length; j++){
				events[j] = { x: temp[temp['event']]['x'][j],
						      y: temp[temp['event']]['y'][j],
                              value: temp[temp['event']]['v'][j]
				};
			}

			function drawHeatmaps(events){
				var configs = {};
				var animationData = [];
				if(events['event'] != undefined){
					idHeatmap = "heatmap"+ events['event'];
					if (heatmapInstances[idHeatmap]===undefined){
						configs[idHeatmap] ={
								container: document.getElementById('heatMap'),
								gradient: getGradient(events['event']),
								radius: 40,
								maxOpacity: 1,
								minOpacity: 0,
								blur: 1,
						};
						heatmapInstances[idHeatmap] = h337.create(configs[idHeatmap]);
					}
					if(show){
						for (var j = 0; j < frames + 1; j++) {
							animationData.push(FadeInData(events,j));
						}
					}else{
						if(events['event'] == event ){
							idHeatmap = "heatmap" + events['event'];
							for (var j = 0; j < frames + 1; j++) {
								if(events['event']==event)
									animationData.push(FadeOutData(events,j));
							}
							var resetdata= { max: 0,
								 	   	 	min: 0,
								 	   	 	data: {x: "0", y: "0", radius: "0", value: "0"}
							};
							heatmapInstances[idHeatmap].setData(resetdata);
						}
					}
					var player = new AnimationPlayer({
						heatmap : heatmapInstances[idHeatmap],
						wrapperEl : document.querySelector('.heatmap'),
						data : animationData,
						animationSpeed :animation_speed
					});

				}

			}
			drawHeatmaps(events);
		}
	});
}
function getTintedColor(color, v) {
	if (color.length >6) {
		color= color.substring(1,color.length)
	}
	var rgb = parseInt(color, 16);
	var r = Math.abs(((rgb >> 16) & 0xFF)+v);
	if (r>255)
		r=r-(r-255);
	var g = Math.abs(((rgb >> 8) & 0xFF)+v);
	if (g>255)
		g=g-(g-255);
	var b = Math.abs((rgb & 0xFF)+v);
	if (b>255)
		b=b-(b-255);
	r = Number(r < 0 || isNaN(r)) ? 0 : ((r > 255) ? 255 : r).toString(16);
	if (r.length == 1)
		r = '0' + r;
	g = Number(g < 0 || isNaN(g)) ? 0 : ((g > 255) ? 255 : g).toString(16);
	if (g.length == 1)
		g = '0' + g;
	b = Number(b < 0 || isNaN(b)) ? 0 : ((b > 255) ? 255 : b).toString(16);
	if (b.length == 1)
		b = '0' + b;
	return "#" + r + g + b;
}
function getGradient (event){
	var gradient;
	var colorsArray ={
			'puck_recovery':'#9400d3',//DarkViolet-puck_recovery
			'hit':'#ff0080',//Hot Pink-hit
			'blocked_shot':'#00ffff',//Aqua-blocked_shot
			'missed_shot':'#ffff00',//Yellow-missed_shot
			'shot_attempt':'#fffacd',//Lemon_chiffon
			'shot':'#0000ff',//Blue-shot(actually a shot)
			'penalty':'#ff9d00',//PapayaWhip-penalty
			'pass':'#00ff00',//Lime-pass
			'zone_exit':'#ff1493',//DeepPink-zone-exit
			'goal':'#ff0000', //Red-goal
			'giveaway_takeaway':'#f08080',//LightCoral-giveaway_takeaway
			'faceoff':'#fffacd',//LemonChiffin-face_off
			'zone_entry':'#ff8c00'//Dark orange-zone-entry
	};
	gradient = {
			'1': getTintedColor(colorsArray[event], 100),
			'0': getTintedColor(colorsArray[event], 100)
	};
	return gradient;
};
function FadeOutData(events, v) {
	var points = [];
	var max = 0;
	var width = 840;
	var height = 400;
	for (var j=0; j<events.length;j++){
		var point = {x: events[j].x,
				     y: events[j].y,
				     value: (events[j].value -  events[j].value*v/frames)
		}
		points.push(point);
	}
	var data = {max: 100,
			    min: 0,
			    data: points
	};
	return data;
}
function FadeInData(events, v) {
	var points = [];
	var max = 0;
	var width = 840;
	var height = 400;
	for (var j=0; j<events.length;j++){
		var point = {x: events[j].x,
					 y: events[j].y,
					 value:  events[j].value*v/frames
		}
		points.push(point);
	}
	var data = {max: 100,
				min: 0,
				data: points
	};
	return data;
}
function AnimationPlayer(options) {
	this.heatmap = options.heatmap;
	this.data = options.data;
	this.wrapperEl = options.wrapperEl;
	this.init();
	clearInterval(this.interval);
};

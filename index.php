<html>
	<head>
		<link rel="stylesheet" type="text/css" href="style.css">
		<script type="text/javascript" src="js/jquery-3.4.1.js"> </script>
		<script  type="text/javascript" src="js/animation.js"></script>
		<script  type="text/javascript" src="js/heatmap.js"></script>
		<script src="js/heatmap.min.js.download"></script>
	</head>
	<body>

		<div id="checkboxcontainer" style="float: right">
			<p>
				<input type="checkbox" id=goal > goal <br>
				<input type="checkbox" id=pass > pass <br>
				<input type="checkbox" id=hit > hit <br>
				<input type="checkbox" id=puck_recovery > puck recovery <br>
				<input type="checkbox" id=shot_attempt > shot attempt <br>
				<input type="checkbox" id=shot > save <br>
				<input type="checkbox" id=blocked_shot > blocked shot <br>
				<input type="checkbox" id=missed_shot > missed shot <br>
				<input type="checkbox" id=penalty > penalty <br>
				<input type="checkbox" id=zone_exit > zone_exit <br>
				<input type="checkbox" id=giveaway_takeaway >giveaway takeaway <br>
				<input type="checkbox" id=faceoff > faceoff <br>
				<input type="checkbox" id=zone_entry >zone entry <br>
			</p>
		</div>
		<div id='heatMap' style="height: 742px; float:left">
			<canvas width="1050" height="742" style="left: 0; top: 0"></canvas>	</div>
	</body>
</html>

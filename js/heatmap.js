/*
Individual checkboxes are all held together in the container "checkboxcontainer"
Once a change is made to any element of checkbox container
all elements are examined to see if the box is checked, and if the event
is in the displayed array. The displayed array is necessary because
if a box is not checked, you only want to call addCanvas(this.id, false)(remove the heatmap),
if it's being displayed.
*/
var heatmapInstances = {};//each event gets it's own heatmap instance
var frames = 10;//more frames = slower fadein, fadeout
var animation_speed = 300;//another way to control the speed of animation
var displayed =[];//events in this array are being displayed currently	
$(document).ready(function() {	
	$("#checkboxcontainer").change(function(){//If any element in checkbox container has changed
	    $('#checkboxcontainer input[type="checkbox"]').each(function(){//for each checkbox
	        if($(this).is(":checked")){//if that checkbox is checked
	        	if(!displayed.includes(this.id)){//if that event is not currently displayed
	        		addCanvas(this.id, true);//add the heatmap
	        		displayed.push(this.id);	
	        	}
	        }else{
	        	if(displayed.includes(this.id)){
	        		addCanvas(this.id, false);//remove the heatmap
	        		displayed.splice(displayed.indexOf(this.id), 1);
	        	}	
	         }
	    });
	});
});
    	(function() {
    	
    		function Radar(canvas, coords, rangeInMeters, xoffset, yoffset) {
    			var self = {};
    			var userTracker = canvas.getContext("2d");

    			
    			var factor = canvas.width / rangeInMeters;
    			
    			
    			function calcPos(joinpoint){
        	    	var x = ((joinpoint.position[coords.x] + xoffset) * factor) + (canvas.width / 2) ;
        	        var y = ((joinpoint.position[coords.y] + yoffset) * factor * (coords.y ==1 ?-1:1 )) + (canvas.height / 2) ;
        	        return {x:x, y:y};
        	    };
        	    
        	    function line(skeleton, jp1, jp2) {
        	        var a = calcPos(skeleton[jp1]);
        	        var b = calcPos(skeleton[jp2]);  
        	        userTracker.beginPath();
        	        userTracker.moveTo(a.x,a.y);
        	        userTracker.lineTo(b.x,b.y);
        	        userTracker.lineWidth = 4	;
        	        userTracker.stroke();
        	    }
        	    
        	    function head(user){
        	    	var headCords = calcPos(user.skeleton[zig.Joint.Head]);
    				userTracker.beginPath();
    	        	userTracker.arc(headCords.x, headCords.y, 15 , 0, 2 * Math.PI);
    	        	userTracker.fill();
        	    }
        	    
				self.onuserupdate = function(user) {
    				
    		        userTracker.clearRect ( 0 , 0 , canvas.width  , canvas.height );
    		        
    		        head(user);
    	            
	 	            line(user.skeleton, zig.Joint.Head, zig.Joint.Neck);
	 	            line(user.skeleton, zig.Joint.Neck, zig.Joint.LeftShoulder);
	 	            line(user.skeleton, zig.Joint.Neck, zig.Joint.RightShoulder);
	 	            line(user.skeleton, zig.Joint.RightShoulder, zig.Joint.RightElbow);
	 	            line(user.skeleton, zig.Joint.RightShoulder, zig.Joint.RightHip);
	 	            line(user.skeleton, zig.Joint.RightHip, zig.Joint.LeftHip);
	 	            line(user.skeleton, zig.Joint.LeftShoulder, zig.Joint.LeftHip);
	 	            line(user.skeleton, zig.Joint.RightElbow, zig.Joint.RightHand);
	 	            line(user.skeleton, zig.Joint.RightHip, zig.Joint.RightKnee);
	 	            line(user.skeleton, zig.Joint.RightKnee, zig.Joint.RightFoot);
	 	            line(user.skeleton, zig.Joint.LeftShoulder, zig.Joint.LeftElbow);
	 	            line(user.skeleton, zig.Joint.LeftElbow, zig.Joint.LeftHand);
	 	            line(user.skeleton, zig.Joint.LeftHip, zig.Joint.LeftKnee);
	 	            line(user.skeleton, zig.Joint.LeftKnee, zig.Joint.LeftFoot);
    			};
    			
    			return self;
    		}
    		
    		var frontView = new Radar(document.getElementById('userTrackerFront'), {x:0, y: 1}, 4000, 0, 0);
    		var topView = new Radar(document.getElementById('userTrackerSide'), {x:2, y:1}, 4000, -2000, 0);
    		var sideView = new Radar(document.getElementById('userTrackerTop'), {x:0, y: 2}, 4000, 0, -2000);
    		
    		var engager = zig.EngageUsersWithSkeleton(3);
    		engager.addEventListener('userengaged', function(user) {
    			user.addListener(frontView);
    			user.addListener(topView);
    			user.addListener(sideView);
    			console.log('User engaged: ' + user.id);
    		});
    		engager.addEventListener('userdisengaged', function(user) {
    			console.log('User disengaged: ' + user.id);
    		});
    		zig.addListener(engager);
    	})();
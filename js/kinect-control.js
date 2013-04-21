(function() {
	var api = impress();
	
	var engager = zig.EngageUsersWithSkeleton(2);
	engager.addEventListener('userengaged',	function(user) {
		console.log("user engaged FFFF");

		var hsd = zig.HandSessionDetector();
		user.addListener(hsd);
			
		var swipeDetector = zig.controls.SwipeDetector();
		swipeDetector.addEventListener('swipeleft', function(pd) {

		});
		swipeDetector.addEventListener('swiperight', function(pd) {

		});
		hsd.addListener(swipeDetector);
		var pushDetector = zig.controls.PushDetector();
		pushDetector.addEventListener('click', function(pd) {
			api.next();
		});
		hsd.addListener(pushDetector);

		var pushDetector = zig.controls.WaveDetector();
		pushDetector.addEventListener('wave', function(pd) {
			api.prev();
		});
		hsd.addListener(pushDetector);
		
		
	});
	zig.addListener(engager);
})();
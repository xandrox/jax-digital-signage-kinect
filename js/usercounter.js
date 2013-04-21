(function() {
	var usersFound = document.getElementById("usersFound");
	var usersEngaded = document.getElementById("usersEngaded");

	console.log("Browser plugin installed: " + zig.pluginInstalled);
	console.log("Browser plugin version: " + zig.pluginVersion);
	console.log("Zig.js version: " + zig.version);
	zig.addEventListener('statuschange', function() {
		console.log("Sensor connected: " + zig.sensorConnected);
	});
	var usersFoundCount = 0;
	var usersEngadedCount = 0;

	// Method 1: specific event listeners
	zig.addEventListener('userfound', function(user) {
		usersFoundCount++;
		usersFound.innerText = usersFoundCount;
	});
	zig.addEventListener('userlost', function(user) {
		usersFoundCount--;
		usersFound.innerText = usersFoundCount;
	});

	var engager = zig.EngageUsersWithSkeleton(6);
	engager.addEventListener('userengaged', function(user) {
		usersEngadedCount++;
		usersEngaded.innerText = usersEngadedCount;

	});
	engager.addEventListener('userdisengaged', function(user) {
		usersEngadedCount--;
		usersEngaded.innerText = usersEngadedCount;
	});
	zig.addListener(engager);
})();
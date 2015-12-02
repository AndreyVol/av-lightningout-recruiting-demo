
function forceInit() {
	force.init(config);
};

function forceLogin(key) {
	forceInit();
	force.login(function(success) {
		var oauth = force.getOauth();
		setupLightning();
	});	
}

var _lightningReady = false;

function setupLightning(callback) {
	var appName = config.loApp;
	var oauth = force.getOauth();
    if (!oauth) {
        alert("Please login to Salesforce.com first!");
        return;
    }

	if (_lightningReady) {
		if (typeof callback === "function") {
			callback();
		}
	} else {
	    // Transform the URL for Lightning
	    var url = oauth.instanceUrl.replace("my.salesforce", "lightning.force");

	    $Lightning.use(appName, 
	        function() {
				_lightningReady = true;
				document.getElementById("chatterFeedButton").style.display = "";
				document.getElementById("iFollowButton").style.display = "";
				document.getElementById("loginHistoryButton").style.display = "";
				if (typeof callback === "function") {
					callback();
				}
	        }, url, oauth.access_token);
	}
}

function createChatterFeed(type, subjectId) {
	clearAllComponents();
    setupLightning(function() {
		$Lightning.createComponent("forceChatter:feed", {type: type, subjectId: subjectId}, "chatterFeed"); 
    });
}

function createIFollowComponent(){
	clearAllComponents();
	setupLightning(function(){
		$Lightning.createComponent("roreblciflw3:IFollowList", null, "iFollowComponent");
	})
}

function createLoginHistoryComponent(){
	clearAllComponents();
	setupLightning(function(){
		$Lightning.createComponent("roreblcloghist:UsersLoginHistory", null, "loginHistoryComponent");
	})
}

function clearAllComponents(){
	document.getElementById("chatterFeed").style.display = "none";
	document.getElementById("iFollowComponent").style.display = "none";
	document.getElementById("loginHistoryComponent").style.display = "none";
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

var firebaseConfig = {
	apiKey: "AIzaSyBKAwkyB9ErBhkpYCsa3iox_BXo36wpeHE",
	authDomain: "dcirrusioweb-1585187324963.firebaseapp.com",
	projectId: "dcirrusioweb-1585187324963",
	storageBucket: "dcirrusioweb-1585187324963.appspot.com",
	messagingSenderId: "1006037658907",
	appId: "1:1006037658907:web:f045d9f887de0843fb77be",
	measurementId: "G-H814RERD8N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
var tokenStr = "";

function initializeFirebaseMessaging() {
	messaging.requestPermission()
	.then(function(){
		console.log("Notification Permission");
		return messaging.getToken();
	})
	.then(function(token){
		console.log("token : " + token);
		tokenStr = token;
		if((window.location.href).indexOf("drive.html") > 0){
			var sm = {"attribute1":token,"attribute2":"admUpdateUserWebNotifTokenServiceAfter"};
			admUpdateUserWebNotifTokenService(sm);
		}
	})
	.catch(function(reason){
		console.log(reason);
	});
}

messaging.onMessage(function(payload){
	console.log("config : "+payload);
	console.log(payload.data);
	try{
		if(navigator.userAgent.indexOf("Chrome") != -1) {
			storeNotification(payload.data);
		}
	}catch(error){}
});

messaging.onTokenRefresh(function(){
	messaging.getToken()
		.then(function(newToken){
			console.log("new token : " + newToken);
			if((window.location.href).indexOf("drive.html") > 0){
				var sm = {"attribute1":token,"attribute2":"admUpdateUserWebNotifTokenServiceAfter"};
				admUpdateUserWebNotifTokenService(sm);
			}
		})
		.catch(function(reason){
				console.log(reason);
		});
});

function admUpdateUserWebNotifTokenServiceAfter(response){

}

function refreshToken(){
	messaging.deleteToken();
	messaging.getToken();
}


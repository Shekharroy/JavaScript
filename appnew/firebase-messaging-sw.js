//importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js");
//importScripts("https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js");


importScripts("https://dcirrus.co.in/appnew/assets/js/firebase_app.js");
importScripts("https://dcirrus.co.in/appnew/assets/js/firebase_messaging.js");

self.addEventListener("notificationclose", console.log);

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
messaging.setBackgroundMessageHandler(payload => {
  	const title = payload.data.title
  	const options = {
    	body: payload.data.body,
    	icon: "http://localhost/appnew/assets/img/logo1_1.png",
    	data: payload.data,
  	};

	var json = JSON.stringify(payload.data);
  	clients.matchAll({ includeUncontrolled: true }).then(clientz => {
    	clientz.forEach(client => {
      		sendMessageToClient(client, json)
    	});
  	});
  	return self.registration.showNotification(title, options)
});

const sendMessageToClient = (client, message) => {
  	const messageChannel = new MessageChannel()
  	client.postMessage(message, [messageChannel.port2])
};

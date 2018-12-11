import io from 'socket.io-client';

// const reportSocket = io('http://localhost:9092');
const isLoadingNativePrint = false;
let printSocket;
let printLoadingDialog;
let printPreviewTimer;
let floatRegexText = '^\\d+(\\.\\d+)?$';

if (printSocket == null) {
	printSocket = io('http://localhost:9092');
} else {
	printSocket.removeAllListeners();
	if (!printSocket.connected) {
		printSocket.connect();
	}
}
console.log('init');
printSocket.on('connect', function () {
	console.warn(`与打印客户端[${printSocket.id}]建立连接`);
});
printSocket.on('disconnect', function () {
	console.warn(`与打印客户端[${printSocket.id}]失去连接`);
});
printSocket.on('chat message', function (msg) {
	io.emit('chat message', msg);
	console.log('Message');
});


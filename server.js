const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

function selectionSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let min = i;
		io.emit(
			"chat message",
			`selectionSort at loop ${i}: ${arr} and min is: ${min}`
		);
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] < arr[min]) {
				min = j;
			}
		}
		if (min !== i) {
			let tmp = arr[i];
			arr[i] = arr[min];
			arr[min] = tmp;
		}
	}
	return arr;
}

function merge(left, right) {
	let result = [];
	while (left.length && right.length) {
		if (left[0] < right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}
	while (left.length) result.push(left.shift());
	while (right.length) result.push(right.shift());
  io.emit("chat message", `merging: ${result} `);
	return result;
}

function mergeSort(arr) {
  io.emit("chat message", `splitting: ${arr} `);
	if (arr.length < 2) return arr;
	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

function bubbleSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let notSwapped = true;
		for (let j = 0; j < arr.length; j++) {
			if (arr[j] > arr[j + 1]) {
				notSwapped = false;
				let tmp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = tmp;
			}
			io.emit("chat message", `bubbleSort at loop (${i}, ${j}) is: ${arr} `);
			if (notSwapped) return arr;
		}
	}
	return arr;
}

function insertionSort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let j = i - 1;
		let tmp = arr[i];
		while (j >= 0 && tmp < arr[j]) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = tmp;
		io.emit("chat message", `insertionSort at loop ${i} is: ${arr} `);
	}
	return arr;
}

io.on("connection", (socket) => {
	console.log("A user connected");

	socket.on("disconnect", () => {
		console.log("User disconnected");
	})

	.on("chat message", (msg) => {
		console.log("message: " + msg);
	})

	.on("selectionSort", (arr) => {
    io.emit("chat message", `\nselectionSort is started`);
		selectionSort(arr);
	})

	.on("bubbleSort", (arr) => {
    io.emit("chat message", `\nbubbleSort is started`);
		bubbleSort(arr);
	})

	.on("insertionSort", (arr) => {
    io.emit("chat message", `\ninsertionSort is started`);
		insertionSort(arr);
	})

  .on("mergeSort", (arr) => {
    io.emit("chat message", `\nmergeSort is started`);
    mergeSort(arr);
	})

	.on("error", (err) => {
		console.log(err);
	});

});

http.listen(3000, () => {
	console.log("Listening on *:3000");
});

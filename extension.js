// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

var request = require('request');



var options = {
	'method': 'GET',
	'url': 'https://api.huobi.pro/market/history/kline?symbol=filusdt&period=1min&size=1',
	'headers': {
	}
};
let myStatusBarItem;
let presentCoin = "FIL/USDT";
function activate({ subscriptions }) {

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);

	myStatusBarItem.show()
	const myCommandId = 'sample.showSelectionCount';
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		showInputBox()
	}));
	myStatusBarItem.command = myCommandId;
	setInterval(function () {
		console.log(123123)

		request(options, function (error, response) {
			if (error) throw new Error(error);
			console.log(response.body);
			const obj = JSON.parse(response.body);
			myStatusBarItem.text = `${presentCoin}:${obj.data[0].close}`
			console.log(myStatusBarItem.text)
		});

		// myStatusBarItem.text = `${i}`
	}, 3000)

}
async function showInputBox() {
	let result = await vscode.window.showInputBox({
		value: '',
		valueSelection: [0, 3],
		placeHolder: 'input coin name',

	});
	presentCoin = result.toUpperCase()
	result = result.replace("/", "")
	vscode.window.showInformationMessage(`Got: ${result}`);
	options = {
		'method': 'GET',
		'url': `https://api.huobi.pro/market/history/kline?symbol=${result}&period=1min&size=1`,
		'headers': {
		}
	};
}
// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}

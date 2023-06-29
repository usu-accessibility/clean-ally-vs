// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "clean-ally-vs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('clean-ally-vs.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Get the current text editor
        let editor = vscode.window.activeTextEditor; 
        const selection = editor.selection
        let htmlCodeText  = editor.document.getText(selection);

		if(htmlCodeText === ""){
			const document = editor.document;
			const entireRange = new vscode.Range(0, 0, document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
			const entireSelection = new vscode.Selection(entireRange.start, entireRange.end);
			editor.selection = entireSelection;

			htmlCodeText = editor.document.getText(entireSelection);
		}

		const apiUrl = "https://iq33vfcxl8.execute-api.us-east-1.amazonaws.com/default/parseHtml";

		const data = {
			html: htmlCodeText,
			access_token: "enter the access token",
			mode: 'clean_ally_for_canvas'
		};

		axios.post(apiUrl, data)
			.then(response => {
				htmlCodeText = response.data;
				editor.edit(builder => builder.replace(selection, htmlCodeText));
				// Display a message box to the user
				vscode.window.showInformationMessage('Cleaned out extraneous HTML successfully');
			})
			.catch(error => {
				console.error(error);
			});
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

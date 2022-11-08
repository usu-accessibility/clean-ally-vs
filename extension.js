// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const {getParsedPTagCode} = require('./remove-p-tag');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "clean-ally" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('clean-ally.cleanAlly', function () {
		// The code you place here will be executed every time your command is executed
		// Get the current text editor
		let editor = vscode.window.activeTextEditor; 
		const selection = editor.selection
		let htmlCodeText  = editor.document.getText(selection);

		// Search and replace happens below

		// THINGS TO REMOVE

		const searchLang = /.lang="....."/g;
		const replaceLang = "";

		const searchDir = /.dir="..."/g;
		const replaceDir = "";

		const searchStart = /.start="1"/g;
		const replaceStart = "";

		const searchType = /.type="1"/g;
		const replaceType = "";

		const searchDiv = /<div>/g;
		const replaceDiv = "";

		const searchSpan = /<span( |.)*?>/g;
		const replaceSpan = "";

		const searchSpan2 = /<\/span>/g;
		const replaceSpan2 = "";

		const searchDiv2 = /\/div>/g;
		const replaceDiv2 = "";

		// THINGS TO REPLACE

		const searchFigure = /<figure>(.|\s)*?<\/figure>/g;
		const replaceFigure = "[IMAGE]";

		const searchStyle = /<style( |.)*?>(.|\n)*?<\/style>/g;
		const replaceStyle = "<style></style>";

		// REPLACEMENT FOR REMOVES
		htmlCodeText = htmlCodeText.replace(searchLang, replaceLang);
		htmlCodeText = htmlCodeText.replace(searchDir, replaceDir);
		htmlCodeText = htmlCodeText.replace(searchStart, replaceStart);
		htmlCodeText = htmlCodeText.replace(searchType, replaceType);
		htmlCodeText = htmlCodeText.replace(searchDiv, replaceDiv);
		htmlCodeText = htmlCodeText.replace(searchSpan, replaceSpan);
		htmlCodeText = htmlCodeText.replace(searchSpan2, replaceSpan2);
		htmlCodeText = htmlCodeText.replace(searchDiv2, replaceDiv2);
		
		// REPLACEMENT FOR REPLACES
		htmlCodeText = htmlCodeText.replace(searchFigure, replaceFigure);
		htmlCodeText = htmlCodeText.replace(searchStyle, replaceStyle);
		
		editor.edit(builder => builder.replace(selection, getParsedPTagCode(htmlCodeText)));
		// Display a message box to the user
		vscode.window.showInformationMessage("Cleaned out extraneous HTML successfully");
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

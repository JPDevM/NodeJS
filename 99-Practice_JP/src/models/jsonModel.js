const fs = require('fs');
const path = require('path');

module.exports = function (fileName) {
	return {
		file: fileName,
		
		toArray () {
			const filePath = path.resolve(__dirname, '../data/', this.file);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			return JSON.parse(fileContent);
		},

		find (id) {
			const fileArray = this.toArray();
			return fileArray.find(function (oneRegister) {
				return oneRegister.id == id;
			})
		}
	}
}
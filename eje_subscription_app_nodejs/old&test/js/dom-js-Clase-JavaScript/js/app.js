const productsList = document.querySelector('#productsList');
const todoList = document.querySelector('#todoList');

function addHtml (data, tag, parent, position) {
	data.forEach(function (oneData) {
		// let newHTML = '<' + tag + '>' + oneData.name + '</' + tag + '>';
		let newHTML = `
			<${tag}>
				${oneData.name} <br>
				${oneData.price ? oneData.price : ''}
				${oneData.brand ? oneData.brand : ''}
			</${tag}>
		`;
		parent.insertAdjacentHTML(position, newHTML);
		// beforebegin || afterbegin || beforeend || afterend 
	})
}

addHtml(products, 'li', productsList, 'beforeend');
addHtml(todos, 'li', todoList, 'beforeend');
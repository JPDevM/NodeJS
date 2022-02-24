module.exports = (dateOne, dateTwo) => {
	let firstPayment = new Date(dateOne).getTime();
	let longDate = new Date(dateTwo).getTime();
	return firstPayment - longDate;
}
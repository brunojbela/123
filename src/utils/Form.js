class FormUtils {
	checkData(data, exclude = []) {
		let error = null;

		exclude.push('inputData');

		for (let fieldItem in data) {
			if (exclude.indexOf(fieldItem) < 0) {
				if (data[fieldItem].error) {
					error = data[fieldItem].msg;
				} else if (!data[fieldItem].value) {
					error = 'Você precisa preencher todos os campos para avançar.';
				}
			}
		}

		return error;
	}

	formatData(data) {
		let sendData = {};
		for (let fieldItem in data) {
			sendData[fieldItem] = data[fieldItem].value;
		}
		return sendData;
	}
}

export default new FormUtils();

const DefaultAPIController = require(APP_ROOT + 'controllers/DefaultAPIController.js');

module.exports = class CreateClientController extends DefaultAPIController
{
	constructor(requestParams) {
		super(requestParams);
	}

	run(response) {
		super.run(response);
		const clientModel = AppComponents.getComponent('clientModel');
		const reqObj = AppComponents.getComponent('app').requestBodyObj;
		const validationErrors = [];
		const clientCard = clientModel.validateCard(reqObj, validationErrors);
		if (validationErrors.length) {
			// Есть ошибки валидации
			response.statusCode = 422;
			response.write(JSON.stringify({ validationErrors }));
		}
		else {
			// Данные проверены - можно создавать клиента
			clientModel.create(clientCard);
		}
	}
}

const DefaultAPIController = require(APP_ROOT + 'controllers/DefaultAPIController.js');

module.exports = class ClientsListController extends DefaultAPIController
{
	constructor(requestParams) {
		super(requestParams);
	}

	run(response) {
		super.run(response);
		const clients = AppComponents.getComponent('clientModel').getClients();
		response.write(JSON.stringify(clients));
	}
}

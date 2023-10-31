const DefaultAPIController = require(APP_ROOT + 'controllers/DefaultAPIController.js');

module.exports = class ClientsListController extends DefaultAPIController
{
	constructor(requestParams) {
		super(requestParams);
	}

	run(response) {
		super.run(response);
		const queryParams = AppComponents.getComponent('router').queryParams;
		const search = queryParams['search']?.trim()?.toLowerCase();
		const clients = search ? AppComponents.getComponent('clientModel').getClients(search) : AppComponents.getComponent('clientModel').getClients();
		response.write(JSON.stringify(clients));
	}
}

// Абсолютный путь каталога /src приложения
global.APP_ROOT = process.main ? process.main.paths[0].split('node_modules')[0] : process.mainModule.paths[0].split('node_modules')[0];

// Менеджер компонентов приложения
global.AppComponents = require(APP_ROOT + 'utils/appComponents.js')

try {
	// Конфигурация приложения
	AppComponents.registerComponent(
		'config',
		APP_ROOT + 'config'
	);

	// Маршрутизатор
	AppComponents.registerComponent(
		'router',
		APP_ROOT + 'utils/router.js',
		AppComponents.registerAndReturnComponent(
			'routes',
			APP_ROOT + '/routes'
		)
	);

	// Модель клиента, использующая для хранения данных JSON-файл
	AppComponents.registerComponent(
		'clientModel',
		APP_ROOT + 'models/ClientJSONModel.js',
		AppComponents.getComponent('config')
	);
}
catch (err) {
	console.error(err);
	return;
}

try {
	// Создаём приложение как экземпляр класса App
	// За обработку всех URI, для которых не найден подходящий маршрут, будет отвечать контроллер FallbackController
	AppComponents.registerComponent(
		'app',
		APP_ROOT + 'app',
		'Fallback'
	);
}
catch (err) {
	console.error(err);
	return;
}

const app = AppComponents.getComponent('app')
app.start();

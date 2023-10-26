module.exports = class Router
{
	requestParams = []; // параметры запроса из URI

	constructor(routes)
	{
		this.routes = routes;
		this.uriPrefix = AppComponents.getComponent('config').apiURIPrefix;
	}

	// Обработка запроса - возвращает имя класса контроллера, соотв. маршруту, или false, если URI/метод не соответствуют ни одному маршруту.
	handle(request) {
		if (!request.url.startsWith(this.uriPrefix)) {
			// URI запроса не начинается с uriPrefix
			return false;
		}
		// Получим часть URI без префикса - именно она проверяется на соотв-ие path в маршрутах, также отбросим параметры (часть URI после ?)
		let [reqURI, ] = request.url.substr(this.uriPrefix.length).split('?');
		if (reqURI === '/') {
			reqURI = '';
		}
		// Проверим маршруты по списку
		for (const {path, method, controller} of this.routes) {
			if (this.checkRequestMethod(request.method, method)) {
				// Метод HTTP-запроса соответствует указанному в маршруте - проверим URI на соответствие path
				if (path instanceof RegExp) {
					// Проверка соответствия URI регулярному выражению
					try {
						if (path.test(reqURI)) {
							this.requestParams = reqURI.match(path);
							this.requestParams.shift();
							return controller;
						}
					}
					catch(err) {
						throw new Error(err);
					}
				}
				else if (reqURI === path) {
					// path соответствует URI запроса
					return controller;
				}
			}
		}
		// Не нашли подходящего маршрута
		return false;
	}

	checkRequestMethod(reqMethod, allowedMethod) {
		if (allowedMethod === 'any') {
			// Допустим любой метод запроса
			return true;
		}
		if (Array.isArray(allowedMethod)) {
			// Допустимо несколько методов запроса
			return allowedMethod.includes(reqMethod);
		}
		return reqMethod === allowedMethod;
	}
}

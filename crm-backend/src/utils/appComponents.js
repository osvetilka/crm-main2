module.exports = class AppComponents
{
	static components = [];

	static registerComponent(name, componentFilename, ...args) {
		if (AppComponents.components[name]) {
			return false;
		}
		AppComponents.components[name] = AppComponents.getObject(componentFilename, ...args);
		return true;
	}

	static registerAndReturnComponent(name, componentFilename, ...args) {
		AppComponents.registerComponent(name, componentFilename, ...args);
		return AppComponents.getComponent(name);
	}

	static getComponent(name) {
		return AppComponents.components[name];
	}

	static getObject(fileName, ...args) {
		const Obj = require(fileName);
		if (typeof Obj === 'function') {
			// Это класс - создадим и вернём его экземпляр
			return new Obj(...args);
		}
		return Obj;
	}
}

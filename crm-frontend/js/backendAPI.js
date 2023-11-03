const apiURI = 'http://localhost:3000/api/clients';

class BackendAPI
{
    static async getByID(id) {
        const uri = `${apiURI}/${encodeURIComponent(id)}`;
        const response = await fetch(uri);
        if (response.ok) {
            const client = await response.json();
            return client;
        }
        console.error(`Не удалось получить данные клиента с ID = ${id}`);
        return {};
    }

    static async getList(searchTerm = '') {
        const uri = `${apiURI}${searchTerm ? '?search=' + encodeURIComponent(searchTerm) : ''}`;
        const response = await fetch(uri);
        if (response.ok) {
            const clients = await response.json();
            return clients;
        }
        console.error(`Не удалось получить список клиентов`);
        return [];
    }

    static async update(id, client) {
        const uri = `${apiURI}/${encodeURIComponent(id)}`;
        const response = await fetch(uri, {
            'method': 'PATCH',
            'body': JSON.stringify(client)
        });
        if (!response.ok) {
            console.error(`Не удалось обновить данные клиента с ID = ${id}`);
        }
    }

    static async delete(id) {
        const uri = `${apiURI}/${encodeURIComponent(id)}`;
        const response = await fetch(uri, {
            'method': 'DELETE'
        });
        if (!response.ok) {
            console.error(`Не удалось удалить клиента с ID = ${id}`);
        }
    }

    static async create(client) {
        const uri = apiURI;
        const response = await fetch(uri, {
            'method': 'POST',
            'body': JSON.stringify(client)
        });
        if (!response.ok) {
            console.error(`Не удалось создать клиента`);
        }
    }
}

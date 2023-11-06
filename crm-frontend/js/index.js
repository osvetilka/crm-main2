const searchDelay = 300;

async function updateClientsTable(searchTerm = '') {
    const clients = await BackendAPI.getList(searchTerm);
    document.getElementById('clients-table-body').innerHTML = '';
    drawingTableOfClients(clients);
}

document.addEventListener('DOMContentLoaded', () => {
    updateClientsTable();

    function search(e) {
        if (this.timeoutID) {
          clearTimeout(this.timeoutID);
        }
        this.timeoutID = setTimeout(updateClientsTable, searchDelay, e.currentTarget.value);
    }

    document.getElementById('search-input').addEventListener('input', function(e) {
        search(e);
    });
    // Кнопка удаление клиента в модальном окне
    document.getElementById('confirm-delete-button').addEventListener('click', async () => {
        document.getElementById('cancel-delete-button').click();
        const id = document.getElementById('client-id-to-delete').value;
        if (id) {
            await BackendAPI.delete(id);
            await updateClientsTable(document.getElementById('search-input').value);
        }
    });

    // Кнопка "Сохранить" в модальном окне редактирования клиента
    document.getElementById('confirm-update-button').addEventListener('click', async () => {
        const id = document.getElementById('client-id-to-update').value;
        if (id) {
            const client = {
                'surname': document.getElementById('sNameUpd').value,
                'name': document.getElementById('fNameUpd').value,
                'lastName': document.getElementById('pNameUpd').value,
                'contacts': []
            }
            const errors = await BackendAPI.update(id, client);
            if (errors.length) {
                errors.forEach((err) => {
                    switch (err.field) {
                        case 'name':
                            document.getElementById('fNameUpd').classList.add('is-invalid');
                            break;
                        case 'surname':
                            document.getElementById('sNameUpd').classList.add('is-invalid');
                            break;
                    }
                }); 
            }
            else {
                document.getElementById('fNameUpd').classList.remove('is-invalid');
                document.getElementById('pNameUpd').classList.remove('is-invalid');
                document.getElementById('sNameUpd').classList.remove('is-invalid');
                document.getElementById('cancel-update-button').click();
                await updateClientsTable(document.getElementById('search-input').value);
            }
        }
    });

    // Кнопка "Создать" в модальном окне Создание клиента
    document.getElementById('confirm-create-button').addEventListener('click', async () => {
        const client = {
            'surname': document.getElementById('sName').value,
            'name': document.getElementById('fName').value,
            'lastName': document.getElementById('pName').value,
            'contacts': []
        }
       //console.log(client);
        const errors = await BackendAPI.create(client); 
        await updateClientsTable(document.getElementById('search-input').value);     
        document.getElementById('cancel-create-button').click();          
  
     /*   if (errors.length) {
                errors.forEach((err) => {
                    switch (err.field) {
                        case 'name':
                            document.getElementById('fName').classList.add('is-invalid');
                            break;
                        case 'surname':
                            document.getElementById('sName').classList.add('is-invalid');
                            break;
                    }
                });
        }
        else {
            document.getElementById('fName').classList.remove('is-invalid');
            document.getElementById('pName').classList.remove('is-invalid');
            document.getElementById('sName').classList.remove('is-invalid');
            document.getElementById('cancel-create-button').click();
            await updateClientsTable(document.getElementById('search-input').value);        
        }*/
    }); 

});

function drawingTableOfClients(clientsList) {
    const btnCreate = document.getElementById('create-button');
    btnCreate.addEventListener('click', () => {
         // очистить поля
         const inputValue = document.querySelectorAll('.create-input');
         inputValue[0].value = '';
         inputValue[1].value = '';
         inputValue[2].value = '';
    });

    // цикл по всем клиентам
    for (let i = 0; i < clientsList.length; i++) {
        // создаём строку таблицы
        const tbodyTr = document.createElement('tr');

        // поочередно добавляем все данные клиента
        for (let key = 0; key < 5; key++) {
            const tbodyTd = document.createElement('td');
            switch (key) {
                case 0:
                    tbodyTd.classList.add('tbody_id', 'td_text');
                    tbodyTd.textContent = Math.trunc(clientsList[i].id / 10000000);
                    break;
                case 1:
                    tbodyTd.classList.add('td_full-name');
                    tbodyTd.textContent = clientsList[i].surname + ' ' + clientsList[i].name;
                    if (clientsList[i].lastName) {
                        tbodyTd.textContent += ' ' + clientsList[i].lastName;
                    }
                    break;
                case 2:
                    tbodyTd.classList.add('td_create');
                    const date = new Date(clientsList[i].createdAt);
                    tbodyTd.textContent = '';
                    if (date.getDate() < 10) {
                        tbodyTd.textContent = '0';
                    }
                    tbodyTd.textContent += `${date.getDate()}.`;
                    if (date.getMonth() < 9) {
                        tbodyTd.textContent += '0';
                    }
                    tbodyTd.textContent += `${date.getMonth() + 1}.${date.getFullYear()} `;

                    const span = document.createElement('span');
                    span.classList.add('td_text');
                    span.textContent = `${date.getHours()}:`;
                    if (date.getMinutes() < 10) {
                        span.textContent += '0';
                    }
                    span.textContent += date.getMinutes();
                    tbodyTd.append(span);
                    break;
                case 3:
                    tbodyTd.classList.add('td_change');
                    const date2 = new Date(clientsList[i].updatedAt);
                    tbodyTd.textContent = '';
                    if (date2.getDate() < 10) {
                        tbodyTd.textContent = '0';
                    }
                    tbodyTd.textContent += `${date2.getDate()}.`;
                    if (date2.getMonth() < 9) {
                        tbodyTd.textContent += '0';
                    }
                 //  tbodyTd.textContent += `${date2.getMonth() + 1}.${date2.getdata-dismissFullYear()} `;
                   tbodyTd.textContent += `${date2.getMonth() + 1}.${date2.getFullYear()} `;

                    const span2 = document.createElement('span');
                    span2.classList.add('td_text');
                    span2.textContent = `${date2.getHours()}:`;
                    if (date2.getMinutes() < 10) {
                        span2.textContent += '0';
                    }
                    span2.textContent += date2.getMinutes();
                    tbodyTd.append(span2);
                    break;

                case 4:
                    tbodyTd.classList.add('td_actions');
                    // ** кнопка изменить
                    const btnChange = document.createElement('button');
                    btnChange.classList.add('btn', 'btn-primary');
                    btnChange.setAttribute('data-bs-toggle', 'modal');
                    btnChange.setAttribute('data-bs-target', '#updModal');
                    btnChange.append('Изменить');
                    btnChange.addEventListener('click', () => {

                        const inputValue = document.querySelectorAll('.change-input');
                        inputValue[0].value = clientsList[i].surname;
                        inputValue[1].value = clientsList[i].name;
                        inputValue[2].value = clientsList[i].lastName;
                        document.getElementById('client-id-to-update').value = clientsList[i].id;
                    });

                    // ** кнопка удалить
                    const btnDelete = document.createElement('button');
                    btnDelete.classList.add('btn', 'btn-primary');
                    btnDelete.setAttribute('data-bs-toggle', 'modal');
                    btnDelete.setAttribute('data-bs-target', '#delModal');
                    btnDelete.append('Удалить');
                    btnDelete.addEventListener('click', () => {
                        // удалить клиента
                        document.getElementById('client-id-to-delete').value = clientsList[i].id;
                    });

                    tbodyTd.append(btnChange);
                    tbodyTd.append(btnDelete);
                    break;
                default:
                    break;
            }
            tbodyTr.append(tbodyTd);
        }

        // добавляем строку в таблицу
        const tableTbody = document.querySelector('.main__table_tbody');
        tableTbody.append(tbodyTr);

    }
}

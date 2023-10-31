
var data = JSON.parse(data);

drawingTableOfClients(data);

function drawingTableOfClients(clientsList) {

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
                    });

                    // ** кнопка удалить
                    const btnDelete = document.createElement('button');
                    btnDelete.classList.add('btn', 'btn-primary');
                    btnDelete.setAttribute('data-bs-toggle', 'modal');
                    btnDelete.setAttribute('data-bs-target', '#delModal');
                    btnDelete.append('Удалить');
                    btnDelete.addEventListener('click', () => {
                        // удалить клиента
                        const btnDeleteModal = document.querySelector('.btn_modal-delete');
                        btnDeleteModal.addEventListener('click', async () => {

                        });
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

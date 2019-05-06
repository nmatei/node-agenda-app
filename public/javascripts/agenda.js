var allPersons = [];

var API_URL = {
    //ADD: 'data/add.json'
    ADD: 'users/add',
    DELETE: 'users/delete'
};
var API_METHOD = {
    //ADD: 'GET'
    ADD: 'POST',
    DELETE: 'DELETE'
}

fetch('data/persons.json').then(function(r){
    return r.json();
}).then(function(persons) {
    console.log('all persons', persons);
    allPersons = persons;
    display(persons);
});

function display(persons) {
    var list = persons.map(function(person) {
        return `<tr data-id="${person.id}">
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.phone}</td>
            <td>
                <a href="#" class="delete">&#10006;</a>
                <a href="#" class="edit">&#9998;</a>
            </td>
        </tr>`;
    });

    document.querySelector('#agenda tbody').innerHTML = list.join('');
}

function savePerson() {
    var firstName = document.querySelector('[name=firstName]').value;
    var lastName = document.querySelector('[name=lastName]').value;
    var phone = document.querySelector('[name=phone]').value;
    
    submitNewPerson(firstName, lastName, phone);
}

function submitNewPerson(firstName, lastName, phone) {
    var body = null;
    if (API_METHOD.ADD === 'POST') {
        body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            phone: phone
        });
    }
    fetch(API_URL.ADD, {
        method: API_METHOD.ADD,
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(r) {
        return r.json();
    }).then(function(status) {
        if (status.success) {
            inlineAddPerson(firstName, lastName, phone);
        } else {
            console.warn('not saved!', status);
        }
    })
}


function inlineAddPerson(firstName, lastName, phone) {
    allPersons.push({
        firstName: firstName,
        lastName: lastName,
        phone: phone
    });
    display(allPersons);
}

function inlineDeletePerson(id) {
    console.warn('please refresh :)', id);
    allPersons = allPersons.filter(function(person) {
        return person.id != id;
    });
    display(allPersons);
}

function deletePerson(id) {
    var body = null;
    if (API_METHOD.DELETE === 'DELETE') {
        body = JSON.stringify({ id });
    }
    fetch(API_URL.DELETE, {
        method: API_METHOD.DELETE,
        body: body,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(r) {
        return r.json();
    }).then(function(status) {
        if (status.success) {
            inlineDeletePerson(id);
        } else {
            console.warn('not removed!', status);
        }
    })
}

function initEvents() {
    const tbody = document.querySelector('#agenda tbody');
    tbody.addEventListener('click', function(e) {
        if (e.target.className == 'delete') {
            const tr = e.target.parentNode.parentNode;
            const id = tr.getAttribute('data-id');
            deletePerson(id);
        }
    });
}

initEvents();
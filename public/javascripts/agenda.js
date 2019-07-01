var editPersonId;

var API_URL = {
    CREATE: '...',
    READ: 'users', // 'data/persons.json'
    //ADD: 'data/add.json'
    ADD: 'users/add', // TODO use CREATE
    UPDATE: 'users/update',
    DELETE: 'users/delete'
};
var API_METHOD = {
    CREATE: 'POST',
    READ: 'GET',
    //ADD: 'GET'
    ADD: 'POST', // TODO use CREATE
    UPDATE: 'PUT',
    DELETE: 'DELETE'
}

const Persons = {
    list: [],

    display: function(persons){
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
    },

    save: function() {
        var firstName = document.querySelector('[name=firstName]').value;
        var lastName = document.querySelector('[name=lastName]').value;
        var phone = document.querySelector('[name=phone]').value;
        
        if (editPersonId) {
            submitEditPerson(editPersonId, firstName, lastName, phone);
        } else {
            submitNewPerson(firstName, lastName, phone);
        }
    }, 

    inlineAdd: function (id, firstName, lastName, phone) {
        this.list.push({
            id,
            firstName,
            lastName,
            phone
        });
        this.display(this.list);
    },

    inlineDelete: function(id) {
        this.list = this.list.filter(function(element) {
            return element.id != id;
        });
        this.display(this.list);
    },

    search: function(value) {
        value = value.toLowerCase().trim();
        const filtered = this.list.filter(person => {
            return person.firstName.toLowerCase().includes(value) || 
                person.lastName.toLowerCase().includes(value) ||
                person.phone.toLowerCase().includes(value)
        });
        this.display(filtered);
    }
};

fetch(API_URL.READ).then(function(r){
    return r.json();
}).then(function(persons) {
    Persons.list = persons;
    Persons.display(persons);
});

function submitNewPerson(firstName, lastName, phone) {
    var body = null;
    const method = API_METHOD.ADD;
    if (method === 'POST') {
        body = JSON.stringify({
            firstName,
            lastName,
            phone
        });
    }
    fetch(API_URL.ADD, {
        method,
        body,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(r) {
        return r.json();
    }).then(function(status) {
        if (status.success) {
            Persons.inlineAdd(status.id, firstName, lastName, phone);
        } else {
            console.warn('not saved!', status);
        }
    })
}

function submitEditPerson(id, firstName, lastName, phone) {
    var body = null;
    const method = API_METHOD.UPDATE;
    if (method === 'PUT') {
        body = JSON.stringify({
            id,
            firstName,
            lastName,
            phone
        });
    }
    fetch(API_URL.UPDATE, {
        method,
        body,
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function(r) {
        return r.json();
    }).then(function(status) {
        if (status.success) {
            inlineEditPerson(id, firstName, lastName, phone);
        } else {
            console.warn('not saved!', status);
        }
    })
}

function inlineEditPerson(id, firstName, lastName, phone) {
    //window.location.reload();
    
    const person = Persons.list.find((p) => {
        return p.id == id;
    });
    person.firstName = firstName;
    person.lastName = lastName;
    person.phone = phone;
    
    Persons.display(Persons.list);

    editPersonId = '';
    document.querySelector('[name=firstName]').value = '';
    document.querySelector('[name=lastName]').value = '';
    document.querySelector('[name=phone]').value = '';
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
            Persons.inlineDelete(id);
        } else {
            console.warn('not removed!', status);
        }
    })
}

const editPerson = function(id) {
    var person = Persons.list.find(function(p) {
        return p.id == id
    });
    document.querySelector('[name=firstName]').value = person.firstName;
    document.querySelector('[name=lastName]').value = person.lastName;
    document.querySelector('[name=phone]').value = person.phone;
    editPersonId = id;
}

function initEvents() {
    const tbody = document.querySelector('#agenda tbody');
    tbody.addEventListener('click', function(e) {
        if (e.target.className == 'delete') {
            const tr = e.target.parentNode.parentNode;
            const id = tr.getAttribute('data-id');
            deletePerson(id);
        } else if (e.target.className == 'edit') {
            const tr = e.target.parentNode.parentNode;
            const id = tr.getAttribute('data-id');
            editPerson(id);
        }
    });

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        Persons.search(e.target.value);
    })
}

initEvents();
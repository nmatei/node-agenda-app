var editId;

// for external API USE http://nick:3000/agenda
const API_URL = {
    CREATE: '/agenda/add',
    READ: '/agenda',
    UPDATE: '/agenda/update',
    DELETE: '/agenda/delete'
};

function getRow(person) {
    return "<tr>" +
        "<td>" + person.firstName + "</td>" +
        "<td>" + person.lastName + "</td>" +
        "<td>" + person.phone + "</td>" +
        `<td>` +
            `<a href='#' data-id='${person.id}' class='delete'>&#10006;</a> ` +
            `<a href='#' data-id='${person.id}' class='edit'>&#9998;</a>` +
        `</td>` +
        "</tr>";
}

function getActionRow() {
    return '<tr>' +
        '<td><input type="text" required name="firstName" placeholder="Enter first name"></td>' +
        '<td><input type="text" name="lastName" placeholder="Enter last name"></td>' +
        '<td><input type="text" required name="phone" placeholder="Enter phone"></td>' +
        '<td><button type="submit">Save</button></td>' +
        '</tr>';
}

function loadContacts() {
    $.ajax({
        url: API_URL.READ,
        method: "GET"
    }).done(function (persons) {
        console.info('done:', persons);
        display(persons);
    });
}

function deleteContact(id) {
    $.ajax({
        url: API_URL.DELETE,
        method: "POST",
        data: {
            id: id
        }
    }).done(function (response) {
        if (response.success) {
            loadContacts();
        }
    });
}

function addContact(person) {
    $.ajax({
        url: API_URL.CREATE,
        method: "POST",
        data: person
    }).done(function (response) {
        if (response.success) {
            loadContacts();
        }
    });
}

function saveContact(person) {
    $.ajax({
        url: API_URL.UPDATE,
        method: "POST",
        data: person
    }).done(function (response) {
        if (response.success) {
            editId = '';
            loadContacts();
        }
    });
}

function bindEvents() {
    $('#phone-book tbody').delegate('a.edit', 'click', function () {
        var id = $(this).data('id');
        editContact(id);
    });

    $('#phone-book tbody').delegate('a.delete', 'click', function () {
        var id = $(this).data('id');
        console.info('click on ', this, id);
        deleteContact(id);
    });

    $( ".add-form" ).submit(function() {
        const person = {
            firstName: $('input[name=firstName]').val(),
            lastName: $('input[name=lastName]').val(),
            phone: $('input[name=phone]').val()
        };

        if (editId) {
            person.id = editId;
            saveContact(person);
        } else {
            addContact(person);
        }
    });
}

function display(persons) {
    window.persons = persons;
    var rows = '';

    persons.forEach(person => rows += getRow(person));
    rows += getActionRow();
    $('#phone-book tbody').html(rows);
}

function editContact(id) {
    var editPerson = persons.find(function (person) {
        console.log(person.firstName);
        return person.id == id;
    });
    console.warn('edit', editPerson);

    if (editId) {
        $('#phone-book tbody tr:last-child() td:last-child()').append(`<button onclick="cancelEdit(this)">Cancel</button>`);
    }

    $('input[name=firstName]').val(editPerson.firstName);
    $('input[name=lastName]').val(editPerson.lastName);
    $('input[name=phone]').val(editPerson.phone);
    editId = id;
}

function cancelEdit(button) {
    $( ".add-form" ).get(0).reset();
    editId = '';
    button.parentNode.removeChild(button);
}

var persons = [];
console.info('loading persons');
loadContacts();
bindEvents();
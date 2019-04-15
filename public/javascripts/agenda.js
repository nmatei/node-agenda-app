fetch('persons.json').then(function(r){
    return r.json();
}).then(function(persons) {
    console.log('all persons', persons);
    display(persons);
});

function display(persons) {
    var list = persons.map(function(person) {
        return `<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.phone}</td>
        </tr>`;
    });

    document.querySelector('#agenda tbody').innerHTML = list.join('');
}
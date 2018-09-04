//TODO - remove all 'person' refs

var editId;

// for external API USE http://nick:3000/agenda
const API_URL = {
    CREATE: '/warranty-list/add',
    READ: '/warranty-list',
    UPDATE: '/warranty-list/update',
    DELETE: '/warranty-list/delete'
};

window.WarrantyList = {
    getRow: function(product) {
        return "<tr>" +
            "<td>" + product.name + "</td>" +
            "<td>" + product.serialNumber + "</td>" +
            "<td>" + product.acquisitionDate + "</td>" +
            "<td>" + product.warrantyMonths + "</td>" +
            `<td>` +
            `<a href='#' data-id='${product.id}' class='delete'>&#10006;</a> ` +
            `<a href='#' data-id='${product.id}' class='edit'>&#9998;</a>` +
            `</td>` +
            "</tr>";
    },

    load: function () {
        $.ajax({
            url: API_URL.READ,
            method: "GET"
        }).done(function (warranties) {
            console.info('done:', warranties);
            WarrantyList.display(warranties);
        });
    },

    getActionRow: function() {
        return '<tr>' +
            '<td><input type="text" required name="name" placeholder="Numele Produsului"></td>' +
            '<td><input type="text" required name="serialNumber" placeholder="Seria Produsului"></td>' +
            '<td><input type="date" required name="acquisitionDate" placeholder="Data garantiei"></td>' +
            '<td><input type="text" required name="warrantyMonths" placeholder="durata garantiei (luni)"></td>' +
            '<td><button type="submit">Salvează</button></td>' +
            '</tr>';
    },

    delete: function(id) {
        $.ajax({
            url: API_URL.DELETE,
            method: "POST",
            data: {
                id: id
            }
        }).done(function (response) {
            if (response.success) {
                WarrantyList.load();
            }
        });
    },

    add: function(warranty) {
        $.ajax({
            url: API_URL.CREATE,
            method: "POST",
            data: warranty
        }).done(function (response) {
            if (response.success) {
                WarrantyList.load();
            }
        });
    },

    save: function(warranty) {
        $.ajax({
            url: API_URL.UPDATE,
            method: "POST",
            data: warranty
        }).done(function (response) {
            if (response.success) {
                editId = '';
                WarrantyList.load();
            }
        });
    },

    bindEvents: function() {
        $('#warranties tbody').delegate('a.edit', 'click', function () {
            var id = $(this).data('id');
            WarrantyList.edit(id);
        });

        $('#warranties tbody').delegate('a.delete', 'click', function () {
            var id = $(this).data('id');
            console.info('click on ', this, id);
            WarrantyList.delete(id);
        });

        $( ".add-form" ).submit(function() {
            const product = {
                name: $('input[name=name]').val(),
                serialNumber: $('input[name=serialNumber]').val(),
                acquisitionDate: $('input[name=acquisitionDate]').val(),
                warrantyMonths: $('input[name=warrantyMonths]').val()
            };

            if (editId) {
                product.id = editId;
                WarrantyList.save(product);
            } else {
                WarrantyList.add(product);
            }
        });
    },

    edit: function (id) {
        var editProduct = products.find(function (product) {
            return product.id == id;
        });
        console.warn('edit', editProduct);

        if (editId) {
            $('#warranties tbody tr:last-child() td:last-child()').append(`<button onclick="WarrantyList.cancelEdit(this)">Cancel</button>`);
        }

        $('input[name=name]').val(editProduct.name);
        $('input[name=serialNumber]').val(editProduct.serialNumber);
        $('input[name=acquisitionDate]').val(editProduct.acquisitionDate);
        $('input[name=warrantyMonths]').val(editProduct.warrantyMonths);

        editId = id;
    },

    cancelEdit: function(button) {
        $( ".add-form" ).get(0).reset();
        editId = '';
        button.parentNode.removeChild(button);
    },

    display: function(products) {
        window.products = products;
        var rows = '';

        products.forEach(warranty => rows += WarrantyList.getRow(warranty));
        rows += WarrantyList.getActionRow();
        $('#warranties tbody').html(rows);
    }
};

var products = [];
console.info('loading warranties');
WarrantyList.load();
WarrantyList.bindEvents();
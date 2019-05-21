const BASE_PATH = window.location.protocol + "//" + window.location.host + "/product";

var $dataTable;

function loadProduct() {
    $dataTable = $('#productTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_PATH + '/get',
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [{
                "data": "productID",
                "defaultContent": ""
            },
            {
                "data": "productName",
                "defaultContent": ""
            },
            {
                "data": "categoryName",
                "defaultContent": "",
            },
            {
                "data": "manufacturer",
                "defaultContent": ""
            }, {
                "render": function (data, type, JsonResultRow, meta) {
                    return '<img width="64px" height="64px" src="' + JsonResultRow.image + '">';
                }
            }, {
                "data": "description",
                "defaultContent": ""
            }, {
                "data": "importPrice",
                "defaultContent": ""
            }, {
                "data": "sellPrice",
                "defaultContent": ""
            }, {
                "data": "quantity",
                "defaultContent": ""
            }, {
                "data": "isActive",
                "defaultContent": ""
            }, {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdateproduct" onclick="showPopupUpdateProduct(this)">Chỉnh Sửa</Button>'
            }, {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeleteproduct" onclick="showPopupDeleteProduct(this)">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {
            if (data["isActive"] == "1") {
                $(row).find('td:eq(9)').css('color', 'green');
                $(row).find('td:eq(9)').text('Đang Bán');
            } else {
                $(row).find('td:eq(9)').css('color', 'red');
                $(row).find('td:eq(9)').text('Tạm Ngừng Bán');
            }
        },
        columnDefs: [{
                targets: 5,
                render: $.fn.dataTable.render.ellipsis(128, false)
            },
            {
                'searchable': false,
                'targets': [4, 5, 8]
            }
        ],
        "bDestroy": true

    });
}


function showPopupUpdateProduct(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var productID = chil[0].innerHTML;

    $.ajax({
        type: "GET",
        url: BASE_PATH + "/get/" + productID,
        data: {
            productID: productID
        }
    }).done(function (resp) {

        const obj = JSON.parse(resp);

        $("#dlgupdateproduct input[name='productID']").val(obj.productID);
        $("#dlgupdateproduct select[name='categoryID'] option").filter(function () {
            return $.trim($(this).val()) === $.trim(obj.categoryID);
        }).attr("selected", true).prop("selected", "selected");

        $("#dlgupdateproduct input[name='productName']").val(obj.productName);
        $("#dlgupdateproduct input[name='manufacturer']").val(obj.manufacturer);
        $("#dlgupdateproduct input[name='image']").val(obj.image);
        $("#dlgupdateproduct input[name='description']").val(obj.description);
        $("#dlgupdateproduct input[name='importPrice']").val(obj.importPrice);
        $("#dlgupdateproduct input[name='sellPrice']").val(obj.sellPrice);
        $("#dlgupdateproduct input[name='quantity']").val(obj.quantity);

        $("#dlgupdateproduct select[name='isActive'] option").filter(function () {
            return $.trim($(this).val()) === $.trim(obj.isActive);
        }).attr("selected", true).prop("selected", "selected");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
    });
}

function showPopupDeleteProduct(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var productID = chil[0].innerText;
    var productName = chil[1].innerText;

    $("#dlgdeleteproduct input[name='productID']").val(productID);
    $("#dlgdeleteproduct input[name='productName']").val(productName);
}


function handleDeleteProduct() {
    $.ajax({
        type: "POST",
        url: BASE_PATH + "/delete",
        data: $("#formdeleteproduct").serialize(),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgdeleteproduct").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function handleInsertProduct() {
    $.ajax({
        type: "POST",
        url: BASE_PATH + "/insert",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#forminsertproduct"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlginsertproduct").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function handleUpdateProduct() {
    $.ajax({
        type: "POST",
        url: BASE_PATH + "/update",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#formupdateproduct"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgupdateproduct").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function serializeFormToJSon(form) {
    return $(form).serializeArray().reduce((acc, next) => ({
        ...acc,
        [next.name]: next.value
    }), {});
}

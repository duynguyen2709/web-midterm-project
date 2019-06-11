const BASE_CATEGORY_PATH = window.location.protocol + "//" + window.location.host + "/category";

var $dataTable;

function loadCategory() {
    $dataTable = $('#categoryTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_CATEGORY_PATH + '/get',
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [{
                "data": "categoryID",
                "defaultContent": ""
            },
            {
                "data": "categoryName",
                "defaultContent": ""
            },
            {
                "data": "totalProductType",
                "defaultContent": ""
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-success btn-sm" data-toggle="modal" onclick="showPopupListProduct(this)">Danh Sách Sản Phẩm</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdatecategory" onclick="showPopupUpdateCategory(this)">Chỉnh Sửa</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeletecategory" onclick="showPopupDeleteCategory(this)">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {

            // if (data["isActive"] == "1") {
            //     $(row).find('td:eq(6)').css('color', 'green');
            //     $(row).find('td:eq(6)').text('Đang Bán');
            // } else {
            //     $(row).find('td:eq(6)').css('color', 'red');
            //     $(row).find('td:eq(6)').text('Đang Dừng Bán');
            // }
        },
        "bDestroy": true

    });
}

function showPopupListProduct(itemthis) {
    $("#dlgloading").modal('show');
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerHTML;

    $.ajax({
        type: "GET",
        url: BASE_CATEGORY_PATH + "/get/" + id + "/products",
        data: {
            categoryID: id
        }
    }).done(function (resp) {
        $("#dlgloading").modal('hide');
        $("#dlglistproduct").modal('show');
        const obj = JSON.parse(resp);

        $('#listProductTable').DataTable({
            "data": obj,
            "columns": [{
                    "data": "productName",
                    "defaultContent": ""
                },
                {
                    "data": null,
                    "defaultContent": "",
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<img width="64px" height="64px" src="' + JsonResultRow.image + '">';
                    }
                },
                {
                    "data": "quantity",
                    "defaultContent": ""
                }
            ],
            "rowCallback": function (row, data, index) {

            },
            columnDefs: [{
                    'searchable': false,
                    'targets': [1]
                },

            ],
            "bDestroy": true,
            "lengthMenu": [[5,10,50], [5,10,50]]

        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {});
}

function showPopupUpdateCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    const id = chil[0].innerHTML;
    const name = chil[1].innerHTML;
    const totalProductType = chil[2].innerHTML;

    $("#dlgupdatecategory input[name='categoryID']").val(id);
        $("#dlgupdatecategory input[name='categoryName']").val(name);
        $("#dlgupdatecategory input[name='totalProductType']").val(totalProductType);
}

function showPopupDeleteCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerText;
    var categoryName = chil[1].innerText;

    $("#dlgdeletecategory input[name='categoryID']").val(id);
    $("#dlgdeletecategory input[name='categoryName']").val(categoryName);
}


function handleDeleteCategory() {
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CATEGORY_PATH + "/delete",
        data: serializeFormToJSon("#formdeletecategory"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgdeleteuser").modal('hide');
        $dataTable.ajax.reload(null, false);
        $("#dlgloading").modal('hide');
    });
}

function handleInsertCategory() {
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CATEGORY_PATH + "/insert",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#forminsertcategory"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlginsertcategory").modal('hide');
        $dataTable.ajax.reload(null, false);
        $("#dlgloading").modal('hide');
    });
}

function handleUpdateCategory() {
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CATEGORY_PATH + "/update",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#formupdatecategory"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgupdatecategory").modal('hide');
        $dataTable.ajax.reload(null, false);
        $("#dlgloading").modal('hide');
    });
}

function serializeFormToJSon(form) {
    return $(form).serializeArray().reduce((acc, next) => ({
        ...acc,
        [next.name]: next.value
    }), {});
}
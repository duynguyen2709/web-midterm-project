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

function showPopupUpdateCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerHTML;

    $.ajax({
        type: "GET",
        url: BASE_CATEGORY_PATH + "/get/" + id,
        data: {
            categoryID: id
        }
    }).done(function (resp) {

        const obj = JSON.parse(resp);

        $("#dlgupdatecategory input[name='categoryID']").val(obj.categoryID);
        $("#dlgupdatecategory input[name='categoryName']").val(obj.categoryName);
        $("#dlgupdatecategory input[name='totalProductType']").val(obj.totalProductType);
        
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
    });
}

function showPopupDeleteCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerText;
    var categoryName = chil[1].innerText;

    $("#dlgdeletecategory input[name='categoryID']").val(id);
    $("#dlgdeletecategory input[name='categoryName']").val(categoryName);
}


function handleDeleteCategory() {
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
    });
}

function handleInsertCategory() {
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
    });
}

function handleUpdateCategory() {
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
    });
}

function serializeFormToJSon(form) {
    return $(form).serializeArray().reduce((acc, next) => ({
        ...acc,
        [next.name]: next.value
    }), {});
}
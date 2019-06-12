const BASE_CATEGORY_PATH = window.location.protocol + "//" + window.location.host + "/category";

var $dataTable;
var $subDataTable;
var categoryList;
var currentSubCategoryID;
var currentSubCategory;

function loadCategory() {

    $dataTable = $('#categoryTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_CATEGORY_PATH + '/get',
            "dataSrc": function (json) {
                categoryList = json;

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
            }, {
                data: null,
                className: "center",
                //defaultContent: '<Button class="btn btn-block btn-default btn-sm" onclick="changeSubCategoryTable(this)">Chi Tiết Phân Loại</Button>',
                "render": function (data, type, JsonResultRow, meta) {
                    return '<Button id="btnShowSubCategory' + JsonResultRow.categoryID + '" class="btn btn-block btn-default btn-sm" onclick="changeSubCategoryTable(this)">Chi Tiết Phân Loại</Button>';
                }  
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

function reloadDataForSubCategory(id){
    let items = null;
    for (i = 0; i < categoryList.length; i++) {
        if (categoryList[i].categoryID == id) {
            items = categoryList[i].subCategories;
            break;
        }
    }

    return items;
}

function changeSubCategoryTable(itemthis) {
    document.getElementById('subCategorySection').style.display = "inline";
    //$("subCategorySection").show();

    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerHTML;

    $("#dlginsertsubcategory input[name='categoryID']").val(id);

    currentSubCategoryID = id;
    currentSubCategory = reloadDataForSubCategory(id);

    $subDataTable = $('#subCategoryTable').DataTable({
        "data": currentSubCategory,
        "columns": [{
                "data": "subCategoryID",
                "defaultContent": ""
            },
            {
                "data": "subCategoryName",
                "defaultContent": ""
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdatesubcategory" onclick="showPopupUpdateSubCategory(this)">Chỉnh Sửa</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeletesubcategory" onclick="showPopupDeleteSubCategory(this)">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {

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
            "lengthMenu": [
                [5, 10, 50],
                [5, 10, 50]
            ]

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

function showPopupUpdateSubCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    const id = chil[0].innerHTML;
    const name = chil[1].innerHTML;

    $("#dlgupdatesubcategory input[name='subCategoryID']").val(id);
    $("#dlgupdatesubcategory input[name='subCategoryName']").val(name);
}

function showPopupDeleteCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerText;
    var categoryName = chil[1].innerText;

    $("#dlgdeletecategory input[name='categoryID']").val(id);
    $("#dlgdeletecategory input[name='categoryName']").val(categoryName);
}

function showPopupDeleteSubCategory(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].innerText;
    var subCategoryName = chil[1].innerText;

    $("#dlgdeletesubcategory input[name='subCategoryID']").val(id);
    $("#dlgdeletesubcategory input[name='subCategoryName']").val(subCategoryName);
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

function handleDeleteSubCategory() {
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CATEGORY_PATH + "/sub" + "/delete",
        data: serializeFormToJSon("#formdeletesubcategory"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $dataTable.ajax.reload(function(){
            const id = '#btnShowSubCategory' + currentSubCategoryID;
            $(id).click();
        }, false);
        $("#dlgloading").modal('hide');
    });
}
function handleInsertSubCategory() {
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CATEGORY_PATH + "/sub" + "/insert",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#forminsertsubcategory"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlginsertsubcategory").modal('hide');
        $dataTable.ajax.reload(function(){
            const id = '#btnShowSubCategory' + currentSubCategoryID;
            $(id).click();
        }, false);
        
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

function handleUpdateSubCategory() {
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CATEGORY_PATH + "/sub" + "/update",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#formupdatesubcategory"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgupdatesubcategory").modal('hide');
        $dataTable.ajax.reload(function(){
            const id = '#btnShowSubCategory' + currentSubCategoryID;
            $(id).click();
        }, false);
        $("#dlgloading").modal('hide');
    });
}

function serializeFormToJSon(form) {
    return $(form).serializeArray().reduce((acc, next) => ({
        ...acc,
        [next.name]: next.value
    }), {});
}
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
                "render": function (data, type, row) {

                    if (row.subCategoryName === null) {
                        return row.categoryName;
                    } else {

                        return row.subCategoryName;
                    }
                }
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
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgdeleteproduct">Chỉnh Sửa</Button>'
            }, {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeleteproduct"">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {
            // if (data["active"] === "ACTIVE") {
            //     $(row).find('td:eq(6)').css('color', 'green');
            // // } else if (data["iosstatus"] === "MAINTENANCE") {
            // //     $(row).find('td:eq(5)').css('color', 'blue');
            // } else {
            //     $(row).find('td:eq(6)').css('color', 'red');
            // }
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

function reloadData() {
    $dataTable.ajax.reload(null, false);
}

function test() {
    alert(BASE_PATH);
}

function getContextPath() {
    return window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2));
}
const BASE_PROMOTION_PATH = window.location.protocol + "//" + window.location.host + "/promotion";

var $dataTable;

function loadPromotion() {
    $dataTable = $('#promotionTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_PROMOTION_PATH + '/get',
            "dataSrc": function (json) {
                return json;
            },
            "timeout":10000
        },
        "columns": [{
                "data": "promotionID",
                "defaultContent": ""
            },
            {
                "data": "promotionName",
                "defaultContent": ""
            },
            {
                "data": "appliedName",
                "defaultContent": ""
            },
            {
                "data": "promotionDiscount",
                "defaultContent": ""
            },
            
            {
                "data": "timeFrom",
                "defaultContent": ""
            },
            {
                "data": "timeTo",
                "defaultContent": ""
            },
            {
                "data": "isActive",
                "defaultContent": ""
            },
            
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgdeleteproduct">Chỉnh Sửa</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeleteproduct"">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {
            
            if (data["isActive"] == "1") {
                $(row).find('td:eq(6)').css('color', 'green');
                $(row).find('td:eq(6)').text('Đang Bán');
            } else {
                $(row).find('td:eq(6)').css('color', 'red');
                $(row).find('td:eq(6)').text('Đang Dừng Bán');
            }
        },
        "bDestroy": true

    });
}

function reloadData() {
    $dataTable.ajax.reload(null, false);
}

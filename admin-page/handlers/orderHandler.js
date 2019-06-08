const BASE_ORDER_PATH = window.location.protocol + "//" + window.location.host + "/order";

var $dataTable;

function loadOrder() {
    $dataTable = $('#orderTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_ORDER_PATH + '/get',
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [{
                "data": "null",
                "defaultContent": "",
                "render": function (data, type, JsonResultRow, meta) {
                    return '<h4><span class="label label-primary">' + JsonResultRow.orderID + '</span></h4>';
                }
            },
            {
                "data": "orderTime",
                "defaultContent": ""
            },
            {
                "data": "customerName",
                "defaultContent": ""
            },
            {
                data: null,
                className: "center",
                "render": function (data, type, JsonResultRow, meta) {
                    const detail = "'" + encodeURI(JSON.stringify(JsonResultRow.orderDetail)) +  "'";
                    return '<Button class="btn btn-block btn-success btn-sm" data-toggle="modal" data-target="#dlgorderdetail" onclick="showPopupOrderDetail(' + detail + ')">Xem Chi Tiết</Button>';
                }
                
            },
            {
                "data": "totalPrice",
                "defaultContent": ""
            },{
                "data": "shippingAddress",
                "defaultContent": ""
            },
            {
                "data": "status",
                "defaultContent": ""
            },
            {
                "data": "extraInfo",
                "defaultContent": ""
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdateorder" onclick="showPopupUpdateOrder(this)">Chỉnh Sửa</Button>'
            }
        ],
        "rowCallback": function (row, data, index) {

            if (data["status"] == "PROCESSING") {
                $(row).find('td:eq(6)').css('color', 'yellow');
                //$(row).find('td:eq(9)').text('Đang Bán');
                $(row).find('td:eq(6)').html('<h4><span class="label label-warning">Đang Xử Lý</span></h4>');
            } else if (data["status"] == "SHIPPING" || data["status"] == "DELIVERING") {
                $(row).find('td:eq(6)').css('color', 'blue');
                //$(row).find('td:eq(9)').text('Đang Bán');
                $(row).find('td:eq(6)').html('<h4><span class="label label-primary">Đang Giao Hàng</span></h4>');
            } else if (data["status"] == "DELIVERED") {
                $(row).find('td:eq(6)').css('color', 'green');
                //$(row).find('td:eq(9)').text('Đang Bán');
                $(row).find('td:eq(6)').html('<h4><span class="label label-success">Đã Giao</span></h4>');
            }
            else if (data["status"] == "CANCELLED") {
                $(row).find('td:eq(6)').css('color', 'red');
                //$(row).find('td:eq(9)').text('Đang Bán');
                $(row).find('td:eq(6)').html('<h4><span class="label label-danger">Đã Hủy</span></h4>');
            }
        },
        "bDestroy": true

    });
}
function showPopupOrderDetail(encodedDetail){
    const obj = JSON.parse(decodeURI(encodedDetail));
    $('#orderDetailTable').DataTable({
        "data": obj,
        "columns": [
            {
                "data": "productName",
                "defaultContent": ""
            },
            {
                "data": "quantity",
                "defaultContent": ""
            },
            {
                "data": "price",
                "defaultContent": ""
            }
        ],
        "rowCallback": function (row, data, index) {

        },
        "bDestroy": true

    });
}

function showPopupUpdateOrder(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var id = chil[0].textContent;
    var statusText = chil[6].textContent;
    var extraInfo = chil[7].innerHTML;
    var status = "";

    if (statusText == "Đang Xử Lý"){
        status = "PROCESSING";
    }
    else if (statusText == "Đang Giao Hàng"){
        status = "SHIPPING";
    }
    else if (statusText == "Đã Giao"){
        status = "DELIVERED";
    }
    else if (statusText == "Đã Hủy"){
        status = "CANCELLED";
    }
    
    $("#dlgupdateorder input[name='orderID']").val(id);
    $("#dlgupdateorder input[name='extraInfo']").val(extraInfo);
    $("#dlgupdateorder select[name='status'] option").filter(function () {
        return $.trim($(this).val()) === $.trim(status);
    }).attr("selected", true).prop("selected", "selected");
}

function handleUpdateOrder() {
    $("#dlgupdateorder").modal('hide');
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_ORDER_PATH + "/update",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#formupdateorder"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgloading").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function serializeFormToJSon(form) {
    return $(form).serializeArray().reduce((acc, next) => ({
        ...acc,
        [next.name]: next.value
    }), {});
}
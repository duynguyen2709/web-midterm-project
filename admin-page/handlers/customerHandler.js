const BASE_CUSTOMER_PATH = window.location.protocol + "//" + window.location.host + "/customer";

var $dataTable;

function loadCustomer() {
    $dataTable = $('#customerTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_CUSTOMER_PATH + '/get',
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [{
                "data": "email",
                "defaultContent": ""
            },
            {
                "data": "fullName",
                "defaultContent": ""
            },
            {
                "data": "address",
                "defaultContent": ""
            },
            {
                "data": "phoneNumber",
                "defaultContent": ""
            },
            {
                "data": "totalBuy",
                "defaultContent": ""
            },
            {
                "data": "verified",
                "defaultContent": ""
            },
            {
                "data": "lastSignInTime",
                "defaultContent": ""
            },
            {
                data: null,
                className: "center",
                defaultContent: ''
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeletecustomer" onclick="showPopupDeleteCustomer(this)">Xóa</Button>'
            },
            {
                data: null,
                defaultContent: '',
                "render": function (data, type, JsonResultRow, meta) {
                    return '<p style="display:none;">' + JsonResultRow.uid + '</p>';
                }
            }
        ],
        "rowCallback": function (row, data, index) {

            if (data["verified"] == true) {
                $(row).find('td:eq(5)').css('color', 'green');
                //$(row).find('td:eq(6)').text('Đang Bán');
                $(row).find('td:eq(5)').html('<span class="label label-success">Đã Xác Thực</span>');
            } else {
                $(row).find('td:eq(5)').css('color', 'red');
                //$(row).find('td:eq(6)').text('Đang Dừng Bán');
                $(row).find('td:eq(5)').html('<span class="label label-warning">Chưa Xác Thực</span>');
            }

            if (data["status"] == "1"){
                $(row).find('td:eq(7)').html('<Button class="btn btn-block btn-warning btn-sm" value="0" data-toggle="modal" data-target="#dlgupdatecustomer" onclick="showPopupUpdateCustomer(this)">Khóa</Button>');
            }
            else {
                $(row).find('td:eq(7)').html('<Button class="btn btn-block btn-success btn-sm" value="1" data-toggle="modal" data-target="#dlgupdatecustomer" onclick="showPopupUpdateCustomer(this)">Mở Khóa</Button>');
            }
        },
        // columnDefs: [{
        //     "targets": [10],
        //     "visible": false,
        //     "searchable": false
        // }],
        "bDestroy": true

    });
}

function showPopupUpdateCustomer(itemthis) {
    $("#formupdatecustomer").trigger('reset'); 

    var status = $(itemthis).val();
    var chil = $(itemthis).parent().parent().children();

    var email = chil[0].innerHTML;
    
    $("#dlgupdatecustomer input[name='email']").val(email);
    $("#dlgupdatecustomer input[name='status']").val(status);
}

function showPopupDeleteCustomer(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var email = chil[0].innerText;
    var uid = chil[10].textContent;
    $("#dlgdeletecustomer input[name='email']").val(email);
    $("#dlgdeletecustomer input[name='uid']").val(uid);
}

function handleDeleteCustomer() {
    $("#dlgdeletecustomer").modal('hide');
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_CUSTOMER_PATH + "/delete",
        data: $("#formdeletecustomer").serialize(),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {

        $dataTable.ajax.reload(null, false);
        $("#dlgloading").modal('hide');
    });
}

function handleUpdateCustomer() {
    $("#dlgupdatecustomer").modal('hide');
    $("#dlgloading").modal('show');

    $.ajax({
        type: "POST",
        url: BASE_CUSTOMER_PATH + "/update",
        data: serializeFormToJSon("#formupdatecustomer"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
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
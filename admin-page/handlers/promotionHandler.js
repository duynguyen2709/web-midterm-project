const BASE_PROMOTION_PATH = window.location.protocol + "//" + window.location.host + "/promotion";

var $dataTable;

function loadPromotion() {
    $dataTable = $('#promotionTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_PROMOTION_PATH + '/get',
            "dataSrc": function (json) {
                return json;
            }
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
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdatepromotion" onclick="showPopupUpdatePromotion(this)">Chỉnh Sửa</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeletepromotion" onclick="showPopupDeletePromotion(this)">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {
            
            if (data["isActive"] == "1") {
                $(row).find('td:eq(6)').css('color', 'green');
                $(row).find('td:eq(6)').text('Đang Chạy');
            } else {
                $(row).find('td:eq(6)').css('color', 'red');
                $(row).find('td:eq(6)').text('Tạm Dừng');
            }
        },
        "bDestroy": true

    });
}

function showPopupUpdatePromotion(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var promotionID = chil[0].innerHTML;

    $.ajax({
        type: "GET",
        url: BASE_PROMOTION_PATH + "/get/" + promotionID,
        data: {
            promotionID: promotionID
        }
    }).done(function (resp) {

        const obj = JSON.parse(resp);

        $("#dlgupdatepromotion input[name='promotionID']").val(obj.promotionID);
        $("#dlgupdatepromotion select[name='appliedID'] option").filter(function () {
            return $.trim($(this).val()) === $.trim(obj.appliedID);
        }).attr("selected", true).prop("selected", "selected");

        $("#dlgupdatepromotion input[name='promotionName']").val(obj.promotionName);
        $("#dlgupdatepromotion input[name='promotionDiscount']").val(obj.promotionDiscount);
        $("#dlgupdatepromotion input[name='timeFrom']").val(obj.timeFrom);
        $("#dlgupdatepromotion input[name='timeTo']").val(obj.timeTo);

        $("#dlgupdatepromotion select[name='isActive'] option").filter(function () {
            return $.trim($(this).val()) === $.trim(obj.isActive);
        }).attr("selected", true).prop("selected", "selected");
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
    });
}

function showPopupDeletePromotion(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var promotionID = chil[0].innerText;
    var appliedName = chil[2].innerText;

    $("#dlgdeletepromotion input[name='promotionID']").val(promotionID);
    $("#dlgdeletepromotion input[name='appliedName']").val(appliedName);
}


function handleDeletePromotion() {
    $.ajax({
        type: "POST",
        url: BASE_PROMOTION_PATH + "/delete",
        data: $("#formdeletepromotion").serialize(),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgdeletepromotion").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function handleInsertPromotion() {
    $.ajax({
        type: "POST",
        url: BASE_PROMOTION_PATH + "/insert",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#forminsertpromotion"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlginsertpromotion").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function handleUpdatePromotion() {
    $.ajax({
        type: "POST",
        url: BASE_PROMOTION_PATH + "/update",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#formupdatepromotion"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
        $("#dlgupdatepromotion").modal('hide');
        $dataTable.ajax.reload(null, false);
    });
}

function serializeFormToJSon(form) {
    return $(form).serializeArray().reduce((acc, next) => ({
        ...acc,
        [next.name]: next.value
    }), {});
}

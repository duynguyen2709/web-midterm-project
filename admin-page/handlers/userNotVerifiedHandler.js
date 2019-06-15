var $dataTable;

function loadUserNotVerified() {

    $dataTable = $('#userNotVerifiedTable').DataTable({
        "ajax": {
            "type": "POST",
            "url": window.location.protocol + "//" + window.location.host + "/user/get/notverified",
            "dataSrc": function (json) {
                return json;
            }
        },
        "columns": [{
                "data": "username",
                "defaultContent": ""
            },
            {
                "data": "fullName",
                "defaultContent": ""
            },
            {
                "data": "email",
                "defaultContent": ""
            },
            {
                "data": "birthDate",
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
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-success btn-sm" data-toggle="modal" data-target="#dlgverifyuser" onclick="showPopupUpdateUser(this)">Xác Thực</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeleteuser" onclick="showPopupDeleteUser(this)">Xóa</Button>'
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

function showPopupUpdateUser(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var username = chil[0].innerHTML;

    $("#dlgverifyuser input[name='username']").val(username);

}

function showPopupDeleteUser(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var username = chil[0].innerText;

    $("#dlgdeleteuser input[name='username']").val(username);
}


function handleDeleteUserAccount() {
    $("#dlgdeleteuser").modal('hide');
    $("#dlgloading").modal('show');
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/delete",
        data: $("#formdeleteuser").serialize(),
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

function handleVerifyUser() {
    $("#dlgverifyuser").modal('hide');
    $("#dlgloading").modal('show');
    
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/verify",
        data: serializeFormToJSon("#formverifyuser"),
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
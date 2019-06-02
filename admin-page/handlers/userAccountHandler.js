const BASE_USER_PATH = window.location.protocol + "//" + window.location.host + "/user";

var $dataTable;

function loadUserAccount(encodedUser) {
    const obj = JSON.parse(decodeURI(encodedUser));

    $dataTable = $('#userAccountTable').DataTable({
        "ajax": {
            "type": "GET",
            "url": BASE_USER_PATH + '/get',
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
                "data": "role",
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
                "data": "lastLoginTime",
                "defaultContent": ""
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdateuser" onclick="showPopupUpdateUser(this)">Chỉnh Sửa</Button>'
            },
            {
                data: null,
                className: "center",
                defaultContent: '<Button class="btn btn-block btn-danger btn-sm" data-toggle="modal" data-target="#dlgdeleteuser" onclick="showPopupDeleteUser(this)">Xóa</Button>'
            },
        ],
        "rowCallback": function (row, data, index) {

            if (data["username"] == obj.username){
                $(row).find('td:eq(8)').html('');
                $(row).find('td:eq(9)').html('');
            }
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

    $.ajax({
        type: "GET",
        url: BASE_USER_PATH + "/get/" + username,
        data: {
            username: username
        }
    }).done(function (resp) {

        const obj = JSON.parse(resp);

        $("#dlgupdateuser input[name='username']").val(obj.username);
        $("#dlgupdateuser input[name='password']").val(obj.password);
        $("#dlgupdateuser input[name='email']").val(obj.email);
        $("#dlgupdateuser input[name='birthDate']").val(obj.birthDate);
        $("#dlgupdateuser select[name='role'] option").filter(function () {
            return $.trim($(this).val()) === $.trim(obj.role);
        }).attr("selected", true).prop("selected", "selected");

        $("#dlgupdateuser input[name='fullName']").val(obj.fullName);
        $("#dlgupdateuser input[name='address']").val(obj.address);
        $("#dlgupdateuser input[name='phoneNumber']").val(obj.phoneNumber);
        $("#dlgupdateuser input[name='lastLoginTime']").val(obj.lastLoginTime);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
    }).always(function () {
    });
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

function handleInsertUserAccount() {
    
    if ($("#dlginsertuser input[name='password']").val() != $("#dlginsertuser input[name='repassword']").val())
    {
        FormUtils.showMessageBox('Mật Khẩu Không Trùng. Vui Lòng Nhập Lại', null,'error');
        return false;
    }
    $("#dlginsertuser").modal('hide');
    $("#dlgloading").modal('show');

    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/insert",
        // data: $("#formdeleteuser").serialize(),
        data: serializeFormToJSon("#forminsertuser"),
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

function handleUpdateUserAccount() {
    $("#dlgupdateuser").modal('hide');
    $("#dlgloading").modal('show');
    
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/update",
        data: serializeFormToJSon("#formupdateuser"),
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
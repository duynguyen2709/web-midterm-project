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
            },{
                "render": function (data, type, JsonResultRow, meta) {
                    return '<img width="64px" height="64px" src="' + JsonResultRow.avatar + '">';
                }
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
                defaultContent: '<Button class="btn btn-block btn-primary btn-sm" data-toggle="modal" data-target="#dlgupdateuserrole" onclick="showPopupUpdateUserRole(this)">Phân Quyền</Button>'
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
            if (data["role"] == "ADMIN") {
                $(row).find('td:eq(2)').css('color', 'green');
                //$(row).find('td:eq(9)').text('Đang Bán');
                $(row).find('td:eq(2)').html('<h4><span class="label label-success">ADMIN</span></h4>');
            } else if (data["role"] == "MANAGER"){
                $(row).find('td:eq(2)').css('color', 'blue');
                //$(row).find('td:eq(9)').text('Tạm Ngừng Bán');
                $(row).find('td:eq(2)').html('<h4><span class="label label-info">MANAGER</span></h4>');
            }
            else {
                $(row).find('td:eq(2)').css('color', 'gray');
                //$(row).find('td:eq(9)').text('Tạm Ngừng Bán');
                $(row).find('td:eq(2)').html('<h4><span class="label label-default">USER</span></h4>');
            }

            if (data["status"] == "1"){
                $(row).find('td:eq(10)').html('<Button class="btn btn-block btn-warning btn-sm" value="0" data-toggle="modal" data-target="#dlgupdateuser" onclick="showPopupUpdateUser(this)">Khóa</Button>');
            }
            else {
                $(row).find('td:eq(10)').html('<Button class="btn btn-block btn-success btn-sm" value="1" data-toggle="modal" data-target="#dlgupdateuser" onclick="showPopupUpdateUser(this)">Mở Khóa</Button>');
            }

            if (data["username"] == obj.username){
                $(row).find('td:eq(9)').html('');
                $(row).find('td:eq(10)').html('');
                $(row).find('td:eq(11)').html('');
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
    var status = $(itemthis).val();

    $("#dlgupdateuser input[name='username']").val(username);
    $("#dlgupdateuser input[name='status']").val(status);

}
function showPopupUpdateUserRole(itemthis) {
    var chil = $(itemthis).parent().parent().children();

    var username = chil[0].innerHTML;

    $("#dlgupdateuserrole input[name='username']").val(username);

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
        url: BASE_USER_PATH + "/lock",
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

function handleUpdateUserRole() {
    $("#dlgupdateuserrole").modal('hide');
    $("#dlgloading").modal('show');
    
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/changerole",
        data: serializeFormToJSon("#formupdateuserrole"),
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
function handleChangePassword() {
    $("#dlgchangepassword").modal('hide');

    if ($("#dlgchangepassword input[name='password']").val() != $("#dlgchangepassword input[name='repassword']").val())
    {
        FormUtils.showMessageBox('Mật Khẩu Không Trùng. Vui Lòng Nhập Lại', null,'error');
        return false;
    }

    $('#dlgloading').modal('show');
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/changepassword",
        data: serializeFormToJSon("#formchangepassword"),
        dataType: "json"
    }).done(function (resp) {

        if (resp.status == 200) {
            FormUtils.showMessageBox('Đổi Mật Khẩu Thành Công', reloadUserDetail, 'success');
        } else {
            FormUtils.showMessageBox(resp.data, null, 'error');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
        FormUtils.showMessageBox('Đổi Mật Khẩu Thất Bại', null, 'error');
       
    }).always(function () {     
        $('#dlgloading').modal('hide');
    });
}

function handleUpdateUserDetail() {
    $("#dlgupdateuserdetail").modal('hide');
    $('#dlgloading').modal('show');
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/update",
        data: serializeFormToJSon("#formupdateuserdetail"),
        dataType: "json"
    }).done(function (resp) {

        if (resp.status == 200) {
            FormUtils.showMessageBox('Cập Nhật Thông Tin Thành Công', reloadUserDetail, 'success');
        } else {
            FormUtils.showMessageBox('Cập Nhật Thông Tin Thất Bại', null, 'error');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
        FormUtils.showMessageBox('Cập Nhật Thông Tin Thất Bại', null, 'error');
       
    }).always(function () {
       
        $('#dlgloading').modal('hide');
    });
}

function reloadUserDetail(){
    window.location.href = window.location.protocol + "//" + window.location.host + "/userdetail/reload";
}

function showPopupUpdateUserDetail(userEncoded) {

    const obj = JSON.parse(decodeURI(userEncoded));

    $("#dlgupdateuserdetail input[name='username']").val(obj.username);
    $("#dlgupdateuserdetail input[name='password']").val(obj.password);
    $("#dlgupdateuserdetail input[name='fullName']").val(obj.fullName);
    $("#dlgupdateuserdetail input[name='email']").val(obj.email);
    $("#dlgupdateuserdetail input[name='role']").val(obj.role);
    $("#dlgupdateuserdetail input[name='avatar']").val(obj.avatar);
    $("#dlgupdateuserdetail input[name='birthDate']").val(obj.birthDate);
    $("#dlgupdateuserdetail input[name='address']").val(obj.address);
    $("#dlgupdateuserdetail input[name='phoneNumber']").val(obj.phoneNumber);
}
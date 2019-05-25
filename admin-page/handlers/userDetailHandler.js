function handleChangePassword() {
    FormUtils.showMessageBox('test', null, 'success');
}

function handleUpdateUserDetail() {
    $.ajax({
        type: "POST",
        url: BASE_USER_PATH + "/update",
        data: serializeFormToJSon("#formupdateuserdetail"),
        dataType: "json"
    }).done(function (resp) {
        console.log("Response: " + resp.status + " - " + resp.data);

        if (resp.status == 200) {
            FormUtils.showMessageBox('Cập Nhật Thông Tin Thành Công', null, 'success');
        } else {
            FormUtils.showMessageBox('Cập Nhật Thông Tin Thất Bại', null, 'error');
        }
        $("#dlgupdateuserdetail").modal('hide');
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
        FormUtils.showMessageBox('Cập Nhật Thông Tin Thất Bại', null, 'error');
        $("#dlgupdateuserdetail").modal('hide');
    }).always(function () {
        
    });
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
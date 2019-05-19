var FormUtils = {
    displayError: function (returnMessage)
    {
        alert(returnMessage);
    },
    showConfirmMessageBox: function (msg, callback, type, buttontext)
    {
        if (buttontext !== null && buttontext !== undefined && buttontext !== '') {
            $('#confirm-btn').text(buttontext);
        }
        var isConfirm = false;
        $('#popup_confirm_message_box_content').text(msg);
        $('#popup_confirm_message_box').show();
        $('#popup_confirm_message_box_dim').click(function (e)
        {
            doClose();
        });
        $('#popup_confirm_message_box_close').click(function (e)
        {
            doClose();
        });
        $('#confirm-btn-cancel').click(function () {
            isConfirm = false;
            doClose();
        });
        $('#confirm-btn').click(function () {
            isConfirm = true;
            doClose();
        });
        function doClose()
        {
            $('#popup_confirm_message_box').hide();
            if (callback !== undefined && callback !== null && isConfirm) {
                callback();
                callback = null;
            }
            $('#popup_confirm_message_box_dim').unbind("click");
            $('#confirm-btn-cancel').unbind("click");
            $('#confirm-btn-delete').unbind("click");
            $('#popup_confirm_message_box_close').unbind("click");
        }

        switch (type)
        {
            case "error":
                $('#popup_message_panel').attr("class", "panel panel-danger");
                break;
            case "success":
                $('#popup_message_panel').attr("class", "panel panel-success");
                break;
            default:
                $('#popup_message_panel').attr("class", "panel panel-default");
                break;
        }

        $('#popup_confirm_message_box_dim').css('height', $(document).height() + 'px');
    },
    showMessageBox: function (msg, callback, type)
    {
        $('#msg_header').html("Thông báo");
        $('#popup_message_box_content').text(msg);
        $('#popup_message_box').show();
        $('#popup_message_box_dim').click(function (e)
        {
            doClose();
        });
        $('#popup_message_box_close').click(function (e)
        {
            doClose();
        });
        function doClose()
        {
            $('#popup_message_box').hide();
            if (callback !== undefined && callback !== null)
                callback();
        }

        switch (type)
        {
            case "error":
                $('#popup_message_panel').attr("class", "panel panel-danger");
                break;
            case "success":
                $('#popup_message_panel').attr("class", "panel panel-success");
                break;
            default:
                $('#popup_message_panel').attr("class", "panel panel-default");
                break;
        }

        $('#popup_message_box_dim').css('height', $(document).height() + 'px');
    },
    showMessageBoxWithTitle: function (msg, title, callback, type)
    {
        $('#msg_header').html(title);
        $('#popup_message_box_content').text(msg);
        $('#popup_message_box').show();
        $('#popup_message_box_dim').click(function (e)
        {
            doClose();
        });
        $('#popup_message_box_close').click(function (e)
        {
            doClose();
        });
        function doClose()
        {
            $('#popup_message_box').hide();
            if (callback !== undefined && callback !== null)
                callback();
        }

        switch (type)
        {
            case "error":
                $('#popup_message_panel').attr("class", "panel panel-danger");
                break;
            case "success":
                $('#popup_message_panel').attr("class", "panel panel-success");
                break;
            default:
                $('#popup_message_panel').attr("class", "panel panel-default");
                break;
        }

        $('#popup_message_box_dim').css('height', $(document).height() + 'px');
    },
     clearError: function () {
         $("input").change(function () {
             $(this).parent().parent().removeClass('has-error');
             $(this).next().empty();
         });
         $("textarea").change(function () {
             $(this).parent().parent().removeClass('has-error');
             $(this).next().empty();
         });
         $("select").change(function () {
             $(this).parent().parent().removeClass('has-error');
             $(this).next().empty();
         });
     },
};


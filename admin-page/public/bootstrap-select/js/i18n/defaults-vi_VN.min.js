(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], function (a0) {
            return (factory(a0));
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        factory(root["jQuery"]);
    }
}(this, function (jQuery) {
    (function ($) {
        $.fn.selectpicker.defaults = {
            noneSelectedText: 'Vui lòng chọn',
            noneResultsText: 'Không tìm thấy kết quả',
            countSelectedText: function (numSelected, numTotal) {
                return "Đã chọn {0}";
            },
            maxOptionsText: function (numAll, numGroup) {
                return ["Tối đa chọn {n}", "Tối đa mỗi nhóm chọn {n}"];
            },
            selectAllText: 'Chọn tất cả',
            deselectAllText: 'Hủy đã chọn',
            multipleSeparator: ', '
        };
    })(jQuery);
}));

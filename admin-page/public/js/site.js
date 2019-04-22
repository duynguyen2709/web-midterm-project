$(document).ready(function () {
    loadPagination(".table-pagination", 10, 5);
    if (!$.fn.DataTable.isDataTable('table')) {
        $("table").DataTable({
            "ordering": false, "paging": false, "info": false, "searching": false
        });
    }
    $('#datetimepicker_start_time').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
    });
    $('#datetimepicker_end_time').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',
        minDate: new Date()
    });
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

});

function loadPagination(selector, pages, currentPage) {
    $(selector).pagination({
        pages: pages,
        currentPage: currentPage,
        displayedPages: 3,
        edges: 1,
        useAnchors: true,
        prevText: 'Prev',
        nextText: 'Next',
        nextAtFront: true,
        invertPageOrder: false
    });
}
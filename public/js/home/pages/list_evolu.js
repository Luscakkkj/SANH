$(document).ready(function () {
    document.querySelectorAll('.date').forEach((element) => {
        var originalDate = element.textContent;
        var formattedDate = moment(originalDate).format('DD/MM/YY');
        element.textContent = formattedDate;
    });

    $("#search").on("input", function () {
        var value = $(this).val();
        $(".date").each(function () {
            var dateText = moment($(this).text(), 'DD/MM/YY').format('YYYY-MM-DD');
            $(this).closest('.evolucao-item').toggle(dateText.includes(value));
        });
    });

    $(document).on("click", ".excluir i", function () {
        $(".delete-evolucao").show();
    });

    $(document).on("click", "#cancel-delete", function () {
        $(".delete-evolucao").hide();
    });
});

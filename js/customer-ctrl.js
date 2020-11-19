//=======================Global Variables=======================
var txtId = $('#txt-id');
var txtName = $('#txt-name');
var txtAddrss = $('#txt-address');


//===============================================================


//============================Event Handlers=======================

$('#btn-save').click(handleSave);








$('table tbody').on('click','tr',function () {


    txtId.val($($(this).children('td')[0]).text());
    txtName.val($($(this).children('td')[1]).text());
    txtAddrss.val($($(this).children('td')[2]).text());

    txtId.prop('disabled',true);


});



//=================================================================


//========================================Functions==========================

function handleSave() {
    if (!validate()) {
        return;
    }


    var btn = $('<td><button class="btn btn-danger" type="button">Delete</button></td>');
    var rowDetail = $('<tr><td>' + $('#txt-id').val() + '</td><td>' + $('#txt-name').val() + '</td><td>' + $('#txt-address').val() + '</td></tr>');
    $(rowDetail.find('tr td').prevObject[0]).append(btn);

    $('table tbody').append(rowDetail);
    btn.children().click(function (event) {

        $(this).parent().parents('tr').remove();

    });

    txtId.val('');
    txtName.val('');
    txtAddrss.val('');




}


function validate() {
    var isValid = true;

    var regEx;

    txtAddrss.removeClass('is-invalid');


    regEx = /^[a-zA-Z .d]{5,}$/;
    if (!regEx.test(txtAddrss.val())) {
        txtAddrss.focus();
        txtAddrss.addClass('is-invalid');
        isValid = false;
    }


    txtName.removeClass('is-invalid');
    txtName.removeClass('is-valid');
    regEx = /^[a-zA-Z .]{3,}$/;
    if (!regEx.test(txtName.val())) {
        txtName.focus();
        txtName.addClass('is-invalid');
        isValid = false;
    }


    txtId.parent().children('small').addClass('text-muted');
    txtId.parent().children('small').removeClass('invalid-feedback');
    txtId.removeClass('is-invalid');
    regEx = /^C\d{3}$/;
    if (!regEx.test(txtId.val())) {
        txtId.focus();
        txtId.addClass('is-invalid');
        txtId.parent().children('small').removeClass('text-muted');
        txtId.parent().children('small').addClass('invalid-feedback');
        isValid = false;
    }


    return isValid;
}


function clearSelection() {
    txtId.prop('disabled',false);




}

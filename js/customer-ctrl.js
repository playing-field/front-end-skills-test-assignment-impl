//=======================Global Variables=======================
var txtId = $('#txt-id');
var txtName = $('#txt-name');
var txtAddrss = $('#txt-address');

var pageSize;

var customers = [];

//===============================================================

//======================init()=============================
init();
function init(){
    //First We have to calculate how many rows able to add?so iam going to add a fake row and going to calculate its height and maximum rows





    $('table tbody').append(
        '<tr>\n' +
        '                        <td>ID</td>\n' +
        '                        <td>Name</td>\n' +
        '                        <td>Address</td>\n' +
        '                        <td><div class="trash"></div></td>\n' +
        '                    </tr>'

    );






    $('nav').removeClass('hidden');


    pageSize=1;


    var bool=true;
    calculate();


    function calculate() {
        for (; bool;) {

            if ($(window).innerHeight() + 0.4 < ($('body').innerHeight())) {
                return;
            }
            $('table tbody').append($('table tbody tr').first().clone());
            pageSize++;


        }
    }


    //let's clear the table





}




//============================Event Handlers=======================

$('#btn-save').click(handleSave);


$('table tbody').on('click', 'tr', function () {

    clearSelection();

    txtId.val($($(this).children('td')[0]).text());
    txtName.val($($(this).children('td')[1]).text());
    txtAddrss.val($($(this).children('td')[2]).text());

    txtId.prop('disabled', true);

    $(this).addClass('selected');


});


//=================================================================


//========================================Functions==========================


function handleTFootVisibility() {
    if(customers.length===0){
        $('tfoot tr').removeClass('invisible');
    }else{
        $('tfoot tr').addClass('invisible');
    }

}

function handlePagination() {

}

function handleSave() {
    /*if (!validate()) {
        return;
    }*/


    // var btn = $('<td><button class="btn btn-danger btn-sm" type="button">Delete</button></td>');
    var btn = $('<td><div class="trash"></div></td>');
    var rowDetail = $('<tr><td>' + $('#txt-id').val() + '</td><td>' + $('#txt-name').val() + '</td><td>' + $('#txt-address').val() + '</td></tr>');
    $(rowDetail.find('tr td').prevObject[0]).append(btn);

    $('table tbody').append(rowDetail);
    btn.children().click(function () {

        var delCusId=$($(this).parents('tr').children('td')[0]).text();

        // var findIndex=function(){
        //     for(var i=0;i<customers.length;i++){
        //
        //         if(customers[i].id===delCusId){
        //             return i;
        //         }
        //
        //     }
        // };
        // var index=findIndex();
        // customers.splice(index,1);
        // console.log(customers);    Yata widiyatath karanna puluwan

        customers.splice(function(){
            for(var i=0;i<customers.length;i++){

                if(customers[i].id===delCusId){
                    return i;
                }

            }
        },1);

        $(this).parent().parents('tr').remove();
        handleTFootVisibility();

    });


    customers.push({
        id: txtId.val(),
        name: txtName.val(),
        address: txtName.val()
    });

    txtId.val('');
    txtName.val('');
    txtAddrss.val('');


    handleTFootVisibility();

    handlePagination();



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


    if(customers.findIndex(function (c) {
        return txtId.val()===c.id;
    })!==-1){
        alert('Duplicate Customers IDs are not allowed!');
        txtId.focus();
        isValid=false;
    }




    return isValid;
}


function clearSelection() {
    txtId.prop('disabled', false);


    $('table tr').removeClass('selected');


}


console.log(pageSize);

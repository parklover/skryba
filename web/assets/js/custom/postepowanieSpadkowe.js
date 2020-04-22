
$(document).on('click', '.adres', function(){
    $('#adresModal').modal('show');
    var id = $(this).parents('tr').attr('data-id');
    $('.zapiszAdres').attr('data-id', id);
    var $tr = $('.collection-element[data-id='+id+']');

    $('.adresMiasto').val($tr.children('input[name*=miastoZamieszkania]').val());
    $('.adresTypObiektu').val($tr.children('input[name*=numerDomuZamieszkania]').val());
    $('.adresNazwaObiektu').val($tr.children('input[name*=numerMieszkaniaZamieszkania]').val());
    $('.adresNumerDomu').val($tr.children('input[name*=typObiektuZamieszkania]').val());
    $('.adresNumerMieszkania').val($tr.children('input[name*=nazwaObiektuZamieszkania]').val());
});

function validateDO(numer)
{
    //Check length
    if (numer == null || numer.length != 9)
        return false;

    numer = numer.toUpperCase();
    letterValues = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function getLetterValue(letter){
        return letterValues.indexOf(letter)
    }

    //Check seria
    for (i=0; i<3; i++)
        if (getLetterValue(numer[i]) < 10 || numer[i] == 'O' || numer == 'Q')
            return false;
    //Check numbers
    for (i=3; i<9; i++)
        if (getLetterValue(numer[i]) < 0 || getLetterValue(numer[i]) > 9)
            return false;

    //sprawdz cyfre kontrolna
    sum = 7 * getLetterValue(numer[0]) +
        3 * getLetterValue(numer[1]) +
        1 * getLetterValue(numer[2]) +
        7 * getLetterValue(numer[4]) +
        3 * getLetterValue(numer[5]) +
        1 * getLetterValue(numer[6]) +
        7 * getLetterValue(numer[7]) +
        3 * getLetterValue(numer[8]);
    sum %= 10;
    if (sum != getLetterValue(numer[3]))
        return false;

    return true;
}

$(document).on('focusout', '.id-validate', function(){
    var numerDowodu = $(this).val();
    if(!validateDO(numerDowodu)){
        $(this).val('');
        swal('Uwaga!', 'Podany numer dowodu jest niepoprawny!', 'warning');
    }
});

$(document).on('change', '.sprawdzCzyZona', function(){
    console.log("Zmiana pokrewieństwa");
    var czyMalzonek = false;
    var czyDzieci = false;
    var $spadkobiercy = $('.collection').find('.collection-element');
    var $input = $(this);

    $spadkobiercy.each(function() {
        var pokrewienstwo = $(this).find('select[name*=stopienPokrewienstwa]').val();
        var pesel = $(this).find('input[name*=pesel]').val();
        console.log($(this));
        console.log($(this).find('select[name*=stopienPokrewienstwa]'));
        console.log(pokrewienstwo);
        if (pokrewienstwo == 4 || pokrewienstwo == 3) {
            czyMalzonek = true;
        }
        if (pokrewienstwo == 5 || pokrewienstwo == 6) {
            czyDzieci = true;
            if($('.collection-element-akt[data-pesel="'+pesel+'"]').length < 1){
                addTagFormAkty($('.collection-akty'), 1, pesel, $(this).find('input[name*=imie]').val()+" "+$(this).find('input[name*=nazwisko]').val());
            }
            // $(this).children('td.numerAktuUrodzenia').children('input').removeAttr('disabled');
        }
        else{
            if($('.collection-element-akt[data-pesel="'+pesel+'"]').length > 1){
                $('.collection-element-akt[data-pesel="'+pesel+'"]').attr
            }
        }
    });

    if(czyMalzonek){
        if(!$('.collection-element-akt[data-malzonek="1"]').length < 1){
            addTagFormAkty($('.collection-akty'), 2, pesel, $(this).find('input[name*=imie]').val()+" "+$(this).find('input[name*=nazwisko]').val());
        }
    }
    else{
        if($('.collection-element-akt[data-malzonek="1"]').length < 1){
            $('.collection-element-akt[data-malzonek="1"]').remove();
        }
    }

    if (czyDzieci) {
        $('.numerAktuUrodzeniaTd').show();
        $(document).find('.numerAktuUrodzenia').each(function(){ $(this).show(); });
    }
    else{
        $('.numerAktuUrodzeniaTd').hide();
        $(document).find('.numerAktuUrodzenia').each(function(){ $(this).hide(); });
    }
});

$(document).on('focusout', '.pesel-validate', function(){
    var pesel = $(this).val();
    // var wiersz = $(this).parents('tr').attr('data-id');
    var $tr= $(this).parents('tr');
    if(pesel !== "" && pesel.length === 11) {
        console.log(pesel);
        $.ajax({
            type: "POST",
            dataType: 'json',
            data: {
                'pesel': pesel,
            },
            url: Routing.generate('sprawdz_pesel'),
        }).done(function (response) {
            if (response['status']) {
                if (response['osoba'] !== null) {
                    console.log(response['osoba']);
                    $tr.find('input[name*=imie]').val(response['osoba']['imie']);
                    $tr.find('input[name*=nazwisko]').val(response['osoba']['nazwisko']);
                    $tr.find('input[name*=imieOjca]').val(response['osoba']['imieOjca']);
                    $tr.find('input[name*=imieMatki]').val(response['osoba']['imieMatki']);
                    $tr.find('input[name*=miejsceUrodzenia]').val(response['osoba']['miejsceUrodzenia']);
                    $tr.find('input[name*=miastoZamieszkania]').val(response['osoba']['miastoZamieszkania']);
                    $tr.find('input[name*=numerDomuZamieszkania]').val(response['osoba']['numerDomuZamieszkania']);
                    $tr.find('input[name*=numerMieszkaniaZamieszkania]').val(response['osoba']['numerMieszkaniaZamieszkania']);
                    $tr.find('input[name*=typObiektuZamieszkania]').val(response['osoba']['typObiektuZamieszkania']);
                    $tr.find('input[name*=nazwaObiektuZamieszkania]').val(response['osoba']['nazwaObiektuZamieszkania']);
                    $tr.find('input[name*=numerDowodu]').val(response['osoba']['numerDowodu']);
                    // $tr.find('input[name*=dataWaznosciDowodu]').val(response['osoba']['dataWaznosciDowodu']);
                    $tr.find('input[name*=dataWaznosciDowodu]').datepicker("setDate", new Date(response['osoba']['dataWaznosciDowodu']) );
                }
            } else {
                swal('Uwaga!', 'Podany pesel jest niepoprawny!', 'warning');
                $tr.children('.pesel').children('input[name*=pesel]').val('');
            }
        });
    }else {
        swal('Uwaga!', 'Podany pesel jest niepoprawny!', 'warning');
        $tr.children('.pesel').children('input[name*=pesel]').val('');
    }
});

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = this.getDate().toString();
    return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
};

$('.uzupelnijTestowo').click(function(){
    console.log("dzisiejszaData");
    var dzisiejszaData = new Date();
    var dataSmierci = new Date();
    var dataAktuZgonu = new Date();
    dataSmierci.setDate(dataSmierci.getDate() - 4);
    dataAktuZgonu.setDate(dataAktuZgonu.getDate() - 2);
    console.log(dzisiejszaData);
    console.log(dzisiejszaData.yyyymmdd());
    console.log(dataAktuZgonu);
    console.log(dataAktuZgonu.yyyymmdd());
    console.log(dataSmierci);
    console.log(dataSmierci.yyyymmdd());
    $('#postepowanie_spadkowe_dataCzynnosci').datepicker("setDate", dzisiejszaData );
    $('#postepowanie_spadkowe_dataSmierci').datepicker("setDate", dataSmierci );
    $('#postepowanie_spadkowe_miejsceZgonu').val("Poznań");
    $('#postepowanie_spadkowe_miejsceWydaniaAktuZgonu').val("Poznań");
    $('#postepowanie_spadkowe_dataWydaniaAktuZgonu').datepicker("setDate", dataAktuZgonu );
    $('#postepowanie_spadkowe_numerAktuZgonu').val("USC/UZ/23");

    addTagForm($('.collection'));
    addTagForm($('.collection'));

    $('.collection-element[data-id="0"]').find('input[name*=pesel]').val("61081814070").trigger('focusout');
    $('.collection-element[data-id="0"]').children('.adresTd').children('.adres').html("Edytuj adres");

    $('.collection-element[data-id="1"]').find('input[name*=pesel]').val("86012533451").trigger('focusout');
    $('.collection-element[data-id="1"]').find('select[name*=stopienPokrewienstwa]').val(6).trigger('change');
    $('.collection-element[data-id="1"]').find('input[type*=checkbox]').trigger('click');
    $('.collection-element[data-id="1"]').find('input[name*=udzial]').val("1 / 4").trigger('change');
    $('.collection-element[data-id="1"]').find('input[name*=numerSkroconegoAktuUrodzeniaPotomka]').val("USZ/UC/3").trigger('change');
    $('.collection-element[data-id="1"]').children('.adresTd').children('.adres').html("Edytuj adres");

    $('.collection-element[data-id="2"]').find('input[name*=pesel]').val("93041343476").trigger('focusout');
    $('.collection-element[data-id="2"]').find('select[name*=stopienPokrewienstwa]').val(5).trigger('change');
    $('.collection-element[data-id="2"]').find('input[type*=checkbox]').trigger('click');
    $('.collection-element[data-id="2"]').find('input[name*=udzial]').val("1 / 4").trigger('change');
    $('.collection-element[data-id="2"]').find('input[name*=numerSkroconegoAktuUrodzeniaPotomka]').val("USZ/UC/34").trigger('change');
    $('.collection-element[data-id="2"]').children('.adresTd').children('.adres').html("Edytuj adres");

    $('.collection-element[data-id="3"]').find('input[name*=pesel]').val("66072289343").trigger('focusout');
    $('.collection-element[data-id="3"]').find('select[name*=stopienPokrewienstwa]').val(4).trigger('change');
    $('.collection-element[data-id="3"]').find('input[type*=checkbox]').trigger('click');
    $('.collection-element[data-id="3"]').find('input[name*=udzial]').val("1 / 2").trigger('change');
    $('.collection-element[data-id="3"]').children('.adresTd').children('.adres').html("Edytuj adres");

    $('#postepowanie_spadkowe_numerSkroconegoAktuMalzenstwaMalzonka').val(" 32/2462").trigger('change');

});

$('.zapiszAdres').click(function(){
    var id = $(this).attr('data-id');
    var adresMiasto = $('.adresMiasto').val();
    var adresTypObiektu = $('.adresTypObiektu').val();
    var adresNazwaObiektu = $('.adresNazwaObiektu').val();
    var adresNumerDomu = $('.adresNumerDomu').val();
    var adresNumerMieszkania = $('.adresNumerMieszkania').val();
    var $tr = $('.collection-element[data-id='+id+']');
    $tr.children('input[name*=miastoZamieszkania]').val(adresMiasto);
    $tr.children('input[name*=numerDomuZamieszkania]').val(adresTypObiektu);
    $tr.children('input[name*=numerMieszkaniaZamieszkania]').val(adresNazwaObiektu);
    $tr.children('input[name*=typObiektuZamieszkania]').val(adresNumerDomu);
    $tr.children('input[name*=nazwaObiektuZamieszkania]').val(adresNumerMieszkania);

    if(adresMiasto !== "" && adresNumerDomu !== "" ){
        $tr.children('.adresTd').children('.adres').html("Edytuj adres");
        // $tr.children('.adresTd').children('.adres').val("Edytuj adres");
        // $tr.children('.adresTd').children('.adres').attr('label', "Edytuj adres");
        $('#adresModal').modal('hide');
    }else{
        swal('Uwaga!', 'Uzupełnij rodzaje odzieży!', 'warning');
    }
});


$('#postepowanie_spadkowe_miastoNieruchomosci').parent('.col-md-8').parent('.form-group').hide();
$('#postepowanie_spadkowe_ksiegaWieczystaNieruchomosci').parent('.col-md-8').parent('.form-group').hide();

$('#postepowanie_spadkowe_zmianaWlascicielaNieruchomosci').click(function() {
    if ($(this).is(":checked")) {
        $('#postepowanie_spadkowe_miastoNieruchomosci').parent('.col-md-8').parent('.form-group').show();
        $('#postepowanie_spadkowe_ksiegaWieczystaNieruchomosci').parent('.col-md-8').parent('.form-group').show();
    } else if ($(this).is(":not(:checked)")) {
        $('#postepowanie_spadkowe_miastoNieruchomosci').parent('.col-md-8').parent('.form-group').hide();
        $('#postepowanie_spadkowe_ksiegaWieczystaNieruchomosci').parent('.col-md-8').parent('.form-group').hide();
    }
});


$('.form-date').datepicker({
    format: "yyyy-mm-dd",
    language: "pl",
    orientation: "bottom auto",
    autoclose: true
});
if($('.collection-element').length==0) {
    addTagForm($('.collection'));
    // addTagForm($('.collection'));
}
$(document).on('click','.dodaj-element',function (e) {
    e.preventDefault();
    addTagForm($(this).parents('.collection').eq(0));
});
$(document).on('click',".usun",function(e){
    e.preventDefault();
    var $obj = $(this).parents('.collection-element').eq(0);
    if(!$obj.next().hasClass('collection-element') && !$obj.next().hasClass('collection-add')){
        $obj.next().remove();
    }
    $obj.remove();
    przeliczRow();
});

function przeliczRow(){
    $('.collection-element[data-id="1"]').find('select[name*=stopienPokrewienstwa]').trigger('change');
    var $collectionHolder = $('.collection');
    var index = 1;
    $collectionHolder.children('.collection-element').each(function(){
        $(this).attr('data-id', index);
        $(this).children('.c-lp').html(index);
        index++;
    });
}

function addTagForm($collectionHolder) {
    var prototype = $collectionHolder.data('prototype');
    var index =($collectionHolder.data('index'))?$collectionHolder.data('index'):$collectionHolder.children('.collection-element').length;
    var newForm = prototype.split($collectionHolder.attr('data-prototype-name')).join(index);
    $collectionHolder.data('index', index + 1);
    $collectionHolder.find('.collection-add').last().before(newForm);
    $('.form-date').datepicker({
        format: "yyyy-mm-dd",
        language: "pl",
        orientation: "bottom auto",
        autoclose: true
    });
    przeliczRow();
}

function addTagFormAkty($collectionHolder, typ, pesel, nazwa) {
    console.log("DZIALA");
    var prototype = $collectionHolder.data('prototype');
    console.log(prototype);
    var index =($collectionHolder.data('index'))?$collectionHolder.data('index'):$collectionHolder.children('.collection-element-akt').length;
    console.log(index);
    var newForm = prototype.split($collectionHolder.attr('data-prototype-name')).join(index);
    console.log(newForm);
    $collectionHolder.data('index', index + 1);
    $collectionHolder.find('.collection-add-akty').last().before(newForm);

    $collectionHolder.find('.collection-element-akt').last().find('input[name*=typ]').val(typ);
    $collectionHolder.find('.collection-element-akt').last().find('input[name*=nazwa]').val(nazwa);
    $collectionHolder.find('.collection-element-akt').last().attr('data-pesel', pesel)
    if(typ === 2){
        $collectionHolder.find('.collection-element-akt').last().attr('data-malzonek', 1)
    }
}

$(document).on('click',"#generujDrzewo",function(e){
    var $spadkobiercy = $('.collection').find('.collection-element');
    var $spadkodawca = {};
    var $spadkodawcaElement = $('tr .collection-element [data-id="0"]');;
    var treeModelJSON =
        {
            "class": "go.TreeModel",
            "nodeDataArray": []
        };
    var index = 1;
    $spadkodawca.$spadkobierca.key = index;
    $spadkobierca.name = $spadkodawcaElement.children('input[name*=imie]').val()+" "+$(this).children('input[name*=nazwisko]').val();
    index++;

    var poziomWzwyz = 0;
    var czyZona = false;

    $spadkobiercy.each(function(){
        var $spadkobierca = {};
        $spadkobierca.key = index;
        $spadkobierca.name = $(this).children('input[name*=imie]').val()+" "+$(this).children('input[name*=nazwisko]').val();
        var stopienPokrewienstwa = $(this).children('input[name*=stopienPokrewienstwa]').val();
        if(stopienPokrewienstwa===1 || stopienPokrewienstwa===2){
            poziomWzwyz = 1;
        }
        if(stopienPokrewienstwa===7 || stopienPokrewienstwa===8){
            poziomWzwyz = 2;
        }
        if(stopienPokrewienstwa===3 || stopienPokrewienstwa===4){
            czyZona = true;
        }
        $spadkobierca.title = stopienPokrewienstwa;
        treeModelJSON.nodeDataArray.push();
        index++;
    });

    treeModelJSON.nodeDataArray.sort(SortByStopienPokrewienstwa);





    load();
});

function SortByStopienPokrewienstwa(a, b){
    var aName = a.title;
    var bName = b.title;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}



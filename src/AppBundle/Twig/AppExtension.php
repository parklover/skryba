<?php
/**
 * Created by PhpStorm.
 * User: slawe
 * Date: 08.02.2020
 * Time: 16:38
 */

namespace AppBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class AppExtension extends AbstractExtension
{
    public function getFilters()
    {
        return [
            new TwigFilter('dataSlownie', [$this, 'dataSlownie']),
            new TwigFilter('pokrewienstwoSlownie', [$this, 'pokrewienstwoSlownie']),
            new TwigFilter('dataZPeselu', [$this, 'dataZPeselu']),
            new TwigFilter('ulica', [$this, 'ulica']),
            new TwigFilter('imieMeskieDopelniacz', [$this, 'imieMeskieDopelniacz']),
            new TwigFilter('nazwiskoMeskieDopelniacz', [$this, 'nazwiskoMeskieDopelniacz']),
            new TwigFilter('imieMeskieMiejscownik', [$this, 'imieMeskieMiejscownik']),
            new TwigFilter('nazwiskoMeskieMiejscownik', [$this, 'nazwiskoMeskieMiejscownik']),
            new TwigFilter('imieZenskie', [$this, 'imieZenskie']),
            new TwigFilter('miasto', [$this, 'miasto']),
            new TwigFilter('indexLiterka', [$this, 'indexLiterka']),
        ];
    }

    public function indexLiterka($indexLiterka){
        $literka = ord('a') + $indexLiterka;
        return chr($literka);
    }

    public function ulica($ulica){

        $ulicaTablica = explode(' ', $ulica, 2);
        $nazwaUlicy = $ulicaTablica[0];
        $koncowkaLeksykalna = substr($nazwaUlicy, -2);
        if($koncowkaLeksykalna == "ka"){
            return substr($nazwaUlicy, 0,-1)."iej ".$ulicaTablica[1];
        }
        if($koncowkaLeksykalna == "wa"){
            return substr($nazwaUlicy, 0,-1)."ej ".$ulicaTablica[1];
        }
        return $ulica;
    }

    public function miasto($miasto){

        $koncowkaLeksykalna1 = substr($miasto, -2);
        $koncowkaLeksykalna2 = substr($miasto, -3);
        $koncowkaLeksykalna4 = substr($miasto, -5);

//        dump($miasto);
//        dump($koncowkaLeksykalna1);
//        dump($koncowkaLeksykalna2);

        if($koncowkaLeksykalna1 == "ń"){
            return substr($miasto, 0,-2)."niu";
        }
        if($koncowkaLeksykalna2 == "no"){
            return substr($miasto, 0,-3)."nie";
        }
        if($koncowkaLeksykalna2 == "ów"){
            return substr($miasto, 0,-3)."owie";
        }
        if($koncowkaLeksykalna4 == "wiec"){
            return substr($miasto, 0,-5)."wcu";
        }
        return $miasto;
    }

    public function imieZenskie($imieZenskie){

        $koncowkaLeksykalna = substr($imieZenskie, -2);
        if($koncowkaLeksykalna == "ga"){
            return substr($imieZenskie, 0,-1)."i";
        }
        else{
            return substr($imieZenskie, 0 , -1)."y";
        }
    }

    public function imieMeskieDopelniacz ($imieMeskieDopelniacz ){

        return $imieMeskieDopelniacz ."a";
    }

    public function nazwiskoMeskieDopelniacz($nazwiskoMeskieDopelniacz){
        $koncowkaLeksykalna1 = substr($nazwiskoMeskieDopelniacz, -1);
        $koncowkaLeksykalna2 = substr($nazwiskoMeskieDopelniacz, -2);
        $koncowkaLeksykalna3 = substr($nazwiskoMeskieDopelniacz, -3);
        if($koncowkaLeksykalna2 == "ki"){
            return $nazwiskoMeskieDopelniacz."ego";
        }
        return $nazwiskoMeskieDopelniacz."a";
    }

    public function imieMeskieMiejscownik($imieMeskieMiejscownik){

        $koncowkaLeksykalna1 = substr($imieMeskieMiejscownik, -1);
        $koncowkaLeksykalna2 = substr($imieMeskieMiejscownik, -2);
        $koncowkaLeksykalna3 = substr($imieMeskieMiejscownik, -3);
        if($koncowkaLeksykalna2 == "ek"){
            return substr($imieMeskieMiejscownik, 0 , -2)."ku";
        }
        if($koncowkaLeksykalna2 == "el"){
            return substr($imieMeskieMiejscownik, 0 , -2)."elu";
        }
        if($koncowkaLeksykalna2 == "ir"){
            return substr($imieMeskieMiejscownik, 0 , -2)."irze";
        }
        if($koncowkaLeksykalna1 == "n"){
            return substr($imieMeskieMiejscownik, 0 , -1)."nie";
        }
        if($koncowkaLeksykalna1 == "p"){
            return substr($imieMeskieMiejscownik, 0 , -1)."pie";
        }
        return $imieMeskieMiejscownik;
    }

    public function nazwiskoMeskieMiejscownik($nazwiskoMeskieMiejscownik){

        $koncowkaLeksykalna1 = substr($nazwiskoMeskieMiejscownik, -1);
        $koncowkaLeksykalna2 = substr($nazwiskoMeskieMiejscownik, -2);
        $koncowkaLeksykalna3 = substr($nazwiskoMeskieMiejscownik, -3);
        if($koncowkaLeksykalna2 == "ki"){
            return substr($nazwiskoMeskieMiejscownik, 0 , -2)."kim";
        }
        return $nazwiskoMeskieMiejscownik;
    }

    public function dataZPeselu($pesel){
        $peselArray = str_split($pesel);
        $year = 0;
        $month = 0;
        $day = 0;
        $year = 10 * (int)$peselArray[0];
        $year += (int)$peselArray[1];
        $month = 10 * (int)$peselArray[2];
        $month += (int)$peselArray[3];
        $day = 10 * $peselArray[4];
        $day += $peselArray[5];
        if ($month > 80 && $month < 93) {
            $year += 1800;
            $month -= 80;
        }
        else if ($month > 0 && $month < 13) {
            $year += 1900;
        }
        else if ($month > 20 && $month < 33) {
            $year += 2000;
            $month -= 20;
        }
        else if ($month > 40 && $month < 53) {
            $year += 2100;
            $month -= 40;
        }
        else if ($month > 60 && $month < 73) {
            $year += 2200;
            $month -= 60;
        }

        $data = \DateTime::createFromFormat('Y-m-d', $year.'-'.$month.'-'.$day);
        return $data;
    }



    public function pokrewienstwoSlownie($stopienPokrewienstwa){
        switch($stopienPokrewienstwa){
            case 1:  return 'matka'; break;
            case 2:  return 'ojciec'; break;
            case 3:  return 'mąż'; break;
            case 4:  return 'żona'; break;
            case 5:  return 'córka'; break;
            case 6:  return 'syn'; break;
            case 7:  return 'dziadek'; break;
            case 8:  return 'babcia'; break;
            case 9:  return 'wnuk'; break;
            case 10:  return 'wnuczka'; break;
            case 11:  return 'pasierb'; break;
            case 12:  return 'pasierbica'; break;
            case 13:  return 'siostrzeniec'; break;
            case 14:  return 'siostrzenica'; break;
            case 15:  return 'bratanek'; break;
            case 16:  return 'bratanica'; break;
            default: return ""; break;
        }
    }


    public function dataSlownie(\DateTime $data){
        $dzien = $data->format('d');
        $dzientygodnia = $data->format('l');
        $miesiac = $data->format('n');
        $rok = $data->format('Y');

        $dzienSlownie = $this->dzienSlownie((int)$dzien);
        $rokSlownie = $this->rokSlownie((int)$rok);

        $miesiac_PL = array(1 => 'stycznia', 2 => 'lutego', 3 => 'marca',
            4 => 'kwietnia', 5 => 'maja', 6 => 'czerwca', 7 => 'lipca',
            8 => 'sierpnia', 9 => 'września', 10=> 'października',
            11 => 'listopada', 12 => 'grudnia');

        $dzientygodnia_PL = array('Monday' => 'poniedziałek',
            'Tuesday' => 'wtorek', 'Wednesday' => 'środę',
            'Thursday' => 'czwartek', 'Friday' => 'piątek',
            'Saturday' => 'sobotę', 'Sunday' => 'niedzielę');

//        return "" . $dzientygodnia_PL[$dzientygodnia].", ".$dzien." ".$miesiac_PL[$miesiac]." ".$rok."";
        return $dzienSlownie." ".$miesiac_PL[$miesiac]." ".$rokSlownie."";
    }



    function liczbaSlownie( $digits )
    {
        $jednosci = Array( 'zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć' );
        $dziesiatki = Array( '', 'dziesięć', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'piećdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewiećdziesiąt' );
        $setki = Array( '', 'sto', 'dwieście', 'trzysta', 'czterysta', 'piećset', 'sześćset', 'siedemset', 'osiemset', 'dziewiećset' );
        $nastki = Array( 'dziesieć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dzięwiętnaście' );
        $tysiace = Array( 'tysiąc', 'tysiące', 'tysięcy' );

        $digits = (string) $digits;
        $digits = strrev( $digits );
        $i = strlen( $digits );

        $string = '';

        if( $i > 5 && $digits[5] > 0 )
            $string .= $setki[ $digits[5] ] . ' ';
        if( $i > 4 && $digits[4] > 1 )
            $string .= $dziesiatki[ $digits[4] ] . ' ';
        elseif( $i > 3 && $digits[4] == 1 )
            $string .= $nastki[$digits[3]] . ' ';
        if( $i > 3 && $digits[3] > 0 && $digits[4] != 1 )
            $string .= $jednosci[ $digits[3] ] . ' ';

        $tmpStr = substr( strrev( $digits ), 0, -3 );
        if( strlen( $tmpStr ) > 0 )
        {
            $tmpInt = (int) $tmpStr;
            if( $tmpInt == 1 )
                $string .= $tysiace[0] . ' ';
            elseif( ( $tmpInt % 10 > 1 && $tmpInt % 10 < 5 ) && ( $tmpInt < 10 || $tmpInt > 20 ) )
                $string .= $tysiace[1] . ' ';
            else
                $string .= $tysiace[2] . ' ';
        }

        if( $i > 2 && $digits[2] > 0 )
            $string .= $setki[$digits[2]] . ' ';
        if( $i > 1 && $digits[1] > 1 )
            $string .= $dziesiatki[$digits[1]] . ' ';
        elseif( $i > 0 && $digits[1] == 1 )
            $string .= $nastki[$digits[0]] . ' ';
        if( $digits[0] > 0 && $digits[1] != 1 )
            $string .= $jednosci[$digits[0]] . ' ';

        return $string;
    }

    function dzienSlownie( $digits )
    {
        $jednosci = Array('', 'pierwszego', 'drugiego', 'trzeciego', 'czwartego', 'piątego', 'szóstego', 'siódmego', 'ósmego', 'dziewiątego' );
        $nastki = Array('dziesiątego', 'jedenastego', 'dwunastego', 'trzynastego', 'czternastego', 'piętnastego', 'szesnastego', 'siedemnastego', 'osiemnastego', 'dzięwiętnastego' );
        $dziesiatki = Array( '', '', 'dwudziestego', 'trzydziestego');

        $digits = (string) $digits;
        $digits = strrev( $digits );
        $i = strlen( $digits );

//        if($i == 1){
//            $digits = "0".$digits;
//        }
        $string = '';
//        dump($digits);
//        dump($i);

        if( $i > 1 && $digits[1] > 1 )
            $string .= $dziesiatki[$digits[1]] . ' ' . $jednosci[$digits[0]];
        elseif( $i > 1 && $digits[1] == 1 )
            $string .= $nastki[$digits[0]] . ' ';
        else
            $string .= $jednosci[$digits[0]] . ' ';

        return $string;
    }

    function rokSlownie( $digits )
    {
        $jednosci = Array('', 'pierwszego', 'drugiego', 'trzeciego', 'czwartego', 'piątego', 'szóstego', 'siódmego', 'ósmego', 'dziewiątego' );
        $nastki = Array('', 'dziesiątego', 'jedenastego', 'dwunastego', 'trzynastego', 'czternastego', 'piętnastego', 'szesnastego', 'siedemnastego', 'osiemnastego', 'dzięwietnastego' );
        $dziesiatki = Array( '', '', 'dwudziestego', 'trzydziestego', 'czterdziestego', 'piędziesiątego', 'sześćdziesiątego', 'siedemdziesiątego', 'osiemdziesiątego', 'dziewiędziesiątego');
        $setki = Array( '', 'sto', 'dwieście', 'trzysta', 'czterysta', 'piećset', 'sześćset', 'siedemset', 'osiemset', 'dziewiećset' );
        $tysiace = Array( 'tysiąc', 'tysiące', 'tysięcy' );
        $jednosciTysiecy = Array( '', '', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć' );

        $digits = (string) $digits;
        $digits = strrev( $digits );
        $i = strlen( $digits );

        $string = '';

        if( $i > 3 && $digits[3] > 0 )
            $string .= $jednosciTysiecy[ $digits[3] ] . ' ';

        $tmpStr = substr( strrev( $digits ), 0, -3 );
        if( strlen( $tmpStr ) > 0 )
        {
            $tmpInt = (int) $tmpStr;
            if( $tmpInt == 1 )
                $string .= $tysiace[0] . ' ';
            elseif( ( $tmpInt % 10 > 1 && $tmpInt % 10 < 5 ) && ( $tmpInt < 10 || $tmpInt > 20 ) )
                $string .= $tysiace[1] . ' ';
            else
                $string .= $tysiace[2] . ' ';
        }

        if( $i > 2 && $digits[2] > 0 )
            $string .= $setki[$digits[2]] . ' ';
        if( $i > 1 && $digits[1] > 1 )
            $string .= $dziesiatki[$digits[1]] . ' ';
        elseif( $i > 0 && $digits[1] == 1 )
            $string .= $nastki[$digits[0]] . ' ';
        if( $digits[0] > 0 && $digits[1] != 1 )
            $string .= $jednosci[$digits[0]] . ' ';

        return $string;
    }

}
<?php
/**
 * Created by PhpStorm.
 * User: slawe
 * Date: 08.12.2019
 * Time: 18:08
 */

namespace AppBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="osoba_fizyczna")
 */
class OsobaFizyczna
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="text")
     */
    protected $imie;

    /**
     * @ORM\Column(type="text")
     */
    protected $drugieImie = "";

    /**
     * @ORM\Column(type="text")
     */
    protected $nazwisko;

    /**
     * @ORM\Column(type="text")
     */
    protected $imieOjca;

    /**
     * @ORM\Column(type="text")
     */
    protected $imieMatki;

    /**
     * @ORM\Column(type="string", length=32, unique=true, nullable=false)
     */
    protected $pesel;

    /**
     * @ORM\Column(type="text")
     */
    protected $miastoZamieszkania;

    /**
     * @ORM\Column(type="text")
     */
    protected $numerDomuZamieszkania;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $numerMieszkaniaZamieszkania;

    /**
     * @ORM\Column(type="text")
     */
    protected $typObiektuZamieszkania = 0;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    protected $nazwaObiektuZamieszkania;

    /**
     * @ORM\Column(type="text")
     */
    protected $numerDowodu;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $dataWaznosciDowodu;

    /**
     * @ORM\Column(type="text")
     */
    protected $miejsceUrodzenia;

    /**
     * @ORM\Column(type="text")
     */
    protected $stopienPokrewienstwa;

    /**
     * @ORM\Column(type="integer")
     */
    protected $plec;

    /**
     * One Product has Many Features.
     * @ORM\OneToMany(targetEntity="AktDziedziczenia", mappedBy="zgoniarz", cascade={"persist"})
     */
    private $aktDziedziczenia;

    /**
     * Many Groups have Many Users.
     * @ORM\ManyToMany(targetEntity="AktDziedziczenia", mappedBy="spadkobiercy")
     */
    private $aktyDziedziczeniaRodziny;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->aktyDziedziczeniaRodziny = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getImie()
    {
        return $this->imie;
    }

    /**
     * @param mixed $imie
     */
    public function setImie($imie)
    {
        $this->imie = $imie;
    }

    /**
     * @return mixed
     */
    public function getDrugieImie()
    {
        return $this->drugieImie;
    }

    /**
     * @param mixed $drugieImie
     */
    public function setDrugieImie($drugieImie)
    {
        $this->drugieImie = $drugieImie;
    }

    /**
     * @return mixed
     */
    public function getImiona()
    {
        return $this->imie . " " . $this->drugieImie;
    }

    /**
     * @return mixed
     */
    public function getNazwisko()
    {
        return $this->nazwisko;
    }

    /**
     * @param mixed $nazwisko
     */
    public function setNazwisko($nazwisko)
    {
        $this->nazwisko = $nazwisko;
    }

    /**
     * @return mixed
     */
    public function getImieOjca()
    {
        return $this->imieOjca;
    }

    /**
     * @param mixed $imieOjca
     */
    public function setImieOjca($imieOjca)
    {
        $this->imieOjca = $imieOjca;
    }

    /**
     * @return mixed
     */
    public function getImieMatki()
    {
        return $this->imieMatki;
    }

    /**
     * @param mixed $imieMatki
     */
    public function setImieMatki($imieMatki)
    {
        $this->imieMatki = $imieMatki;
    }

    /**
     * @return mixed
     */
    public function getPesel()
    {
        return $this->pesel;
    }

    /**
     * @param mixed $pesel
     */
    public function setPesel($pesel)
    {
        $this->pesel = $pesel;
    }

    /**
     * @return mixed
     */
    public function getMiastoZamieszkania()
    {
        return $this->miastoZamieszkania;
    }

    /**
     * @param mixed $miastoZamieszkania
     */
    public function setMiastoZamieszkania($miastoZamieszkania)
    {
        $this->miastoZamieszkania = $miastoZamieszkania;
    }

    /**
     * @return mixed
     */
    public function getNumerDomuZamieszkania()
    {
        return $this->numerDomuZamieszkania;
    }

    /**
     * @param mixed $numerDomuZamieszkania
     */
    public function setNumerDomuZamieszkania($numerDomuZamieszkania)
    {
        $this->numerDomuZamieszkania = $numerDomuZamieszkania;
    }

    /**
     * @return mixed
     */
    public function getNumerMieszkaniaZamieszkania()
    {
        return $this->numerMieszkaniaZamieszkania;
    }

    /**
     * @param mixed $numerMieszkaniaZamieszkania
     */
    public function setNumerMieszkaniaZamieszkania($numerMieszkaniaZamieszkania)
    {
        $this->numerMieszkaniaZamieszkania = $numerMieszkaniaZamieszkania;
    }

    /**
     * @return mixed
     */
    public function getTypObiektuZamieszkania()
    {
        return $this->typObiektuZamieszkania;
    }

    /**
     * @param mixed $typObiektuZamieszkania
     */
    public function setTypObiektuZamieszkania($typObiektuZamieszkania)
    {
        $this->typObiektuZamieszkania = $typObiektuZamieszkania;
    }

    /**
     * @return mixed
     */
    public function getNazwaObiektuZamieszkania()
    {
        return $this->nazwaObiektuZamieszkania;
    }

    /**
     * @param mixed $nazwaObiektuZamieszkania
     */
    public function setNazwaObiektuZamieszkania($nazwaObiektuZamieszkania)
    {
        $this->nazwaObiektuZamieszkania = $nazwaObiektuZamieszkania;
    }



    /**
     * @return mixed
     */
    public function getNumerDowodu()
    {
        return $this->numerDowodu;
    }

    /**
     * @param mixed $numerDowodu
     */
    public function setNumerDowodu($numerDowodu)
    {
        $this->numerDowodu = $numerDowodu;
    }

    /**
     * @return mixed
     */
    public function getDataWaznosciDowodu()
    {
        return $this->dataWaznosciDowodu;
    }

    /**
     * @param mixed $dataWaznosciDowodu
     */
    public function setDataWaznosciDowodu($dataWaznosciDowodu)
    {
        $this->dataWaznosciDowodu = $dataWaznosciDowodu;
    }

    /**
     * @return mixed
     */
    public function getStopienPokrewienstwa()
    {
        return $this->stopienPokrewienstwa;
    }

    /**
     * @param mixed $stopienPokrewienstwa
     */
    public function setStopienPokrewienstwa($stopienPokrewienstwa)
    {
        $this->stopienPokrewienstwa = $stopienPokrewienstwa;
    }

    /**
     * @return mixed
     */
    public function getPlec()
    {
        return $this->plec;
    }

    /**
     * @param mixed $plec
     */
    public function setPlec($plec)
    {
        $this->plec = $plec;
    }

    /**
     * @return mixed
     */
    public function getNazwiskoImie()
    {
        return $this->nazwisko." ".$this->imie;
    }

    /**
     * @return mixed
     */
    public function getDataWaznosciDowoduSlownie(){
        return $this->dataSlownie($this->dataWaznosciDowodu);
    }

    function dataSlownie(\DateTime $data){
        $dzien = $data->format('d');
        $dzientygodnia = $data->format('l');
        $miesiac = $data->format('n');
        $rok = $data->format('Y');

        $miesiac_PL = array(1 => 'stycznia', 2 => 'lutego', 3 => 'marca',
            4 => 'kwietnia', 5 => 'maja', 6 => 'czerwca', 7 => 'lipca',
            8 => 'sierpnia', 9 => 'września', 10=> 'października',
            11 => 'listopada', 12 => 'grudnia');

        $dzientygodnia_PL = array('Monday' => 'poniedziałek',
            'Tuesday' => 'wtorek', 'Wednesday' => 'środę',
            'Thursday' => 'czwartek', 'Friday' => 'piątek',
            'Saturday' => 'sobotę', 'Sunday' => 'niedzielę');

//        return "" . $dzientygodnia_PL[$dzientygodnia].", ".$dzien." ".$miesiac_PL[$miesiac]." ".$rok."";
        return $dzien." ".$miesiac_PL[$miesiac]." ".$rok."";
    }

    /**
     * @return mixed
     */
    public function getAktDziedziczenia()
    {
        return $this->aktDziedziczenia;
    }

    /**
     * @param mixed $aktDziedziczenia
     */
    public function setAktDziedziczenia($aktDziedziczenia)
    {
        $this->aktDziedziczenia = $aktDziedziczenia;
    }

    /**
     * @param mixed $aktDziedziczenia
     */
    public function addAktDziedziczenia($aktDziedziczenia)
    {
        $this->aktDziedziczenia[] = $aktDziedziczenia;
    }

    /**
     * @return mixed
     */
    public function getAktyDziedziczeniaRodziny()
    {
        return $this->aktyDziedziczeniaRodziny;
    }



    /**
     * Add aktyDziedziczeniaRodziny
     *
     * @param \AppBundle\Entity\AktDziedziczenia $aktDziedziczenia
     *
     * @return OsobaFizyczna
     */
    public function addAktyDziedziczeniaRodziny(\AppBundle\Entity\AktDziedziczenia $aktDziedziczenia)
    {
        $this->aktyDziedziczeniaRodziny[] = $aktDziedziczenia;

        return $this;
    }

    /**
     * Remove aktyDziedziczeniaRodziny
     *
     * @param \AppBundle\Entity\AktDziedziczenia $aktDziedziczenia
     */
    public function removeAktyDziedziczeniaRodziny(\AppBundle\Entity\AktDziedziczenia $aktDziedziczenia)
    {
        $this->aktyDziedziczeniaRodziny->removeElement($aktDziedziczenia);
    }

//    /**
//     * @return mixed
//     */
//    public function getDataUrodzenia()
//    {
//        return $this->dataUrodzenia;
//    }
//
//    /**
//     * @return mixed
//     */
//    public function getDataUrodzeniaSlownie()
//    {
//        return $this->dataSlownie($this->dataUrodzenia);
//    }

//    /**
//     * @param mixed $dataUrodzenia
//     */
//    public function setDataUrodzenia($dataUrodzenia)
//    {
//        $this->dataUrodzenia = $dataUrodzenia;
//    }

    /**
     * @return mixed
     */
    public function getMiejsceUrodzenia()
    {
        return $this->miejsceUrodzenia;
    }

    /**
     * @param mixed $miejsceUrodzenia
     */
    public function setMiejsceUrodzenia($miejsceUrodzenia)
    {
        $this->miejsceUrodzenia = $miejsceUrodzenia;
    }



}
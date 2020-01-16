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
     * @ORM\Column(type="text")
     */
    protected $pesel;

    /**
     * @ORM\Column(type="text")
     */
    protected $miejsceZamieszkania;

    /**
     * @ORM\Column(type="text")
     */
    protected $numerDowodu;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $dataWaznosciDowodu;

    /**
     * @ORM\Column(type="text")
     */
    protected $stopienPokrewienstwa;

    /**
     * @ORM\Column(type="integer")
     */
    protected $plec;

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
    public function getMiejsceZamieszkania()
    {
        return $this->miejsceZamieszkania;
    }

    /**
     * @param mixed $miejsceZamieszkania
     */
    public function setMiejsceZamieszkania($miejsceZamieszkania)
    {
        $this->miejsceZamieszkania = $miejsceZamieszkania;
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



}
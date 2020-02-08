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
use FOS\UserBundle\Model\User as BaseUser;

/**
 * @ORM\Entity
 * @ORM\Table(name="uzytkownicy")
 */
class User extends BaseUser
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
    protected $adres;

    /**
     * @ORM\Column(type="text")
     */
    protected $telefon;

    /**
     * @ORM\Column(type="integer")
     */
    protected $plec;

    /**
     * @ORM\Column(type="integer")
     */
    protected $notariusz=0;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Kancelaria", inversedBy="uzytkownicy",cascade={"persist"})
     * @ORM\JoinColumn(name="id_kancelarii", referencedColumnName="id")
     */
    protected $kancelaria;



    public function __construct()
    {
        parent::__construct();
        // your own logic
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getAdres()
    {
        return $this->adres;
    }

    /**
     * @param mixed $adres
     */
    public function setAdres($adres)
    {
        $this->adres = $adres;
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
    public function getKancelaria()
    {
        return $this->kancelaria;
    }

    /**
     * @param mixed $kancelaria
     */
    public function setKancelaria($kancelaria)
    {
        $this->kancelaria = $kancelaria;
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
    public function getNotariusz()
    {
        return $this->notariusz;
    }

    /**
     * @param mixed $notariusz
     */
    public function setNotariusz($notariusz)
    {
        $this->notariusz = $notariusz;
    }

    /**
     * @return mixed
     */
    public function getTelefon()
    {
        return $this->telefon;
    }

    /**
     * @param mixed $telefon
     */
    public function setTelefon($telefon)
    {
        $this->telefon = $telefon;
    }



}
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
 * @ORM\Table(name="kancelaria")
 */
class Kancelaria
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $dataDolaczenia;

    /**
     * @ORM\Column(type="text")
     */
    protected $nazwa;

    /**
     * @ORM\Column(type="text")
     */
    protected $miasto;

    /**
     * @ORM\Column(type="text")
     */
    protected $adres;

    /**
     * @ORM\Column(type="text")
     */
    protected $kodPocztowy;

    /**
     * One Product has Many Features.
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\User", mappedBy="kancelaria",cascade={"persist"})
     */
    protected $uzytkownicy;

    /**
     * One Product has Many Features.
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Sprawa", mappedBy="kancelaria",cascade={"persist"})
     */
    protected $sprawy;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->dataDolaczenia = new \DateTime('now');
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
    public function getDataDolaczenia()
    {
        return $this->dataDolaczenia;
    }

    /**
     * @param mixed $dataDolaczenia
     */
    public function setDataDolaczenia($dataDolaczenia)
    {
        $this->dataDolaczenia = $dataDolaczenia;
    }

    /**
     * @return mixed
     */
    public function getMiasto()
    {
        return $this->miasto;
    }

    /**
     * @param mixed $miasto
     */
    public function setMiasto($miasto)
    {
        $this->miasto = $miasto;
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
    public function getUzytkownicy()
    {
        return $this->uzytkownicy;
    }

    /**
     * @param mixed $uzytkownicy
     */
    public function setUzytkownicy($uzytkownicy)
    {
        $this->uzytkownicy = $uzytkownicy;
    }

    /**
     * @return mixed
     */
    public function getSprawy()
    {
        return $this->sprawy;
    }

    /**
     * @param mixed $sprawy
     */
    public function setSprawy($sprawy)
    {
        $this->sprawy = $sprawy;
    }

    /**
     * @return mixed
     */
    public function getNazwa()
    {
        return $this->nazwa;
    }

    /**
     * @param mixed $nazwa
     */
    public function setNazwa($nazwa)
    {
        $this->nazwa = $nazwa;
    }

    /**
     * @return mixed
     */
    public function getKodPocztowy()
    {
        return $this->kodPocztowy;
    }

    /**
     * @param mixed $kodPocztowy
     */
    public function setKodPocztowy($kodPocztowy)
    {
        $this->kodPocztowy = $kodPocztowy;
    }




}
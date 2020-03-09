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
 * @ORM\Table(name="sprawa")
 */
class Sprawa
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
    protected $dataDodania;

    /**
     * @ORM\Column(type="text")
     */
    protected $nazwa;

    /**
     * @ORM\Column(type="text")
     */
    protected $repertorium;

//    /**
//     * One Product has Many Features.
//     * @ORM\OneToMany(targetEntity="AppBundle\Entity\Dokument", mappedBy="sprawa",cascade={"persist"})
//     */
//    protected $dokumenty;

    /**
     * One Product has Many Features.
     * @ORM\OneToMany(targetEntity="AppBundle\Entity\AktDziedziczenia", mappedBy="sprawa",cascade={"persist"})
     */
    protected $akty;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Kancelaria", inversedBy="sprawy",cascade={"persist"})
     * @ORM\JoinColumn(name="id_kancelarii", referencedColumnName="id")
     */
    protected $kancelaria;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->dataDodania = new \DateTime('now');
        $this->dokumenty = new ArrayCollection();
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
    public function getDataDodania()
    {
        return $this->dataDodania;
    }

    /**
     * @param mixed $dataDodania
     */
    public function setDataDodania($dataDodania)
    {
        $this->dataDodania = $dataDodania;
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

//    /**
//     * @return mixed
//     */
//    public function getAktyDziedziczenia()
//    {
//        return $this->aktyDziedziczenia;
//    }
//
//    /**
//     * @param mixed $aktyDziedziczenia
//     */
//    public function setAktyDziedziczenia($aktyDziedziczenia)
//    {
//        $this->aktyDziedziczenia = $aktyDziedziczenia;
//    }

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
    public function getDokumenty()
    {
        return $this->dokumenty;
    }

    /**
     * @param mixed $dokumenty
     */
    public function setDokumenty($dokumenty)
    {
        $this->dokumenty = $dokumenty;
    }

    /**
     * @return mixed
     */
    public function getAkty()
    {
        return $this->akty;
    }

    /**
     * @param mixed $akty
     */
    public function setAkty($akty)
    {
        $this->akty = $akty;
    }

    /**
     * @return mixed
     */
    public function getRepertorium()
    {
        return $this->repertorium;
    }

    /**
     * @param mixed $repertorium
     */
    public function setRepertorium($repertorium)
    {
        $this->repertorium = $repertorium;
    }


}
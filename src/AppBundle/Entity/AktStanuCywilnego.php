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
 * @ORM\Table(name="akty_stanu_cywilnego")
 */
class AktStanuCywilnego
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
    protected $dataWydania;

    /**
     * @ORM\Column(type="text")
     */
    protected $nazwa;

    /**
     * @ORM\Column(type="text")
     */
    protected $imieUczestniczacego;

    /**
     * @ORM\Column(type="text")
     */
    protected $nazwiskoUczestniczacego;

    /**
     * @ORM\Column(type="text")
     */
    protected $numer;

    /**
     * @ORM\Column(type="text")
     */
    protected $urzad;

    /**
     * @ORM\Column(type="integer")
     */
    protected $typ = 1;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\PostepowanieSpadkowe", inversedBy="aktyStanuCywilnego",cascade={"persist"})
     * @ORM\JoinColumn(name="id_postepowania", referencedColumnName="id")
     */
    protected $postepowanieSpadkowe;

    /**
     * Constructor
     */
    public function __construct()
    {

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
    public function getDataWydania()
    {
        return $this->dataWydania;
    }

    /**
     * @param mixed $dataWydania
     */
    public function setDataWydania($dataWydania)
    {
        $this->dataWydania = $dataWydania;
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
    public function getUrzad()
    {
        return $this->urzad;
    }

    /**
     * @param mixed $urzad
     */
    public function setUrzad($urzad)
    {
        $this->urzad = $urzad;
    }

    /**
     * @return mixed
     */
    public function getNumer()
    {
        return $this->numer;
    }

    /**
     * @param mixed $numer
     */
    public function setNumer($numer)
    {
        $this->numer = $numer;
    }

    /**
     * @return int
     */
    public function getTyp()
    {
        return $this->typ;
    }

    /**
     * @param int $typ
     */
    public function setTyp($typ)
    {
        $this->typ = $typ;
    }

    /**
     * @return mixed
     */
    public function getImieUczestniczacego()
    {
        return $this->imieUczestniczacego;
    }

    /**
     * @param mixed $imieUczestniczacego
     */
    public function setImieUczestniczacego($imieUczestniczacego)
    {
        $this->imieUczestniczacego = $imieUczestniczacego;
    }

    /**
     * @return mixed
     */
    public function getNazwiskoUczestniczacego()
    {
        return $this->nazwiskoUczestniczacego;
    }

    /**
     * @param mixed $nazwiskoUczestniczacego
     */
    public function setNazwiskoUczestniczacego($nazwiskoUczestniczacego)
    {
        $this->nazwiskoUczestniczacego = $nazwiskoUczestniczacego;
    }



    /**
     * @return mixed
     */
    public function getPostepowanieSpadkowe()
    {
        return $this->postepowanieSpadkowe;
    }

    /**
     * @param mixed $postepowanieSpadkowe
     */
    public function setPostepowanieSpadkowe($postepowanieSpadkowe)
    {
        $this->postepowanieSpadkowe = $postepowanieSpadkowe;
    }




}
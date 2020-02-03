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
 * @ORM\Table(name="akt_dziedziczenia")
 */
class AktDziedziczenia
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
    protected $dataCzynnosci;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $dataSmierci;

    /**
     * @ORM\Column(type="datetime")
     */
    protected $dataWydaniaAktuZgonu;

    /**
     * @ORM\Column(type="text")
     */
    protected $miejsceZgonu;

    /**
     * @ORM\Column(type="text")
     */
    protected $miejsceWydaniaAktuZgonu;

    /**
     * @ORM\Column(type="text")
     */
    protected $numerAktuZgonu;

    /**
     * @ORM\Column(type="text")
     */
    protected $numerSkroconegoAktuMalzenstwaMalzonka;

    /**
     * @ORM\Column(type="text")
     */
    protected $numerSkroconegoAktuMalzenstwaPotomka;


    /**
     * @ORM\ManyToOne(targetEntity="OsobaFizyczna", inversedBy="aktDziedziczenia",cascade={"persist"})
     * @ORM\JoinColumn(name="id_osoby_fizycznej", referencedColumnName="id")
     */
    private $zgoniarz;

    /**
     * @ORM\ManyToMany(targetEntity="OsobaFizyczna")
     * @ORM\JoinTable(name="akt_dziedziczenia_spadkobiercy",
     *      joinColumns={@ORM\JoinColumn(name="akt_dziedziczenia_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="osoba_id", referencedColumnName="id")}
     *      )
     */
    private $spadkobiercy;



    /**
     * Constructor
     */
    public function __construct()
    {
        $this->spadkobiercy = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
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
    public function getDataCzynnosci()
    {
        return $this->dataCzynnosci;
    }

    /**
     * @return mixed
     */
    public function getDataCzynnosciSlownie()
    {
        return $this->dataSlownie($this->dataCzynnosci);
    }

    /**
     * @param mixed $dataCzynnosci
     */
    public function setDataCzynnosci($dataCzynnosci)
    {
        $this->dataCzynnosci = $dataCzynnosci;
    }

    /**
     * @return mixed
     */
    public function getZgoniarz()
    {
        return $this->zgoniarz;
    }

    /**
     * @param mixed $zgoniarz
     */
    public function setZgoniarz($zgoniarz)
    {
        $this->zgoniarz = $zgoniarz;
    }

    /**
     * @return mixed
     */
    public function getSpadkobiercy()
    {
        return $this->spadkobiercy;
    }

    /**
     * @param mixed $spadkobiercy
     */
    public function setSpadkobiercy($spadkobiercy)
    {
        $this->spadkobiercy = $spadkobiercy;
    }

    /**
     * @return mixed
     */
    public function getDataSmierci()
    {
        return $this->dataSmierci;
    }

    /**
     * @return mixed
     */
    public function getDataSmierciSlownie()
    {
        return $this->dataSlownie($this->dataSmierci);
    }

    /**
     * @param mixed $dataSmierci
     */
    public function setDataSmierci($dataSmierci)
    {
        $this->dataSmierci = $dataSmierci;
    }

    /**
     * @return mixed
     */
    public function getDataWydaniaAktuZgonu()
    {
        return $this->dataWydaniaAktuZgonu;
    }

    /**
     * @return mixed
     */
    public function getDataWydaniaAktuZgonuSlownie()
    {
        return $this->dataSlownie($this->dataWydaniaAktuZgonu);
    }

    /**
     * @param mixed $dataWydaniaAktuZgonu
     */
    public function setDataWydaniaAktuZgonu($dataWydaniaAktuZgonu)
    {
        $this->dataWydaniaAktuZgonu = $dataWydaniaAktuZgonu;
    }

    /**
     * @return mixed
     */
    public function getMiejsceZgonu()
    {
        return $this->miejsceZgonu;
    }

    /**
     * @param mixed $miejsceZgonu
     */
    public function setMiejsceZgonu($miejsceZgonu)
    {
        $this->miejsceZgonu = $miejsceZgonu;
    }

    /**
     * @return mixed
     */
    public function getMiejsceWydaniaAktuZgonu()
    {
        return $this->miejsceWydaniaAktuZgonu;
    }

    /**
     * @param mixed $miejsceWydaniaAktuZgonu
     */
    public function setMiejsceWydaniaAktuZgonu($miejsceWydaniaAktuZgonu)
    {
        $this->miejsceWydaniaAktuZgonu = $miejsceWydaniaAktuZgonu;
    }

    /**
     * @return mixed
     */
    public function getNumerAktuZgonu()
    {
        return $this->numerAktuZgonu;
    }

    /**
     * @param mixed $numerAktuZgonu
     */
    public function setNumerAktuZgonu($numerAktuZgonu)
    {
        $this->numerAktuZgonu = $numerAktuZgonu;
    }

    /**
     * @return mixed
     */
    public function getNumerSkroconegoAktuMalzenstwaMalzonka()
    {
        return $this->numerSkroconegoAktuMalzenstwaMalzonka;
    }

    /**
     * @param mixed $numerSkroconegoAktuMalzenstwaMalzonka
     */
    public function setNumerSkroconegoAktuMalzenstwaMalzonka($numerSkroconegoAktuMalzenstwaMalzonka)
    {
        $this->numerSkroconegoAktuMalzenstwaMalzonka = $numerSkroconegoAktuMalzenstwaMalzonka;
    }

    /**
     * @return mixed
     */
    public function getNumerSkroconegoAktuMalzenstwaPotomka()
    {
        return $this->numerSkroconegoAktuMalzenstwaPotomka;
    }

    /**
     * @param mixed $numerSkroconegoAktuMalzenstwaPotomka
     */
    public function setNumerSkroconegoAktuMalzenstwaPotomka($numerSkroconegoAktuMalzenstwaPotomka)
    {
        $this->numerSkroconegoAktuMalzenstwaPotomka = $numerSkroconegoAktuMalzenstwaPotomka;
    }





}
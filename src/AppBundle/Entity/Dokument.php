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
 * @ORM\Table(name="dokument")
 */
class Dokument
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
     * @ORM\Column(type="string", length=200)
     */
    protected $filename;

    /**
     * @ORM\Column(type="string", length=200)
     */
    protected $hash;

    /**
     * @ORM\Column(type="string", length=200)
     */
    protected $nazwaDokumentu;

    /**
     * @ORM\Column(name="status", type="integer")
     */
    protected $status=1;

    /**
     * @ORM\ManyToOne(targetEntity="AppBundle\Entity\PostepowanieSpadkowe", inversedBy="dokumenty",cascade={"persist"})
     * @ORM\JoinColumn(name="id_postepowania", referencedColumnName="id")
     */
    protected $postepowanieSpadkowe;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->dataDodania = new \DateTime('now');
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set filename
     *
     * @param string $filename
     *
     * @return Dokument
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;
        $this->setHash();
        return $this;
    }

    /**
     * Get filename
     *
     * @return string
     */
    public function getFilename()
    {
        return $this->filename;
    }



    /**
     * Set hash
     *
     * @return Dokument
     */
    public function setHash()
    {
        $this->hash = sha1($this->filename);

        return $this;
    }

    /**
     * Get hash
     *
     * @return string
     */
    public function getHash()
    {
        return $this->hash;
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
    public function getDataDodania()
    {
        return $this->dataDodania;
    }

    /**
     * @return mixed
     */
    public function getDataDodaniaSlownie()
    {
        return $this->dataSlownie($this->dataDodania);
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
    public function getNazwaDokumentu()
    {
        return $this->nazwaDokumentu;
    }

    /**
     * @param mixed $nazwaDokumentu
     */
    public function setNazwaDokumentu($nazwaDokumentu)
    {
        $this->nazwaDokumentu = $nazwaDokumentu;
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus($status)
    {
        $this->status = $status;
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
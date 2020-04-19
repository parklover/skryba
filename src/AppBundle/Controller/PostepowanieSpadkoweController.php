<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Dokument;
use AppBundle\Entity\Kancelaria;
use AppBundle\Entity\PostepowanieSpadkowe;
use AppBundle\Entity\OsobaFizyczna;
use AppBundle\Entity\Sprawa;
use AppBundle\Form\PostepowanieSpadkoweType;
//use AppBundle\Form\DokumentType;
use AppBundle\Form\EditorType;
use AppBundle\HtmlToDocx\CreateDocx;
use Doctrine\Common\Collections\ArrayCollection;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\TemplateProcessor;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PostepowanieSpadkoweController extends Controller
{
    /**
     * @Route("/panel/dodaj/postepowanie_spadkowe/", name="postepowanie_spadkowe_form")
     */
    public function formAction(Request $request)
    {
        /** @var Kancelaria $kancelaria */
        $kancelaria = $this->getUser()->getKancelaria();
        if(!$kancelaria){
            return $this->redirectToRoute('lista_spraw');
        }
        $now = new \DateTime('now');


        /** @var PostepowanieSpadkowe $postepowanieSpadkowe */
        $postepowanieSpadkowe = new PostepowanieSpadkowe();
        $postepowanieSpadkowe->setRepertorium("12/".$now->format('Y'));
        $postepowanieSpadkowe->setKancelaria($kancelaria);
        $postepowanieSpadkowe->setDataDodania($now);

        $form = $this->createForm(PostepowanieSpadkoweType::class, $postepowanieSpadkowe, []);
        $dupa = 'dupa123';
//        $numerSprawy = 1;

        $em = $this->getDoctrine()->getManager();
        $form->handleRequest($request);
        if($form->isValid()){
            $numerSprawy = $postepowanieSpadkowe->getRepertorium();
            $dataSlownie = "";
            $dataZgonuSlownie = "";
            $user = $this->getUser();

            $dane = $form->getData();
            /** @var OsobaFizyczna $zgoniarzForm */
            $zgoniarzForm = $form->get('zgoniarz')->getData();
            $zgoniarz = $this->getDoctrine()->getRepository(OsobaFizyczna::class)->findOneBy(['pesel' => $zgoniarzForm->getPesel()]);
            if(!$zgoniarz){
                $zgoniarz = $zgoniarzForm;
                $zgoniarz->setPlec($zgoniarz->getPesel()[10]%2==0?2:1);
                $em->persist($zgoniarzForm);
            }
            else{
                $zgoniarz->setMiastoZamieszkania($zgoniarzForm->getMiastoZamieszkania());
                $zgoniarz->setNumerDomuZamieszkania($zgoniarzForm->getNumerDomuZamieszkania());
                $zgoniarz->setNumerMieszkaniaZamieszkania($zgoniarzForm->getNumerMieszkaniaZamieszkania());
                $zgoniarz->setTypObiektuZamieszkania($zgoniarzForm->getTypObiektuZamieszkania());
                $zgoniarz->setNazwaObiektuZamieszkania($zgoniarzForm->getNazwaObiektuZamieszkania());
                $zgoniarz->setNumerDowodu($zgoniarzForm->getNumerDowodu());
                $zgoniarz->setDataWaznosciDowodu($zgoniarzForm->getDataWaznosciDowodu());
            }
            $zgoniarz->addPostepowanieSpadkowe($postepowanieSpadkowe);
            $postepowanieSpadkowe->setZgoniarz($zgoniarz);
            $postepowanieSpadkowe->setNazwa('Postępowanie spadkowe - '.$zgoniarz->getNazwiskoImie());


            $spadkobiercy = new ArrayCollection();
            $stawajacy = new ArrayCollection();
            foreach($form->get('spadkobiercy')->getData() as $osoba){
                $spadkobierca = $this->getDoctrine()->getRepository(OsobaFizyczna::class)->findOneBy(['pesel' => $osoba['pesel']]);
                if(!$spadkobierca){
                    $spadkobierca = new OsobaFizyczna();
                    $spadkobierca->setImie($osoba['imie']);
                    $spadkobierca->setNazwisko($osoba['nazwisko']);
                    $spadkobierca->setImieOjca($osoba['imieOjca']);
                    $spadkobierca->setImieMatki($osoba['imieMatki']);
                    $spadkobierca->setPesel($osoba['pesel']);
                    $spadkobierca->setMiejsceUrodzenia($osoba['miejsceUrodzenia']);
                    $spadkobierca->setStopienPokrewienstwa($osoba['stopienPokrewienstwa']);
                    $spadkobierca->setPlec($osoba['pesel'][10]%2==0?2:1);
                }
                $spadkobierca->setMiastoZamieszkania($osoba['miastoZamieszkania']);
                $spadkobierca->setNumerDomuZamieszkania($osoba['numerDomuZamieszkania']);
                $spadkobierca->setNumerMieszkaniaZamieszkania($osoba['numerMieszkaniaZamieszkania']);
                $spadkobierca->setTypObiektuZamieszkania($osoba['typObiektuZamieszkania']);
                $spadkobierca->setNazwaObiektuZamieszkania($osoba['nazwaObiektuZamieszkania']);
                $spadkobierca->setNumerDowodu($osoba['numerDowodu']);
                $spadkobierca->setDataWaznosciDowodu($osoba['dataWaznosciDowodu']);
                $spadkobierca->setUdzialSpadku($osoba['udzialSpadku']);
                $em->persist($spadkobierca);
//                dump($spadkobierca);
//                dump($spadkobierca->getStawajacy());
//                dump($osoba['stawajacy']);
                if($osoba['stawajacy'])$stawajacy->add($spadkobierca);
                $spadkobiercy->add($spadkobierca);
                $postepowanieSpadkowe->addSpadkobiercy($spadkobierca);
                $spadkobierca->addPostepowanieSpadkoweRodziny($postepowanieSpadkowe);
            }

            $this->liczUdzialSpadku($spadkobiercy);
//
//            dump($stawajacy);
//            dump($stawajacy);

            //Akt dziedziczenia
            $fileNameAktDziedziczenia = $postepowanieSpadkowe->getNazwa().'-akt_poswiadczenia_dziedziczenia-'.time().'.html';
            $aktDziedziczenia = new Dokument();
            $aktDziedziczenia->setNazwaDokumentu($postepowanieSpadkowe->getNazwa()." - Akt poświadczenia dziedziczenia");
            $aktDziedziczenia->setFilename($fileNameAktDziedziczenia);
            $aktDziedziczenia->setPostepowanieSpadkowe($postepowanieSpadkowe);
            $aktDziedziczenia->setDataDodania(new \DateTime('now'));
            $em->persist($aktDziedziczenia);
            $htmlAktDziedziczenia = $this->render('Wzory/akt_poswiadczenia_dziedziczenia.html.twig', [
                'dupa' => $dupa,
                'form' => $form->getData(),
                'dataCzynnosciSlownie' => $dataSlownie,
                'dataZgonuSlownie' => $dataZgonuSlownie,
                'numerSprawy' => $numerSprawy,
                'user' => $user,
                'spadkobiorcy' => $spadkobiercy,
                'zgoniarz' => $zgoniarz,
                'stawajacy' => $stawajacy
            ]);

            $html_przetworzonyAktDziedziczenia = preg_replace("/\r|\n/", "", $htmlAktDziedziczenia->getContent());
//            dump(nl2br($html_przetworzony));
            file_put_contents("temp/".$fileNameAktDziedziczenia, $html_przetworzonyAktDziedziczenia);

            //PROTKOKÓL DZIEDZICZENIA
            $fileNameProtokolDziedziczenia = $postepowanieSpadkowe->getNazwa().'-protokol_dziedziczenia-'.time().'.html';
            $protokolDziedziczenia = new Dokument();
            $protokolDziedziczenia->setNazwaDokumentu($postepowanieSpadkowe->getNazwa()." - Protokół dziedziczenia");
            $protokolDziedziczenia->setFilename($fileNameProtokolDziedziczenia);
            $protokolDziedziczenia->setPostepowanieSpadkowe($postepowanieSpadkowe);
            $em->persist($protokolDziedziczenia);
            $htmlProtokolDziedziczenia = $this->render('Wzory/protokol_dziedziczenia.html.twig', [
                'dupa' => $dupa,
                'form' => $form->getData(),
                'dataCzynnosciSlownie' => $dataSlownie,
                'dataZgonuSlownie' => $dataZgonuSlownie,
                'numerSprawy' => $numerSprawy,
                'user' => $user,
                'spadkobiorcy' => $spadkobiercy,
                'zgoniarz' => $zgoniarz,
                'stawajacy' => $stawajacy
            ]);

            foreach($stawajacy as $spadkobierca){

                //Oswiadczenie o przyjęciu spadku
                $fileNameOswiadczenieOPrzyjeciuSpadku = $postepowanieSpadkowe->getNazwa().'-oswiadczenie_o_przyjeciu_spadku-'.$spadkobierca->getImie().'-'.$spadkobierca->getNazwisko().time().'.html';
                $oswiadczenieOPrzyjeciuSpadku = new Dokument();
                $oswiadczenieOPrzyjeciuSpadku->setNazwaDokumentu("Oświadczenie o przyjęciu spadku - ".$spadkobierca->getImie().' '.$spadkobierca->getNazwisko());
                $oswiadczenieOPrzyjeciuSpadku->setFilename($fileNameOswiadczenieOPrzyjeciuSpadku);
                $oswiadczenieOPrzyjeciuSpadku->setPostepowanieSpadkowe($postepowanieSpadkowe);
                $em->persist($oswiadczenieOPrzyjeciuSpadku);
                $htmlOswiadczenieOPrzyjeciuSpadku = $this->render('Wzory/oswiadczenie_o_przyjeciu_spadku.html.twig', [
                    'dupa' => $dupa,
                    'form' => $form->getData(),
                    'dataCzynnosciSlownie' => $dataSlownie,
                    'dataZgonuSlownie' => $dataZgonuSlownie,
                    'numerSprawy' => $numerSprawy,
                    'user' => $user,
                    'spadkobierca' => $spadkobierca,
                    'spadkobiorcy' => $spadkobiercy,
                    'zgoniarz' => $zgoniarz,
                    'stawajacy' => $stawajacy
                ]);

                $html_przetworzonyOswiadczenieOPrzyjeciuSpadku = preg_replace("/\r|\n/", "", $htmlOswiadczenieOPrzyjeciuSpadku->getContent());
//            dump(nl2br($html_przetworzony));
                file_put_contents("temp/".$fileNameOswiadczenieOPrzyjeciuSpadku, $html_przetworzonyOswiadczenieOPrzyjeciuSpadku);
            }

            $html_przetworzonyProtokolDziedziczenia = preg_replace("/\r|\n/", "", $htmlProtokolDziedziczenia->getContent());
//            dump(nl2br($html_przetworzony));
            file_put_contents("temp/".$fileNameProtokolDziedziczenia, $html_przetworzonyProtokolDziedziczenia);

//            $em->persist($aktDziedziczenia);
            $em->flush();

            return $this->redirectToRoute('edit', ['hash' => $aktDziedziczenia->getHash(), 'id' => $aktDziedziczenia->getId()]);
        }

        // replace this example code with whatever you need
        return $this->render('default/postepowanieSpadkoweForm.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'form' => $form->createView()
        ]);
    }

//    /**
//     * @Route("/panel/dodaj/{idSprawy}/akt_dziedziczenia/", name="akt_dziedziczenia_form")
//     */
    /**
     * @Route("/panel/pesel/sprawdz", options={"expose"=true}, name="sprawdz_pesel")
     */
    public function peselAjaxAction(Request $request){

        $out = [];
        $out['status'] = false;
        $em = $this->getDoctrine()->getManager();
        $pesel = $request->request->get('pesel');

        /** @var OsobaFizyczna $osoba */
        $osoba = $em->getRepository(OsobaFizyczna::class)->findOneBy(['pesel' => $pesel]);
        if($osoba){
            $out['osoba'] = [];
            $out['osoba']['imie'] = $osoba->getImie();
            $out['osoba']['nazwisko'] = $osoba->getNazwisko();
            $out['osoba']['imieOjca'] = $osoba->getImieOjca();
            $out['osoba']['imieMatki'] = $osoba->getImieMatki();
            $out['osoba']['miejsceUrodzenia'] = $osoba->getMiejsceUrodzenia();
            $out['osoba']['numerDowodu'] = $osoba->getNumerDowodu();
            $out['osoba']['dataWaznosciDowodu'] = $osoba->getDataWaznosciDowodu()->format('Y-m-d');
            $out['osoba']['miastoZamieszkania'] = $osoba->getMiastoZamieszkania();
            $out['osoba']['numerDomuZamieszkania'] = $osoba->getNumerDomuZamieszkania();
            $out['osoba']['numerMieszkaniaZamieszkania'] = $osoba->getNumerMieszkaniaZamieszkania();
            $out['osoba']['typObiektuZamieszkania'] = $osoba->getTypObiektuZamieszkania();
            $out['osoba']['nazwaObiektuZamieszkania'] = $osoba->getNazwaObiektuZamieszkania();
            $out['status'] = true;
        } else{
            $out['osoba'] = null;
            if($this->sprawdzPesel($pesel)){
                $out['status'] = true;
            }
        }

        return new JsonResponse($out);
    }

    public function sprawdzPesel($pesel){

        $arrWagi = array(1, 3, 7, 9, 1, 3, 7, 9, 1, 3); // tablica z odpowiednimi wagami
        $intSum = 0;
        for ($i = 0; $i < 10; $i++) {
            $intSum += $arrWagi[$i] * $pesel[$i]; //mnożymy każdy ze znaków dla 10 pierwszych cyfr przez wagę i sumujemy wszystko
        }
        $int = 10 - $intSum % 10; //obliczamy sumę kontrolną i porównujemy ją z ostatnią cyfrą.
        $intControlNr = ($int == 10)?0:$int; //sprawdzamy czy taka sama suma kontrolna jest w ciągu
        if ($intControlNr == $pesel[10]){
            return true;
        }
        return false;
    }

    /**
     * @Route("/panel/edit/{id}/{hash}/", name="edit")
     */
    public function editAction(Request $request, $id = 0, $hash = 0)
    {

        /** @var Dokument $dokument */
        $dokument = $this->getDoctrine()->getRepository(Dokument::class)->findOneBy(['id' => $id, 'hash' => $hash]);
//        dump($dokument);

        /** @var PostepowanieSpadkowe $postepowanieSpadkowe */
        $postepowanieSpadkowe = $dokument->getPostepowanieSpadkowe();
        $inneDokumenty = $postepowanieSpadkowe->getDokumenty();

        if(!$dokument){
//            die;
            return $this->redirectToRoute('lista_spraw');
        }

        $html = file_get_contents("temp/".$dokument->getFilename());
//        dump($html);

        $form = $this->createForm(EditorType::class);
        $form->handleRequest($request);
        if($form->isValid()){
//            dump($request);
//            dump($form);
//            dump($form->getData());
            $htmlEdit = $form->getData()['content'];
//            dump($htmlEdit);
            $html_przetworzony = preg_replace("/\r|\n/", "", $htmlEdit);
//            dump(nl2br($html_przetworzony));
            file_put_contents("temp/zapis123.html", $html_przetworzony);

            return $this->render('default/editor.html.twig', [
                'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
                'wzor'=> $html_przetworzony,
                'form'=>$form->createView(),
                'inneDokumenty' => $inneDokumenty,
                'dokument' => $dokument
            ]);
//            die;
        }

        return $this->render('default/editor.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'wzor'=> $html,
            'form'=>$form->createView(),
            'inneDokumenty' => $inneDokumenty,
            'dokument' => $dokument
        ]);
    }

    /**
     * @Route("/panel/edit/{id}/{hash}/saveToDocx/", name="saveToDocx")
     */
    public function saveToDocx(Request $request, $id = 0, $hash = 0){

        /** @var Dokument $dokument */
        $dokument = $this->getDoctrine()->getRepository(Dokument::class)->findOneBy(['id' => $id, 'hash' => $hash]);

        $html = file_get_contents("temp/".$dokument->getFilename());
        $html_przetworzony = preg_replace("/\r|\n/", "", $html);

        $docx = new CreateDocx();
        $docx->embedHTML($html_przetworzony);
        $docx->createDocx('test');
        dump($docx);

    }

    public function liczUdzialSpadku($spadkobiercy){
        $czyMalzonek = false;
        $malzonek = null;
        $czyDzieci = false;
        $dzieci = [];
        $liczbaDzieci = 0;
        $liczbaWnoczat = 0;


        /** @var OsobaFizyczna $spadkobierca */
        foreach($spadkobiercy as $spadkobierca){
            if($spadkobierca->getStopienPokrewienstwa() == 3 && $spadkobierca->getStopienPokrewienstwa() == 4){
                $czyMalzonek = true;
                $malzonek = $spadkobierca;
            }
            if($spadkobierca->getStopienPokrewienstwa() == 5 && $spadkobierca->getStopienPokrewienstwa() == 6){
                $czyDzieci = true;
                $liczbaDzieci++;
                $dzieci[] = $spadkobierca;
            }
        }

        if($czyMalzonek && $czyDzieci && $liczbaDzieci < 4){
            $udzialSpadku = "1/".($liczbaDzieci + 1);
            $malzonek->setUdzialSpadku($udzialSpadku);
            foreach($dzieci as $dziecko){
                $dziecko->setUdzialSpadku($udzialSpadku);
            }
        }
        elseif($czyMalzonek && $czyDzieci && $liczbaDzieci >= 4){
            $udzialSpadkuMalzonka = "1/4";
            $udzialSpadkuDzieci = "3/".($liczbaDzieci*4);
            $malzonek->setUdzialSpadku($udzialSpadkuMalzonka);
            foreach($dzieci as $dziecko){
                $dziecko->setUdzialSpadku($udzialSpadkuDzieci);
            }
        }


        $czyDzieciZyja = false;
    }

    public function dataSlownie(\DateTime $data){
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
}

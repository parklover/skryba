<?php

namespace AppBundle\Controller;

use AppBundle\Entity\AktDziedziczenia;
use AppBundle\Entity\OsobaFizyczna;
use AppBundle\Entity\Sprawa;
use AppBundle\Form\AktDziedziczeniaType;
//use AppBundle\Form\DokumentType;
use AppBundle\Form\EditorType;
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

class AktDziedziczeniaController extends Controller
{
    /**
     * @Route("/panel/dodaj/{idSprawy}/akt_dziedziczenia/", name="akt_dziedziczenia_form")
     */
    public function formAction(Request $request, $idSprawy = 0)
    {
        /** @var Sprawa $sprawa */
        $sprawa = $this->getDoctrine()->getRepository(Sprawa::class)->find($idSprawy);
        if(!$sprawa){
            return $this->redirectToRoute('lista_spraw');
        }

        /** @var AktDziedziczenia $aktDziedziczenia */
        $aktDziedziczenia = new AktDziedziczenia();

        $form = $this->createForm(AktDziedziczeniaType::class, $aktDziedziczenia, []);
        $dupa = 'dupa123';
//        $numerSprawy = 1;

        $em = $this->getDoctrine()->getManager();
        $form->handleRequest($request);
        if($form->isValid()){
            $aktDziedziczenia->setSprawa($sprawa);
            $numerSprawy = $sprawa->getRepertorium();
            $dataSlownie = "";
            $dataZgonuSlownie = "";
            $user = $this->getUser();
            $fileName = $sprawa->getNazwa().'-'.time().'.html';
            $aktDziedziczenia->setFilename($fileName);

//            dump($html);
//            dump($form->getData());
//            dump($request->get('spadkobiercy'));
//            dump($form->get('spadkobiercy')->getData());

//            $zgoniarzDane = $form->get('zgoniarz')->getData();
//            $zgoniarz = $this->getDoctrine()->getRepository(OsobaFizyczna::class)->findOneBy(['pesel' => $zgoniarzDane['pesel']]);
//            if(!$zgoniarz){
//                $zgoniarz = new OsobaFizyczna();
//                $zgoniarz->setImie($zgoniarzDane['imie']);
//                $zgoniarz->setNazwisko($zgoniarzDane['nazwisko']);
//                $zgoniarz->setImieOjca($zgoniarzDane['imieOjca']);
//                $zgoniarz->setImieMatki($zgoniarzDane['imieMatki']);
//                $zgoniarz->setPesel($zgoniarzDane['pesel']);
//                $zgoniarz->setMiejsceUrodzenia($zgoniarzDane['miejsceUrodzenia']);
//                $zgoniarz->setMiejsceZamieszkania($zgoniarzDane['miejsceZamieszkania']);
//                $zgoniarz->setNumerDowodu($zgoniarzDane['numerDowodu']);
//                $zgoniarz->setDataWaznosciDowodu($zgoniarzDane['dataWaznosciDowodu']);
//                $zgoniarz->setStopienPokrewienstwa($zgoniarzDane['stopienPokrewienstwa']);
//                $zgoniarz->setPlec($zgoniarzDane['plec']);
//                $em->persist($zgoniarz);
//            }
//            $aktDziedziczenia->setZgoniarz($zgoniarz);
//            $zgoniarz->setAktDziedziczenia($aktDziedziczenia);

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


//            $form->get('zgoniarz')->setData($zgoniarz);
//            dump($zgoniarz);
//            dump($zgoniarzForm);
//            dump($form->getData());
//            die;

            $spadkobiercy = new ArrayCollection();
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
                $em->persist($spadkobierca);

                $spadkobiercy->add($spadkobierca);
                $aktDziedziczenia->addSpadkobiercy($spadkobierca);
                $spadkobierca->addAktDziedziczenia($aktDziedziczenia);
            }

//            dump($spadkobiercy);

            $html = $this->render('Wzory/akt_poswiadczenia_dziedziczenia.html.twig', [
                'dupa' => $dupa,
                'form' => $form->getData(),
                'dataCzynnosciSlownie' => $dataSlownie,
                'dataZgonuSlownie' => $dataZgonuSlownie,
                'numerSprawy' => $numerSprawy,
                'user' => $user,
                'spadkobiorcy' => $spadkobiercy,
                'zgoniarz' => $zgoniarz
            ]);

            $html_przetworzony = preg_replace("/\r|\n/", "", $html->getContent());
//            dump(nl2br($html_przetworzony));
            file_put_contents("temp/".$fileName, $html_przetworzony);

            $em->persist($aktDziedziczenia);
            $em->flush();

            return $this->redirectToRoute('edit', ['hash' => $aktDziedziczenia->getHash(), 'id' => $aktDziedziczenia->getId()]);
        }

        // replace this example code with whatever you need
        return $this->render('default/aktDziedziczeniaForm.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'form' => $form->createView(),
            'sprawa' => $sprawa
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

        /** @var AktDziedziczenia $dokument */
        $dokument = $this->getDoctrine()->getRepository(AktDziedziczenia::class)->findOneBy(['id' => $id, 'hash' => $hash]);
//        dump($dokument);

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
                'form'=>$form->createView()
            ]);
//            die;
        }

        return $this->render('default/editor.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'wzor'=> $html,
            'form'=>$form->createView()
        ]);
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

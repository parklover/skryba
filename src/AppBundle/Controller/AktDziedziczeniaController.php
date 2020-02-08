<?php

namespace AppBundle\Controller;

use AppBundle\Entity\AktDziedziczenia;
use AppBundle\Entity\OsobaFizyczna;
use AppBundle\Entity\Sprawa;
use AppBundle\Form\AktDziedziczeniaType;
use AppBundle\Form\DokumentType;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\TemplateProcessor;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
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

        $sprawa = $this->getDoctrine()->getRepository(Sprawa::class)->find($idSprawy);
        if(!$sprawa){
            return $this->redirectToRoute('lista_spraw');
        }

        /** @var AktDziedziczenia $aktDziedziczenia */
        $aktDziedziczenia = new AktDziedziczenia();

        $form = $this->createForm(AktDziedziczeniaType::class, $aktDziedziczenia, []);
        $dupa = 'dupa123';
        $numerSprawy = 1;

        $em = $this->getDoctrine()->getManager();
        $form->handleRequest($request);
        if($form->isValid()){

            $aktDziedziczenia->setSprawa($sprawa);
            $numerSprawy = $this->getUser()->getKancelaria()->getSprawy()->count();
            $dataSlownie = "";
            $dataZgonuSlownie = "";
            $user = $this->getUser();
            $fileName = bin2hex(mcrypt_create_iv(22, MCRYPT_DEV_URANDOM)).'.html';
            $aktDziedziczenia->setFilename($fileName);

            $html = $this->render('Wzory/akt_poswiadczenia_dziedziczenia.html.twig', [
                'dupa' => $dupa,
                'form' => $form->getData(),
                'dataCzynnosciSlownie' => $dataSlownie,
                'dataZgonuSlownie' => $dataZgonuSlownie,
                'numerSprawy' => $numerSprawy,
                'user' => $user
            ]);

            dump($html);
            dump($form->getData());
            dump($request->get('spadkobiercy'));
            dump($form->get('spadkobiercy')->getData());

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
                    $spadkobierca->setMiejsceZamieszkania($osoba['miejsceZamieszkania']);
                    $spadkobierca->setNumerDowodu($osoba['numerDowodu']);
                    $spadkobierca->setDataWaznosciDowodu($osoba['dataWaznosciDowodu']);
                    $spadkobierca->setStopienPokrewienstwa($osoba['stopienPokrewienstwa']);
                    $spadkobierca->setPlec($osoba['plec']);
                    $em->persist($spadkobierca);
                }
                $aktDziedziczenia->addSpadkobiercy($spadkobierca);
                $spadkobierca->addAktDziedziczenia($aktDziedziczenia);
            }

            $html_przetworzony = preg_replace("/\r|\n/", "", $html->getContent());
            dump(nl2br($html_przetworzony));
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



    /**
     * @Route("/panel/edit/{id}/{hash}/", name="edit")
     */
    public function editAction(Request $request, $id = 0, $hash = 0)
    {
//        if($id = 0 || $hash = 0){
//            return $this->redirectToRoute('lista_spraw');
//        }

        /** @var AktDziedziczenia $dokument */
        $dokument = $this->getDoctrine()->getRepository(AktDziedziczenia::class)->findOneBy(['id' => $id, 'hash' => $hash]);
        dump($dokument);

        if(!$dokument){
//            die;
            return $this->redirectToRoute('lista_spraw');
        }

        $html = file_get_contents("temp/".$dokument->getFilename());
        dump($html);

        return $this->render('default/editor.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'wzor'=> $html
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

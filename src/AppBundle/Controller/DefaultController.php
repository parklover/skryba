<?php

namespace AppBundle\Controller;

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

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {

//        $dokument = new
        $form = $this->createForm(DokumentType::class);
        $dupa = 'dupa123';

        $form->handleRequest($request);
        if($form->isValid()){

            $dataSlownie = $this->dataSlownie($form->getData()['dataCzynnosci']);

            $html = $this->render('Wzory/akt_poswiadczenia_dziedziczenia.html.twig', [
                'dupa' => $dupa,
                'form' => $form->getData(),
                'dataCzynnosciSlownie' => $dataSlownie
            ]);

            dump($html);
            dump($form->getData());

            $html_przetworzony = preg_replace("/\r|\n/", "", $html->getContent());
            dump(nl2br($html_przetworzony));
            file_put_contents('temp/test123.html', $html_przetworzony);

            return $this->redirectToRoute('edit');
        }

        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/edit/", name="edit")
     */
    public function editAction(Request $request)
    {
        $dupa = 'dupa';

//        $html = $this->render('Wzory/akt_poswiadczenia_dziedziczenia.html.twig', [
//            'dupa' => $dupa
//        ]);
//
//        dump($html);
//
//
//
//
//
//        $html = preg_replace("/\r|\n/", "", $html->getContent());
//        dump(nl2br($html));

//        $path = __DIR__ . "/../../../../web";
        $html = file_get_contents("temp/test123.html");
//        $html = "";
//        $svg = $this->root_dir . str_replace('/', DIRECTORY_SEPARATOR, '/../web/temp/test123.html');


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

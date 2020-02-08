<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Kancelaria;
use AppBundle\Entity\Sprawa;
use AppBundle\Entity\User;
use AppBundle\Form\AktDziedziczeniaType;
use AppBundle\Form\DokumentType;
use AppBundle\Form\KancelariaType;
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

class PanelController extends Controller
{
    /**
     * @Route("/panel/", name="lista_spraw")
     */
    public function listaSprawAction(Request $request)
    {

        // replace this example code with whatever you need
        return $this->render('default/listaSpraw.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/panel/ajax/lista_spraw/", name="lista_spraw_ajax")
     */
    public function listaSprawAjaxAction(Request $request)
    {
        $out = [];
        $sprawy = $this->getUser()->getKancelaria()->getSprawy();

        $k=0;
        $rows=[];
        /** @var Sprawa $sprawa */
        foreach($sprawy as $sprawa){
            $rows[$k][]=$sprawa->getId();
            $rows[$k][]=$sprawa->getNazwa();
            $rows[$k][]=$sprawa->getDataDodania()->format('Y-m-d');
            $rows[$k][]=$sprawa->getKancelaria()->getNazwa();
            $rows[$k][]="<a href='". $this->generateUrl('sprawa', ['id' => $sprawa->getId()])."'> asdasd </a>";
            $k++;
        }

        $out = ['data'=>$rows];
        return new JsonResponse($out);
    }

//    /**
//     * @Route("/panel/edit/", name="edit")
//     */
//    public function editAction(Request $request)
//    {
//        $dupa = 'dupa';
//
//        $html = file_get_contents("temp/test123.html");
//
//        return $this->render('default/editor.html.twig', [
//            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
//            'wzor'=> $html
//        ]);
//    }

    /**
     * @Route("/panel/ustawienia/", name="ustawienia")
     */
    public function ustawieniaAction(Request $request)
    {

        $user = $this->getUser();
        /** @var User $user */
        $kancelaria = $user->getKancelaria();

        $form = $this->createForm(KancelariaType::class,$kancelaria,[ ]);

        $em = $this->getDoctrine()->getManager();
        $form->handleRequest($request);
        if ($form->isValid()) {



            $em->flush();
        }



        return $this->render('default/ustawienia.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'kancelaria'=> $kancelaria,
            'form' => $form->createView()
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

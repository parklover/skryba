<?php

namespace AppBundle\Controller;

use AppBundle\Entity\AktDziedziczenia;
use AppBundle\Entity\Dokument;
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

class SprawaController extends Controller
{
    /**
     * @Route("/panel/sprawa/{id}", name="sprawa")
     */
    public function sprawaAction(Request $request, $id = 0)
    {
        $sprawa = $this->getDoctrine()->getRepository(Sprawa::class)->find($id);
        if(!$sprawa){
            return $this->redirectToRoute('lista_spraw');
        }

        // replace this example code with whatever you need
        return $this->render('default/sprawa.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'sprawa' => $sprawa,
        ]);
    }

    /**
     * @Route("/panel/sprawa/ajax/{id}", name="sprawaAjax")
     */
    public function sprawaAjaxAction(Request $request, $id = 0){

        $out = [];
        $sprawa = $this->getDoctrine()->getRepository(Sprawa::class)->find($id);
        if(!$sprawa){
            return $this->redirectToRoute('lista_spraw');
        }

        $dokumenty = $this->getDoctrine()->getRepository(AktDziedziczenia::class)->findAll();

        $k=0;
        $rows=[];
        /** @var AktDziedziczenia $dokument */
        foreach($dokumenty as $dokument){
            $rows[$k][]=$dokument->getId();
            $rows[$k][]=$dokument->getFilename();
            $rows[$k][]=$dokument->getDataDodania()->format('Y-m-d H:i');
            $rows[$k][]="";
            $k++;
        }

        $out = ['data'=>$rows];
        return new JsonResponse($out);
    }


}

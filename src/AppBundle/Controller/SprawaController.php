<?php

namespace AppBundle\Controller;

use AppBundle\Entity\AktDziedziczenia;
use AppBundle\Entity\Dokument;
use AppBundle\Entity\Kancelaria;
use AppBundle\Entity\Sprawa;
use AppBundle\Form\AktDziedziczeniaType;
use AppBundle\Form\DokumentType;
use AppBundle\Form\KancelariaType;
use AppBundle\Form\SprawaType;
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
     * @Route("/panel/sprawa/{id}/edit/", name="sprawaEdit")
     */
    public function sprawaEditAction(Request $request, $id = 0)
    {

        $edit = true;
        $sprawa = $this->getDoctrine()->getRepository(Sprawa::class)->find($id);
        if(!$sprawa){
            $sprawa = new Sprawa();
            $edit = false;
        }
        $form = $this->createForm(SprawaType::class,$sprawa,[ ]);

        $em = $this->getDoctrine()->getManager();
        $form->handleRequest($request);
        if ($form->isValid()) {
            $sprawa->setKancelaria($this->getUser()->getKancelaria());
            $now = new \DateTime('now');
            $sprawa->setRepertorium($this->getUser()->getKancelaria()->getSprawy()->count()."/".$now->format('Y'));
            $em->persist($sprawa);
            $em->flush();
            return $this->redirectToRoute('sprawa', ['id' => $sprawa->getId()]);
        }

        // replace this example code with whatever you need
        return $this->render('default/sprawaForm.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
            'sprawa' => $sprawa,
            'form' => $form->createView(),
            'edit' => $edit
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

        $akty = $sprawa->getAkty();

        $k=0;
        $rows=[];
        /** @var AktDziedziczenia $dokument */
        foreach($akty as $dokument){
            $rows[$k][]=$dokument->getId();
            $rows[$k][]=$dokument->getFilename();
            $rows[$k][]=$dokument->getDataDodania()->format('Y-m-d H:i');
            $rows[$k][]="<a href='".$this->generateUrl('edit', ['id' => $dokument->getId(), 'hash' => $dokument->getHash()])."'><i class='icon fa-edit'></i></a>";
            $k++;
        }

        $out = ['data'=>$rows];
        return new JsonResponse($out);
    }


}

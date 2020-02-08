<?php

namespace AppBundle\Controller;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class AppController extends CommonController
{
    /**
     * @Route("/", name="homepage")
     */
    public function homepageAction(Request $request)
    {

        return $this->render('homepage.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ]);
    }
}

<?php

namespace AppBundle\Controller;


use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;

class AppController extends CommonController
{
    public function indexAction(Request $request)
    {
        return $this->render('default/index.html.twig',[

        ]);
    }
}

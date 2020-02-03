<?php

namespace AppBundle\Controller;

use AppBundle\Form\RegisterType;
use CoreBundle\Entity\Core\Log;
use CoreBundle\Entity\OpenWear\Klient;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class SecurityController extends AppController
{
    public function loginAction(Request $request)
    {
        $authenticationUtils = $this->get('security.authentication_utils');

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();



        return $this->render('FOSUserBundle:Security:login.html.twig', array(
            'last_username' => $lastUsername,
            'error' => $error,
        ));
    }

    public function loginCheckAction()
    {
        throw new \RuntimeException('You must configure the check path to be handled by the firewall using form_login in your security firewall configuration.');
    }

    public function logoutAction()
    {
        throw new \RuntimeException('You must activate the logout in your security firewall configuration.');
    }

    public function registerAction(Request $request)
    {
        $this->addBreadcrumb('Rejestracja');
        if (!$this->getParameter('dev')['znakowania_rf'])
            return $this->redirectToRoute('panel');

        $user = new Klient();
        $form = $this->createForm(RegisterType::class, $user);
        $form->add('przetwarzanie', CheckboxType::class,[
            'label'=>false,
            'mapped'=>false
        ]);

        $form['typ_osoba']->setData('firma');
        $form['typ_osobaWys']->setData('firma');
        $form->handleRequest($request);

        if ($form->isSubmitted()) {

            $userSPR = $this->getDoctrine()->getManager('openwear')->getRepository("CoreBundle:Klient")->findBy(['uzytkownik' => $form['email']->getData()]);
            if ($userSPR) {
                $form['email']->addError(new FormError('Ten adres email jest już zarejestrowany'));

            }
            if($form['typ_osoba']->getData()!='fizyczna') {
                if (str_replace(" ", "", $form['firma']->getData()) == "") $form['firma']->addError(new FormError('Ta wartość nie powinna być pusta'));
            }
            if ($form['inne_dane']->getData() == 'inne') {
                if($form['typ_osobaWys']->getData()!='fizyczna') {
                    if (str_replace(" ", "", $form['firmaWys']->getData()) == "") $form['firma']->addError(new FormError('Ta wartość nie powinna być pusta'));
                }
                if (str_replace(" ", "", $form['imieWys']->getData()) == "") $form['imieWys']->addError(new FormError('Ta wartość nie powinna być pusta'));
                if (str_replace(" ", "", $form['nazwiskoWys']->getData()) == "") $form['nazwiskoWys']->addError(new FormError('Ta wartość nie powinna być pusta'));
                if (str_replace(" ", "", $form['adresWys']->getData()) == "") $form['adresWys']->addError(new FormError('Ta wartość nie powinna być pusta'));
                if (str_replace(" ", "", $form['miejscowoscWys']->getData()) == "") $form['miejscowoscWys']->addError(new FormError('Ta wartość nie powinna być pusta'));
                if (str_replace(" ", "", $form['kodPocztWys']->getData()) == "") $form['kodPocztWys']->addError(new FormError('Ta wartość nie powinna być pusta'));
                if (str_replace(" ", "", $form['telefonWys']->getData()) == "") $form['telefonWys']->addError(new FormError('Ta wartość nie powinna być pusta'));
            }
            if ((str_replace(" ", "", $form['firma']->getData()) != "") && preg_match('/(.)\1{2}/', $form['firma']->getData())) $form['firma']->addError(new FormError('Ta wartość nie powinna być pusta'));
            if ((str_replace(" ", "", $form['nazwisko']->getData()) != "") && preg_match('/(.)\1{2}/', $form['nazwisko']->getData())) $form['nazwisko']->addError(new FormError('Ta wartość jest nieprawidłowa'));
            if ((str_replace(" ", "", $form['imie']->getData()) != "") && preg_match('/(.)\1{2}/', $form['imie']->getData())) $form['imie']->addError(new FormError('Ta wartość jest nieprawidłowa'));
//            if ($form['inne_dane_fv']->getData()) {
//                if (str_replace(" ", "", $form['imieFak']->getData()) == "") $form['imieFak']->addError(new FormError('Ta wartość nie powinna być pusta'));
//                if (str_replace(" ", "", $form['nazwiskoFak']->getData()) == "") $form['nazwiskoFak']->addError(new FormError('Ta wartość nie powinna być pusta'));
//                if (str_replace(" ", "", $form['adresFak']->getData()) == "") $form['adresFak']->addError(new FormError('Ta wartość nie powinna być pusta'));
//                if (str_replace(" ", "", $form['miejscowoscFak']->getData()) == "") $form['miejscowoscFak']->addError(new FormError('Ta wartość nie powinna być pusta'));
//                if (str_replace(" ", "", $form['kodPocztFak']->getData()) == "") $form['kodPocztFak']->addError(new FormError('Ta wartość nie powinna być pusta'));
//                if (str_replace(" ", "", $form['telefonFak']->getData()) == "") $form['telefonFak']->addError(new FormError('Ta wartość nie powinna być pusta'));
//            }

        }
        if ($form->isSubmitted() && $form->isValid()) {
            $user->setUzytkownik($form['email']->getData());
            $user->setPlainPassword($form['plainPassword']->getData());
            if ($form['typ_osoba']->getData() != 'fizyczna') {
                $user->setFirma($form['firma']->getData());
            } else {
                $user->setFirma("");
            }
            $user->setImie($form['imie']->getData());
            $user->setNazwisko($form['nazwisko']->getData());
            $user->setNip($form['nip']->getData() ?: '');
            $user->setAdres($form['adres']->getData());
            $user->setMiejscowosc($form['miejscowosc']->getData());
            $user->setKodPoczt($form['kodPoczt']->getData());
            if ($form['typ_osoba']->getData() == 'firma_zagraniczna')$user->setKraj($form['kraj']->getData());
            $user->setTelefon($form['telefon']->getData());
            $user->setNewsletter($form['marketing']->getData());
            $user->setZgoda($form['regulations']->getData());
            $user->setRejIp($request->getClientIp());

            if ($form['inne_dane']->getData() == 'inne') {
                if ($form['typ_osobaWys']->getData() == 'fizyczna'){
                    $user->setFirmaWys("");
                } else {
                    $user->setFirmaWys($form['firmaWys']->getData());
                }
                $user->setImieWys($form['imieWys']->getData());
                $user->setNazwiskoWys($form['nazwiskoWys']->getData());
                $user->setAdresWys($form['adresWys']->getData());
                $user->setMiejscowoscWys($form['miejscowoscWys']->getData());
                $user->setKodPocztWys($form['kodPocztWys']->getData());
                $user->setTelefonWys($form['telefonWys']->getData());
                if ($form['typ_osobaWys']->getData() == 'firma_zagraniczna')$user->setKrajWys($form['krajWys']->getData());
            }
//            if ($form['inne_dane_fv']->getData()) {
//                $user->setImieFak($form['imieFak']->getData());
//                $user->setNazwiskoFak($form['nazwiskoFak']->getData());
//                $user->setAdresFak($form['adresFak']->getData());
//                $user->setMiejscowoscFak($form['miejscowoscFak']->getData());
//                $user->setKodPocztFak($form['kodPocztFak']->getData());
//                $user->setTelefonFak($form['telefonFak']->getData());
//            }

            $password = $this->get('security.password_encoder')
                ->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);
            $em = $this->getDoctrine()->getManager('openwear');
            $em->persist($user);
            $em->flush();

            $token = new UsernamePasswordToken($user, null, 'klient', $user->getRoles());
            $this->get('security.token_storage')->setToken($token);
            $this->get('session')->set('_security_main', serialize($token));



//            try {
//                $mailer = $this->get('mailing');
//                $msg = $mailer->createMessage('Rejestracja', $user->getEmail());
//                $mailer->setMessageBody($msg, 'CoreBundle:Security:register.html.twig', ['user' => $user]);
//                $mailer->sendMessage($msg);
//            } catch (\Exception $e) {}


            try {
                $this->get('logi')->zapisz(
                    Log::TABELA_OW_KLIENCI,
                    $user->getId(),
                    Log::RODZAJ_DODANIE,
                    'Rejestracja nowego klienta: '.$user->getFullName()
                );
            } catch (\Exception $e) {}

            return $this->redirectToRoute('app_zamowienie');
        }


        return $this->render('AppBundle:Security:register.html.twig', array(
            'form' => $form->createView()
        ));
    }
}

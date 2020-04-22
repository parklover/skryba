<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Kancelaria;
use AppBundle\Entity\PostepowanieSpadkowe;
use AppBundle\Entity\Sprawa;
use AppBundle\Entity\User;
use AppBundle\Form\PostepowanieSpadkoweType;
use AppBundle\Form\KancelariaType;
use PhpOffice\PhpWord\IOFactory;
use PhpOffice\PhpWord\TemplateProcessor;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Plugin\TinyMCE_SpellChecker_Engine;
use AppBundle\Plugin\TinyMCE_SpellChecker_PSpellEngine;
use AppBundle\Plugin\TinyMCE_SpellChecker_EnchantEngine;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\StreamedResponse;
//
//require('plugins/includes/Engine.php');
//require('plugins/includes/EnchantEngine.php');
//require('plugins/includes/PSpellEngine.php');

class SpellCheckController extends Controller
{
    /**
     * @Route("/server/spellcheck/", name="spellchecker_server")
     */
    public function spellCheckAction(Request $request)
    {

//        dump("dziala");

        $tinymceSpellCheckerConfig = array(
            "engine" => "enchant", // enchant, pspell

            // Enchant options
            "enchant_dicts_path" => "C:\wamp64\www\inzynierka\skryba\src\AppBundle\Dicts\\",

            // PSpell options
            "pspell.mode" => "fast",
            "pspell.spelling" => "",
            "pspell.jargon" => "",
            "pspell.encoding" => ""
        );



//        TinyMCE_SpellChecker_Engine::add("pspell", "TinyMCE_SpellChecker_PSpellEngine");
        TinyMCE_SpellChecker_Engine::add("enchant", "TinyMCE_SpellChecker_EnchantEngine");
        dump(TinyMCE_Spellchecker_Engine::processRequest($tinymceSpellCheckerConfig));
        dump(new JsonResponse(TinyMCE_Spellchecker_Engine::processRequest($tinymceSpellCheckerConfig)));
        return new JsonResponse(TinyMCE_Spellchecker_Engine::processRequest($tinymceSpellCheckerConfig));
//        return new JsonResponse('1');
//        return false;
    }
}
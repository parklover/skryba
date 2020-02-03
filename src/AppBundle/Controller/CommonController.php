<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CommonController extends Controller
{
    private $breadcrumbRooted = false;

    /**
     * @param $route
     * @param array $params
     * @return string
     */
    public function generateAbsUrl($route, array $params = [])
    {
        return $this->generateUrl($route, $params, UrlGeneratorInterface::ABSOLUTE_URL);
    }

    /**
     * @param $text
     * @param $route
     * @param array $params
     * @return CommonController
     */
    public function addBreadcrumbRoute($text, $route, array $params = [])
    {
        if(!$this->isBreadcrumbRooted()) {
            $this->rootBreadcrumb();
        }
        $this->get('white_october_breadcrumbs')->addRouteItem($text, $route, $params);

        return $this;
    }

    /**
     * @param $text
     * @param string $url
     * @return CommonController
     */
    public function addBreadcrumb($text, $url = '')
    {
        if(!$this->isBreadcrumbRooted()) {
            $this->rootBreadcrumb();
        }
        $this->get('white_october_breadcrumbs')->addItem($text, $url);

        return $this;
    }

    /**
     * @return CommonController
     */
    public function rootBreadcrumb()
    {
        $url='#';
//        if(!$this->getParameter('dev')['znakowania_rf']){
//            if(strpos(strtolower($this->generateAbsUrl('app')),'reflect') ){
//                $url='http://reflect.pl';
//            } elseif(strpos(strtolower($this->generateAbsUrl('app')),'openprint') ){
//                $url='https://openprint.pl';
//            }
//        } else {
//            $url='http://reflect.pl';
//        }
//        if(!$this->isBreadcrumbRooted()) {
//            $this->get('white_october_breadcrumbs')->addItem($this->get('translator')->trans('Strona główna'), $url);
//            $this->breadcrumbRooted = true;
//        }

        return $this;
    }

    /**
     * @return bool
     */
    public function isBreadcrumbRooted()
    {
        return $this->breadcrumbRooted;
    }

    public function render($view, array $parameters = array(), Response $response = null)
    {
        if(!$this->isBreadcrumbRooted()) {
            $this->rootBreadcrumb();
        }

        return parent::render($view, $parameters, $response);
    }

    public function renderView($view, array $parameters = array())
    {
        if(!$this->isBreadcrumbRooted()) {
            $this->rootBreadcrumb();
        }

        return parent::renderView($view, $parameters);
    }

}

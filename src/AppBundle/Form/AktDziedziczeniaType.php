<?php
namespace AppBundle\Form;

use AppBundle\Entity\AktDziedziczenia;
use AppBundle\Entity\OsobaFizyczna;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AktDziedziczeniaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('opis', TextareaType::class, [
//                'label'  => 'Opis: ',
//                'required' => false
//            ])
            ->add('dataCzynnosci', DateType::class, [
                'label' => 'Data czynności: ',
                'required'=>true,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'yyyy-MM-dd',
                'attr'=>[
                    'class'=>'form-date'
                ],
            ])
//            ->add('stawajacy',EntityType::class,[
//                'class' => OsobaFizyczna::class,
//                'choice_label' => 'getNazwiskoImie',
//                'query_builder' => function (EntityRepository $er) {
//                    return $er->createQueryBuilder('c');
//                },
////                'attr'=>[
////                    'class'=>'display-none'
////                ],
//                'required'=>true
//            ])
            ->add('zgoniarz', OsobaFizycznaType::class, [
                'label'=>false,
            ])
            ->add('spadkobiercy', CollectionType::class, [
                'label'=>false,
                'entry_type'   => OsobaFizycznaType::class,
                'allow_add' => true,
                'allow_delete' => true,
//                'entry_options'=>[
//                    'label'=>false,
//                ],
//                'prototype' => true,
                'required'=>false,
                'prototype' => true,
                'prototype_name' => '__name__',
                'mapped' => false
            ])
            ->add('dataSmierci', DateType::class, [
                'label' => 'Data śmierci: ',
                'required'=>true,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'yyyy-MM-dd',
                'attr'=>[
                    'class'=>'form-date'
                ],
            ])
            ->add('miejsceZgonu', TextType::class, [
                'label'  => 'Miejsce zgonu: ',
                'required'=>true
            ])
            ->add('miejsceWydaniaAktuZgonu', TextType::class, [
                'label'  => 'Miejsce wydania aktu zgonu: ',
                'required'=>true
            ])
            ->add('dataWydaniaAktuZgonu', TextType::class, [
                'label'  => 'Data wydania aktu zgonu: ',
                'required'=>true,
                'attr'=>[
                    'class'=>'form-date'
                ],
            ])
            ->add('numerAktuZgonu', TextType::class, [
                'label'  => 'Numer aktu zgonu: ',
                'required'=>true
            ])
            ->add('numerSkroconegoAktuMalzenstwaMalzonka', TextType::class, [
                'label'  => 'Numer skróconego aktu małżeństwa małżonka: '
            ])
            ->add('numerSkroconegoAktuMalzenstwaPotomka', TextType::class, [
                'label'  => 'Numer skróconego aktu małżeństwa potomka: '
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'translation_domain' => 'form_label',
            'data-class' => AktDziedziczenia::class
        ));
    }


}
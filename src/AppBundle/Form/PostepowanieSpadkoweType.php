<?php
namespace AppBundle\Form;

use AppBundle\Entity\PostepowanieSpadkowe;
use AppBundle\Entity\OsobaFizyczna;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
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

class PostepowanieSpadkoweType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

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
            ->add('zgoniarz', OsobaFizycznaType::class, [
                'label'=>false,
                'data_class' =>OsobaFizyczna::class,
                'mapped' => false
            ])
            ->add('spadkobiercy', CollectionType::class, [
                'label'=>false,
                'entry_type'   => OsobaFizycznaType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'entry_options'=>[
                    'by_reference'  => false,
                    'label'=>false,
                ],
//                'prototype' => true,
                'required'=>true,
                'prototype' => true,
                'prototype_name' => '__name__',
                'mapped' => false
            ])
            ->add('aktyStanuCywilnego', CollectionType::class, [
                'label'=>false,
                'entry_type'   => AktStanuCywilnegoType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'entry_options'=>[
                    'by_reference'  => false,
                    'label'=>false,
                ],
//                'prototype' => true,
                'required'=>true,
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
            ->add('dataWydaniaAktuZgonu', DateType::class, [
                'label'  => 'Data wydania aktu zgonu: ',
                'required'=>true,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'yyyy-MM-dd',
                'attr'=>[
                    'class'=>'form-date'
                ],
            ])
            ->add('numerAktuZgonu', TextType::class, [
                'label'  => 'Numer aktu zgonu: ',
                'required'=>true
            ])
            ->add('numerSkroconegoAktuMalzenstwaMalzonka', TextType::class, [
                'label'  => 'Numer skróconego aktu małżeństwa małżonka: ',
                'required'=>false
            ])
//            ->add('numerSkroconegoAktuMalzenstwaPotomka', TextType::class, [
//                'label'  => 'Numer skróconego aktu małżeństwa potomka: ',
//                'required'=>false
//            ])
            ->add('zmianaWlascicielaNieruchomosci',CheckboxType::class, [
                'label'=>'Czy zachodzi zmiana właściciela nieruchomości? ',
                'required'=>false
            ])
            ->add('miastoNieruchomosci', TextType::class, [
                'label'  => 'Miasto nieruchomości: ',
                'required'=>false
            ])
            ->add('ksiegaWieczystaNieruchomosci', TextType::class, [
                'label'  => 'Księga wieczysta nieruchomości: ',
                'required'=>false
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'translation_domain' => 'form_label',
            'data-class' => PostepowanieSpadkowe::class
        ));
    }


}
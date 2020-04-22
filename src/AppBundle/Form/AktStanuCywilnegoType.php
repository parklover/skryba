<?php
namespace AppBundle\Form;

use AppBundle\Entity\OsobaFizyczna;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
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

class AktStanuCywilnegoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nazwa', TextType::class, [
                'label'  => 'Nazwa: '
            ])
            ->add('urzad', TextType::class, [
                'label'  => 'Urząd: '
            ])
            ->add('numer', TextType::class, [
                'label'  => 'Numer: '
            ])
            ->add('typ', HiddenType::class, [

            ])
            ->add('dataWydania', DateType::class, [
                'label'  => 'Data wydania: ',
                'required'=>true,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'yyyy-MM-dd',
                'attr'=>[
                    'class'=>'form-date'
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'translation_domain' => 'form_label',
            'data-class' => OsobaFizyczna::class
        ));
    }


}
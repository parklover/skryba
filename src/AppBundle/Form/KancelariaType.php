<?php
namespace AppBundle\Form;

use AppBundle\Entity\PostepowanieSpadkowe;
use AppBundle\Entity\Kancelaria;
use AppBundle\Entity\OsobaFizyczna;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class KancelariaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nazwa', TextType::class, [
                'label'  => 'Nazwa: ',
                'required'=>true
            ])
            ->add('miasto', TextType::class, [
                'label'  => 'Miasto: ',
                'required'=>true
            ])
            ->add('adres', TextType::class, [
                'label'  => 'Adres: ',
                'required'=>true
            ])
            ->add('kodPocztowy', TextType::class, [
                'label'  => 'Kod pocztowy: ',
                'required'=>true
            ])
            ->add('wynagrodzenieNotariusza', NumberType::class, [
                'label'  => 'Wynagrodzenie notariusza: ',
                'required' => false,
                'scale'=>2,
                'attr' => [
                    'step'=>'0.01'
                ]
            ])
            ->add('oplataZaWpisDoRejestruSpadkowego', NumberType::class, [
                'label'  => 'Opłata za wpis do RS: ',
                'required' => false,
                'scale'=>2,
                'attr' => [
                    'step'=>'0.01'
                ]
            ])
            ->add('kosztStrony', NumberType::class, [
                'label'  => 'Koszt strony: ',
                'required' => false,
                'scale'=>2,
                'attr' => [
                    'step'=>'0.01'
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'translation_domain' => 'form_label',
            'data-class' => Kancelaria::class
        ));
    }


}
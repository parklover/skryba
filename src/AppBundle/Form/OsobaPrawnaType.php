<?php
namespace AppBundle\Form;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class OsobaPrawnaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('imie', TextType::class, [
                'label'  => 'Imię: '
            ])
            ->add('nazwisko', TextType::class, [
                'label'  => 'Nazwisko: '
            ])
            ->add('imieOjca', TextType::class, [
                'label'  => 'Imię ojca: '
            ])
            ->add('imieMatki', TextType::class, [
                'label'  => 'Imię matki: '
            ])
            ->add('pesel', TextType::class, [
                'label'  => 'Pesel: '
            ])
            ->add('miejsceZamieszkania', TextType::class, [
                'label'  => 'Miejsce zamieszkania: '
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'translation_domain' => 'form_label',
        ));
    }


}
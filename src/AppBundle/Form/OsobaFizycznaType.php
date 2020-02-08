<?php
namespace AppBundle\Form;

use AppBundle\Entity\OsobaFizyczna;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
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

class OsobaFizycznaType extends AbstractType
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
            ->add('miejsceUrodzenia', TextType::class, [
                'label'  => 'Miejsce urodzenia: '
            ])
            ->add('miejsceZamieszkania', TextType::class, [
                'label'  => 'Miejsce zamieszkania: '
            ])
            ->add('numerDowodu', TextType::class, [
                'label'  => 'Numer dowodu osobistego: '
            ])
            ->add('dataWaznosciDowodu', DateType::class, [
                'label'  => 'Data ważności dowodu osobistego: ',
                'required'=>true,
                'html5' => false,
                'widget' => 'single_text',
                'format' => 'yyyy-MM-dd',
                'attr'=>[
                    'class'=>'form-date'
                ],
            ])
            ->add('stopienPokrewienstwa',ChoiceType::class,[
                'label' => 'Pokrewieństwo:',
                'choices' => [
                    'Matka' => 1,
                    'Ojciec' => 2,
                    'Kuzyn' => 3,
                    'Brat' => 4,
                    'Siostra' => 5,
                ]
            ])
            ->add('plec',ChoiceType::class,[
                'label' => 'Płeć:',
                'choices' => [
                    'Kobieta' => 1,
                    'Mężczyzna' => 2
                ]
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
<?php

namespace Drupal\consommable_calculator\Form;

use Drupal\Core\Database\Database;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Form\ConfigFormBase;


class EmailDetailForm extends FormBase
{
  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'emaildetail_form';
  }

  /**
  * {@inheritdoc}
  */
  protected function getEditableConfigNames() {
    return [
      'consommable_calculator.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state)
  {    
    $config = \Drupal::config('consommable_calculator.settings');

    $form['email_subject'] = [
      '#type' => 'textfield',
      '#title' => t('Email Subject'),
      '#required' => true,
      '#size' => 255,
      '#default_value' => '',
      '#maxlength' => 255,
      '#default_value' => $config->get('email_subject'),
    ];
    $form['email_to'] = [
      '#type' => 'textfield',
      '#title' => t('Email TO'),
      '#required' => true,
      '#size' => 255,
      '#default_value' => '',
      '#maxlength' => 255,
      '#default_value' => $config->get('email_to'),
    ];
    $form['email_cc'] = [
      '#type' => 'textfield',
      '#title' => t('Email CC'),
      '#required' => true,
      '#size' => 255,
      '#default_value' => '',
      '#maxlength' => 255,
      '#default_value' => $config->get('email_cc'),
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#buttom_type' => 'primary'
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state)
  { 
    $config = \Drupal::service('config.factory')->getEditable('consommable_calculator.settings');
      $config->set('email_to', $form_state->getValue('email_to'))
        ->set('email_cc', $form_state->getValue('email_cc'))
        ->set('email_subject', $form_state->getValue('email_subject'))
        ->save();
  }
}
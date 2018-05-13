export default {
  /**
   * zh:chinese
   * 命名例子：Home_Robot1_name:'合金队长',
   */
  data:
  {
    Hello: "en Hello",
    Home_Menu_1: 'Jouabilité officielle',
    Home_Menu_2: 'Mon application',
    Home_Menu_text: 'Mon application',
    Home_setting: 'Paramètres',
    Home_firmware: 'Mettre à jour le microligiciel',
    Firmware_version: 'Version du micrologiciel',
    Firmware_information: 'Informations sur le micrologiciel',
    Current_version: 'Version actuelle',
    Home_about_us: 'À propos de nous',
    Home_language:'Langue',
    Home_settingLanguage:'Définir la langue',
    Setting_content_1: "Veuillez d'abord connecter l'appareil",
    Setting_content_2: 'Connection en cours, merci de patienter',
    Setting_content_3: 'Mise à jour en cours',
    Setting_content_4: 'Mise à jour terminée',
    Setting_content_5: 'Echec de la mise à jour',
    check_version:'Vérifier les mises à jour',
    About_us_content: 'Tous droits réservés: RoboBloq Co., Ltd',
    Robot_name_1: 'Le Voyager',
    Robot_name_2: 'Le Dozer',
    Robot_name_3: 'Scorpoid',
    Robot_name_4: 'Captain Alloy',
    Robot_name_5: 'Le Cavalier',
    Robot_name_6: "Li'l Guardian",
    Robot_type:'Forme&Fonction',
    Q_corps: 'Qoopers',
    Q_scout: 'Q-scout',
    Robot: [
      {
        name: 'Le Voyager',
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 3,
          feature: 'Durée: environ 45 minutes',
          function: "Doté d’une excellente maniabilité tout terrain, le robot sur chenilles a un mode de contrôle à distance ainsi qu’un mode automatique d'évitement d'obstacles en mode débutant."
        }
      },
      {
        name: 'Le Dozer',
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 2,
          feature: 'Durée: environ 35 minutes',
          function: 'Muni d’une grande flexibilité opérationnelle, vous pouvez manipuler le Bulldozer à roues pour déplacer des objets divers. Par exemple, il peut être utilisé pour jouer à un mini-jeu de football.'
        }
      },
      {
        name: 'Scorpoid',
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 3,
          feature: 'Durée: environ 45 minutes',
          function: "Le « Scorpoid », d’une flexibilité étonnante se déplace en se secouant et patrouille le monde.   Il existe deux modes débutants, le mode de contrôle à distance ainsi que le mode automatique d'évitement d'obstacles."
        }
      },
      {
        name: 'Captain Alloy',
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 4,
          feature: 'Durée: environ 60 minutes',
          function: 'Le « Capitain Alloy », Centre "intelligent" présente son commandement stratégique  combiné a de l’action et son expression. Il a le mode de contrôle à distance. '
        }
      },
      {
        name: 'Le Cavalier',
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 4,
          feature: 'Durée: environ 70 minutes',
          function: "Le « Cavalier » sur chenilles, armé de fer et d'acier tire sur l'ennemi avec un sourire. Il a le mode de contrôle à distance. "
        }
      },
      {
        name: "Li'l Guardian",
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 3,
          feature: 'Durée: environ 45 minutes',
          function: 'Le « Little Guardian », suit le capitaine, assurant la sécurité la tête haute. Il a le mode de contrôle à distance.'
        }
      },
      {
        name: "Q-scout",
        information: {
          summary: 'Une forme de réservoir de chenille',
          score: 1,
          feature: 'Durée: environ 20 minutes',
          function: "Un robot idéal d'éducation pour débuter en programmation, facile à mettre en place. Avec le mode de contrôle à distance, le mode parcours et le mode musique pour jouer pleinement. "
        }
      },
    ],
    Building_difficulty: 'Difficulté de construction:',
    Robot_function_build: 'Construire',
    Robot_function_control: 'Introduction',
    MyProject_new: 'Créer',
    MyProject_creact: 'Créer',
    MyProject_edit_pro: 'Modifier',
    MyProject_edit: 'Modifier',
    MyProject_delete: 'Supprimer',
    Build_Explain: 'Instructions de construction',
    Control_rocker: 'Contrôle à distance',
    Control_avoidance: "L'évitement d'obstacles",
    Control_path:'Parcours',
    Control_music:'Musique',
    Control_matrix:'Écran matriciel',
    Control_linetracking:'Patrouille',
    Connection_Blue_open: 'La fonction Bluetooth n’est pas connectée, veuillez l’activer',
    Connection_robot: 'Connectez premièrement  le robot',
    Connection_Blue_Break: 'Déconnecter',
    Connection_Blue_on: 'Connexion en cours, veuillez patienter',
    Connection_device:"Veuillez sélectionner l'appareil",
    Common_delete_title: 'Supprimer',
    Common_delete_content_1: "Ne peut pas être récupérer une fois l'application effacée",
    Common_delete_content_2: "Êtes-vous sûr de vouloir effacer l'application",
    Common_build_title: "Félicitations, vous avez fini la construction!",
    Common_build_content: 'Après avoir quitté le mode de contrôle, la connexion au robot sera déconnectée. Êtes-vous sûr de vouloir quitter',
    Common_connect_content_1: 'Veuillez activer le Bluetooth',
    Common_connect_content_2: 'La connexion a échoué, veuillez réessayer plus tard',
    Common_connect_content_3: 'Voulez-vous vraiment vous déconnecter',
    Common_discon_content:'Après avoir quitté le mode de contrôle, la connexion au robot sera déconnectée. Êtes-vous sûr de vouloir quitter?',
    Common_discon_content1:"Laissez la page, la connexion du robot sera brisée, vous confirmez que vous voulez le quitter",
    Common_device_break:"La connexion de l'appareil a été interrompue, souhaitez-vous vous connecter à nouveau?",
    Common_engin_break:"La connexion du moteur est anormale, veuillez vérifier l'état de la connexion",
    Common_voice_break:"La connexion ultrasonique a échoué, veuillez vérifier l'état de la connexion",
    Common_lattice_break:"La connexion de l'écran a échoué, veuillez vérifier l'état de la connexion",
    Common_firmware_break:'Mettre à jour le micrologiciel',
    Common_port_break:'La valeur sur le port est incorrecte, déconnectez et reconnectez le robot!',
    Common_close: 'Fermer',
    Common_retry: 'Essayez à nouveau',
    Common_comfirm: 'Confirmer',
    Common_cancel: 'Annuler',
    Common_break: 'Déconnecter',
    common_prompt:'Alerte',
    Common_sure:'Ok',
     Create_applicatioin_1:"Entrer le nom de l'application",
    Create_applicatioin_2:"Le nom de l'application doit avoir une longueur de 2 à 50 chiffres",
    Create_applicatioin_4:"Veuillez sélectionner l'avatar de l'application",
    Create_applicatioin_5:"L'application ne peut pas être trouvée",
    low_power_hint:'Une batterie faible de moins de 10% affectera les performances du robot. Veillez à remplacer ou recharger la batterie en temps opportun.',
    Song_list: ['Joyeux Noël', 'Frère Jacques', 'Petite étoile', 'Flying Fireflies'],
    gs_motion_move: 'Rotation du moteur, Roue gauche:%1 Roue droite:%2',
    gs_sound_play: 'Jouer%1 son%2 ms',
    gs_sound_play_SOUND1: 'La voiture émet un signal sonore',
    gs_event_whenflagclicked: 'Lorsque vous cliquez sur%1',
    gs_light_change: 'Définissez la couleur de la lumière de bord%1 sur%2',
    gs_light_change_LIGHT0: 'Lumière gauche',
    gs_light_change_LIGHT1: 'Lumière droite',
    gs_light_change_LIGHT2: 'Lumières à gauche et à droite',
    gs_light_change_COLOR1: 'Rouge',
    gs_light_change_COLOR2: 'Jaune',
    gs_light_change_COLOR3: 'Vert',
    gs_light_change_COLOR4: 'Eteindre',
    gs_matrix_change: 'Définir le panneau de la matrice%1',
    gs_matrix_change_VALUE1: 'Expression1',
    gs_matrix_change_VALUE2: 'Expression2',
    gs_matrix_change_VALUE3: 'Expression3',
    gs_matrix_change_VALUE4: 'Expression4',
    gs_matrix_change_VALUE5: 'Expression5',
    gs_matrix_change_VALUE6: 'Expression6',
    gs_matrix_change_VALUE7: 'Expression7',
    gs_matrix_change_VALUE8: 'Expression8',
    gs_control_repeat: "Répétez jusqu'à%1",
    gs_light_ultrasonic: 'Réglez la lumière à ultrasons%1',
    gs_light_ultrasonic_COLOR1: 'Rouge',
    gs_light_ultrasonic_COLOR2: 'Jaune',
    gs_light_ultrasonic_COLOR3: 'Vert',
    gs_light_ultrasonic_COLOR4: 'Eteindre',
    gs_sensing_linePatrolValue:'%1 Valeur du capteur de ligne',
    gs_sensing_lightValue:'%1 Valeur du capteur de lumière',
    gs_sensing_voiceValue:'%1 Valeur du capteur de sonore',
    gs_sensing_temperatureValue:'%1 Valeur du capteur de température',
    gs_sensing_humidityValue:"%1 Valeur du capteur de d'humidité",
    gs_data_variable_a: 'Variable A',
    gs_data_variable_b: 'Variable B',
    gs_data_variable_c: 'Variable C',
    gs_data_variable_d: 'Variable D',
    gs_data_variable_e: 'Variable E',
    category_start: 'Débuter',
    category_motion: 'Exercice',
    category_light: 'Lumière',
    category_sound: 'Son',
    category_control: 'Contrôle',
    category_operator: 'Opérateur',
    category_sensing: 'Capteur',
    category_variable: 'Variable',
    gs_event_whenthisspriteclicked: 'Lorsque vous appuyez sur le bouton de la carte mère du robot',
    gs_motion_move_2: 'Exécuter %1 à la vitesse %2 ',
    gs_motion_move_0_forward: 'Avancer',
    gs_motion_move_0_backward: 'Reculer',
    gs_motion_move_0_left: 'Tourner à gauche',
    gs_motion_move_0_right: 'Tourner à droite',
    gs_motion_move_3: 'Régler le moteur %1%2 à la vitesse%3',
    gs_motion_steering_engine: 'Paramètres%1 Servo%2 Coin 1%3 Coin 2%4',//
    gs_motion_external_motor: 'Définir le port %1 moteur externe vitesse %2',
    gs_light_0_all: 'Lumières à gauche et à droite',
    gs_light_0_left: 'Lumière gauche',
    gs_light_0_right: 'Lumière droite',
    gs_light_0_red: 'Rouge',
    gs_light_0_yellow: 'Jaune',
    gs_light_0_green: 'Vert',
    gs_light_0_black: 'Eteindre',
    gs_light_change_2: 'Régler #%1 dans le panneau LED rouge%2 vert%3 bleu%4',
    gs_light_change_3: 'Régler #%1 la couleur du panneau LED %2',
    gs_matrix_change_2: 'Afficher le dessin%1 dessiner%2',
    gs_port_1: 'Port 1',
    gs_port_2: 'Port 2',
    gs_port_3: 'Port 3',
    gs_port_4: 'Port 4',
    gs_port_5: 'Port 5',
    gs_port_6: 'Port 6',
    gs_port_7: 'Port 7',
    gs_port_8: 'Port 8',
    gs_matrix_change_3: 'Afficher le dessin%1 dessiner%2',
    gs_matrix_change_4: 'Afficher le dessin%1 dessiner%2',
    gs_matrix_change_5: 'Afficher le dessin%1 dessiner%2',
    gs_light_ultrasonic_2: 'Réglez%1 le rouge à ultrasons%2 vert%3 bleu%4',
    gs_light_ultrasonic_3: 'Réglez%1 la lumière à ultrasons sur la couleur%2',
    gs_sound_play_2: 'Jouer une note sur%1 rythme%2',
    gs_sound_play_0_quarter: 'Un quart',
    gs_sound_play_0_half: 'La moitié',
    gs_sound_play_0_eighth: 'Un huitième',
    gs_sound_play_0_whole: 'Entier',
    gs_sound_play_0_double: 'Double',
    gs_control_wait: 'Attendre %1 seconde',
    gs_control_repeat: "Répétez jusqu'à%1",
    gs_control_forever: 'Toujours',
    gs_control_repeat_until: "Répétez jusqu'à%1",
    gs_control_if: 'Si%1 alors',
    gs_control_if_else: 'Autre',
    gs_control_wait_until: "Attendre jusqu'à%1",
    gs_control_stop: 'Arrêtez',
    gs_control_stop_all: 'Tout',
    gs_operator_random: 'Choisissez aléatoirement %1 à%2',
    gs_sensing_mousedown: 'Le bouton en haut du panneau est appuyé?',
    gs_motion_stopMove:"Arrêtez d'exercer",
    gs_sensing_distanceto: 'Lire le capteur à ultrasons%1',
    gs_data_setvariableto: 'Définir%1 à %2',
    gs_data_changevariableby: 'Changer%1 par%2'
  }
}
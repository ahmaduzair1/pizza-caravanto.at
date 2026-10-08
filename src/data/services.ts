import { images } from '../config/images'
import type { ServiceCard } from '../types'

export const services: ServiceCard[] = [
  {
    id: 'cuisine',
    title: {
      de: 'Österreichische und italienische Küche im Herzen von Hagenberg',
      en: 'Austrian and Italian cuisine in the heart of Hagenberg',
    },
    description: {
      de: 'Das Restaurant heißt Sie herzlich willkommen und verwöhnt Sie mit sorgfältig zubereiteten Köstlichkeiten der österreichischen und italienischen Küche. Genießen Sie in einer warmen und einladenden Atmosphäre eine Vielfalt an leckeren Speisen und Getränken und erleben Sie unvergessliche Momente.',
      en: 'The restaurant welcomes you warmly and treats you to carefully prepared Austrian and Italian delicacies. Enjoy a variety of delicious food and drinks in a warm, inviting atmosphere and create unforgettable moments.',
    },
    image: images.services.cuisine,
  },
  {
    id: 'lunch',
    title: {
      de: 'Pause & Zeit',
      en: 'Break & Time',
    },
    description: {
      de: 'Vielfältige Salatvariationen, köstliche Pasta, Pizzen, Fleischgerichte und leckere Burger. In unserem Caravento Pizza Restaurant erwarten Sie zahlreiche schmackhafte Optionen für Ihr Mittagessen – frisch zubereitet, vielseitig und zu attraktiven Preisen. Genießen Sie eine abwechslungsreiche Mittagsauswahl, die für jeden Geschmack etwas bereithält.',
      en: 'Varied salads, delicious pasta, pizzas, meat dishes and tasty burgers. At Caravento Pizza Restaurant you will find many flavorful lunch options — freshly prepared, versatile and attractively priced. Enjoy a varied midday selection for every taste.',
    },
    image: images.services.lunch,
  },
  {
    id: 'coffee',
    title: {
      de: 'Kaffeepause oder Treffpunkt für lange vermisste Freunde',
      en: 'Coffee break or meeting place for long-missed friends',
    },
    description: {
      de: 'Genießen Sie eine entspannte Pause bei einer Tasse Kaffee oder treffen Sie Freunde, die Sie lange nicht gesehen haben, in unserem gemütlichen Bistro.',
      en: 'Enjoy a relaxed break over a cup of coffee or meet friends you have not seen in a long time in our cozy bistro.',
    },
    image: images.services.coffee,
  },
  {
    id: 'takeaway',
    title: {
      de: 'Zu Hause genießen!',
      en: 'Enjoy at home!',
    },
    description: {
      de: 'Alle unsere Gerichte können Sie bequem bei Caravento Pizza & Restaurant bestellen und abholen. Unsere hausgemachten Saucen und frisch zubereiteten Speisen werden sorgfältig verpackt, sodass Sie sie zuhause oder im Büro in Ruhe genießen können.',
      en: 'All our dishes can be conveniently ordered and picked up at Caravento Pizza & Restaurant. Our homemade sauces and freshly prepared meals are carefully packed so you can enjoy them at home or in the office.',
    },
    footnote: {
      de: 'Paketservice: Freitag, Samstag & Sonntag von 11:00 – 21:00 Uhr',
      en: 'Package service: Friday, Saturday & Sunday from 11:00 – 21:00',
    },
    image: images.services.takeaway,
  },
]

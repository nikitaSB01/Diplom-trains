import user2 from '../../../assets/img/Reviews/webp/п1.webp';
import user3 from '../../../assets/img/Reviews/webp/д2.webp';
import user4 from '../../../assets/img/Reviews/webp/п2.webp';
import user5 from '../../../assets/img/Reviews/webp/д3.webp';
import user1 from '../../../assets/img/Reviews/webp/д1.webp';
import user6 from '../../../assets/img/Reviews/webp/п3.webp';
import user7 from '../../../assets/img/Reviews/webp/д4.webp';
import user8 from '../../../assets/img/Reviews/webp/п4.webp';
import user9 from '../../../assets/img/Reviews/webp/д5.webp';
import user10 from '../../../assets/img/Reviews/webp/п5.webp';

export interface Review {
  img: string;
  name: string;
  text: string;
}

export const reviewsData: Review[] = [
  {
    img: user1,
    name: 'Екатерина Вальнова',
    text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
  },
  {
    img: user2,
    name: 'Евгений Стрыкало',
    text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлём вам СМС-напоминание о поездке.',
  },
  {
    img: user3,
    name: 'Ирина Алексеева',
    text: 'Покупала билеты в отпуск — всё очень удобно, быстро и без очередей!',
  },
  {
    img: user4,
    name: 'Павел Морозов',
    text: 'Приятно удивлён скоростью и простотой интерфейса. Теперь только через вас!',
  },
  {
    img: user5,
    name: 'Марина Зотова',
    text: 'Понравилось, что сайт сразу показывает ближайшие даты и скидки.',
  },
  {
    img: user6,
    name: 'Виктор Петров',
    text: 'Очень удобно сохранять историю заказов и быстро повторять прошлые поездки.',
  },
  {
    img: user7,
    name: 'Наталья Сафонова',
    text: 'Купила билет за 5 минут — без очередей, всё ясно и просто!',
  },
  {
    img: user8,
    name: 'Андрей Ким',
    text: 'Поддержка быстро ответила и помогла внести изменения в заказ. Спасибо!',
  },
  {
    img: user9,
    name: 'Татьяна Орлова',
    text: 'Пользуюсь уже 3 года — всегда удобно и надёжно.',
  },
  {
    img: user10,
    name: 'Олег Захаров',
    text: 'Никаких проблем с оплатой и возвратом. Рекомендую всем.',
  },
];

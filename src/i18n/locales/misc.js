// Suzuvchi tugma (FAB) va kalendar
const misc = {
  "common.monthsNominative": {
    uz: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    ru: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  },
  "common.weekdaysShort": {
    uz: ["Ya", "Du", "Se", "Ç", "Pa", "Ju", "Ş"],
    ru: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  },

  // FAB
  "fab.quickContact": { uz: "Tezkor aloqa", ru: "Быстрая связь", en: "Quick contact" },
  "fab.namePh": { uz: "Ismingiz", ru: "Ваше имя", en: "Your name" },
  "fab.subjectPh": { uz: "Mavzu", ru: "Тема", en: "Subject" },
  "fab.messagePh": { uz: "Xabaringizni yozing...", ru: "Напишите сообщение...", en: "Write your message..." },
  "fab.uploadImage": { uz: "Rasm yuklaş (ixtiyoriy)", ru: "Загрузить изображение (необязательно)", en: "Upload image (optional)" },
  "fab.chooseImage": { uz: "Rasm tanlang", ru: "Выберите изображение", en: "Choose an image" },
  "fab.needHelp": { uz: "Sizga yordam kerakmi?", ru: "Нужна помощь?", en: "Need help?" },
  "fab.helpText": { uz: "Savol yoki takliflaringiz bölsa, biz bilan boğlaning. Operatorlarimiz sizga yordam berişga tayyor!", ru: "Если у вас есть вопросы или предложения, свяжитесь с нами. Наши операторы готовы помочь!", en: "If you have questions or suggestions, get in touch. Our operators are ready to help!" },
  "fab.yes": { uz: "Ha, kerak", ru: "Да, нужна", en: "Yes, please" },
  "fab.no": { uz: "Yöq", ru: "Нет", en: "No" },
  "fab.calendar": { uz: "Voqealar kalendari", ru: "Календарь событий", en: "Events calendar" },
  "fab.messages": { uz: "Xabarlar", ru: "Сообщения", en: "Messages" },
  "fab.notifications": { uz: "Bildirişnomalar", ru: "Уведомления", en: "Notifications" },
  "fab.help": { uz: "Yordam", ru: "Помощь", en: "Help" },
  "fab.close": { uz: "Yopiş", ru: "Закрыть", en: "Close" },
  "fab.open": { uz: "Oçiş", ru: "Открыть", en: "Open" },

  // AI yordamchi (robotcha)
  "ai.title": { uz: "AI yordamçi", ru: "ИИ-помощник", en: "AI assistant" },
  "ai.subtitle": { uz: "Kasbiy ta'lim böyiça savollarga javob beraman", ru: "Отвечаю на вопросы о профессиональном образовании", en: "I answer questions about vocational education" },
  "ai.welcome": { uz: "Salom! Men kasbiy ta'lim böyiça AI yordamçiman. Kasb-hunar maktablari, texnikumlar, qabul, yönalişlar, malaka oşiriş va boşqa mavzularda savolingizni yozing.", ru: "Здравствуйте! Я ИИ-помощник по профессиональному образованию. Задайте вопрос о профессиональных школах, техникумах, приёме, направлениях, повышении квалификации и других темах.", en: "Hello! I'm an AI assistant for vocational education. Ask me about vocational schools, technical colleges, admission, programmes, professional development and more." },
  "ai.suggestion1": { uz: "Texnikumga qabul qanday amalga oşiriladi?", ru: "Как проходит приём в техникум?", en: "How does admission to a technical college work?" },
  "ai.suggestion2": { uz: "Kasb-hunar maktabi va kollejning farqi nima?", ru: "Чем отличается профессиональная школа от колледжа?", en: "What is the difference between a vocational school and a college?" },
  "ai.suggestion3": { uz: "Öqituvçilar malakasini qayerda oşiradi?", ru: "Где преподаватели повышают квалификацию?", en: "Where can teachers improve their qualifications?" },
  "ai.placeholder": { uz: "Savolingizni yozing...", ru: "Напишите ваш вопрос...", en: "Type your question..." },
  "ai.thinking": { uz: "Javob tayyorlanmoqda", ru: "Готовлю ответ", en: "Preparing an answer" },
  "ai.error": { uz: "Javob olib bölmadi. Iltimos, qaytadan urinib köring.", ru: "Не удалось получить ответ. Попробуйте ещё раз.", en: "Couldn't get an answer. Please try again." },
  "ai.retry": { uz: "Qayta urinib köriş", ru: "Повторить", en: "Try again" },
  "ai.clear": { uz: "Suhbatni tozalaş", ru: "Очистить чат", en: "Clear chat" },
  "ai.disclaimer": { uz: "AI javoblarida xatolik bölişi mumkin. Muhim ma'lumotlarni tekşirib köring.", ru: "Ответы ИИ могут содержать ошибки. Проверяйте важную информацию.", en: "AI answers can contain mistakes. Double-check important information." },
  "ai.greetingTitle": { uz: "Salom! Men AI yordamçiman 👋", ru: "Здравствуйте! Я ИИ-помощник 👋", en: "Hi! I'm the AI assistant 👋" },
  "ai.greetingText": { uz: "Kasbiy ta'limga oid istalgan savolingizga javob berişga tayyorman.", ru: "Готов ответить на любой вопрос о профессиональном образовании.", en: "I'm ready to answer any question about vocational education." },
  "ai.ask": { uz: "Savol beriş", ru: "Задать вопрос", en: "Ask a question" },

  // Media resurslar
  "media.photoSubtitle": { uz: "Institut tadbirlari va voqealaridan suratlar", ru: "Фотографии с мероприятий и событий института", en: "Photos from institute events" },
  "media.videoSubtitle": { uz: "Institut faoliyatiga oid video lavhalar", ru: "Видеосюжеты о деятельности института", en: "Videos about the institute's work" },
  "media.albums": { uz: "albom", ru: "альбомов", en: "albums" },
  "media.videos": { uz: "video", ru: "видео", en: "videos" },
  "media.noPhotos": { uz: "Hozirça suratlar yöq", ru: "Фотографий пока нет", en: "No photos yet" },
  "media.noVideos": { uz: "Hozirça videolar yöq", ru: "Видео пока нет", en: "No videos yet" },
  "media.openNews": { uz: "Yangilikni oçiş", ru: "Открыть новость", en: "Open news" },
  "media.prev": { uz: "Oldingi", ru: "Предыдущее", en: "Previous" },
  "media.next": { uz: "Keyingi", ru: "Следующее", en: "Next" },

  // Infografika
  "info.keyFacts": { uz: "Asosiy körsatkiçlar", ru: "Ключевые показатели", en: "Key figures" },
  "info.timeline": { uz: "Tarix", ru: "История", en: "History" },
  "info.step": { uz: "Bosqiç", ru: "Этап", en: "Step" },

  // Kalendar
  "cal.upcoming": { uz: "Rejalaştirilgan", ru: "Запланировано", en: "Upcoming" },
  "cal.past": { uz: "Ötgan", ru: "Прошедшее", en: "Past" },
  "cal.date": { uz: "Sana", ru: "Дата", en: "Date" },
  "cal.time": { uz: "Vaqt", ru: "Время", en: "Time" },
  "cal.location": { uz: "Joylaşuv", ru: "Место", en: "Location" },
  "cal.participants": { uz: "Iştirokçilar", ru: "Участники", en: "Participants" },
  "cal.results": { uz: "Asosiy natijalar", ru: "Основные итоги", en: "Key results" },
  "cal.moreInNews": { uz: "Batafsil yangilikda", ru: "Подробнее в новости", en: "More in the news" },
  "cal.program": { uz: "Dastur", ru: "Программа", en: "Program" },
  "cal.speakers": { uz: "Ma'ruzaçilar", ru: "Докладчики", en: "Speakers" },
  "cal.note": { uz: "Eslatma:", ru: "Примечание:", en: "Note:" },
  "cal.registrationRequired": { uz: "Röyxatdan ötiş talab etiladi", ru: "Требуется регистрация", en: "Registration required" },
  "cal.deadline": { uz: "Muddat:", ru: "Срок:", en: "Deadline:" },
  "cal.contact": { uz: "Boğlaniş", ru: "Контакты", en: "Contact" },
  "cal.responsible": { uz: "Mas'ul şaxs:", ru: "Ответственное лицо:", en: "Responsible person:" },
  "cal.nearest": { uz: "Yaqin voqealar", ru: "Ближайшие события", en: "Upcoming events" },
};

export default misc;

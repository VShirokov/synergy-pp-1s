import * as readline from 'readline';

const inputOutput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getDayOfWeek(day, mounth, year) {
  const date = new Date(year, mounth - 1, day);
  const days = [
      'понедельник',
      'вторник',
      'среда',
      'четверг',
      'пятница',
      'суббота',
      'воскресенье',
  ];
  return days[date.getDay()];
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getCurrentAge(day, mounth, year) {
  const now = new Date();
  let age = now.getFullYear() - year;

  if (
    now.getMonth() + 1 < mounth ||
    (now.getMonth() + 1 === mounth && now.getDate() < day)
  ) {
    age--;
  }
  return age;
}

const digits = [
  [" *** ", "*   *", "*   *", "*   *", " *** "], // 0
  ["  *  ", " **  ", "* *  ", "  *  ", "**** "], // 1
  [" *** ", "    *", " *** ", "*    ", "*****"], // 2
  [" *** ", "    *", " ****", "    *", " *** "], // 3
  ["*   *", "*   *", "*****", "    *", "    *"], // 4
  ["**** ", "*    ", "**** ", "    *", "**** "], // 5
  [" *** ", "*    ", "**** ", "*   *", " *** "], // 6
  ["*****", "    *", "   * ", "  *  ", " *   "], // 7
  [" *** ", "*   *", " *** ", "*   *", " *** "], // 8
  [" *** ", "*   *", " ****", "    *", " *** "]  // 9
];

function drawNumber(dateString) {
  const chars = dateString.split('');
  const resultLines = ['', '', '', '', ''];

  chars.forEach((char, index) => {
        const digit = parseInt(char);
        if (isNaN(digit)) {
          resultLines.forEach((line, i) => {
            const index = i - 1;
            resultLines[index] += '   '
          })
          resultLines[resultLines.length - 1] += ' * '
          return;
        } else {
          const pattern = digits[digit];
          pattern.forEach((line, i) => {
              resultLines[i] += line;
          });
        }

      if ((index < chars.length - 1)) {
          resultLines.forEach((_line, i) => {
            resultLines[i] += ' '
          });
      }
  });
  resultLines.forEach(line => console.log(line));
}

function formatDateWithStars(day, mounth, year) {
  drawNumber(`${day}.${mounth}.${year}`);
}

function ask(query) {
  return new Promise((resolve) => {
    inputOutput.question(query, (answer) => resolve(answer.trim()));
  });
}

  try {
    const dayStr = await ask('Введите день рождения (1‑31): ');
    const monthStr = await ask('Введите месяц рождения (1‑12): ');
    const yearStr = await ask('Введите год рождения (например 1990): ');

    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (
      !Number.isInteger(day)   || day   < 1 || day   > 31 ||
      !Number.isInteger(month) || month < 1 || month > 12 ||
      !Number.isInteger(year)  || year  < 1 || year > new Date().getFullYear()
    ) {
      throw new Error('Введены некорректные данные даты.');
    }

    const dayOfWeek = getDayOfWeek(day, month, year);
    const leap = isLeapYear(year);
    const age = getCurrentAge(day, month, year);

    console.log('\n--- Результат ---');
    console.log(`День недели            : ${dayOfWeek}`);
    console.log(`Год ${year} ${leap ? 'високосный' : 'не високосный'}.`);
    console.log(`Текущий возраст        : ${age} ${age === 1 ? 'год' : 'лет'}`);
    console.log(`Дата рождения:\n ${formatDateWithStars(dayStr, monthStr, yearStr)}`);
  } catch (err) {
    console.error('Ошибка:', err.message);
  } finally {
    inputOutput.close();
  }

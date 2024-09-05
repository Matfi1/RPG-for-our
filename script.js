const codes = [
    "CODE123",
    "CODE456",
    "CODE789",
    "CODE101",
    "CODE202"
];

let usedCodes = [];

document.addEventListener('DOMContentLoaded', function() {
    const rouletteWheel = document.getElementById('rouletteWheel');
    const spinButton = document.getElementById('spinButton');
    const wonCodeElement = document.getElementById('wonCode');
    const codeElement = document.getElementById('code');

    // Создаем сегменты рулетки
    const numSegments = codes.length;
    const anglePerSegment = 360 / numSegments;

    for (let i = 0; i < numSegments; i++) {
        const segment = document.createElement('div');
        segment.style.transform = `rotate(${anglePerSegment * i}deg)`;
        segment.style.backgroundColor = i % 2 === 0 ? '#3498db' : '#ecf0f1';
        segment.style.height = '50%';
        segment.style.width = '100%';
        segment.style.position = 'absolute';
        segment.style.clipPath = 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)';
        rouletteWheel.appendChild(segment);
    }

    spinButton.addEventListener('click', function() {
        if (usedCodes.length >= codes.length) {
            alert('Все коды уже использованы!');
            return;
        }

        // Обновляем визуально рулетку
        const rotationDegrees = 360 * 3 + Math.floor(Math.random() * 360);
        rouletteWheel.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
        rouletteWheel.style.transform = `rotate(${rotationDegrees}deg)`;

        // Ждем завершения анимации и показываем результат
        setTimeout(function() {
            // Выбираем случайный бонус-код, который еще не использован
            let code;
            do {
                code = codes[Math.floor(Math.random() * codes.length)];
            } while (usedCodes.includes(code));

            // Показываем выигранный бонус-код
            usedCodes.push(code);
            wonCodeElement.classList.remove('hidden');
            codeElement.textContent = code;

            // Деактивируем кнопку после использования кода
            spinButton.disabled = true;
            spinButton.textContent = "Код использован";
        }, 3000);
    });

    // Плавная анимация появления секций при скролле
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add('visible');
            }
        });
    });

    // Плавный скролл при клике на элементы навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

var id = null;
function myMove() {
    var elem = document.getElementById("myAnimation");
    var pos = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
        }
    }
}
function animate({ timing, draw, duration }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);
        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function linear(timeFraction) {
    return timeFraction;
}

function draw(progress) {
    train.style.left = progress * 100 + 'px';
}

animate({
    duration: 1000,
    timing: linear,
    draw: draw
});

document.addEventListener('DOMContentLoaded', function () {
    const text = " Saya Fernandi Khoirul Rosyid";
    const element = document.getElementById('typewriter');
    const container = document.getElementById('typewriter-container');
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
      if (isDeleting) {
        element.textContent = text.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
      } else {
        element.textContent = text.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }

      if (element.textContent.length > 0) {
        element.style.animation = 'blink-caret 0.75s step-end infinite';
        element.style.borderRight = '2px solid rgba(255, 255, 255, 0.75)';
      } else {
        element.style.animation = 'none';
        element.style.borderRight = 'none';
      }

      if (!isDeleting && charIndex === text.length) {
        typingSpeed = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingSpeed = 500;
      }

      setTimeout(typeWriter, typingSpeed);
    }

    setTimeout(typeWriter, 100);
  });
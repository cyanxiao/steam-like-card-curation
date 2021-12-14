let card = document.getElementById("card");

let rect = card.getBoundingClientRect();
let centerX = rect.left + rect.width / 2;
let centerY = rect.top + rect.height / 2;

let threshold = 20;

window.addEventListener("resize", function (event) {
  rect = card.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;
  console.log(centerX, centerY);
})

function rotate(cursorPosition, centerPosition, threshold = 20) {
  if (cursorPosition - centerPosition >= 0) {
    return (cursorPosition - centerPosition) >= threshold ? threshold : (cursorPosition - centerPosition);
  } else {
    return (cursorPosition - centerPosition) <= -threshold ? -threshold : (cursorPosition - centerPosition);
  }
}

function brightness(cursorPositionY, centerPositionY, strength = 50) {
  return 1 - rotate(cursorPositionY, centerPositionY)/strength;
}

card.addEventListener("mousemove", function (event) {
  card.style.transform = `perspective(1000px)
  rotateY(${rotate(event.x, centerX)}deg)
  rotateX(${-rotate(event.y, centerY)}deg)`;
  card.style.width = `160px`;
  card.style.height = `213.3px`;
  card.style.filter = `brightness(${brightness(event.y, centerY)})`;
  card.style.boxShadow = `${-rotate(event.x, centerX)}px ${-rotate(event.y, centerY)}px 80px 0px rgba(48, 65, 0, 0.5)`;
})

card.addEventListener("mouseleave", function (event) {
  card.style.transform = `perspective(500px)`;
  card.style.width = `120px`;
  card.style.height = `160px`;
  card.style.filter = `brightness(1)`;
  card.style.boxShadow = `0 0 0 0 rgba(48, 65, 0, 0.5)`;
})
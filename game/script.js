import map from './map.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({ position, image }) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }
  draw() {
    // c.fillStyle = 'blue';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = 'yellow';
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

let lastKey = '';

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeHorizontal.png'),
          })
        );
        break;
      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeVertical.png'),
          })
        );
        break;
      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeCorner1.png'),
          })
        );
        break;
      case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeCorner2.png'),
          })
        );
        break;
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeCorner3.png'),
          })
        );
        break;
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeCorner4.png'),
          })
        );
        break;
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/block.png'),
          })
        );
        break;
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/capLeft.png'),
          })
        );
        break;
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/capRight.png'),
          })
        );
        break;
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets//capBottom.png'),
          })
        );
        break;
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/capTop.png'),
          })
        );
        break;
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeCross.png'),
          })
        );
        break;
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeConnectorTop.png'),
          })
        );
        break;
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeConnectorRight.png'),
          })
        );
        break;
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeConnectorBottom.png'),
          })
        );
        break;
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeConnectorLeft.png'),
          })
        );
        break;
      case '9':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i,
            },
            image: createImage('../assets/pipeConnectorDownwards.png'),
          })
        );
        break;
    }
  });
});

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (
    circle.position.y - circle.radius + circle.velocity.y <=
      rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >=
      rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >=
      rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <=
      rectangle.position.x + rectangle.width
  );
}

function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);

  if (keys.w.pressed && lastKey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: -5,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    }
  } else if (keys.a.pressed && lastKey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: -5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    }
  } else if (keys.s.pressed && lastKey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: 5,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    }
  } else if (keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 5,
              y: 0,
            },
          },
          rectangle: boundary,
        })
      ) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }

  boundaries.forEach((boundary) => {
    boundary.draw();
    if (circleCollidesWithRectangle({ circle: player, rectangle: boundary })) {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }
  });

  player.update();
}

animate();

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;
    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;
    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;
    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;
  }
});

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 's':
      keys.s.pressed = false;
      break;
    case 'd':
      keys.d.pressed = false;
      break;
  }
});

import Matter from 'matter-js';
// module aliases
const { Engine, Render, Runner, Bodies, World, Composite, Vertices } = Matter;

const font = [];
document
  .getElementById('jengyoung')?.querySelectorAll('path')
  .forEach(path => {
  font.push(Matter.Svg.pathToVertices(path));
});

Matter.Vertices.scale(font, 1.5, 1.5);
// create an engine
const engine = Engine.create();
engine.gravity.y = -0.5;

World.add(
  engine.world,
  Bodies.fromVertices(500, 120, font, {
    isStatic: true,
    render: { fillStyle: '#fafafa', strokeStyle: '#fafafa', lineWidth: 0 },
    wireframes: true,
  }),
);

// Renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: 940,
    height: 480,
    background: 'linear-gradient(#03001e, #7303c0)',
    wireframes: false,
  },
});

// Bodies
const { circle, fromVertices } = Bodies;

const star = Vertices.fromPath(
  '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38',
);

Vertices.scale(star, -0.1875, -0.1875);

const renderBodiesFigure = (x, cb, colors, verticesPath) => {
  if (typeof colors === 'string') {
    return cb(10 + x * 10, 500 + Math.random(100) * 2500, verticesPath || 4, {
      render: { fillStyle: colors, lineWidth: 1, strokeStyle: colors },
    })
  }
  console.warn('invalid params')
  return;
}

const makeResultBodies = () => {
  const resultBodies = [];
  for (let i = 0; i < 100; i += 1) {
    resultBodies.push(
      renderBodiesFigure(i, circle, '#F9C2EA'),
      renderBodiesFigure(i, circle, '#F9C2EA'),
      renderBodiesFigure(i, circle, '#F16FCE'),
      renderBodiesFigure(i, circle, '#F16FCE'),
      renderBodiesFigure(i, circle, '#B620BE'),
      renderBodiesFigure(i, fromVertices, '#fee433', star),
    );
  }
  return resultBodies;
}

const resultBodies = makeResultBodies();

// Composite
Composite.add(engine.world, [...resultBodies]);

// Run renderer
Render.run(render);

// Create runner
const runner = Runner.create();

// Run the engine
Runner.run(runner, engine);

setInterval(() => {
  const resultBodies = makeResultBodies();

  Composite.add(engine.world, [...resultBodies]);
}, 15000);

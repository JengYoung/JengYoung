import Matter from 'matter-js';
// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const World = Matter.World;
const Composite = Matter.Composite;
const Vertices = Matter.Vertices;

const font = [];
const letters = document.getElementById('jengyoung')?.querySelectorAll('path');
letters.forEach(path => {
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

// create a renderer
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

const star = Vertices.fromPath(
  '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38',
);

Matter.Vertices.scale(star, -0.1875, -0.1875);
const circles = [];
// create two boxes and a ground
for (let i = 0; i < 100; i += 1) {
  circles.push(
    Bodies.circle(10 + i * 10, 500 + Math.random(100) * 2500, 4, {
      render: { fillStyle: '#F9C2EA', lineWidth: 1, strokeStyle: '#F9C2EA' },
    }),
    Bodies.circle(10 + i * 10, 500 + Math.random(100) * 2500, 4, {
      render: { fillStyle: '#F16FCE', lineWidth: 1, strokeStyle: '#F16FCE' },
    }),
    Bodies.circle(10 + i * 10, 500 + Math.random(100) * 2500, 4, {
      render: { fillStyle: '#F9C2EA', lineWidth: 1, strokeStyle: '#F9C2EA' },
    }),
    Bodies.circle(10 + i * 10, 500 + Math.random(100) * 2500, 4, {
      render: { fillStyle: '#F16FCE', lineWidth: 1, strokeStyle: '#F16FCE' },
    }),
    Bodies.circle(10 + i * 10, 500 + Math.random(100) * 2500, 4, {
      render: { fillStyle: '#B620BE', lineWidth: 1, strokeStyle: '#B620BE' },
    }),
    Bodies.fromVertices(10 + i * 10, 500 + Math.random(100) * 2500, star, {
      render: { fillStyle: '#fee433', lineWidth: 1, strokeStyle: '#fee433' },
    }),
  );
}

// add all of the bodies to the world
Composite.add(engine.world, [...circles]);
// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// setInterval(() => {
//   const circles = [];
//   for (let i = 0; i < 100; i += 1) {
//     circles.push(
//       Bodies.fromVertices(10 + i * 10, 500 + Math.random(100) * 5000, star, {
//         render: { fillStyle: '#fee433', lineWidth: 1, strokeStyle: '#fee433' },
//       }),
//       Bodies.circle(10 + i * 10, 500 + Math.random(100) * 5000, 4, {
//         render: { fillStyle: '#fee433', lineWidth: 1, strokeStyle: '#fee433' },
//       }),
//       Bodies.rectangle(10 + i * 10, 500 + Math.random(100) * 5000, 12, 12, {
//         render: { fillStyle: '#fee433', lineWidth: 1, strokeStyle: '#fee433' },
//       }),
//     );
//   }
//   Composite.add(engine.world, [...circles]);
// }, 15000);

const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Mouse,
  MouseConstraint,
  Constraint,
  Events
} = Matter;

const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
  canvas,
  engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "#cfeef7"
  }
});

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

const statusEl = document.getElementById("status");
document.getElementById("resetBtn").addEventListener("click", resetLevel);

let sling;
let projectile;
let junkBots = [];
let blocks = [];
let hasLaunched = false;

const ground = Bodies.rectangle(
  window.innerWidth / 2,
  window.innerHeight - 20,
  window.innerWidth,
  40,
  { isStatic: true, render: { fillStyle: "#6b8e23" } }
);

const leftWall = Bodies.rectangle(-20, window.innerHeight / 2, 40, window.innerHeight, {
  isStatic: true
});

const rightWall = Bodies.rectangle(window.innerWidth + 20, window.innerHeight / 2, 40, window.innerHeight, {
  isStatic: true
});

const anchor = { x: 170, y: window.innerHeight - 160 };

World.add(world, [ground, leftWall, rightWall]);

function createProjectile() {
  projectile = Bodies.circle(anchor.x, anchor.y, 22, {
    density: 0.004,
    restitution: 0.6,
    render: { fillStyle: "#8b5cf6" }
  });

  sling = Constraint.create({
    pointA: anchor,
    bodyB: projectile,
    stiffness: 0.06,
    length: 0,
    render: {
      strokeStyle: "#5b3a29",
      lineWidth: 6
    }
  });

  World.add(world, [projectile, sling]);
}

function createBlock(x, y, w, h, color, options = {}) {
  const block = Bodies.rectangle(x, y, w, h, {
    density: options.density || 0.002,
    friction: 0.8,
    restitution: 0.1,
    render: { fillStyle: color }
  });
  blocks.push(block);
  World.add(world, block);
  return block;
}

function createJunkBot(x, y) {
  const bot = Bodies.circle(x, y, 20, {
    density: 0.002,
    render: { fillStyle: "#4ade80" },
    label: "junkBot"
  });
  junkBots.push(bot);
  World.add(world, bot);
  return bot;
}

function createLevel() {
  blocks = [];
  junkBots = [];
  hasLaunched = false;
  statusEl.textContent = "Destroy all junk-bots!";

  // Tower base
  createBlock(850, window.innerHeight - 60, 140, 20, "#7c5a3a");
  createBlock(980, window.innerHeight - 60, 140, 20, "#7c5a3a");

  // Vertical supports
  createBlock(820, window.innerHeight - 140, 20, 140, "#b07d4f");
  createBlock(880, window.innerHeight - 140, 20, 140, "#b07d4f");
  createBlock(950, window.innerHeight - 140, 20, 140, "#9bdaf1");
  createBlock(1010, window.innerHeight - 140, 20, 140, "#9bdaf1");

  // Top beams
  createBlock(850, window.innerHeight - 220, 120, 20, "#c9c9c9", { density: 0.004 });
  createBlock(980, window.innerHeight - 220, 120, 20, "#c9c9c9", { density: 0.004 });

  // Second tier
  createBlock(915, window.innerHeight - 300, 180, 20, "#7c5a3a");
  createBlock(900, window.innerHeight - 370, 20, 120, "#9bdaf1");
  createBlock(960, window.innerHeight - 370, 20, 120, "#9bdaf1");
  createBlock(930, window.innerHeight - 440, 120, 20, "#c9c9c9", { density: 0.004 });

  // Enemies
  createJunkBot(850, window.innerHeight - 260);
  createJunkBot(980, window.innerHeight - 260);
  createJunkBot(930, window.innerHeight - 480);
}

function resetProjectileIfNeeded() {
  if (!hasLaunched) return;

  const speed = Math.sqrt(projectile.velocity.x ** 2 + projectile.velocity.y ** 2);
  const outOfBounds =
    projectile.position.x < -100 ||
    projectile.position.x > window.innerWidth + 100 ||
    projectile.position.y > window.innerHeight + 100;

  if ((speed < 0.2 && projectile.position.y > window.innerHeight - 60) || outOfBounds) {
    World.remove(world, projectile);
    World.remove(world, sling);
    createProjectile();
    hasLaunched = false;
  }
}

function removeDefeatedBots() {
  junkBots = junkBots.filter(bot => {
    if (bot.position.y > window.innerHeight + 100) {
      World.remove(world, bot);
      return false;
    }
    return true;
  });

  if (junkBots.length === 0) {
    statusEl.textContent = "You win! 🌟";
  }
}

Events.on(engine, "afterUpdate", () => {
  if (
    projectile &&
    sling &&
    !hasLaunched &&
    (Math.abs(projectile.position.x - anchor.x) > 35 ||
      Math.abs(projectile.position.y - anchor.y) > 35)
  ) {
    hasLaunched = true;
    setTimeout(() => {
      sling.bodyB = null;
    }, 100);
  }

  resetProjectileIfNeeded();
  removeDefeatedBots();
});

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    stiffness: 0.03,
    render: { visible: false }
  }
});

World.add(world, mouseConstraint);
render.mouse = mouse;

function resetLevel() {
  if (projectile) World.remove(world, projectile);
  if (sling) World.remove(world, sling);

  blocks.forEach(block => World.remove(world, block));
  junkBots.forEach(bot => World.remove(world, bot));

  blocks = [];
  junkBots = [];

  createProjectile();
  createLevel();
}

createProjectile();
createLevel();

window.addEventListener("resize", () => {
  location.reload();
});
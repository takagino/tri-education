// Esta lista guarda as pequenas partículas que formam o disco brilhante.
const diskParticles = [];

// A função setup() é executada uma vez no início do programa.
function setup() {
    createCanvas(600, 400); // Cria uma tela com 600 pixels de largura e 400 de altura.
    colorMode(HSB, 360, 100, 100, 100); // Organiza as cores por matiz, saturação, brilho e transparência.
    angleMode(RADIANS); // Usa radianos para calcular os ângulos das formas.
    noStroke(); // Desativa os contornos das formas.

    // Cria 520 partículas com posições e aparências aleatórias.
    for (let i = 0; i < 520; i++) {
        diskParticles.push({
            angle: random(TWO_PI), // Posição inicial da partícula ao redor do centro.
            radius: random(76, 190), // Distância da partícula até o centro.
            speed: random(0.002, 0.012), // Velocidade com que ela gira.
            size: random(0.7, 2.8), // Tamanho da partícula.
            hue: random() < 0.7 ? random(15, 42) : random(185, 215), // Escolhe uma cor quente ou azulada.
            alpha: random(35, 95), // Transparência da partícula.
            noiseOffset: random(1000) // Valor diferente para cada partícula usar no noise().
        });
    }
}

// A função draw() é repetida muitas vezes por segundo para criar a animação.
function draw() {
    // O último valor é o Alpha: a tela escura fica transparente e cria rastros no movimento.
    background(230, 35, 2, 16);

    const centerX = width / 2; // Calcula a posição horizontal do centro da tela.
    const centerY = height / 2; // Calcula a posição vertical do centro da tela.

    // push() guarda as configurações; translate() leva a origem ao centro da tela.
    push();
    translate(centerX, centerY);
    rotate(-0.12 + sin(frameCount * 0.01) * 0.025); // Gira e inclina suavemente o disco.
    drawAccretionDisk(); // Desenha o anel de matéria que gira ao redor do buraco negro.
    pop(); // pop() restaura as configurações anteriores.

    drawBlackHole(centerX, centerY); // Desenha o buraco negro por cima do disco.
}

// Desenha o disco de acreção: gás e poeira brilhantes girando ao redor do buraco negro.
function drawAccretionDisk() {
    push(); // Guarda as configurações atuais para restaurá-las depois.
    // scale() achata os círculos; sin() faz a forma respirar um pouco.
    scale(1, 0.34 + sin(frameCount * 0.012) * 0.015);
    noFill(); // Desenha apenas os contornos dos círculos abaixo.

    // Desenha círculos transparentes para criar o brilho do disco.
    for (let i = 0; i < 9; i++) {
        const diameter = 150 + i * 19; // Aumenta o tamanho de cada círculo.
        const hue = 24 + i * 2 + sin(frameCount * 0.015 + i) * 5; // Faz a cor variar suavemente.
        stroke(hue, 95, 100, 4 + (8 - i) * 0.7); // Define a cor e a transparência do contorno.
        strokeWeight(18 - i * 1.25); // Define a espessura de cada contorno.
        ellipse(0, 0, diameter, diameter); // Desenha um círculo ao redor do centro.
    }

    strokeWeight(2); // Deixa os arcos finos.
    // Desenha pequenos arcos para dar detalhes e sensação de movimento.
    for (let i = 0; i < 7; i++) {
        const radius = 88 + i * 13; // Cada arco fica em uma distância diferente do centro.
        const start = frameCount * (0.004 + i * 0.0003) + i * 1.7; // Faz os arcos girarem com o tempo.
        stroke(i % 2 === 0 ? 32 : 195, 75, 100, 34); // Alterna entre tons quentes e azulados.
        arc(0, 0, radius * 2, radius * 2, start, start + 1.45, OPEN); // Desenha o primeiro arco.
        arc(0, 0, radius * 2, radius * 2, start + 2.3, start + 3.1, OPEN);
    }

    noStroke(); // Remove o contorno antes de desenhar as partículas.
    // Atualiza e desenha cada partícula do disco.
    for (const particle of diskParticles) {
        particle.angle += particle.speed; // Avança um pouco o ângulo para a partícula girar.
        // noise() cria uma variação suave e irregular, como gás se movendo no espaço.
        const movement = map(
            noise(particle.noiseOffset, frameCount * 0.006),
            0,
            1,
            -7,
            7
        );
        const currentRadius = particle.radius + movement; // Ajusta um pouco a distância da partícula.
        const x = cos(particle.angle) * currentRadius; // cos() calcula a posição horizontal da órbita.
        const y = sin(particle.angle) * currentRadius; // sin() calcula a posição vertical da órbita.
        const fade = constrain(map(particle.radius, 76, 190, 0.25, 1), 0.25, 1); // Ajusta a transparência pela distância.
        fill(particle.hue, 75, 100, particle.alpha * fade); // Escolhe a cor e a transparência da partícula.
        circle(x, y, particle.size); // Desenha a partícula como um pequeno círculo.
    }
    pop(); // Restaura as configurações anteriores.
}

// Desenha o centro escuro do buraco negro e os anéis de luz ao redor dele.
function drawBlackHole(x, y) {
    noStroke(); // Desativa os contornos das formas.

    // Vários círculos transparentes criam um halo brilhante.
    for (let i = 9; i >= 0; i--) {
        fill(24, 95, 100, 2.2); // Escolhe um tom laranja com bastante transparência.
        circle(x, y, 116 + i * 8 + sin(frameCount * 0.025 + i) * 2); // Desenha um círculo do halo.
    }

    noFill(); // Deixa os próximos círculos sem preenchimento.
    stroke(36, 28, 100, 82); // Define a cor do anel claro mais interno.
    strokeWeight(2); // Define a espessura desse anel.
    circle(x, y, 118 + sin(frameCount * 0.035) * 1.5); // Anima levemente o tamanho do anel.
    stroke(195, 45, 100, 45); // Define a cor azulada do anel externo.
    strokeWeight(1); // Deixa o anel externo mais fino.
    circle(x, y, 126); // Desenha o anel externo.

    noStroke(); // Retira o contorno antes de desenhar o centro.
    fill(230, 35, 4); // Escolhe um tom quase preto para a borda do centro.
    circle(x, y, 108); // Desenha a parte escura central.
    fill(230, 25, 2); // Escolhe um tom ainda mais escuro.
    circle(x, y, 94); // Desenha o centro do buraco negro.
}

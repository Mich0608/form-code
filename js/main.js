// source for finding distance between mouse and line:
// https://editor.p5js.org/solub/sketches/JkjZA2ZOS
let x = innerWidth / 2
let y = innerHeight / 2
let xs = []
let ys = []
let vs = []
let ds = []
let c = 0
let dx = 10
let dy = 10
let click = 0
let radius = 0


function setup() {
    createCanvas(innerWidth, innerHeight);

    for (let i = 0; i < 100; i++) {
        xs.push(random(0, width))
        ys.push(random(0, height))
    }

}

function drawStir(i) {
    if (ds[i] < 20) {
        if(ys[i] > height / 2) dy = -dy
        if(xs[i] > width / 2) dx = -dx
        xs[i] += dx
        ys[i] += dy
    }
}

function draw() {
    background(0, 0, 0)
    frameRate(20)
    stroke(220)
    fill(0, 0, 0, 0)
    strokeWeight(2)
    ellipse(x, y, 500)
    strokeWeight(5)
    for (let i = 0; i < 100; i++) {
        if(click % 3 == 0){
            stroke(random(100, 255), random(100, 255), random(100, 255))

            a = createVector(x, y);
            vs[i] = createVector(xs[i], ys[i]);
            line(a.x, a.y, vs[i].x, vs[i].y)
    
            getDistFromMouse(a, vs[i], i)
    
            drawStir(i)
        }
        else if(click % 3 == 1){
            fill(0, 0, 0, 5)
            frameRate(10)
            stroke(random(100, 255), random(100, 255), random(100, 255))
            let inc = 0
            inc += 0.25
            let p1x = cos(inc * 0.25) * 10 + xs[i]
            let p1y = sin(inc * 0.25) * 10 + ys[i]
            let p2x = acos(inc * 0.25) * 10 + random(0, width)
            let p2y = asin(inc * 0.25) * 10 + random(0, height)
            bezier(x, y, p1x, p1y, p2x, p2y, mouseX, mouseY)
        }
        else if(click % 3 == 2){
            fill(0, 0, 0, 5)
            frameRate(20)
            stroke(random(100, 255), random(100, 255), random(100, 255))
            let inc = 0
            inc += 0.25
            let p1x = cos(inc * 0.25) * 10 + xs[i]
            let p1y = sin(inc * 0.25) * 10 + ys[i]
            let p2x = acos(inc * 0.25) * 10 + random(0, width)
            let p2y = asin(inc * 0.25) * 10 + random(0, height)
            if(dist(p2x, p2y, p1x, p1y) < 20) bezier(x, y, p1x, p1y, p2x, p2y, mouseX, mouseY)
        }
    }

}

function mouseClicked() {
    click++
}

function getDistFromMouse(v1, v2, i) {
    let p = createVector(mouseX, mouseY);
    let op = orthogonalProjection2(v1, v2, p);
    ds[i] = p5.Vector.dist(p, op);
}


function orthogonalProjection1(a, b, p) {

    // find nearest point along a LINE

    d1 = p5.Vector.sub(b, a).normalize()
    d2 = p5.Vector.sub(p, a)

    d1.mult(d2.dot(d1))

    return p5.Vector.add(a, d1)

}


function orthogonalProjection2(a, b, p) {

    // find nearest point along a SEGMENT 

    d1 = p5.Vector.sub(b, a);
    d2 = p5.Vector.sub(p, a);
    l1 = d1.mag();

    dotp = constrain(d2.dot(d1.normalize()), 0, l1);

    return p5.Vector.add(a, d1.mult(dotp))

}
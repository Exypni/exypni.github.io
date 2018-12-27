var canvas = document.getElementById('canvas'),
   can_w = parseInt(canvas.getAttribute('width')),
   can_h = parseInt(canvas.getAttribute('height')),
   ctx = canvas.getContext('2d');

// console.log(typeof can_w);

var ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      alpha: 1,
      phase: 0,
      letter: 'A'
   },
   ball_color = {
       r: 93,
       g: 124,
       b: 130
   },
   R = 2,
   balls = [],
   alpha_f = 0.03,
   alpha_phase = 0,
    
// Line
   link_line_width = 0.8,
   dis_limit = 260,
   add_mouse_point = true,
   mouse_in = false,
   mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'
   },

   old_mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      type: 'mouse'};

let letters = ['Α', 'α', 'Β', 'β', 'Γ', 'γ', 'Δ', 'δ', 'Ε', 'ε', 'Ζ', 'ζ', 'Η', 'η', 'Θ', 'θ', 'Ι', 'ι',
     'Κ', 'κ', 'Λ', 'λ', 'Μ', 'μ', 'Ν', 'ν', 'Ξ', 'ξ', 'Ο', 'ο', 'Π', 'π', 'Ρ', 'ρ', 'Σ', 'σ', 'ς', 'Τ',
      'τ', 'Υ', 'υ', 'Φ', 'φ', 'Χ', 'χ', 'Ψ', 'ψ', 'Ω', 'ω'];

// Random speed
function getRandomSpeed(pos){
    var  min = -1,
       max = 1;
    switch(pos){
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max){
    return Math.random()*(max - min) + min;
}

// Random Ball
function getRandomBall(){
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);

    radius = R;
    radius = randomIntBetween(1, 4);

    letterIndex = randomIntBetween(0, letters.length - 1);
    l = letters[letterIndex];

    switch(pos){
        case 'top':
            return {
                x: randomSidePos(can_w),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: radius,
                alpha: 1,
                phase: randomNumFrom(0, 10),
                letter: l
            }
            break;
        case 'right':
            return {
                x: can_w + R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: radius,
                alpha: 1,
                phase: randomNumFrom(0, 10),
                letter: l
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(can_w),
                y: can_h + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: radius,
                alpha: 1,
                phase: randomNumFrom(0, 10),
                letter: l
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: radius,
                alpha: 1,
                phase: randomNumFrom(0, 10),
                letter: l
            }
            break;
    }
}
function randomSidePos(length){
    return Math.ceil(Math.random() * length);
}

function randomIntBetween(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min) * 1.0;
}

// Draw Ball
function renderBalls(){
    Array.prototype.forEach.call(balls, function(b){
      if(!b.hasOwnProperty('type')){
           //ctx.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
           //ctx.beginPath();
           //ctx.arc(b.x, b.y, b.r, 0, Math.PI*2, true);
           //ctx.closePath();
           //ctx.fill();
           ctx.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
           ctx.font = (b.r * 8) + 'px Roboto';
           ctx.textBaseline = 'alphabetic';
           ctx.fillText(b.letter, b.x, b.y);
       }
    });
}

// Update balls
function updateBalls(){


    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        reduce_movement = randomIntBetween(8, 100);
        //reduce_movement = (1/Math.pow(b.r, 2) * 1.0) * 100.0;

        b.x += b.vx// + (mouse_ball.x - old_mouse_ball.x) / reduce_movement;
        b.y += b.vy// + (mouse_ball.y - old_mouse_ball.y) / reduce_movement;
        
        if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h+50)){
           new_balls.push(b);
        }
        
        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });
    
    balls = new_balls.slice(0);
}

// loop alpha
function loopAlphaInf(){
    
}

// Draw lines
function renderLines(){
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
           
           fraction = getDisOf(balls[i], balls[j]) / dis_limit;
            
           if(fraction < 1){
               alpha = (1 - fraction).toString();

               ctx.strokeStyle = 'rgba(148,172,177,'+alpha+')';
               ctx.lineWidth = link_line_width;
               
               ctx.beginPath();
               ctx.moveTo(balls[i].x, balls[i].y);
               ctx.lineTo(balls[j].x, balls[j].y);
               ctx.stroke();
               ctx.closePath();
           }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2){
    var  delta_x = Math.abs(b1.x - b2.x),
       delta_y = Math.abs(b1.y - b2.y);
    
    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
}

// add balls if there a little balls
function addBallIfy(){
    if(balls.length < 35){
        balls.push(getRandomBall());
    }
}

function updateMouseDisplacement() {
  old_mouse_ball.x = mouse_ball.x;
  old_mouse_ball.y = mouse_ball.y;
}

// Render
function render(){
    ctx.clearRect(0, 0, can_w, can_h);

    renderBalls();
    
    //renderLines();
    
    updateBalls();
    
    addBallIfy();
    
    window.requestAnimationFrame(render);

    updateMouseDisplacement();
}

// Init Balls
function initBalls(num){
    for(var i = 1; i <= num; i++){
      letterIndex = randomIntBetween(0, letters.length - 1);
      l = letters[letterIndex];

      balls.push({
          x: randomSidePos(can_w),
          y: randomSidePos(can_h),
          vx: getRandomSpeed('top')[0],
          vy: getRandomSpeed('top')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
          letter: l
      });
    }
}
// Init Canvas
function initCanvas(){
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);
    
    can_w = parseInt(canvas.getAttribute('width'));
    can_h = parseInt(canvas.getAttribute('height'));
}
window.addEventListener('resize', function(e){
    console.log('Window Resize...');
    initCanvas();
});

function goMovie(){
    initCanvas();
    initBalls(30);
    window.requestAnimationFrame(render);
}
goMovie();
// Mouse effect
canvas.addEventListener('mouseenter', function(e){
    console.log('mouseenter');
    
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;

    old_mouse_ball.x = e.pageX;
    old_mouse_ball.y = e.pageY;

    mouse_in = true;
    balls.push(mouse_ball);

    
});

canvas.addEventListener('mouseleave', function(){
    console.log('mouseleave');
    mouse_in = false;
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b){
        if(!b.hasOwnProperty('type')){
            new_balls.push(b);
        }
    });
    balls = new_balls.slice(0);
});
canvas.addEventListener('mousemove', function(e){
    var e = e || window.event;
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
    // console.log(mouse_ball);
});
















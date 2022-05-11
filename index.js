// Import express, define the port, host, path and prometheus
const express = require('express')
const app = express()
const port = 3001
const host = '0.0.0.0'
const path = require('path');
const promMid = require('express-prometheus-middleware');

// Define the Pis
const pigpio = require('pigpio-client').pigpio({host: '192.168.0.24'});
const pigpio2 = require('pigpio-client').pigpio({host: '192.168.0.10'});

// Connect to the Pis
const ready = new Promise((resolve, reject) => {
  pigpio.once('connected', resolve);
  pigpio.once('error', reject);
  pigpio2.once('connected', resolve);
  pigpio2.once('error', reject);
  
});

// Define prometheus Metrics
app.use(promMid({
   metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

// Add static directory
app.use(express.static(__dirname + "/static"));

// Define the motors, LED eyes, PWM pins and Servo Arm
ready.then(async (info) => {
  console.log(JSON.stringify(info,null,2));
  // Define Linus
  const en1 = pigpio.gpio(12);
  const en2 = pigpio.gpio(26);
  const in1 = pigpio.gpio(13);
  const in2 = pigpio.gpio(21);
  const in3 = pigpio.gpio(17);
  const in4 = pigpio.gpio(27);
  const linus_eye = pigpio.gpio(16);
  // Servo arm
  const servo = pigpio.gpio(22);
  const servo2 = pigpio.gpio(23);
  // Define torvalds
  const pin1 = pigpio2.gpio(7);
  const pin2 = pigpio2.gpio(8);
  const pin3 = pigpio2.gpio(9);
  const pin4 = pigpio2.gpio(10);
  const torvalds_eye = pigpio2.gpio(25);
  // Linus movement
  app.get('/forward', (req, res) => {
     in1.write(1);
     in2.write(0);
     in3.write(1);
     in4.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
  app.get('/backward', (req, res) => {
     in1.write(0);
     in2.write(1);
     in3.write(0);
     in4.write(1);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/left', (req, res) => {
     in1.write(0);
     in2.write(1);
     in3.write(1);
     in4.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/right', (req, res) => {
     in1.write(1);
     in2.write(0);
     in3.write(0);
     in4.write(1);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
    app.get('/stop', (req, res) => {
     in1.write(0);
     in2.write(0);
     in3.write(0);
     in4.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
    // Linus eye blink
   app.get('/eyeon', (req, res) => {
     linus_eye.write(1);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/eyeoff', (req, res) => {
     linus_eye.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
    // Servo arm
   app.get('/min', (req, res) => {
     servo.setServoPulsewidth(1000);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/mid', (req, res) => {
     servo.setServoPulsewidth(1500);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/max', (req, res) => {
     servo.setServoPulsewidth(2000);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/min2', (req, res) => {
     servo2.setServoPulsewidth(1000);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/mid2', (req, res) => {
     servo2.setServoPulsewidth(1500);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/max2', (req, res) => {
     servo2.setServoPulsewidth(2000);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
    // PWM control
    app.get('/half', (req, res) => {
     en1.analogWrite(128);
     en2.analogWrite(128);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
    app.get('/full', (req, res) => {
     en1.analogWrite(255);
     en2.analogWrite(255);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   // Torvalds movement
   app.get('/north', (req, res) => {
     pin1.write(0);
     pin2.write(1);
     pin3.write(1);
     pin4.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/south', (req, res) => {
     pin1.write(1);
     pin2.write(0);
     pin3.write(0);
     pin4.write(1);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/west', (req, res) => {
     pin1.write(1);
     pin2.write(0);
     pin3.write(1);
     pin4.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/east', (req, res) => {
     pin1.write(0);
     pin2.write(1);
     pin3.write(0);
     pin4.write(1);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/stop2', (req, res) => {
     pin1.write(0);
     pin2.write(0);
     pin3.write(0);
     pin4.write(0);
     res.sendFile(path.join(__dirname+'/index.html'));
    });
    // Torvalds eye blink
   app.get('/torvaldson', (req, res) => {
     torvalds_eye.write(1)
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   app.get('/torvaldsoff', (req, res) => {
     torvalds_eye.write(0)
     res.sendFile(path.join(__dirname+'/index.html'));
    });
   
  
  
  
  
}).catch(console.error);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

// Run app on port 3001 and host 0.0.0.0
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port} and host ${host}`);
})

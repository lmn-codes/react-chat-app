const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const userdb = require('./db.json');

// create express server
const server = jsonServer.create();

// set default middleware
server.use(jsonServer.defaults());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const SECRET_KEY = '123456789';
const expiresIn = '1h';

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the password is correct
// success if password === username
function isAuthenticated({ username, password }) {
  return userdb.users.findIndex(user => user.name === username && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (isAuthenticated({ username, password }) === false) {
    const status = 401;
    const message = 'Incorrect password';
    res.status(status).json({ status, message });
    return;
  }
  const ACCESS_TOKEN = createToken({ username, password });
  res.status(200).json({ ACCESS_TOKEN });
});

// middleware: check auth header(jwt)
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  ) {
    const status = 401;
    const message = 'Bad authorization header';
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = 'Error: ACCESS_TOKEN is not valid';
    res.status(status).json({ status, message });
  }
});

server.listen(4000)

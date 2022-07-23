const jtw = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace(/^Bearer\s/, '');
    const user = jtw.verify(token, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).json({ error: 'Token not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};



exports.user_middleware = (req, res, next) => {
    if (req.user.role !== "user") {
      return res.status(400).json({ message: "User access denied" });
    }
    console.log(req.user);
    next();
  };

  

exports.admin_middleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "Admin access denied" });
      }
      next();
    }



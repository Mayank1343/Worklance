const authorizeRoles = (...roles) => {

  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {

      const error = new Error(
        `Role (${req.user.role}) is not allowed to access this resource`
      );

      error.statusCode = 403;

      return next(error);

    }

    next();

  };

};

export default authorizeRoles;
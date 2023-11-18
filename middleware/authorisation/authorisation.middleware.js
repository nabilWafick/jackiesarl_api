class AuthorisationMiddleware {
  static authorize = (permission) => {
    // console.log("In Authorization Middleware");
    return (req, res, next) => {
      //  console.log(Date.now());
      //  console.log("employee", req.employee);
      //  console.log("Employee permissions", req.employee.permissions);
      const employeePermissions = JSON.parse(req.employee.permissions);
      //   console.log("employeePermissions", employeePermissions);

      if (employeePermissions[permission] || employeePermissions["admin"]) {
        //  console.log("Have permission", employeePermissions[permission]);
        next();
      } else {
        //   console.log("Have permission", employeePermissions[permission]);
        res.status(403).json({
          status: 403,
          error: "Autorisation ou Permission non accordée",
        });
      }
    };
  };
}

module.exports = AuthorisationMiddleware;

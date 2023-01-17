// not sure how to integrate with current project yet... middleware that was used in server.js in mobile hour
// put it in controller.js files just like auth.js?
export default function access_control(allowed_roles) {
    return function (request, response, next) {
      if (request.session.user != null) {
        if (allowed_roles.includes(request.session.user.role)) {
          next();
        } else {
          response.status(403).json("403 - Incorrect Access Role");
        }
      } else {
        response.status(401).json("401 - Client not logged in");
      }
    };
  }
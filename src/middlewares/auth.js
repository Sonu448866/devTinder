const adminAuth = (req, res) => {
  // Check if the rquest is actually made by admin
  // If authorized then only do next()
  //Else send 401 status ad res.status(401).send("Unauthorized")

  const token = "xyz";
  const isAdminAuthorized = token === "xyx";

  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res) => {
  // Check if the rquest is actually made by user
  // If authorized then only do next()
  //Else send 401 status ad res.status(401).send("Unauthorized")

  const token = "xyz";
  const isUserAuthorized = token === "xyx";

  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth: adminAuth,
  userAuth: userAuth,
};

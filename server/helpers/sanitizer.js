module.exports = function sanitizer(user) {
  const { password, hash, ...sanitizedUser } = user;
  return sanitizedUser;
};

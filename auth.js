(function () {
  const auth = window.MLL?.auth;
  if (!auth) return;

  window.MLL.requireAuth = function () {
    auth.onAuthStateChanged((user) => {
      if (!user) window.location.href = "index.html";
    });
  };

  window.MLL.redirectIfAuthed = function () {
    auth.onAuthStateChanged((user) => {
      if (user) window.location.href = "dashboard.html";
    });
  };

  window.MLL.login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  window.MLL.signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  window.MLL.logout = () => auth.signOut();

  window.MLL.currentUser = () => auth.currentUser;
})();

const auth0 = await createAuth0Client({
 domain: "dev-iahzbt8xjj0gs5t0.us.auth0.com",
 client_id: "g4ZZoMa6MMZAhS3it4OF2pmwSVyogImn",
 cacheLocation: 'localstorage' // optional, keeps user logged in
});
// Check login status
if (window.location.search.includes("code=")) {
 await auth0.handleRedirectCallback();
 window.history.replaceState({}, document.title, "/");
}
const user = await auth0.getUser();
if (user) {
 document.getElementById("profile").textContent = JSON.stringify(user, null, 2);
}
// Login
document.getElementById("login").onclick = () => {
 auth0.loginWithRedirect({
   redirect_uri: window.location.origin
 });
};
// Logout
document.getElementById("logout").onclick = () => {
 auth0.logout({
   returnTo: window.location.origin
 });
};
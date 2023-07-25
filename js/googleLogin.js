 
 let googleUser
 
 // Decode TWT token
 function decodeJWT(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }
    const header = JSON.parse(atob(parts[0]));
    const user = JSON.parse(atob(parts[1]));
    return { header, user };
  }
  function googleLogin(response) {
    googleUser = decodeJWT(response.credential);
    email = googleUser.user.email;
    avatar = googleUser.user.picture;
    console.log("email: "+ email)
    console.log("avatar: "+avatar)
    setAvatar()
    sendRequest("SELECT_User")
    //document.getElementById("g_id_onload").style.display = "none";
  }


import { loginUser, registerUser, logoutUser,refreshSession } from "../services/auth.service.js";
export async function registerController(req,res){

    const user = await registerUser(req.body);
    res.status(201).json({
    message: "Successfully registered a user!",
    data: user,
});
};

export async function loginController(req,res){
    const session = await loginUser(req.body.email , req.body.password);
    res.cookie("sessionId", session.id, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
      res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
   console.log(session);
   res.json({
    status:200,
    message: "User login successfully",
    data:{
        accessToken: session.accessToken
    }
   });
   

};

export async function logoutController(req,res){
   const {sessionId} = req.cookies;
    if(typeof sessionId !="undefined"){
        await logoutUser(sessionId);
    }
    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");
    res.status(204).end();
    
};
export async function refreshController(req,res){
    const {sessionId,refreshToken} = req.cookies;
    const session = await refreshSession(sessionId, refreshToken);
 res.cookie("sessionId", session.id, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
      res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: session.refreshTokenValidUntil,
    });
   res.json({
    status:200,
    message: "Successfully refreshed a session!",
    data:{
        accessToken: session.accessToken
    }
   });
}
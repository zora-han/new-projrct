//lixiaomin
//=============================================================================
// user validate,user info
//=============================================================================

//cookie项
jetsennet.UserCookieItems = ["UserId", "LoginId", "UserName", "UserToken", "ColumnId", "HomePath", "UserType", "RightLevel", "UserGroups", "UserRoles", "PageTheme", "AreaId", "CheckinType"];

jetsennet.UserProfile = function () {
    this.__typeName = "jetsennet.UserProfile";
    //UserId
    this.UserId = "";
    //LoginId
    this.LoginId = "";
    //UserName
    this.UserName = "";
    //UserToken
    this.UserToken = "";
    //ColumnId
    this.ColumnId = "";
    this.UserGroups = "";
    this.UserRoles = "";
    //PersonId
    this.PersonId = "";
    //RightLevel
    this.RightLevel = "0";
    //UserType
    this.UserType = "0";
    //UserPath
    this.HomePath = "";
    //LoginTime
    this.LoginTime = new Date().toDateString();
    //PageInfo
    this.PageInfo = "";
    this.PageTheme = "";

    this.AreaId = "";
    this.CheckinType = "";
};
jetsennet.UserProfile.prototype.toXml = function () {
    var arrXml = [];
    arrXml.push("<UP>");
    arrXml.push("<UI>" + this.UserId + "</UI>");
    this.LoginId != null ? arrXml.push("<LI>" + jetsennet.xml.xmlEscape(this.LoginId) + "</LI>") : void (0);
    this.UserName != null ? arrXml.push("<UN>" + jetsennet.xml.xmlEscape(this.UserName) + "</UN>") : void (0);
    this.UserToken != null ? arrXml.push("<TK>" + jetsennet.xml.xmlEscape(this.UserToken) + "</TK>") : void (0);
    this.ColumnId != null ? arrXml.push("<CI>" + this.ColumnId + "</CI>") : void (0);
    this.UserGroups != null ? arrXml.push("<UG>" + this.UserGroups + "</UG>") : void (0);
    this.UserRoles != null ? arrXml.push("<UR>" + this.UserRoles + "</UR>") : void (0);
    this.PersonId != null ? arrXml.push("<PI>" + jetsennet.xml.xmlEscape(this.PersonId) + "</PI>") : void (0);
    this.UserType != null ? arrXml.push("<UT>" + this.UserType + "</UT>") : void (0);
    this.HomePath != null ? arrXml.push("<HP>" + jetsennet.xml.xmlEscape(this.HomePath) + "</HP>") : void (0);
    this.PageInfo != null ? arrXml.push("<PA>" + jetsennet.xml.xmlEscape(this.PageInfo) + "</PA>") : void (0);
    this.RightLevel != null ? arrXml.push("<RL>" + this.RightLevel + "</RL>") : void (0);
    this.PageTheme != null ? arrXml.push("<PT>" + this.PageTheme + "</PT>") : void (0);
    this.AreaId != null ? arrXml.push("<AR>" + this.AreaId + "</AR>") : void (0);
    this.CheckinType != null ? arrXml.push("<CT>" + this.CheckinType + "</CT>") : void (0);
    arrXml.push("</UP>");
    return arrXml.join(""); //jetsennet.xml.serialize(this,"UserProfile");
};
jetsennet.UserProfile.prototype.fromXml = function (xmlString) {

    var userObj = jetsennet.xml.deserialize(xmlString);
    userObj = userObj.UserProfile == null ? userObj : userObj.UserProfile;

    this.UserId = valueOf(userObj, "UserId", valueOf(userObj, "UI", ""));
    this.LoginId = valueOf(userObj, "LoginId", valueOf(userObj, "LI", ""));
    this.UserName = valueOf(userObj, "UserName", valueOf(userObj, "UN", ""));
    this.UserToken = valueOf(userObj, "UserToken", valueOf(userObj, "TK", ""));
    this.ColumnId = valueOf(userObj, "ColumnId", valueOf(userObj, "CI", ""));
    this.UserGroups = valueOf(userObj, "UserGroups", valueOf(userObj, "UG", ""));
    this.UserRoles = valueOf(userObj, "UserRoles", valueOf(userObj, "UR", ""));
    this.PersonId = valueOf(userObj, "PersonId", valueOf(userObj, "PI", ""));
    this.UserType = valueOf(userObj, "UserType", valueOf(userObj, "UT", "0"));
    this.UserPath = valueOf(userObj, "HomePath", valueOf(userObj, "HP", ""));
    this.PageInfo = valueOf(userObj, "PageInfo", valueOf(userObj, "PA", ""));
    this.RightLevel = valueOf(userObj, "RightLevel", valueOf(userObj, "RL", "0"));
    this.PageTheme = valueOf(userObj, "PageTheme", valueOf(userObj, "PT", ""));
    this.AreaId = valueOf(userObj, "AreaId", valueOf(userObj, "AR", ""));
    this.CheckinType = valueOf(userObj, "CheckinType", valueOf(userObj, "CT", ""));
};

jetsennet.gotoLogin = function () {
    window.top.location = jetsennet.getWebRoot() + jetsennet["LOGIN_URL"];
};
jetsennet.isLogin = function () {
    return false;
};
jetsennet.validateLogin = jetsennet.valideLogin = function () {
    jetsennet.application.userInfo = jetsennet.getUserInfo();
    var userInfo = jetsennet.application.userInfo;
    jetsennet.setUserInfo(userInfo);

    if (userInfo != null && userInfo.UserId && userInfo.LoginId) {
        if (!jetsennet.util.isNullOrEmpty(userInfo.PageInfo)) {
            if (new String(window.location.toString()).toLowerCase().indexOf(userInfo.PageInfo.toLowerCase()) < 0) {                
                jetsennet.gotoLogin();
            }
        }
        return true;
    }
    else {       
        jetsennet.gotoLogin();
    }
};
jetsennet.logout = function () {

    var portalUrl = jetsennet.getPortalServiceUrl();
    if (jetsennet.util.right(portalUrl, 4) == "wsdl") {
        var ws = new jetsennet.Service(portalUrl);
        ws.async = false;
        ws.call("uumLogout", []);
    }
    else {
        jetsennet.request(portalUrl, { "command": "logout" });
    }

    jetsennet.setUserInfo();
    window.top.location = jetsennet.getWebRoot() + jetsennet["LOGIN_URL"] + "?out=1";
};
jetsennet.setUserInfo = function (/*jetsennet.UserProfile*/userInfo) {
    for (var i = 0; i < jetsennet.UserCookieItems.length; i++) {
        var name = jetsennet.UserCookieItems[i];
        jetsennet.util.cookie(name, null);
        if (userInfo) {            
            jetsennet.util.cookie(name, userInfo[name], { expires: 1 }); //,{ expires:0.5});
        }
    }

    if (userInfo) {
        jetsennet.application.userInfo = userInfo;
    }
};
jetsennet.getQueryUserInfo = function (i) {
    var userToken = jetsennet.queryString("token");
    if (!jetsennet.util.isNullOrEmpty(userToken)) {
        userToken = jetsennet.util.base64StringToUTF8(userToken);
        var userInfo = new jetsennet.UserProfile();
        userInfo.fromXml(userToken);
        return userInfo;
    }
    return null;
};
jetsennet.getUserInfo = function () {
    //debugger
    var userInfo = jetsennet.getQueryUserInfo();
    if (userInfo != null) {
        return userInfo;
    }
    userInfo = new jetsennet.UserProfile();
    for (var i = 0; i < jetsennet.UserCookieItems.length; i++) {
        var name = jetsennet.UserCookieItems[i];
        userInfo[name] = jetsennet.util.cookie(name);
    }
    return userInfo;
};
jetsennet.getValideQueryString = function (page) {
    var queryString = "";
    var userInfo = jetsennet.application.userInfo;
    var userToken = "";
    if (userInfo != null) {
        userInfo.PageInfo = page ? page : "";
        userToken = escape(jetsennet.util.utf8ToBase64String(userInfo.toXml()));
    }
    queryString = "token=" + userToken;
    return queryString;
};

jetsennet.application.userInfo = jetsennet.getUserInfo();

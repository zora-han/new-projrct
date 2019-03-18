//=============================================================================
//系统配置
//=============================================================================
jetsennet.registerNamespace("jetsennet.application");

jetsennet["IS_DEBUG"] = true;
jetsennet["DEFAULT_THEME"] = "jsnet";
jetsennet["EFFECTS_ENABLE"] = true;
jetsennet["GRID_CUSTOM_SCROLL"] = false;
jetsennet["LOGIN_URL"] = "juum/jnetsystemweb/login.htm";
jetsennet["MAINPAGE_URL"] = "default.htm";
//采用webservice
//jetsennet["PORTAL_SERVICE"] = "../../services/UUMSystemService?wsdl";
//采用http请求
jetsennet["PORTAL_SERVICE"] = "../../user";
jetsennet["DEFAULT_JS_LOAD"] = ["user", "sql"];
jetsennet["ERROR_CODE"] = {
    "-99": "您无法通过系统验证，可能的原因是未登录系统或登录已超时",
    "-98": "对不起，您没有权限"
};

/**
当调用服务方法需要Soap Header时，从此处读取值 
以满足多种语言生成的服务需要(主要是命名空间)
*/
jetsennet.application.soapHeaderReader = function (itemName, itemType, methodName, location) {
    var itemValue = "";
    switch (itemName) {
        case "UserId":
        case "userId":
            itemValue = jetsennet.application.userInfo.UserId;
            break;
        case "LoginId":
        case "loginId":
            itemValue = jetsennet.application.userInfo.LoginId;
            break;
        case "UserToken":
        case "userToken":
            itemValue = jetsennet.application.userInfo.UserToken;
            break;
    }
    if (itemValue == null || itemValue == "")
        return jetsennet.Service.getMethodDefaultParamValue(itemType);
    return itemValue;
};

/**
重写读取WebRoot
适用于框架类
jetsennet.getWebRoot = function () {
    if (jetsennet.__webRoot == null) {
        var config;
        var portalWs = jetsennet.getPortalServiceUrl();
        if (!portalWs) {
            var sst = new jetsennet.Service(portalWs);
            sst.async = false;
            sst.oncallback = function (ret) {
                config = jetsennet.xml.deserialize(ret.resultVal);
            };
            sst.call("uumGetAppConfig", ["JetsenNetWebPath"]);
        }
        jetsennet.__webRoot = (config && config.JetsenNetWebPath) ? config.JetsenNetWebPath : jetsennet.appPath + "../../";
    }
    return jetsennet.__webRoot;
};*/
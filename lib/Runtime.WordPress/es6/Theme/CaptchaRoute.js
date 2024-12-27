"use strict;"
/*!
 *  BayLang Technology
 *
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
if (typeof Runtime == 'undefined') Runtime = {};
if (typeof Runtime.WordPress == 'undefined') Runtime.WordPress = {};
if (typeof Runtime.WordPress.Theme == 'undefined') Runtime.WordPress.Theme = {};
Runtime.WordPress.Theme.CaptchaRoute = function()
{
	Runtime.Web.BaseRoute.apply(this, arguments);
};
Runtime.WordPress.Theme.CaptchaRoute.prototype = Object.create(Runtime.Web.BaseRoute.prototype);
Runtime.WordPress.Theme.CaptchaRoute.prototype.constructor = Runtime.WordPress.Theme.CaptchaRoute;
Object.assign(Runtime.WordPress.Theme.CaptchaRoute.prototype,
{
	/**
	 * Action index
	 */
	actionIndex: async function()
	{
		var res = await this.constructor.createCaptcha();
		var content = Runtime.rtl.attr(res, 0);
		var captcha_string = Runtime.rtl.attr(res, 1);
		var captcha_hash = Runtime.Crypt.Password.createHash(captcha_string);
		/* Create response */
		var response = new Runtime.Web.Response();
		response = Runtime.rtl.setAttr(response, Runtime.Collection.from(["content"]), content);
		response = Runtime.rtl.setAttr(response, Runtime.Collection.from(["headers", "Cache-Control"]), "no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
		response = Runtime.rtl.setAttr(response, Runtime.Collection.from(["headers", "Pragma"]), "no-cache");
		response = Runtime.rtl.setAttr(response, Runtime.Collection.from(["headers", "Content-Type"]), "image/jpeg");
		/* Add JWT cookie */
		var expires = Runtime.DateTime.now().timestamp() + 24 * 60 * 60;
		var jwt_key = Runtime.rtl.getContext().env("NONCE_KEY");
		var jwt_str = Runtime.Crypt.JWT.encode(Runtime.Map.from({"s":captcha_hash,"e":expires}), jwt_key, "HS512");
		var captcha_cookie = new Runtime.Web.Cookie(Runtime.Map.from({"name":"captcha","value":jwt_str,"expires":expires,"httponly":true}));
		response = response.addCookie(captcha_cookie);
		this.container.setResponse(response);
	},
	/**
	 * Create captcha
	 */
	createCaptcha: async function()
	{
		var content = "";
		var image_width = 300;
		var image_height = 120;
		var chars_count = 6;
		var possible_chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
		var background_colors = Runtime.Vector.from([Runtime.Vector.from([255,255,204]),Runtime.Vector.from([255,255,153]),Runtime.Vector.from([255,255,102]),Runtime.Vector.from([255,255,51]),Runtime.Vector.from([255,153,51]),Runtime.Vector.from([255,204,153]),Runtime.Vector.from([255,255,0]),Runtime.Vector.from([255,153,0]),Runtime.Vector.from([255,102,51]),Runtime.Vector.from([255,204,204]),Runtime.Vector.from([255,204,255]),Runtime.Vector.from([255,153,255]),Runtime.Vector.from([255,102,255]),Runtime.Vector.from([255,51,255]),Runtime.Vector.from([255,0,255]),Runtime.Vector.from([255,153,153]),Runtime.Vector.from([255,102,204]),Runtime.Vector.from([255,0,204]),Runtime.Vector.from([255,51,204]),Runtime.Vector.from([204,102,255]),Runtime.Vector.from([204,51,255]),Runtime.Vector.from([204,153,255]),Runtime.Vector.from([204,204,255]),Runtime.Vector.from([153,153,255]),Runtime.Vector.from([153,153,204]),Runtime.Vector.from([102,153,255]),Runtime.Vector.from([102,153,204]),Runtime.Vector.from([153,204,255]),Runtime.Vector.from([51,153,255]),Runtime.Vector.from([204,255,255]),Runtime.Vector.from([153,255,255]),Runtime.Vector.from([102,255,255]),Runtime.Vector.from([51,255,255]),Runtime.Vector.from([102,204,153]),Runtime.Vector.from([204,204,204]),Runtime.Vector.from([204,255,204]),Runtime.Vector.from([51,204,204])]);
		var count_dots = 50;
		var count_lines = 4;
		/* Generate word */
		var captcha_string = "";
		var sz_s = Runtime.rs.strlen(possible_chars);
		for (var i = 0; i < chars_count; i++)
		{
			var code = Runtime.rtl.random(0, sz_s - 1);
			captcha_string += Runtime.rtl.toStr(Runtime.rtl.attr(possible_chars, code));
		}
		/* Generate color */
		var generate_color = () =>
		{
			return Runtime.Vector.from([Runtime.rtl.random(10, 200),Runtime.rtl.random(10, 200),Runtime.rtl.random(10, 200)]);
		};
		return Promise.resolve(Runtime.Vector.from([content,captcha_string]));
	},
});
Object.assign(Runtime.WordPress.Theme.CaptchaRoute, Runtime.Web.BaseRoute);
Object.assign(Runtime.WordPress.Theme.CaptchaRoute,
{
	/**
	 * Returns routes
	 */
	getRoutes: function()
	{
		return Runtime.Vector.from([new Runtime.Web.RouteInfo(Runtime.Map.from({"uri":"/generate_captcha/","name":"site:generate_captcha","method":"actionIndex","enable_locale":false}))]);
	},
	/**
	 * Validate captcha
	 */
	validateCaptcha: function(request, captcha_string)
	{
		var captcha_cookie = request.cookies.get("captcha");
		if (captcha_cookie == null)
		{
			return false;
		}
		var jwt_key = Runtime.rtl.getContext().env("NONCE_KEY");
		var jwt = Runtime.Crypt.JWT.decode(captcha_cookie.value, jwt_key);
		if (jwt == null)
		{
			return false;
		}
		if (!Runtime.rtl.attr(jwt, "valid"))
		{
			return false;
		}
		var captcha_hash = Runtime.rtl.attr(jwt, ["data", "s"]);
		if (!Runtime.Crypt.Password.verify(captcha_string, captcha_hash))
		{
			return false;
		}
		return true;
	},
	/**
	 * Reset captcha
	 */
	resetCaptcha: function()
	{
		var captcha_cookie = new Runtime.Web.Cookie(Runtime.Map.from({"name":"captcha","value":"","expires":0,"httponly":true}));
		return captcha_cookie;
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.WordPress.Theme";
	},
	getClassName: function()
	{
		return "Runtime.WordPress.Theme.CaptchaRoute";
	},
	getParentClassName: function()
	{
		return "Runtime.Web.BaseRoute";
	},
	getClassInfo: function()
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return Map.from({
			"annotations": Vector.from([
			]),
		});
	},
	getFieldsList: function()
	{
		var a = [];
		return Runtime.Vector.from(a);
	},
	getFieldInfoByName: function(field_name)
	{
		var Vector = Runtime.Vector;
		var Map = Runtime.Map;
		return null;
	},
	getMethodsList: function()
	{
		var a=[
		];
		return Runtime.Vector.from(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});
Runtime.rtl.defClass(Runtime.WordPress.Theme.CaptchaRoute);
window["Runtime.WordPress.Theme.CaptchaRoute"] = Runtime.WordPress.Theme.CaptchaRoute;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.WordPress.Theme.CaptchaRoute;
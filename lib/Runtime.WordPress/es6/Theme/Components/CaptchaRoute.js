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
Runtime.WordPress.Theme.CaptchaRoute = class extends Runtime.Web.BaseRoute
{
	/**
	 * Returns routes
	 */
	static getRoutes()
	{
		return Runtime.Vector.create([
			new Runtime.Web.RouteInfo(Runtime.Map.create({
				"uri": "/generate_captcha/",
				"name": "site:generate_captcha",
				"method": "actionIndex",
			})),
		]);
	}
	
	
	/**
	 * Action index
	 */
	async actionIndex()
	{
		let res = await this.constructor.createCaptcha();
		let content = res[0];
		let captcha_string = res[1];
		let captcha_hash = Runtime.Crypt.Password.createHash(captcha_string);
		/* Create response */
		let response = new Runtime.Web.Response();
		response.content = content;
		response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
		response.headers.set("Pragma", "no-cache");
		response.headers.set("Content-Type", "image/jpeg");
		/* Add JWT cookie */
		let expires = Runtime.DateTime.now().timestamp() + 24 * 60 * 60;
		let jwt_key = Runtime.rtl.getContext().env("NONCE_KEY");
		let jwt_str = Runtime.Crypt.JWT.encode(Runtime.Map.create({
			"s": captcha_hash,
			"e": expires,
		}), jwt_key, "HS512");
		let captcha_cookie = new Runtime.Web.Cookie(Runtime.Map.create({
			"name": "captcha",
			"value": jwt_str,
			"expires": expires,
			"httponly": true,
		}));
		response = response.addCookie(captcha_cookie);
		this.container.setResponse(response);
	}
	
	
	/**
	 * Validate captcha
	 */
	static validateCaptcha(request, captcha_string)
	{
		let captcha_cookie = request.cookies.get("captcha");
		if (captcha_cookie == null)
		{
			return false;
		}
		let jwt_key = Runtime.rtl.getContext().env("NONCE_KEY");
		let jwt = Runtime.Crypt.JWT.decode(captcha_cookie.value, jwt_key);
		if (jwt == null) return false;
		if (!jwt["valid"]) return false;
		let captcha_hash = jwt["data", "s"];
		if (!Runtime.Crypt.Password.verify(captcha_string, captcha_hash))
		{
			return false;
		}
		return true;
	}
	
	
	/**
	 * Reset captcha
	 */
	static resetCaptcha()
	{
		let captcha_cookie = new Runtime.Web.Cookie(Runtime.Map.create({
			"name": "captcha",
			"value": "",
			"expires": 0,
			"httponly": true,
		}));
		return captcha_cookie;
	}
	
	
	/**
	 * Create captcha
	 */
	async createCaptcha()
	{
		let content = "";
		let image_width = 300;
		let image_height = 120;
		let chars_count = 6;
		let possible_chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
		let background_colors = Runtime.Vector.create([
			Runtime.Vector.create([255, 255, 204]),
			Runtime.Vector.create([255, 255, 153]),
			Runtime.Vector.create([255, 255, 102]),
			Runtime.Vector.create([255, 255, 51]),
			Runtime.Vector.create([255, 153, 51]),
			Runtime.Vector.create([255, 204, 153]),
			Runtime.Vector.create([255, 255, 0]),
			Runtime.Vector.create([255, 153, 0]),
			Runtime.Vector.create([255, 102, 51]),
			Runtime.Vector.create([255, 204, 204]),
			Runtime.Vector.create([255, 204, 255]),
			Runtime.Vector.create([255, 153, 255]),
			Runtime.Vector.create([255, 102, 255]),
			Runtime.Vector.create([255, 51, 255]),
			Runtime.Vector.create([255, 0, 255]),
			Runtime.Vector.create([255, 153, 153]),
			Runtime.Vector.create([255, 102, 204]),
			Runtime.Vector.create([255, 0, 204]),
			Runtime.Vector.create([255, 51, 204]),
			Runtime.Vector.create([204, 102, 255]),
			Runtime.Vector.create([204, 51, 255]),
			Runtime.Vector.create([204, 153, 255]),
			Runtime.Vector.create([204, 204, 255]),
			Runtime.Vector.create([153, 153, 255]),
			Runtime.Vector.create([153, 153, 204]),
			Runtime.Vector.create([102, 153, 255]),
			Runtime.Vector.create([102, 153, 204]),
			Runtime.Vector.create([153, 204, 255]),
			Runtime.Vector.create([51, 153, 255]),
			Runtime.Vector.create([204, 255, 255]),
			Runtime.Vector.create([153, 255, 255]),
			Runtime.Vector.create([102, 255, 255]),
			Runtime.Vector.create([51, 255, 255]),
			Runtime.Vector.create([102, 204, 153]),
			Runtime.Vector.create([204, 204, 204]),
			Runtime.Vector.create([204, 255, 204]),
			Runtime.Vector.create([51, 204, 204]),
		]);
		let count_dots = 50;
		let count_lines = 4;
		/* Generate word */
		let captcha_string = "";
		let sz_s = Runtime.rs.strlen(possible_chars);
		for (let i = 0; i < chars_count; i++)
		{
			let code = Runtime.rtl.random(0, sz_s - 1);
			captcha_string += possible_chars[code];
		}
		/* Generate color */
		let generate_color = () =>
		{
			return Runtime.Vector.create([
				Runtime.rtl.random(10, 200),
				Runtime.rtl.random(10, 200),
				Runtime.rtl.random(10, 200),
			]);
		};
		return Runtime.Vector.create([content, captcha_string]);
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
	}
	static getClassName(){ return "Runtime.WordPress.Theme.CaptchaRoute"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.WordPress.Theme.CaptchaRoute"] = Runtime.WordPress.Theme.CaptchaRoute;
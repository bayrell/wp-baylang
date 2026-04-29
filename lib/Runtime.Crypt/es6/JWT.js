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
if (typeof Runtime.Crypt == 'undefined') Runtime.Crypt = {};
Runtime.Crypt.JWT = class extends Runtime.BaseObject
{
	/**
	 * Create object
	 */
	constructor(data)
	{
		if (data == undefined) data = null;
		super();
		this._assign_values(data);
	}
	
	
	/**
	 * Returns true if JWT is correct
	 */
	isCorrect(){ return this.correct; }
	
	
	/**
	 * Returns method
	 */
	static getMethod(algo)
	{
		if (algo == "HS256") return "hash";
		if (algo == "HS384") return "hash";
		if (algo == "HS512") return "hash";
		if (algo == "RS256") return "rsa";
		if (algo == "RS384") return "rsa";
		if (algo == "RS512") return "rsa";
		return "";
	}
	
	
	/**
	 * Returns method
	 */
	static getAlgo(algo)
	{
		if (algo == "HS256") return "SHA256";
		if (algo == "HS384") return "SHA384";
		if (algo == "HS512") return "SHA512";
		if (algo == "RS256") return "SHA256";
		if (algo == "RS384") return "SHA384";
		if (algo == "RS512") return "SHA512";
		return "";
	}
	
	
	/**
	 * Create jwt sign
	 */
	static createSign(head_b64, data_b64, key, algo)
	{
		let m = this.getMethod(algo);
		let a = this.getAlgo(algo);
		let text = head_b64 + String(".") + String(data_b64);
		let sign = "";
		if (m == "rsa") sign = Runtime.Crypt.RSA.sign(text, key, a);
		else if (m == "hash") sign = Runtime.Crypt.HASH.hash(text, key, a);
		sign = Runtime.rs.base64_encode_url(sign);
		return sign;
	}
	
	
	/**
	 * Validate jwt sign
	 */
	static validateSign(head_b64, data_b64, sign, key, algo)
	{
		let m = this.getMethod(algo);
		let a = this.getAlgo(algo);
		let text = head_b64 + String(".") + String(data_b64);
		let flag = false;
		if (!key) return flag;
		sign = Runtime.rs.base64_decode_url(sign);
		if (m == "rsa") flag = Runtime.Crypt.RSA.verify(text, sign, key, a);
		else if (m == "hash") flag = Runtime.Crypt.HASH.verify(text, sign, key, a);
		return flag;
	}
	
	
	/**
	 * Create jwt
	 */
	static encode(data, key, algo)
	{
		let data_json = Runtime.rtl.jsonEncode(data);
		let data_b64 = Runtime.rs.base64_encode_url(data_json);
		let head_b64 = Runtime.rs.base64_encode_url(Runtime.rtl.jsonEncode(Runtime.Map.create({"alg": algo, "typ": "JWT"})));
		let sign = this.createSign(head_b64, data_b64, key, algo);
		return new Runtime.Crypt.JWT(Runtime.Map.create({
			"correct": true,
			"data": data,
			"token": head_b64 + String(".") + String(data_b64) + String(".") + String(sign),
		}));
	}
	
	
	/**
	 * Decode jwt
	 */
	static decode(token_str, key, algo)
	{
		if (algo == undefined) algo = "";
		if (!token_str) return;
		let arr = Runtime.rs.split(".", token_str);
		let head_b64 = arr.get(0, "");
		let data_b64 = arr.get(1, "");
		let sign = arr.get(2, "");
		/* Decode head */
		let head_json = Runtime.rs.base64_decode(head_b64);
		let head_data = Runtime.rtl.jsonDecode(head_json);
		if (head_data == null) return null;
		/* Decode data */
		let data_json = Runtime.rs.base64_decode(data_b64);
		let data = Runtime.rtl.jsonDecode(data_json);
		if (data == null) return null;
		/* Check algo */
		let token_algo = head_data.get("alg", "");
		if (token_algo == "") return null;
		if (algo != "")
		{
			if (token_algo != algo)
			{
				return new Runtime.Crypt.JWT(Runtime.Map.create({
					"correct": false,
					"data": data,
					"token": token_str,
				}));
			}
		}
		/* Validate sign */
		let flag = this.validateSign(head_b64, data_b64, sign, key, token_algo);
		if (!flag) return new Runtime.Crypt.JWT(Runtime.Map.create({
			"correct": false,
			"data": data,
			"token": token_str,
		}));
		return new Runtime.Crypt.JWT(Runtime.Map.create({
			"correct": true,
			"data": data,
			"token": token_str,
		}));
	}
	
	
	/* ========= Class init functions ========= */
	_init()
	{
		super._init();
		this.data = null;
		this.correct = false;
		this.token = "";
	}
	static getClassName(){ return "Runtime.Crypt.JWT"; }
	static getMethodsList(){ return null; }
	static getMethodInfoByName(field_name){ return null; }
	static getInterfaces(){ return []; }
};
window["Runtime.Crypt.JWT"] = Runtime.Crypt.JWT;
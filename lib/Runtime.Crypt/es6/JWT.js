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
Runtime.Crypt.JWT = function()
{
};
Object.assign(Runtime.Crypt.JWT.prototype,
{
});
Object.assign(Runtime.Crypt.JWT,
{
	/**
	 * Returns method
	 */
	getMethod: function(algo)
	{
		if (algo == "HS256")
		{
			return "hash";
		}
		if (algo == "HS384")
		{
			return "hash";
		}
		if (algo == "HS512")
		{
			return "hash";
		}
		if (algo == "RS256")
		{
			return "rsa";
		}
		if (algo == "RS384")
		{
			return "rsa";
		}
		if (algo == "RS512")
		{
			return "rsa";
		}
		return "";
	},
	/**
	 * Returns method
	 */
	getAlgo: function(algo)
	{
		if (algo == "HS256")
		{
			return "SHA256";
		}
		if (algo == "HS384")
		{
			return "SHA384";
		}
		if (algo == "HS512")
		{
			return "SHA512";
		}
		if (algo == "RS256")
		{
			return "SHA256";
		}
		if (algo == "RS384")
		{
			return "SHA384";
		}
		if (algo == "RS512")
		{
			return "SHA512";
		}
		return "";
	},
	/**
	 * Create jwt sign
	 */
	createSign: function(head_b64, data_b64, key, algo)
	{
		var m = this.getMethod(algo);
		var a = this.getAlgo(algo);
		var text = head_b64 + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(data_b64);
		var sign = "";
		if (m == "rsa")
		{
			sign = Runtime.Crypt.RSA.sign(text, key, a);
		}
		else if (m == "hash")
		{
			sign = Runtime.Crypt.HASH.hash(text, key, a);
		}
		sign = Runtime.rs.base64_encode_url(sign);
		return sign;
	},
	/**
	 * Validate jwt sign
	 */
	validateSign: function(head_b64, data_b64, sign, key, algo)
	{
		var m = this.getMethod(algo);
		var a = this.getAlgo(algo);
		var text = head_b64 + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(data_b64);
		var flag = false;
		sign = Runtime.rs.base64_decode_url(sign);
		if (m == "rsa")
		{
			flag = Runtime.Crypt.RSA.verify(text, sign, key, a);
		}
		else if (m == "hash")
		{
			flag = Runtime.Crypt.HASH.verify(text, sign, key, a);
		}
		return flag;
	},
	/**
	 * Create jwt
	 */
	encode: function(d, key, algo)
	{
		var data_json = Runtime.rtl.json_encode(d);
		var data_b64 = Runtime.rs.base64_encode_url(data_json);
		var head_b64 = Runtime.rs.base64_encode_url(Runtime.rtl.json_encode(Runtime.Map.from({"alg":algo,"typ":"JWT"})));
		var sign = this.createSign(head_b64, data_b64, key, algo);
		return head_b64 + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(data_b64) + Runtime.rtl.toStr(".") + Runtime.rtl.toStr(sign);
	},
	/**
	 * Decode jwt
	 */
	decode: function(token_str, key, algo)
	{
		if (algo == undefined) algo = "";
		var arr = Runtime.rs.split(".", token_str);
		var head_b64 = arr.get(0, "");
		var data_b64 = arr.get(1, "");
		var sign = arr.get(2, "");
		/* Decode head */
		var head_json = Runtime.rs.base64_decode(head_b64);
		var head_data = Runtime.rtl.json_decode(head_json);
		if (head_data == null)
		{
			return Runtime.Map.from({"head":null,"data":null,"valid":false});
		}
		/* Decode data */
		var data_json = Runtime.rs.base64_decode(data_b64);
		var data = Runtime.rtl.json_decode(data_json);
		if (data == null)
		{
			return Runtime.Map.from({"head":null,"data":null,"valid":false});
		}
		/* Check algo */
		var token_algo = head_data.get("alg", "");
		if (token_algo == "")
		{
			return null;
		}
		if (algo != "")
		{
			if (token_algo != algo)
			{
				return Runtime.Map.from({"head":head_data,"data":data,"valid":false});
			}
		}
		/* Validate sign */
		var flag = this.validateSign(head_b64, data_b64, sign, key, token_algo);
		if (!flag)
		{
			return Runtime.Map.from({"head":head_data,"data":data,"valid":false});
		}
		return Runtime.Map.from({"head":head_data,"data":data,"valid":true});
	},
	/* ======================= Class Init Functions ======================= */
	getNamespace: function()
	{
		return "Runtime.Crypt";
	},
	getClassName: function()
	{
		return "Runtime.Crypt.JWT";
	},
	getParentClassName: function()
	{
		return "";
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
Runtime.rtl.defClass(Runtime.Crypt.JWT);
window["Runtime.Crypt.JWT"] = Runtime.Crypt.JWT;
if (typeof module != "undefined" && typeof module.exports != "undefined") module.exports = Runtime.Crypt.JWT;
<?php
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
namespace Runtime\WordPress\Theme;

use Runtime\BaseStruct;
use Runtime\DateTime;
use Runtime\Crypt\JWT;
use Runtime\Crypt\Password;
use Runtime\Web\ApiResult;
use Runtime\Web\App;
use Runtime\Web\BaseRoute;
use Runtime\Web\Bus;
use Runtime\Web\Cookie;
use Runtime\Web\RenderContainer;
use Runtime\Web\Request;
use Runtime\Web\Response;
use Runtime\Web\RouteInfo;


class CaptchaRoute extends \Runtime\Web\BaseRoute
{
	/**
	 * Returns routes
	 */
	static function getRoutes()
	{
		return new \Runtime\Vector(
			new \Runtime\Web\RouteInfo(new \Runtime\Map([
				"uri" => "/generate_captcha/",
				"name" => "site:generate_captcha",
				"method" => "actionIndex",
			])),
		);
	}
	
	
	/**
	 * Action index
	 */
	function actionIndex()
	{
		$res = static::createCaptcha();
		$content = $res[0];
		$captcha_string = $res[1];
		$captcha_hash = \Runtime\Crypt\Password::createHash($captcha_string);
		/* Create response */
		$response = new \Runtime\Web\Response();
		$response->content = $content;
		$response->headers->set("Cache-Control", "no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
		$response->headers->set("Pragma", "no-cache");
		$response->headers->set("Content-Type", "image/jpeg");
		/* Add JWT cookie */
		$expires = \Runtime\DateTime::now()->timestamp() + 24 * 60 * 60;
		$jwt_key = \Runtime\rtl::getContext()->env("NONCE_KEY");
		$jwt_str = \Runtime\Crypt\JWT::encode(new \Runtime\Map([
			"s" => $captcha_hash,
			"e" => $expires,
		]), $jwt_key, "HS512");
		$captcha_cookie = new \Runtime\Web\Cookie(new \Runtime\Map([
			"name" => "captcha",
			"value" => $jwt_str,
			"expires" => $expires,
			"httponly" => true,
		]));
		$response = $response->addCookie($captcha_cookie);
		$this->container->setResponse($response);
	}
	
	
	/**
	 * Validate captcha
	 */
	static function validateCaptcha($request, $captcha_string)
	{
		$captcha_cookie = $request->cookies->get("captcha");
		if ($captcha_cookie == null)
		{
			return false;
		}
		$jwt_key = \Runtime\rtl::getContext()->env("NONCE_KEY");
		$jwt = \Runtime\Crypt\JWT::decode($captcha_cookie->value, $jwt_key);
		if ($jwt == null) return false;
		if (!$jwt["valid"]) return false;
		$captcha_hash = $jwt["data", "s"];
		if (!\Runtime\Crypt\Password::verify($captcha_string, $captcha_hash))
		{
			return false;
		}
		return true;
	}
	
	
	/**
	 * Reset captcha
	 */
	static function resetCaptcha()
	{
		$captcha_cookie = new \Runtime\Web\Cookie(new \Runtime\Map([
			"name" => "captcha",
			"value" => "",
			"expires" => 0,
			"httponly" => true,
		]));
		return $captcha_cookie;
	}
	
	
	/**
	 * Create captcha
	 */
	function createCaptcha()
	{
		$content = "";
		$image_width = 300;
		$image_height = 120;
		$chars_count = 6;
		$possible_chars = "qwertyuiopasdfghjklzxcvbnm1234567890";
		$background_colors = new \Runtime\Vector(
			new \Runtime\Vector(255, 255, 204),
			new \Runtime\Vector(255, 255, 153),
			new \Runtime\Vector(255, 255, 102),
			new \Runtime\Vector(255, 255, 51),
			new \Runtime\Vector(255, 153, 51),
			new \Runtime\Vector(255, 204, 153),
			new \Runtime\Vector(255, 255, 0),
			new \Runtime\Vector(255, 153, 0),
			new \Runtime\Vector(255, 102, 51),
			new \Runtime\Vector(255, 204, 204),
			new \Runtime\Vector(255, 204, 255),
			new \Runtime\Vector(255, 153, 255),
			new \Runtime\Vector(255, 102, 255),
			new \Runtime\Vector(255, 51, 255),
			new \Runtime\Vector(255, 0, 255),
			new \Runtime\Vector(255, 153, 153),
			new \Runtime\Vector(255, 102, 204),
			new \Runtime\Vector(255, 0, 204),
			new \Runtime\Vector(255, 51, 204),
			new \Runtime\Vector(204, 102, 255),
			new \Runtime\Vector(204, 51, 255),
			new \Runtime\Vector(204, 153, 255),
			new \Runtime\Vector(204, 204, 255),
			new \Runtime\Vector(153, 153, 255),
			new \Runtime\Vector(153, 153, 204),
			new \Runtime\Vector(102, 153, 255),
			new \Runtime\Vector(102, 153, 204),
			new \Runtime\Vector(153, 204, 255),
			new \Runtime\Vector(51, 153, 255),
			new \Runtime\Vector(204, 255, 255),
			new \Runtime\Vector(153, 255, 255),
			new \Runtime\Vector(102, 255, 255),
			new \Runtime\Vector(51, 255, 255),
			new \Runtime\Vector(102, 204, 153),
			new \Runtime\Vector(204, 204, 204),
			new \Runtime\Vector(204, 255, 204),
			new \Runtime\Vector(51, 204, 204),
		);
		$count_dots = 50;
		$count_lines = 4;
		/* Generate word */
		$captcha_string = "";
		$sz_s = \Runtime\rs::strlen($possible_chars);
		for ($i = 0; $i < $chars_count; $i++)
		{
			$code = \Runtime\rtl::random(0, $sz_s - 1);
			$captcha_string .= $possible_chars[$code];
		}
		/* Generate color */
		$generate_color = function ()
		{
			return new \Runtime\Vector(
				\Runtime\rtl::random(10, 200),
				\Runtime\rtl::random(10, 200),
				\Runtime\rtl::random(10, 200),
			);
		};
		$get_color = function($image, $c=null) use ($generate_color)
		{
			if ($c == null) $c = $generate_color();
			return imagecolorallocate($image, $c->get(0), $c->get(1), $c->get(2));
		};
		
		$image = @imagecreate( $image_width, $image_height );
		imagefill(
			$image, 0, 0,
			$get_color(
				$image,
				$background_colors->get(mt_rand(0, $background_colors->count() - 1))
			)
		);
		
		/* Write text */
		$a = new \ReflectionClass(\Bayrell_Framework::class);
		$font = dirname($a->getFileName()) . "/assets/fonts/Roboto-Regular.ttf";
		$font_size = $image_height * 0.5;		
		
		$angle = mt_rand(0, 50) - 25;
		$box = imagettfbbox($font_size, $angle, $font, $captcha_string); 
		
		$x = ($image_width - $box[4]) / 2;
		$y = ($image_height - $box[5]) / 2;
		
		$text_color = $get_color($image);
		imagettftext($image, $font_size, $angle, $x, $y, $text_color, $font, $captcha_string);
		
		/* Generate dots */
		for( $i = 0; $i < $count_dots; $i++ )
		{
			$color = $get_color($image);
			imagefilledellipse
			(
				$image,
				mt_rand(5, $image_width - 10), mt_rand(5, $image_height - 10),
				mt_rand(2, 9), mt_rand(2, 9),
				$color
			);
		}
		
		/* Generate lines */
		for( $i = 0; $i < $count_lines; $i++ )
		{
			$color = $get_color($image);
			$h2 = round($image_height / 2);
			$w2 = round($image_width / 2);
			imagesetthickness($image, 3);
			imageline
			(
				$image,
				mt_rand(0, $w2), mt_rand(0, $h2),
				mt_rand($w2, $image_width), mt_rand($h2, $image_height),
				$color
			);
		}
		
		@ob_start();
		imagejpeg($image, NULL, 90);
        imagedestroy($image);
		$content = @ob_get_contents();
		@ob_end_clean();
		return new \Runtime\Vector($content, $captcha_string);
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
	}
	static function getClassName(){ return "Runtime.WordPress.Theme.CaptchaRoute"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}
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
class CaptchaRoute extends \Runtime\Web\BaseRoute
{
	/**
	 * Returns routes
	 */
	static function getRoutes()
	{
		return \Runtime\Vector::from([new \Runtime\Web\RouteInfo(\Runtime\Map::from(["uri"=>"/generate_captcha/","name"=>"site:generate_captcha","method"=>"actionIndex","enable_locale"=>false]))]);
	}
	/**
	 * Action index
	 */
	function actionIndex()
	{
		$res = static::createCaptcha();
		$content = \Runtime\rtl::attr($res, 0);
		$captcha_string = \Runtime\rtl::attr($res, 1);
		$captcha_hash = \Runtime\Crypt\Password::createHash($captcha_string);
		/* Create response */
		$response = new \Runtime\Web\Response();
		$response = \Runtime\rtl::setAttr($response, ["content"], $content);
		$response = \Runtime\rtl::setAttr($response, ["headers", "Cache-Control"], "no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
		$response = \Runtime\rtl::setAttr($response, ["headers", "Pragma"], "no-cache");
		$response = \Runtime\rtl::setAttr($response, ["headers", "Content-Type"], "image/jpeg");
		/* Add JWT cookie */
		$expires = \Runtime\DateTime::now()->timestamp() + 24 * 60 * 60;
		$jwt_key = \Runtime\rtl::getContext()->env("NONCE_KEY");
		$jwt_str = \Runtime\Crypt\JWT::encode(\Runtime\Map::from(["s"=>$captcha_hash,"e"=>$expires]), $jwt_key, "HS512");
		$captcha_cookie = new \Runtime\Web\Cookie(\Runtime\Map::from(["name"=>"captcha","value"=>$jwt_str,"expires"=>$expires,"httponly"=>true]));
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
		if ($jwt == null)
		{
			return false;
		}
		if (!\Runtime\rtl::attr($jwt, "valid"))
		{
			return false;
		}
		$captcha_hash = \Runtime\rtl::attr($jwt, ["data", "s"]);
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
		$captcha_cookie = new \Runtime\Web\Cookie(\Runtime\Map::from(["name"=>"captcha","value"=>"","expires"=>0,"httponly"=>true]));
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
		$background_colors = \Runtime\Vector::from([\Runtime\Vector::from([255,255,204]),\Runtime\Vector::from([255,255,153]),\Runtime\Vector::from([255,255,102]),\Runtime\Vector::from([255,255,51]),\Runtime\Vector::from([255,153,51]),\Runtime\Vector::from([255,204,153]),\Runtime\Vector::from([255,255,0]),\Runtime\Vector::from([255,153,0]),\Runtime\Vector::from([255,102,51]),\Runtime\Vector::from([255,204,204]),\Runtime\Vector::from([255,204,255]),\Runtime\Vector::from([255,153,255]),\Runtime\Vector::from([255,102,255]),\Runtime\Vector::from([255,51,255]),\Runtime\Vector::from([255,0,255]),\Runtime\Vector::from([255,153,153]),\Runtime\Vector::from([255,102,204]),\Runtime\Vector::from([255,0,204]),\Runtime\Vector::from([255,51,204]),\Runtime\Vector::from([204,102,255]),\Runtime\Vector::from([204,51,255]),\Runtime\Vector::from([204,153,255]),\Runtime\Vector::from([204,204,255]),\Runtime\Vector::from([153,153,255]),\Runtime\Vector::from([153,153,204]),\Runtime\Vector::from([102,153,255]),\Runtime\Vector::from([102,153,204]),\Runtime\Vector::from([153,204,255]),\Runtime\Vector::from([51,153,255]),\Runtime\Vector::from([204,255,255]),\Runtime\Vector::from([153,255,255]),\Runtime\Vector::from([102,255,255]),\Runtime\Vector::from([51,255,255]),\Runtime\Vector::from([102,204,153]),\Runtime\Vector::from([204,204,204]),\Runtime\Vector::from([204,255,204]),\Runtime\Vector::from([51,204,204])]);
		$count_dots = 50;
		$count_lines = 4;
		/* Generate word */
		$captcha_string = "";
		$sz_s = \Runtime\rs::strlen($possible_chars);
		for ($i = 0; $i < $chars_count; $i++)
		{
			$code = \Runtime\rtl::random(0, $sz_s - 1);
			$captcha_string .= \Runtime\rtl::toStr(\Runtime\rtl::attr($possible_chars, $code));
		}
		/* Generate color */
		$generate_color = function ()
		{
			return \Runtime\Vector::from([\Runtime\rtl::random(10, 200),\Runtime\rtl::random(10, 200),\Runtime\rtl::random(10, 200)]);
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
		return \Runtime\Vector::from([$content,$captcha_string]);
	}
	/* ======================= Class Init Functions ======================= */
	static function getNamespace()
	{
		return "Runtime.WordPress.Theme";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.Theme.CaptchaRoute";
	}
	static function getParentClassName()
	{
		return "Runtime.Web.BaseRoute";
	}
	static function getClassInfo()
	{
		return \Runtime\Dict::from([
			"annotations"=>\Runtime\Collection::from([
			]),
		]);
	}
	static function getFieldsList()
	{
		$a = [];
		return \Runtime\Collection::from($a);
	}
	static function getFieldInfoByName($field_name)
	{
		return null;
	}
	static function getMethodsList()
	{
		$a=[
		];
		return \Runtime\Collection::from($a);
	}
	static function getMethodInfoByName($field_name)
	{
		return null;
	}
}
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
namespace Runtime;
class DateTime extends \Runtime\BaseObject implements \Runtime\StringInterface
{
	public $y;
	public $m;
	public $d;
	public $h;
	public $i;
	public $s;
	public $ms;
	public $o;
	function __construct($data=null)
	{
		parent::__construct();
		if ($data != null)
		{
			if ($data->has("y"))
			{
				$this->y = $data->get("y");
			}
			if ($data->has("m"))
			{
				$this->m = $data->get("m");
			}
			if ($data->has("d"))
			{
				$this->d = $data->get("d");
			}
			if ($data->has("h"))
			{
				$this->h = $data->get("h");
			}
			if ($data->has("i"))
			{
				$this->i = $data->get("i");
			}
			if ($data->has("s"))
			{
				$this->s = $data->get("s");
			}
			if ($data->has("ms"))
			{
				$this->ms = $data->get("ms");
			}
			if ($data->has("o"))
			{
				$this->o = $data->get("o");
			}
		}
	}
	/**
	 * toMap
	 */
	function toMap()
	{
		return \Runtime\Map::from(["y"=>$this->y,"m"=>$this->m,"d"=>$this->d,"h"=>$this->h,"i"=>$this->i,"s"=>$this->s,"ms"=>$this->ms,"o"=>$this->o]);
	}
	/**
	 * Create date time from timestamp
	 */
	static function create($time=-1)
	{
		if ($time == -1) $time = time();
		$dt = new \DateTime();
		$dt->setTimestamp($time);
		return static::fromObject($dt);
		return null;
	}
	/**
	 * Returns datetime
	 * @param string tz
	 * @return DateTime
	 */
	static function now()
	{
		return static::create(-1);
	}
	/**
	 * Returns timestamp
	 * @return int
	 */
	function getTimestamp()
	{
		$dt = $this->toObject();
		return $dt->getTimestamp();
		return null;
	}
	function timestamp()
	{
		return $this->getTimestamp();
	}
	/**
	 * Returns day of week
	 * @return int
	 */
	function getDayOfWeek()
	{
		$dt = $this->toObject();
		return $dt->format("w");
		return null;
	}
	/**
	 * Return db datetime
	 * @return string
	 */
	function toString()
	{
		$m = ($this->m < 10) ? ("0" . \Runtime\rtl::toStr($this->m)) : ("" . \Runtime\rtl::toStr($this->m));
		$d = ($this->d < 10) ? ("0" . \Runtime\rtl::toStr($this->d)) : ("" . \Runtime\rtl::toStr($this->d));
		$h = ($this->h < 10) ? ("0" . \Runtime\rtl::toStr($this->h)) : ("" . \Runtime\rtl::toStr($this->h));
		$i = ($this->i < 10) ? ("0" . \Runtime\rtl::toStr($this->i)) : ("" . \Runtime\rtl::toStr($this->i));
		$s = ($this->s < 10) ? ("0" . \Runtime\rtl::toStr($this->s)) : ("" . \Runtime\rtl::toStr($this->s));
		/* Get offset */
		$offset = $this->o * 60;
		$offset_h = \Runtime\Math::abs(\Runtime\Math::floor($offset / 60));
		$offset_m = $offset % 60;
		$offset_h = ($offset_h < 10) ? ("0" . \Runtime\rtl::toStr($offset_h)) : ("" . \Runtime\rtl::toStr($offset_h));
		$offset_m = ($offset_m < 10) ? ("0" . \Runtime\rtl::toStr($offset_m)) : ("" . \Runtime\rtl::toStr($offset_m));
		$offset_str = $offset_h . \Runtime\rtl::toStr($offset_m);
		$offset_str = ($offset < 0) ? ("-" . \Runtime\rtl::toStr($offset_str)) : ("+" . \Runtime\rtl::toStr($offset_str));
		/* Return string */
		return $this->y . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($m) . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($d) . \Runtime\rtl::toStr("T") . \Runtime\rtl::toStr($h) . \Runtime\rtl::toStr(":") . \Runtime\rtl::toStr($i) . \Runtime\rtl::toStr(":") . \Runtime\rtl::toStr($s) . \Runtime\rtl::toStr($offset_str);
	}
	/**
	 * Create DateTime from string
	 */
	static function fromString($s)
	{
		$dt = new \Runtime\DateTime();
		$dt->y = \Runtime\rtl::to(\Runtime\rs::substr($s, 0, 4), ["e"=>"int"]);
		$dt->m = \Runtime\rtl::to(\Runtime\rs::substr($s, 5, 2), ["e"=>"int"]);
		$dt->d = \Runtime\rtl::to(\Runtime\rs::substr($s, 8, 2), ["e"=>"int"]);
		$dt->h = \Runtime\rtl::to(\Runtime\rs::substr($s, 11, 2), ["e"=>"int"]);
		$dt->i = \Runtime\rtl::to(\Runtime\rs::substr($s, 14, 2), ["e"=>"int"]);
		$dt->s = \Runtime\rtl::to(\Runtime\rs::substr($s, 17, 2), ["e"=>"int"]);
		$dt->o = 0;
		if (\Runtime\rs::strlen($s) > 19)
		{
			$sign = \Runtime\rs::substr($s, 19, 1);
			$tz_h = \Runtime\rtl::to(\Runtime\rs::substr($s, 20, 2), ["e"=>"int"]);
			$tz_m = \Runtime\rtl::to(\Runtime\rs::substr($s, 23, 2), ["e"=>"int"]);
			$dt->o = ($tz_h * 60 + $tz_m) / 60;
			if ($sign == "-")
			{
				$dt->o = 0 - $dt->o;
			}
		}
		return $dt;
	}
	/**
	 * Returns date time string
	 */
	function getDateTimeString()
	{
		$m = ($this->m < 10) ? ("0" . \Runtime\rtl::toStr($this->m)) : ("" . \Runtime\rtl::toStr($this->m));
		$d = ($this->d < 10) ? ("0" . \Runtime\rtl::toStr($this->d)) : ("" . \Runtime\rtl::toStr($this->d));
		$h = ($this->h < 10) ? ("0" . \Runtime\rtl::toStr($this->h)) : ("" . \Runtime\rtl::toStr($this->h));
		$i = ($this->i < 10) ? ("0" . \Runtime\rtl::toStr($this->i)) : ("" . \Runtime\rtl::toStr($this->i));
		$s = ($this->s < 10) ? ("0" . \Runtime\rtl::toStr($this->s)) : ("" . \Runtime\rtl::toStr($this->s));
		return $this->y . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($m) . \Runtime\rtl::toStr("-") . \Runtime\rtl::toStr($d) . \Runtime\rtl::toStr(" ") . \Runtime\rtl::toStr($h) . \Runtime\rtl::toStr(":") . \Runtime\rtl::toStr($i) . \Runtime\rtl::toStr(":") . \Runtime\rtl::toStr($s);
	}
	/**
	 * Normalize
	 */
	function normalize()
	{
		$dt = $this;
		$offset = \Runtime\rtl::getContext()->env("TZ_OFFSET");
		if ($offset)
		{
			$dt = $dt->setOffset($offset);
		}
		return $dt;
	}
	/**
	 * Shift tz
	 */
	function shift($seconds)
	{
		$timestamp = $this->getTimestamp();
		$dt = static::create($timestamp + $seconds);
		$dt->setOffset($this->o);
		return $dt;
	}
	/**
	 * Set offset
	 */
	function setOffset($offset)
	{
		$dt = $this->toObject();
		$dt_offset = $dt->getOffset();
		/* Modify offset */
		$delta = $offset - $dt_offset;
		$dt = static::modify($dt, $delta);
		$obj = static::fromObject($dt);
		$obj->o = $offset;
		return $obj;
	}
	/**
	 * Get tz offset
	 */
	static function getOffset($tz)
	{
		$utc = new \DateTimeZone("UTC");
		$current = new \DateTimeZone($tz);
		$offset = $current->getOffset(new \DateTime("now", $utc));
		return $offset;
	}
	/**
	 * Add seconds
	 */
	static function modify($dt, $seconds)
	{
		if ($seconds == 0)
		{
			return $dt;
		}
		$dt->modify($seconds . ' seconds');
		return $dt;
	}
	/**
	 * Convert to native object
	 */
	function toObject()
	{
		$dt = new \DateTime();
		$dt->setTimezone( new \DateTimeZone("UTC") );
		$dt->setDate($this->y, $this->m, $this->d);
		$dt->setTime($this->h, $this->i, $this->s);
		$dt = static::modify($dt, -1 * $this->o * 60 * 60);
		return $dt;
	}
	/**
	 * Create from native object
	 */
	static function fromObject($dt)
	{
		$y = (int)$dt->format("Y");
		$m = (int)$dt->format("m");
		$d = (int)$dt->format("d");
		$h = (int)$dt->format("H");
		$i = (int)$dt->format("i");
		$s = (int)$dt->format("s");
		$o = $dt->getOffset() / 3600;
		return new \Runtime\DateTime(
			Dict::from(["y"=>$y,"m"=>$m,"d"=>$d,"h"=>$h,"i"=>$i,"s"=>$s,"o"=>$o])
		);
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->y = 1970;
		$this->m = 1;
		$this->d = 1;
		$this->h = 0;
		$this->i = 0;
		$this->s = 0;
		$this->ms = 0;
		$this->o = 0;
	}
	static function getNamespace()
	{
		return "Runtime";
	}
	static function getClassName()
	{
		return "Runtime.DateTime";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseObject";
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
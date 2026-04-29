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

namespace Runtime\ORM\MySQL;


class Adapter
{
	var $pdo = null;
	
	
	/**
	 * Copy adapter
	 */
	function copy()
	{
		$adapter = new Adapter();
		$adapter->pdo = $this->pdo;
		return $adapter;
	}
	
	
	/**
	 * Connect
	 */
	function connect($pool)
	{
		try
		{
			$params = $pool->params;
			$host = $params->get("host");
			$port = $params->get("port");
			$login = $params->get("login");
			$password = $params->get("password");
			$database = $params->get("database");
			
			$str = 'mysql:host='.$this->host;
			if ($this->port != null) $str .= ':'.$this->port;
			if ($this->database != null) $str .= ';dbname='.$this->database;
			$this->pdo = new \PDO(
				$str, $this->login, $this->password, 
				array(
					\PDO::ATTR_PERSISTENT => false
				)
			);
			$this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
			$this->pdo->exec("set names utf8");
		}
		catch (\PDOException $e)
		{
			$this->connect_error = $e->getMessage();
			throw new \Runtime\ORM\Exceptions\OrmException('Failed connected to database!');
		}
		catch (\Excepion $e)
		{
			$this->connect_error = $e->getMessage();
		}
	}
	
	
	/**
	 * Connect
	 */
	function isConnected()
	{
		return $this->pdo != null;
	}
	
	
	/**
	 * Get new connection from pool
	 */
	function getConnection()
	{
	}
	
	
	/**
	 * Returns affected rows
	 */
	function affectedRows()
	{
		return $this->st->rowCount();
	}
	
	
	/**
	 * Insert id
	 */
	function lastInsertId()
	{
		return $this->conn->pdo->lastInsertId();
	}
	
	
	/**
	 * Execute sql query
	 */
	function executeSQL($builder)
	{
		/* Get sql */
		$sql = $builder->getSQL();
		$data = $builder->getData();
		
		$this->st = $this->conn->pdo->prepare(
			$sql, array(\PDO::ATTR_CURSOR => \PDO::CURSOR_FWDONLY)
		);
		$this->st->execute($data->toObject());
	}
	
	
	/**
	 * Close cursor
	 */
	function close()
	{
		if ($this->st) $this->st->closeCursor();
		$this->st = null;
	}
	
	
	/**
	 * Release connection
	 */
	function release()
	{
	}
	
	
	/**
	 * Fetch next row
	 */
	function fetchMap()
	{
		if ($this->st == null) return null;
		
		$row = $this->st->fetch(\PDO::FETCH_ASSOC);
		$row = ($row != null) ? \Runtime\Map::from($row) : null;
		
		return $row;
	}
}
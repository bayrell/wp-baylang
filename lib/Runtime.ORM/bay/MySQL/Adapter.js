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

const use = require("bay-lang").use;
const RuntimeMap = use("Runtime.Map");

class Adapter
{
	constructor()
	{
		this.pool = null;
		this.connection = null;
		this.st = null;
		this.connect_error = null;
	}
	
	
	/**
	 * Returns class name
	 */
	static getClassName()
	{
		return "Runtime.ORM.MySQL.Adapter";
	}
	
	
	/**
	 * Copy adapter
	 */
	copy()
	{
		let adapter = new Adapter();
		adapter.pool = this.pool;
		adapter.connection = this.connection;
		return adapter;
	}
	
	
	/**
	 * Connect
	 */
	async connect(pool)
	{
		try
		{
			let params = pool.params;
			let host = params.get("host");
			let port = params.get("port");
			let login = params.get("login");
			let password = params.get("password");
			let database = params.get("database");
			
			let config = {
				host: host,
				port: port || 3306,
				user: login,
				password: password,
				database: database,
				charset: 'utf8mb4',
				namedPlaceholders: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0,
				timezone: 'Z'
			};
			
			const mysql = require("mysql2/promise");
			this.pool = mysql.createPool(config);
		}
		catch (e)
		{
			this.connect_error = e.message;
			throw new Error('Failed connected to database!');
		}
	}
	
	
	/**
	 * Connect
	 */
	isConnected()
	{
		return this.pool != null;
	}
	
	
	/**
	 * Get new connection from pool
	 */
	async getConnection()
	{
		if (!this.pool)
		{
			throw new Error("Pool is not initialized");
		}
		this.connection = await this.pool.getConnection();
		
		/* Set session variables for UTF8 and UTC */
		try
		{
			/* Set character set to UTF8 */
			await this.connection.query("SET NAMES utf8mb4");
			
			/* Set session time to UTC */
			await this.connection.query("SET time_zone = '+00:00'");
		}
		catch (error)
		{
		}
		
		return this.connection;
	}
	
	
	/**
	 * Start transaction
	 */
	async beginTransaction()
	{
		if (!this.connection)
		{
			await this.getConnection();
		}
		await this.connection.beginTransaction();
	}
	
	
	/**
	 * Commit transaction
	 */
	async commit()
	{
		if (this.connection)
		{
			await this.connection.commit();
		}
	}
	
	
	/**
	 * Rollback transaction
	 */
	async rollback()
	{
		if (this.connection)
		{
			await this.connection.rollback();
		}
	}
	
	
	/**
	 * Returns affected rows
	 */
	affectedRows()
	{
		if (!this.st) return 0;
		return this.st.affectedRows || 0;
	}
	
	
	/**
	 * Insert id
	 */
	lastInsertId()
	{
		if (!this.st) return null;
		return this.st.insertId;
	}
	
	
	/**
	 * Execute sql query
	 */
	async executeSQL(builder)
	{
		/* Get sql */
		let sql = builder.getSQL();
		let data = builder.getData();
		
		/* Clear */
		this.st = null;
		
		/* Get connection */
		if (!this.connection)
		{
			await this.getConnection();
		}
		
		/* Execute query */
		let rows = null;
		try
		{
			if (data)
			{
				[rows] = await this.connection.execute(
					sql, data ? data.toObject() : null
				);
			}
			else
			{
				[rows] = await this.connection.query(sql);
			}
		}
		catch (error)
		{
			const OrmException = use("Runtime.ORM.Exceptions.OrmException");
			throw new OrmException(error.message);
		}
		finally
		{
			/*this.release();*/
		}
		
		/* Store result for affectedRows/lastInsertId */
		this.st = {
			affectedRows: rows.affectedRows,
			insertId: rows.insertId,
			rows: rows
		};
	}
	
	
	/**
	 * Close cursor
	 */
	close()
	{
		if (this.st) this.st = null;
	}
	
	
	/**
	 * Release connection
	 */
	release()
	{
		if (this.connection)
		{
			this.connection.release();
			this.connection = null;
		}
	}
	
	
	/**
	 * Fetch next row
	 */
	fetchMap()
	{
		if (!this.st || !this.st.rows || this.st.rows.length === 0) return null;
		
		let row = this.st.rows.shift();
		return row ? RuntimeMap.from(row) : null;
	}
}
use.add(Adapter);

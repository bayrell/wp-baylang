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
namespace Runtime\WordPress;
class EmailProvider extends \Runtime\BaseProvider
{
	public $settings;
	/**
	 * Returns settings
	 */
	function loadSettings()
	{
		if ($this->settings != null)
		{
			return ;
		}
		$this->settings = \Runtime\Map::from([]);
		$connection = \Runtime\ORM\Connection::get();
		$q = \Runtime\WordPress\Database\MailSettings::select()->where("enable", "=", 1);
		$items = $connection->fetchAll($q);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$this->settings->set($item->get("plan"), $item->toMap());
		}
	}
	/**
	 * Send email
	 */
	function send($params)
	{
		$plan = $params->get("plan", "default");
		$dest = $params->get("dest", "");
		$title = $params->get("title", "");
		$content = $params->get("content", "");
		$component = $params->get("component", "");
		$props = $params->get("props", \Runtime\Map::from([]));
		/* Render component */
		if ($component != "")
		{
			$render_container = new \Runtime\Web\RenderContainer();
			$render_container->createLayout("email");
			$render_container->layout->setPageTitle($title);
			$render_container->layout->setPageComponent($component, $props);
			$response = new \Runtime\Web\RenderResponse($render_container);
			$content = $response->getContent();
		}
		/* Get connection */
		$connection = \Runtime\ORM\Connection::get();
		/* Create email */
		$email = new \Runtime\WordPress\Database\MailDelivery();
		$email->set("worker", "email");
		$email->set("plan", $plan);
		$email->set("uuid", \Runtime\rs::uid());
		$email->set("dest", $dest);
		$email->set("title", $title);
		$email->set("message", $content);
		$email->set("gmtime_plan", null);
		$email->set("gmtime_send", null);
		/* Save email */
		$email->save($connection);
	}
	/**
	 * Send message
	 */
	function sendMessage($email)
	{
		if ($email == null)
		{
			return ;
		}
		if ($email->get("status") != 0)
		{
			return ;
		}
		$connection = \Runtime\ORM\Connection::get();
		/* Check settings */
		$plan = $email->get("plan");
		if (!$this->settings)
		{
			return ;
		}
		if (!$this->settings->has($plan))
		{
			$plan = "default";
		}
		if (!$this->settings->has($plan))
		{
			$email->set("status", -1);
			$email->set("send_email_error", "Settings not found");
			$email->save($connection);
			return ;
		}
		/* Get settings */
		$settings = $this->settings->get($plan);
		/* Check email */
		if ($email->get("dest") == "")
		{
			$email->set("status", -1);
			$email->set("send_email_error", "Destination is empty");
			$email->save($connection);
			return ;
		}
		/* Set email sending status */
		$email->set("status", 2);
		$email->set("send_email_code", 0);
		$email->set("send_email_error", "");
		$email->save($connection);
		
		/* Create message */
		$message = new \PHPMailer\PHPMailer\PHPMailer(true);
		$message->CharSet = "UTF-8";
		$message->SMTPAuth = true;
		$message->isSMTP();
		
		/* Set connection */
		$message->Host = $settings->get("host");
		$message->Username = $settings->get("login");
		$message->Password = $settings->get("password");
		$message->Port = $settings->get("port");
		
		/* SSL Options */
		if ($settings->get("ssl_enable") == 1)
		{
			$message->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
		}
		else if ($settings->get("ssl_enable") == 2)
		{
			$message->SMTPOptions = [
				'ssl' => [
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true,
				]
			];
		}
		else
		{
			$message->SMTPAutoTLS = false;
		}
		
		/* Create message */
		$message->setFrom($settings->get("login"));
		$message->isHTML(true);
		$message->Subject = $email->get("title");
		$message->Body = $email->get("message");
		
		/* Add email */
		$arr = \Runtime\rs::split(",", $email->get("dest"));
		$arr->each(function($item) use ($message){
			$message->addAddress(trim($item));
		});
		
		/* Try to send message */
		try
		{
			$message->send();
			$email->set("gmtime_send", \Runtime\DateTime::now());
			$email->set("status", 1);
			$email->set("send_email_error", "Ok");
			$email->save($connection);
		}
		catch (\Exception $e)
		{
			$email->set("status", 2);
			$email->set("status", -1);
			$email->set("send_email_code", -1);
			$email->set("send_email_error", $message->ErrorInfo);
			$email->save($connection);
		}
	}
	/**
	 * Send new messages
	 */
	function sendNewMessages()
	{
		$connection = \Runtime\ORM\Connection::get();
		$q = \Runtime\WordPress\Database\MailDelivery::select()->where("status", "=", 0);
		$items = $connection->findRelations($q);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$this->sendMessage($items->get($i));
		}
	}
	/* ======================= Class Init Functions ======================= */
	function _init()
	{
		parent::_init();
		$this->settings = null;
	}
	static function getNamespace()
	{
		return "Runtime.WordPress";
	}
	static function getClassName()
	{
		return "Runtime.WordPress.EmailProvider";
	}
	static function getParentClassName()
	{
		return "Runtime.BaseProvider";
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
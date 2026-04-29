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

use Runtime\BaseModel;
use Runtime\BaseProvider;
use Runtime\DateTime;
use Runtime\ORM\Connection;
use Runtime\ORM\Query;
use Runtime\ORM\QueryResult;
use Runtime\ORM\Record;
use Runtime\ORM\Relation;
use Runtime\Web\RenderContainer;
use Runtime\Web\RenderResponse;
use Runtime\WordPress\Database\MailDelivery;
use Runtime\WordPress\Database\MailSettings;
use Runtime\WordPress\Theme\Components\EmailModel;


class EmailProvider extends \Runtime\BaseProvider
{
	var $settings;
	
	
	/**
	 * Returns settings
	 */
	function loadSettings()
	{
		if ($this->settings != null) return;
		$this->settings = new \Runtime\Map();
		$relation = new \Runtime\ORM\Relation("Runtime.WordPress.Database.MailSettings");
		$q = $relation->select()->where("enable", "=", 1);
		$items = $relation->fetchAll($q);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$item = $items->get($i);
			$this->settings->set($item->get("plan"), $item);
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
		$props = $params->get("props", new \Runtime\Map());
		$model = $params->get("model", null);
		/* Render component */
		$render_container = new \Runtime\Web\RenderContainer();
		$render_container->createLayout("email");
		$render_container->layout->title = $title;
		if ($component != "")
		{
			$render_container->layout->setCurrentPage($component, $props);
		}
		else if ($model != null)
		{
			$render_container->layout->current_page_model = $model::getClassName();
			$render_container->layout->pages->set($render_container->layout->current_page_model, $model);
		}
		$content = $render_container->renderApp();
		/* Create email */
		$item = new \Runtime\WordPress\Database\MailDelivery();
		$item->worker = "email";
		$item->plan = $plan;
		$item->uuid = \Runtime\rs::uid();
		$item->dest = $dest;
		$item->title = $title;
		$item->message = $content;
		$item->gmtime_plan = null;
		$item->gmtime_send = null;
		/* Save email */
		$item->save();
	}
	
	
	/**
	 * Send message
	 */
	function sendMessage($email)
	{
		if ($email == null) return;
		if ($email->status != 0) return;
		/* Check settings */
		$plan = $email->plan;
		if (!$this->settings) return;
		if (!$this->settings->has($plan))
		{
			$plan = "default";
		}
		if (!$this->settings->has($plan))
		{
			$email->status = -1;
			$email->send_email_error = "Settings not found";
			$email->save();
			return;
		}
		/* Get settings */
		$settings = $this->settings->get($plan);
		/* Check email */
		if ($email->dest == "")
		{
			$email->status = -1;
			$email->send_email_error = "Destination is empty";
			$email->save();
			return;
		}
		/* Set email sending status */
		$email->status = 2;
		$email->send_email_code = 0;
		$email->send_email_error = "";
		$email->save();
		
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
		$message->Subject = $email->title;
		$message->Body = $email->message;
		
		/* Add email */
		$arr = \Runtime\rs::split(",", $email->dest);
		$arr->each(function($item) use ($message){
			$message->addAddress(trim($item));
		});
		
		/* Try to send message */
		try
		{
			$message->send();
			$email->gmtime_send = \Runtime\DateTime::now();
			$email->status = 1;
			$email->send_email_error = "Ok";
			$email->save();
		}
		catch (\Exception $e)
		{
			$email->status = -1;
			$email->send_email_code = -1;
			$email->send_email_error = $message->ErrorInfo;
			$email->save();
		}
	}
	
	
	/**
	 * Send new messages
	 */
	function sendNewMessages()
	{
		$relation = new \Runtime\ORM\Relation("Runtime.WordPress.Database.MailDelivery");
		$q = $relation->select()->where("status", "=", 0);
		$items = $relation->fetchAllRecords($q);
		for ($i = 0; $i < $items->count(); $i++)
		{
			$this->sendMessage($items->get($i));
		}
	}
	
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->settings = null;
	}
	static function getClassName(){ return "Runtime.WordPress.EmailProvider"; }
	static function getMethodsList(){ return null; }
	static function getMethodInfoByName($field_name){ return null; }
}
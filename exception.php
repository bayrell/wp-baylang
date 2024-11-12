<?php

/*!
 *  BayLang Constructor for WordPress
 *  (c) Copyright 2016-2024 "Ildar Bikmamatov" <support@elberos.org>
 */


/* Disable QueryMonitor handler */
add_filter('qm/dispatchers', function($dispatchers, $qm){
	
	unset($dispatchers['html']);
	//var_dump($dispatchers);
	
	return $dispatchers;
}, 999999, 2);


/* Disable WordPress default handler */
if (!defined('WP_DISABLE_FATAL_ERROR_HANDLER'))
{
	define('WP_DISABLE_FATAL_ERROR_HANDLER', true);
}

/* Exception handler */
set_exception_handler(function ($e){
	
	if (!$e) return;
	
	status_header(500);
	http_response_code(500);
	
	echo "<b>Fatal Error</b><br/>";
	echo nl2br($e->getMessage()) . "<br/>\n";
	echo "in file " . $e->getFile() . ":" . $e->getLine() . "<br>\n";
	echo nl2br($e->getTraceAsString()) . "<br/>\n";
	
	exit();
});

/* Shutdown функция */
register_shutdown_function(function(){
	
	$e = error_get_last();
	
	if (!$e) return;
	if (!($e['type'] & (E_ERROR | E_COMPILE_ERROR))) return;
	
	status_header(500);
	http_response_code(500);
	
	echo "<b>Fatal Error</b><br/>";
	echo nl2br($e['message']) . "<br/>\n";
	if (isset($e["file"]))
	{
		echo "in file " . $e["file"] . ":" . (isset($e["line"]) ? $e["line"] : 0) . "\n";
	}
	
});

add_filter(
	'pre_update_option_active_plugins',
	'debug_errors_pre_update_option_active_plugins', 999999
);
function debug_errors_pre_update_option_active_plugins($plugins)
{
	
	if ( empty( $plugins ) ) {
		return $plugins;
	}
	
	$name = plugin_basename(__FILE__);
	if (($key = array_search($name, $plugins)) !== false)
	{
		unset($plugins[$key]);
	}
	array_unshift($plugins, $name);
	
	return $plugins;
	
}

add_action
(
	'plugins_loaded',
	function ()
	{
		if (!defined('QM_ERROR_FATALS'))
		{
			define( 'QM_ERROR_FATALS', E_ERROR | E_PARSE | E_COMPILE_ERROR | E_USER_ERROR | E_RECOVERABLE_ERROR );
		}
	}
);
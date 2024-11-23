<?php
/**
 * Plugin Name: BayLang Constructor
 * Plugin URI:  https://github.com/bayrell/wp-baylang
 * Description: BayLang Constructor for WordPress
 * Version:     0.12.0
 * Author:      Ildar Bikmamatov <support@bayrell.org>
 * Author URI:  https://bayrell.org/ru/?utm_source=plugin&utm_campaign=wp-baylang
 * License:     GNU GENERAL PUBLIC LICENSE 3.0
 */

/* Check if Wordpress */
if (!defined('ABSPATH')) exit;


if ( !class_exists( 'BayLang_Plugin' ) )
{

class BayLang_Plugin
{
	static protected $container;
	static protected $context;
	static protected $loader = null;
	
	/**
	 * Init Plugin
	 */
	public static function init()
	{
		/* Admin init */
		add_action('admin_init', 'BayLang_Plugin::create_admin_context', 0);
		
		/* Register admin menu */
		add_action('admin_menu', 'BayLang_Plugin::register_admin_menu', 0);
		
		/* Runtime api */
		add_action('wp_ajax_admin_call_api', 'BayLang_Plugin::admin_call_api');
		
		/* Add admin script */
		add_action('baylang_admin_render_page', 'BayLang_Plugin::add_admin_script');
		add_action('admin_head', 'BayLang_Plugin::admin_head');
		add_action('admin_print_footer_scripts', 'BayLang_Plugin::admin_footer', 999999);
		
		/* Template init */
		add_action('wp', 'BayLang_Plugin::create_template_context', 0);
		
		/* Template scripts */
		add_action('wp_enqueue_scripts', 'BayLang_Plugin::add_template_script');
		
		/* Load languages */
		load_theme_textdomain('baylang', __DIR__ . '/languages');
		
		/* Remove plugin updates */
		add_filter('site_transient_update_plugins', function($value){
			$name = plugin_basename(__FILE__);
			if (isset($value->response[$name]))
			{
				unset($value->response[$name]);
			}
			return $value;
		});
	}
	
	
	/**
	 * Returns container
	 */
	public static function getContainer()
	{
		return static::$container;
	}
	
	
	/**
	 * Returns context
	 */
	public static function getContext()
	{
		return static::$context;
	}
	
	
	/**
	 * Returns loader
	 */
	public static function getLoader()
	{
		return static::$loader;
	}
	
	
	/**
	 * Init loader
	 */
	public static function initLoader()
	{
		if (static::$loader != null) return;
		static::$loader = require_once __DIR__ . "/vendor/autoload.php";
		
		/* Add autoloader */
		static::$loader->addPsr4("Runtime\\",  __DIR__ . "/lib/Runtime/php");
		static::$loader->addPsr4("Runtime\\Crypt\\",  __DIR__ . "/lib/Runtime.Crypt/php");
		static::$loader->addPsr4("Runtime\\ORM\\",  __DIR__ . "/lib/Runtime.ORM/php");
		static::$loader->addPsr4("Runtime\\Web\\",  __DIR__ . "/lib/Runtime.Web/php");
		static::$loader->addPsr4("Runtime\\Widget\\",  __DIR__ . "/lib/Runtime.Widget/php");
		static::$loader->addPsr4("Runtime\\WordPress\\",  __DIR__ . "/lib/Runtime.WordPress/php");
		static::$loader->addPsr4("Runtime\\XML\\",  __DIR__ . "/lib/Runtime.XML/php");
		
		/* Init loaders */
		do_action('init_loader', static::$loader);
	}
	
	
	/**
	 * Returns env
	 */
	public static function getEnv()
	{
		return [
			"CLOUD_ENV" => defined("WP_CLOUD_ENV") ? WP_CLOUD_ENV : false,
			"DEBUG" => defined("WP_DEBUG") ? WP_DEBUG : false,
			"LOCALE" => get_locale(),
			"TZ" => wp_timezone_string(),
			"TZ_OFFSET" => (double)\get_option("gmt_offset") * 3600,
		];
	}
	
	
	/**
	 * Create render container
	 */
	public static function create_render_container($params)
	{
		static::$container = $params->get("container");
	}
	
	
	/**
	 * Create admin context
	 */
	public static function create_admin_context()
	{
		/* Loader */
		static::initLoader();
		
		$init = [
			"entry_point" => "Runtime.WordPress.WP_App",
			"modules" => \Runtime\Vector::from([
				'Runtime.WordPress',
				'Runtime.WordPress.Admin',
			]),
			"environments" => \Runtime\Map::from(static::getEnv()),
		];
		do_action('init_admin_context', $init);
		
		/* Create context */
		$context = \Runtime\rtl::createContext(\Runtime\Map::from($init));
		
		/* Save context */
		static::$context = $context;
		
		/* Register hook */
		$hook = $context->provider("hook");
		$hook->register(
			\Runtime\Web\Hooks\AppHook::CREATE_CONTAINER,
			static::class, "create_render_container"
		);
		
		/* Call hooks */
		do_action('create_admin_context', $context);
		
		/* Start context */
		$context->start();
	}
	
	
	/**
	 * Create template context
	 */
	public static function create_template_context()
	{
		/* Loader */
		static::initLoader();
		
		/* Init context */
		$init = [
			"entry_point" => "Runtime.WordPress.WP_App",
			"modules" => \Runtime\Vector::from([
				"Runtime.WordPress",
			]),
			"environments" => \Runtime\Map::from(static::getEnv()),
		];
		do_action('init_template_context', $init);
		
		/* Create context */
		$context = \Runtime\rtl::createContext(\Runtime\Map::from($init));
		
		/* Save context */
		static::$context = $context;
		
		/* Register hook */
		$hook = $context->provider("hook");
		$hook->register(
			\Runtime\Web\Hooks\AppHook::CREATE_CONTAINER,
			static::class, "create_render_container"
		);
		
		/* Call hooks */
		do_action('create_template_context', $context);
		
		/* Start context */
		$context->start();
	}
	
	
	/**
	 * Admin bus call
	 */
	public static function admin_call_api()
	{
		if (!is_admin())
		{
			return ;
		}
		
		$context = \Runtime\rtl::getContext();
		
		/* Call api */
		$container = \Runtime\WordPress\WP_Helper::wp_admin_route
		(
			"runtime:web:api",
			function($container)
			{
				$container->route->addMatches(
					\Runtime\Collection::from([
						$container->request->payload->get("service"),
						$container->request->payload->get("api_name"),
						$container->request->payload->get("method_name")
					])
				);
			}
		);
		
		/* Send response */
		$app = $context->getApp();
		$app->sendResponse($container);
		
		exit();
	}
	
	
	/**
	 * Register Admin Menu
	 */
	public static function register_admin_menu()
	{
		add_menu_page
		(
			'BayLang', 'BayLang',
			'manage_options', 'baylang',
			function ()
			{
				echo "BayLang";
			},
			'/wp-content/plugins/wp-baylang/assets/form.png',
			30
		);
		
		add_submenu_page
		(
			'baylang',
			'Forms', 'Forms',
			'manage_options', 'baylang-forms',
			function ()
			{
				$action = isset($_GET["action"]) ? $_GET["action"] : "index";
				\Runtime\WordPress\WP_Helper::wp_render_page("admin:forms:data:" . $action);
			}
		);
		
		add_submenu_page
		(
			'baylang',
			'Forms settings', 'Forms settings',
			'manage_options', 'baylang-forms-settings',
			function()
			{
				$action = isset($_GET["action"]) ? $_GET["action"] : "index";
				\Runtime\WordPress\WP_Helper::wp_render_page(
					"admin:forms:settings:" . $action
				);
			}
		);
		
		add_submenu_page(
			'baylang',
			'Mail log', 'Mail log',
			'manage_options', 'baylang-mail-log',
			function()
			{
				\Runtime\WordPress\WP_Helper::wp_render_page("admin:mail:log:index");
			}
		);
		
		add_submenu_page(
			'baylang',
			'Mail settings', 'Mail settings',
			'manage_options', 'baylang-mail-settings',
			function()
			{
				\Runtime\WordPress\WP_Helper::wp_render_page("admin:mail:settings:index");
			}
		);
		
		add_submenu_page(
			'baylang',
			'Robots.txt', 'Robots.txt',
			'manage_options', 'baylang-robots-txt',
			function()
			{
				\Runtime\WordPress\WP_Helper::wp_render_page("admin:robots:txt");
			}
		);
	}
	
	
	/**
	 * Add admin script
	 */
	public static function add_admin_script()
	{
		$inc = "0.12";
		wp_enqueue_script(
			'vue',
			WP_DEBUG
			? '/wp-content/plugins/wp-baylang/assets/vue.runtime.global.js'
			: '/wp-content/plugins/wp-baylang/assets/vue.runtime.global.prod.js',
			[], $inc, true
		);
		wp_enqueue_script(
			'baylang-runtime',
			'/wp-content/plugins/wp-baylang/assets/runtime.js',
			[], $inc, true
		);
		wp_enqueue_script(
			'baylang-runtime-admin',
			'/wp-content/plugins/wp-baylang/assets/admin.js',
			['baylang-runtime'], $inc, true
		);
	}
	
	
	/**
	 * Add template script
	 */
	static function add_template_script()
	{
		$version = apply_filters("get_app_version", "0");
		wp_enqueue_script(
			'vue',
			WP_DEBUG
			? '/wp-content/plugins/wp-baylang/assets/vue.runtime.global.js'
			: '/wp-content/plugins/wp-baylang/assets/vue.runtime.global.prod.js',
			[], $version, true
		);
		wp_enqueue_script(
			'baylang-runtime',
			'/wp-content/plugins/wp-baylang/assets/runtime.js',
			[], $version, true
		);
	}
	
	
	/**
	 * Admin head
	 */
	public static function admin_head()
	{
		?>
		<script>
		window.$onReady=[];
		function onReady(f){ window.$onReady.push(f) };
		</script>
		<?
	}
	
	
	/**
	 * Admin footer
	 */
	public static function admin_footer()
	{
		?>
		<script>
		window.$onReady.forEach( function(f){ f(); } );
		</script>
		<?
	}
}


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


BayLang_Plugin::init();

}
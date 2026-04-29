<?php
/**
 * Plugin Name: BayLang Core (Source Code)
 * Plugin URI:  https://github.com/bayrell/wp-baylang
 * Description: BayLang Core for WordPress
 * Version:     1.2.0-20260228b
 * Author:      Ildar Bikmamatov <support@bayrell.org>
 * Author URI:  https://baylang.com/en/?utm_source=plugin&utm_campaign=wp-baylang
 * License:     GNU GENERAL PUBLIC LICENSE 3.0
 */

/* Check if Wordpress */
if (!defined('ABSPATH')) exit;

use Runtime\Loader;
use Runtime\Map;
use Runtime\Vector;
use Runtime\Entity\Provider;
use Runtime\WordPress\WP_Helper;


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
		/* Loader */
		static::initLoader();
		
		/* Admin init */
		add_action('admin_init', 'BayLang_Plugin::create_admin_context', 0);
		
		/* Register admin menu */
		add_action('admin_menu', 'BayLang_Plugin::register_admin_menu', 0);
		
		/* Runtime api */
		add_action('wp_ajax_admin_call_api', 'BayLang_Plugin::admin_call_api');
		
		/* Add admin script */
		add_action('admin_render_page', 'BayLang_Plugin::add_admin_script');
		add_action('admin_head', 'BayLang_Plugin::admin_head');
		add_action('admin_print_footer_scripts', 'BayLang_Plugin::admin_footer', 999999);
		
		/* Init wordpress */
		add_action('init', 'BayLang_Plugin::image_sizes');
		add_action('init', function(){
			do_action("init_loader");
		});
		
		/* Template init */
		add_action('wp', 'BayLang_Plugin::create_template_context', 0);
		
		/* Template scripts */
		add_action('wp_enqueue_scripts', 'BayLang_Plugin::add_template_script');
		add_action('wp_head', 'BayLang_Plugin::widget_page_scripts', 999999);
		
		/* Cron schedules */
		add_filter('cron_schedules', 'BayLang_Plugin::cron_schedules');
		
		/* Add Cron send mail */
		if ( !wp_next_scheduled('baylang_cron_send_mail' ))
		{
			wp_schedule_event(time() + 60, 'every_5_minute', 'baylang_cron_send_mail');
		}
		add_action('baylang_cron_send_mail', 'BayLang_Plugin::cron_send_mail');
		add_action('baylang_test', 'BayLang_Plugin::run_test');
		
		/* Robots tsxt */
		add_filter('robots_txt', 'BayLang_Plugin::robots');
		
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
	 * Returns version
	 */
	public static function getVersion()
	{
		return "1.2.0-20260228a";
	}
	
	
	/**
	 * Returns plugin path
	 */
	public static function getPath()
	{
		return dirname(__FILE__);
	}
	
	
	/**
	 * Init loader
	 */
	public static function initLoader()
	{
		if (static::$loader != null) return;
		
		/* Load file */
		require_once __DIR__ . "/lib/Runtime/bay/Loader.php";
		
		/* Loader init */
		spl_autoload_register([Loader::class, "load"]);
		
		/* Add autoloader */
		Loader::add("Runtime",  __DIR__ . "/lib/Runtime/php");
		Loader::add("Runtime.Auth",  __DIR__ . "/lib/Runtime.Auth/php");
		Loader::add("Runtime.Cabinet",  __DIR__ . "/lib/Runtime.Cabinet/php");
		Loader::add("Runtime.Console",  __DIR__ . "/lib/Runtime.Console/php");
		Loader::add("Runtime.Crypt",  __DIR__ . "/lib/Runtime.Crypt/php");
		Loader::add("Runtime.ORM",  __DIR__ . "/lib/Runtime.ORM/php");
		Loader::add("Runtime.Test",  __DIR__ . "/lib/Runtime.Test/php");
		Loader::add("Runtime.Unit",  __DIR__ . "/lib/Runtime.Unit/php");
		Loader::add("Runtime.Web",  __DIR__ . "/lib/Runtime.Web/php");
		Loader::add("Runtime.Widget",  __DIR__ . "/lib/Runtime.Widget/php");
		Loader::add("Runtime.Widget.Editor",  __DIR__ . "/lib/Runtime.Widget.Editor/php");
		Loader::add("Runtime.WordPress",  __DIR__ . "/lib/Runtime.WordPress/php");
		Loader::add("Runtime.XML",  __DIR__ . "/lib/Runtime.XML/php");
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
			"cabinet_auth_jwt_algo" => "HS512",
			"cabinet_auth_jwt_secret_key" => AUTH_KEY,
		];
	}
	
	
	/**
	 * Returns modules
	 */
	public static function get_baylang_modules()
	{
		return apply_filters("baylang_modules", []);
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
		/* Init context */
		$init = new Map([
			"providers" => new Vector(
				new Provider("app", "Runtime.WordPress.WP_App"),
			),
			"modules" => new Vector(
				"Runtime",
				"Runtime.Widget",
				"Runtime.WordPress",
				"Runtime.WordPress.Admin",
				"BayLang.Constructor.Backend",
				"BayLang.Constructor.Frontend",
			),
			"environments" => new Map(static::getEnv()),
			"base_path" => ABSPATH,
		]);
		
		/* Add unit test */
		if (WP_DEBUG)
		{
			$init->get("modules")->push("Runtime.Test");
			$init->get("modules")->push("Runtime.Unit");
		}
		
		/* Add modules */
		$modules = static::get_baylang_modules();
		if (in_array("cabinet", $modules))
		{
			$init->get("modules")->push("Runtime.Cabinet.Database");
		}
		
		/* Run action */
		do_action("init_admin_context", $init);
		
		/* Create context */
		$context = \Runtime\rtl::createContext($init);
		
		/* Register hook */
		$hook = $context->provider("hook");
		$hook->register(
			\Runtime\Hooks\RuntimeHook::CREATE_CONTAINER,
			new Runtime\Method(static::class, "create_render_container")
		);
		$hook->register(
			\Runtime\Widget\AppHook::ASSETS,
			new \Runtime\Method(static::class, "register_assets")
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
		/* Init context */
		$init = new Map([
			"providers" => new Vector(
				new Provider("app", "Runtime.WordPress.WP_App"),
			),
			"modules" => new Vector(
				"Runtime",
				"Runtime.WordPress",
				"Runtime.WordPress.Theme",
			),
			"environments" => new Map(static::getEnv()),
			"base_path" => ABSPATH,
		]);
		
		/* Add widget page */
		if (current_user_can("edit_pages"))
		{
			$init->get("modules")->appendItems(new \Runtime\Vector(
				"Runtime.WordPress.Admin",
				"BayLang.Constructor.Backend",
				"BayLang.Constructor.Frontend",
			));
		}
		
		/* Add unit test */
		if (WP_DEBUG)
		{
			/*$init->get("modules")->push("BayLang.Test");*/
			$init->get("modules")->push("Runtime.Test");
			$init->get("modules")->push("Runtime.Unit");
		}
		
		/* Add modules */
		$modules = static::get_baylang_modules();
		if (in_array("cabinet", $modules))
		{
			$init->get("modules")->push("Runtime.Cabinet");
		}
		
		/* Call action */
		do_action("init_template_context", $init);
		
		/* Create context */
		$context = \Runtime\rtl::createContext($init);
		
		/* Register hook */
		$hook = $context->provider("hook");
		$hook->register(
			\Runtime\Hooks\RuntimeHook::CREATE_CONTAINER,
			new \Runtime\Method(static::class, "create_render_container")
		);
		$hook->register(
			\Runtime\Widget\AppHook::ASSETS,
			new \Runtime\Method(static::class, "register_assets")
		);
		
		/* Call hooks */
		do_action('create_template_context', $context);
		
		/* Start context */
		$context->start();
	}
	
	
	/**
	 * Register assets
	 */
	public static function register_assets($params)
	{
		$baylang_url = plugin_dir_url(__FILE__);
		$assets = $params->get("assets");
		$assets->register("app", get_template_directory_uri() . "/Assets/images");
		$assets->register("core", $baylang_url . "assets");
		do_action("baylang_register_assets", $assets);
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
		$container = WP_Helper::renderPage
		(
			"runtime:web:api",
			new Map([
				"api_name" => isset($_GET["api_name"]) ? $_GET["api_name"] : "",
				"service" => isset($_GET["service"]) ? $_GET["service"] : "",
				"method_name" => isset($_GET["method_name"]) ? $_GET["method_name"] : "",
			])
		);
		
		/* Send response */
		http_response_code($container->response->http_code);
		echo $container->response->getContent();
		
		exit();
	}
	
	
	/**
	 * Cron schedules
	 */
	public static function cron_schedules($schedules)
	{
		$schedules['every_5_minute'] = array
		(
			'interval' => 300, // Каждые 5 минуты
			'display'  => 'Every 5 Minutes',
		);
		$schedules['every_10_minute'] = array
		(
			'interval' => 600, // Каждые 10 минуты
			'display'  => 'Every 10 Minutes',
		);
		return $schedules;
	}
	
	
	/**
	 * Cron send mail
	 */
	public static function cron_send_mail()
	{
		static::create_admin_context();
		
		/* Load PHP Mailer */
		require_once ABSPATH . "/wp-includes/PHPMailer/Exception.php";
		require_once ABSPATH . "/wp-includes/PHPMailer/PHPMailer.php";
		require_once ABSPATH . "/wp-includes/PHPMailer/SMTP.php";
		
		/* Send new message */
		$context = \Runtime\rtl::getContext();
		$provider = $context->provider("email");
		$provider->loadSettings();
		$provider->sendNewMessages();
	}
	
	
	/**
	 * Run test
	 */
	public static function run_test($args)
	{
		static::create_admin_context();
		
		$cmd = isset($args[0]) ? $args[0] : "";
		\Runtime\Unit\TestProvider::run($cmd);
	}
	
	
	/**
	 * Image sizes
	 */
	public static function image_sizes()
	{
		add_image_size('medium_top', 300, 300, ['center', 'top']);
	}
	
	
	/**
	 * Robots content
	 */
	public static function robots($output)
	{
		$content = WP_Helper::get_option("robots.txt");
		return $content ? $content : $output;
	}
	
	
	/**
	 * Disable adminbar
	 */
	static function disable_adminbar()
	{
		echo '<style id="disable-adminbar">
		html{
			margin-top: 0px !important;
		}
		html.wp-toolbar{
			padding-top: 0px;
		}
		#adminmenuwrap, #adminmenuback, #wpadminbar, #wpfooter{
			display: none;
		}
		#wpbody-content{
			padding-bottom: 0px;
		}
		#wpcontent{
			padding-left: 0px;
			margin-left: 0px;
		}
		.wp-helpers-notice, .notice-warning{
			display: none;
		}
		.root_container{
			background-color: white;
		}
		.root_container > .wrap{
			margin: 0px;
		}
		.root_container .wp-heading-inline{
			display: none !important;
		}
		</style>';
	}
	
	
	/**
	 * Register Admin Menu
	 */
	public static function register_admin_menu()
	{
		$baylang_url = plugin_dir_url(__FILE__);
		$modules = static::get_baylang_modules();
		
		add_menu_page
		(
			"BayLang", "BayLang",
			"manage_options", "baylang",
			function ()
			{
				echo "BayLang";
			},
			$baylang_url . "assets/baylang.png",
			30
		);
		
		if (in_array("form", $modules))
		{
			add_submenu_page
			(
				"baylang",
				"Forms", "Forms",
				"manage_options", "baylang-forms",
				function ()
				{
					$action = isset($_GET["action"]) ? $_GET["action"] : "index";
					$container = WP_Helper::renderPage("admin:forms:data:" . $action);
					WP_Helper::render($container);
				}
			);
			
			add_submenu_page
			(
				"baylang",
				"Forms settings", "Forms settings",
				"manage_options", "baylang-forms-settings",
				function()
				{
					$action = isset($_GET["action"]) ? $_GET["action"] : "index";
					$container = WP_Helper::renderPage("admin:forms:settings:" . $action);
					WP_Helper::render($container);
				}
			);
		}
		
		if (in_array("gallery", $modules))
		{
			add_submenu_page
			(
				"baylang",
				"Gallery", "Gallery",
				"manage_options", "baylang-gallery",
				function()
				{
					$action = isset($_GET["action"]) ? $_GET["action"] : "index";
					wp_enqueue_media();
					$container = WP_Helper::renderPage("admin:gallery:" . $action);
					WP_Helper::render($container);
				}
			);
		}
		
		if (in_array("email", $modules))
		{
			add_submenu_page(
				"baylang",
				"Mail log", "Mail log",
				"manage_options", "baylang-mail-log",
				function()
				{
					$container = WP_Helper::renderPage("admin:mail:log:index");
					WP_Helper::render($container);
				}
			);
			
			add_submenu_page(
				"baylang",
				"Mail settings", "Mail settings",
				"manage_options", "baylang-mail-settings",
				function()
				{
					$container = WP_Helper::renderPage("admin:mail:settings:index");
					WP_Helper::render($container);
				}
			);
		}
		
		if (in_array("cabinet", $modules))
		{
			add_submenu_page(
				"baylang",
				"Cabinet users", "Cabinet users",
				"manage_options", "baylang-cabinet-users",
				function()
				{
					$container = WP_Helper::renderPage(
						"admin:cabinet:users"
					);
					WP_Helper::render($container);
				}
			);
		}
		
		add_submenu_page(
			"baylang",
			"Database migrations", "Migrations",
			"manage_options", "baylang-migrations",
			function()
			{
				$container = WP_Helper::renderPage("admin:database:migrations");
				WP_Helper::render($container);
			}
		);
		
		add_submenu_page(
			"baylang",
			"Robots.txt", "Robots.txt",
			"manage_options", "baylang-robots-txt",
			function()
			{
				$container = WP_Helper::renderPage("admin:robots:txt");
				WP_Helper::render($container);
			}
		);
		
		do_action("baylang_admin_menu");
	}
	
	
	/**
	 * Add admin script
	 */
	public static function add_admin_script()
	{
		$baylang_url = plugin_dir_url(__FILE__);
		$version = static::getVersion();
		wp_enqueue_script(
			'vue',
			WP_DEBUG
			? $baylang_url . 'assets/vue.runtime.global.js'
			: $baylang_url . 'assets/vue.runtime.global.prod.js',
			[], $version, true
		);
		wp_enqueue_script(
			'baylang-runtime',
			$baylang_url . 'assets/runtime.js',
			[], $version, true
		);
		wp_enqueue_script(
			'baylang-runtime-admin',
			$baylang_url . 'assets/admin.js',
			['baylang-runtime'], $version, true
		);
		static::widget_page_scripts();
		if (WP_DEBUG && current_user_can("edit_pages"))
		{
			wp_enqueue_script(
				'baylang-runtime-test',
				$baylang_url . 'assets/test.js',
				['baylang-runtime'], $version, true
			);
		}
	}
	
	
	/**
	 * Add template script
	 */
	static function add_template_script()
	{
		$baylang_url = plugin_dir_url(__FILE__);
		$version = static::getVersion();
		wp_enqueue_script(
			'vue',
			WP_DEBUG
			? $baylang_url . 'assets/vue.runtime.global.js'
			: $baylang_url . 'assets/vue.runtime.global.prod.js',
			[], $version, true
		);
		wp_enqueue_script(
			'baylang-runtime',
			$baylang_url . 'assets/runtime.js',
			[], $version, true
		);
		if (WP_DEBUG && current_user_can("edit_pages"))
		{
			wp_enqueue_script(
				'baylang-runtime-test',
				$baylang_url . 'assets/test.js',
				['baylang-runtime'], $version, true
			);
		}
	}
	
	
	/**
	 * Widget page
	 */
	public static function widget_page_scripts()
	{
		if (current_user_can("edit_pages"))
		{
			$baylang_url = plugin_dir_url(__FILE__);
			$version = static::getVersion();
			
			/* Disable admin bar */
			/*if (
				static::$container->route &&
				static::$container->route->name == "baylang:widget:debug")
			{
				static::disable_adminbar();
			}*/
		}
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
	
	if (php_sapi_name() != 'cli')
	{
		status_header(500);
		http_response_code(500);
	}
	
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
	
	if (php_sapi_name() != 'cli')
	{
		status_header(500);
		http_response_code(500);
	}
	
	echo "<b>Fatal Error</b><br/>";
	echo nl2br($e['message']) . "<br/>\n";
	if (isset($e["file"]))
	{
		echo "in file " . $e["file"] . ":" . (isset($e["line"]) ? $e["line"] : 0) . "\n";
	}
	
});

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


/**
 * Render app
 */
function render()
{
	$container = WP_Helper::renderApp();
	
	/* Send response */
	$context = \Runtime\rtl::getContext();
	$app = $context->provider("app");
	$app->sendResponse($container);
}


/**
 * Render page
 */
function renderPage($page)
{
	$content = WP_Helper::renderPage($page);
	echo $content;
}


BayLang_Plugin::init();

}
<?php
namespace Runtime\Cabinet\Components\Blocks;

use Runtime\Auth\Models\UserData;
use Runtime\Cabinet\Models\CabinetSettings;
use Runtime\Cabinet\Models\Menu;
use Runtime\Cabinet\Providers\CabinetProvider;
use Runtime\Widget\Section;


class CabinetMenu extends \Runtime\Component
{
	function renderItem($item)
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		
		if ($item->isVisible())
		{
			/* Element li */
			$__v0 = $__v->element("li", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__item", $componentHash))])));
			
			/* Element a */
			$__v1 = $__v0->element("a", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__link", $componentHash)), "href" => $this->getItemUrl($item)])));
			
			if ($item->icon)
			{
				/* Element span */
				$__v2 = $__v1->element("span", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__icon", $componentHash))])));
				$__v2->push($item->icon);
			}
			
			/* Element span */
			$__v3 = $__v1->element("span", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__title", $componentHash))])));
			$__v3->push($item->title);
			
			if ($item->hasChildren())
			{
				/* Element ul */
				$__v4 = $__v0->element("ul", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__submenu", $componentHash))])));
				
				foreach ($item->getChildren() as $subitem)
				{
					$__v4->push($this->renderItem($subitem));
				}
			}
		}
		
		return $__v;
	}
	function render()
	{
		$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
		$__v = new \Runtime\VirtualDom($this);
		$__v->is_render = true;
		
		if ($this->isAuth)
		{
			/* Element Runtime.Widget.Section */
			$__v0 = $__v->element("Runtime.Widget.Section", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu", $componentHash))])));
			
			/* Content */
			$__v0->slot("default", function ()
			{
				$componentHash = \Runtime\rs::getComponentHash(static::getClassName());
				$__v = new \Runtime\VirtualDom($this);
				
				/* Element ul */
				$__v0 = $__v->element("ul", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__list cabinet_menu__list--menu", $componentHash))])));
				
				if ($this->cabinet_menu)
				{
					foreach ($this->cabinet_menu->getChildren() as $item)
					{
						$__v0->push($this->renderItem($item));
					}
				}
				
				/* Element ul */
				$__v1 = $__v->element("ul", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__list cabinet_menu__list--profile", $componentHash))])));
				
				/* Element li */
				$__v2 = $__v1->element("li", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__item", $componentHash))])));
				
				/* Element a */
				$__v3 = $__v2->element("a", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__link", $componentHash))])));
				
				/* Element span */
				$__v4 = $__v3->element("span", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__title", $componentHash))])));
				$__v4->push("Profile");
				
				/* Element ul */
				$__v5 = $__v2->element("ul", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu__submenu", $componentHash))])));
				
				if ($this->user_profile)
				{
					foreach ($this->user_profile->getChildren() as $item)
					{
						$__v5->push($this->renderItem($item));
					}
				}
				
				return $__v;
			});
		}
		else
		{
			/* Element div */
			$__v->element("div", (new \Runtime\Map(["class" => \Runtime\rs::className(new \Runtime\Vector("cabinet_menu_no_login", $componentHash))])));
		}
		
		return $__v;
	}
	/* Menu */
	var $menu;
	var $profile;
	/**
	 * Returns cabinet menu
	 */
	function cabinet_menu()
	{
		if ($this->menu) return $this->menu;
		return $this->layout->get("cabinet_menu");
	}
	/**
	 * Returns user profile menu
	 */
	function user_profile()
	{
		if ($this->profile) return $this->profile;
		return $this->layout->get("cabinet_profile");
	}
	/**
	 * Get item URL
	 */
	function getItemUrl($item)
	{
		if (\Runtime\rs::charAt($item->url, 0) == "/") return $item->url;
		$url = $this->layout->url($item->url, $item->url_params);
		return $url ? $url : $item->url;
	}
	/**
	 * Returns is auth
	 */
	function isAuth()
	{
		$provider = \Runtime\rtl::getContext()->provider("Runtime.Cabinet.Providers.CabinetProvider");
		if (!$provider) return false;
		$data = $provider->settings->getUserData($this->layout);
		if (!$data) return false;
		return true;
	}
	
	/* ========= Class init functions ========= */
	function _init()
	{
		parent::_init();
		$this->menu = null;
		$this->profile = null;
	}
	static function getComponentStyle(){ return ".cabinet_menu.h-c14{background-color: var(--color-surface);border-bottom: 1px solid var(--color-border);padding-top: 0 !important;padding-bottom: 0 !important}.cabinet_menu.h-c14 .section__wrap{display: flex;justify-content: space-between;align-items: center}.cabinet_menu__list.h-c14{display: flex;list-style: none;margin: 0;padding: var(--space);justify-content: flex-start;align-items: center}.cabinet_menu__list--menu.h-c14{flex: 1}.cabinet_menu__item.h-c14{position: relative}.cabinet_menu.h-c14 ul, .cabinet_menu.h-c14 li{padding: 0;margin: 0}.cabinet_menu.h-c14 ul{list-style: none}.cabinet_menu__link.h-c14{display: flex;align-items: center;padding: var(--space-half) var(--space);text-decoration: none;color: var(--color-link);font-size: var(--font-size);transition: background-color 0.2s;cursor: pointer;padding: var(--space)}.cabinet_menu__link.h-c14:hover{background-color: var(--color-default-hover)}.cabinet_menu__link--active.h-c14{background-color: var(--color-primary);color: var(--color-primary-text)}.cabinet_menu__icon.h-c14{margin-right: var(--space-half);font-size: 1.2em}.cabinet_menu__submenu.h-c14{position: absolute;top: 100%;background-color: var(--color-surface);border: 1px solid var(--color-border);border-radius: var(--border-radius);box-shadow: var(--shadow-medium);width: max-content;max-width: 250px;z-index: 100;display: none}.cabinet_menu__item:hover .cabinet_menu__submenu.h-c14{display: block}.cabinet_menu__list--menu .cabinet_menu__submenu.h-c14{left: 0}.cabinet_menu__list--profile .cabinet_menu__submenu.h-c14{right: 0}.cabinet_menu__submenu.h-c14 &__link{padding: var(--space-half) var(--space)}"; }
	static function getRequiredComponents(){ return new \Runtime\Vector("Runtime.Widget.Section"); }
	static function getClassName(){ return "Runtime.Cabinet.Components.Blocks.CabinetMenu"; }
}
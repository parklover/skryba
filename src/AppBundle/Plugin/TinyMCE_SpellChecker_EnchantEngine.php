<?php

namespace AppBundle\Plugin;

use AppBundle\Plugin\TinyMCE_SpellChecker_Engine;
use Symfony\Component\Config\Definition\Exception\Exception;

class TinyMCE_SpellChecker_EnchantEngine extends TinyMCE_SpellChecker_Engine {

	public function getSuggestions($lang, $words) {

		$suggestions = array();
		$enchant = enchant_broker_init();
		$config = $this->getConfig();
		dump($enchant);

		if (isset($config["enchant_dicts_path"])) {
		    dump($config["enchant_dicts_path"]);
            dump(enchant_broker_set_dict_path($enchant, ENCHANT_MYSPELL, $config["enchant_dicts_path"]));
            dump(enchant_broker_set_dict_path($enchant, ENCHANT_ISPELL, $config["enchant_dicts_path"]));
		}

		if (!enchant_broker_describe($enchant)) {
			throw new Exception("Enchant spellchecker not find any backends.");
		}

		$lang = $this->normalizeLangCode($enchant, $lang);
        dump($lang);

        dump(enchant_broker_list_dicts($enchant));

		if (enchant_broker_dict_exists($enchant, "pl_PL")) {
			$dict = enchant_broker_request_dict($enchant, "pl_PL");

			foreach ($words as $word) {
				if (!enchant_dict_check($dict, $word)) {
					$suggs = enchant_dict_suggest($dict, $word);

					if (!is_array($suggs)) {
						$suggs = array();
					}

					$suggestions[$word] = $suggs;
				}
			}

			enchant_broker_free_dict($dict);
			enchant_broker_free($enchant);
		} else {
			enchant_broker_free($enchant);
			dump("BRAK SLOWNIKA");
			throw new Exception("Enchant spellchecker could not find dictionary for language: " . $lang);
		}

		return $suggestions;
	}

	/**
	 * Return true/false if the engine is supported by the server.
	 *
	 * @return boolean True/false if the engine is supported.
	 */
	public function isSupported() {
		return function_exists("enchant_broker_init");
	}

	private function normalizeLangCode($enchant, $lang) {
		$variants = array(
			"en" => array("en_US", "en_GB")
		);

		if (isset($variants[$lang])) {
			array_unshift($variants, $lang);

			foreach ($variants[$lang] as $variant) {
				if (enchant_broker_dict_exists($enchant, $variant)) {
					return $variant;
				}
			}
		}

		return $lang;
	}
}


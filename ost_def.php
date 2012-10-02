<?php
function get_fb_option($key, $default) {
	$value = stripslashes(get_option($key));
	if ($value == '') {
		$value = $default;
	}
	
	return $value;
}
?>
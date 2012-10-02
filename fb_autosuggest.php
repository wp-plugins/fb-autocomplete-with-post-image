<?php
/*
Plugin Name: FB Autocomplete with post image
Plugin URI: 
Description: This plugin is an extended version of "FB-autosuggest" Wordpress plugin. FB Autocomplete with post image plugin fetch image from the post not from featured image . This plugin can be use to create members under some category. Another important thing about the plugin is that it is using wordpress own Jquery.
Author: OpenSource Technologies Pvt. Ltd, India
Version: 1.0
Author URI: http://www.opensourcetechnologies.com
Licensing : http://www.gnu.org/licenses/gpl-3.0.txt
*/
include 'ost_def.php';
$fb_action = '';
	$fb_keys = '';
	if(isset($_GET['fb_action'])) {
	$fb_action = $_GET['fb_action'];
	}
	if (isset($_GET['fb_query'])) {
	$fb_keys = $_GET['fb_query'];
	}
	if ($fb_action == 'query') {
	require_once ('../../../wp-config.php');
	global $wpdb;
	$fb_keys = str_replace(' ','%',$fb_keys);
	$pageposts = $wpdb->get_results("SELECT * FROM $wpdb->posts WHERE (post_title LIKE '%$fb_keys%') AND post_status = 'publish' ORDER BY post_date DESC limit 		".get_fb_option('fb_maxresults',10));
	$chars=get_fb_option('fb_chars',100);
	foreach ($pageposts as $post) {
	setup_postdata($post);
	$content=$post->post_content;
	$imgpattern = '/src=[\'"]?([^\'" >]+)[\'" >]/';
	preg_match($imgpattern, $content, $article_image);
	?>
	<div id="ellist">
	<a href="<?=the_permalink()?>" class="ev">
	<?php //the_post_thumbnail('thumbnail') 
	get_PostContent_without_image($content);
	if ($article_image[1]){
      $image=$article_image[1]; 
} else {
     //$image=ABSPATH.'wp-content/plugins/autosuggest/images/noimage.jpg';
$image=plugins_url( '/fb-autosuggest/noimage.jpg' , dirname(__FILE__) );
}?>
<img src="<?php echo $image; ?>" style="width:30px; height:30px; float:left; margin-right:6px; text-decoration:none; border:none;" />     
<b> <?php echo the_title(); ?> </b>
</a>  
</div>       
<?php
}
die();
}
define('AUTOSUGGEST_DIR', get_option('siteurl') . '/' . PLUGINDIR.'/'.dirname(plugin_basename(__FILE__)));
?>
<?php
function add_autosuggest_css() {
	wp_register_style('autosuggestCSS', AUTOSUGGEST_DIR . '/css/autosuggest.css', null, '1', 'screen');
	wp_enqueue_style('autosuggestCSS');
}

function add_autosuggest_js() {
  wp_enqueue_script( 'jquery' );
  wp_register_script('autosuggestJS', AUTOSUGGEST_DIR . '/js/autosuggest.js', null, '1');
  wp_enqueue_script('autosuggestJS');
}

function get_PostContent_without_image($content){
         $content = preg_replace('/<img[^>]+\>/',"", $content);
         return $content;
}
function add_autosuggest_footer_code() {
?>
<script type="text/javascript">
setAutoComplete('s','<?php echo AUTOSUGGEST_DIR; ?>/fb_autosuggest.php?fb_action=query&fb_query=',<?php echo get_fb_option('fb_width',300)?>,<?php echo get_fb_option('fb_margin',15)?>);
</script>
<?php
}
include 'functions/functions.php';
function add_autosuggest_menu_settings() {
	if (function_exists('add_options_page')) {
		 add_options_page(
		 	"AutoComplete"
		 	, "FB AutoComplete Settings"
		 	, 7
		 	, basename(__FILE__)
		 	, 'add_autosuggest_settings');
	}
}
add_action('wp_print_scripts', 'add_autosuggest_js');
add_action('wp_print_styles', 'add_autosuggest_css');
add_action('wp_footer', 'add_autosuggest_footer_code');
add_action('admin_menu', 'add_autosuggest_menu_settings');
?>

<?php function add_autosuggest_settings() {
?>
<div class="wrap">
	
	<?php
		$smsg = "";
		if (isset($_POST['updatesettings'])) {
			if (isset($_POST['fb_input_id'])) {
				update_option('fb_input_id',$_POST['fb_input_id']);
			}
			if (isset($_POST['fb_maxresults'])) {
				update_option('fb_maxresults',$_POST['fb_maxresults']);
			}
			if (isset($_POST['fb_width'])) {
				update_option('fb_width',$_POST['fb_width']);
			}
			if (isset($_POST['fb_margin'])) {
				update_option('fb_margin',$_POST['fb_margin']);
			}
			?>
			<div id="message" class="updated fade"><p>AutoComplete settings updated.</p></div>
	<?php } ?>     
	<h2>AutoComplete Settings</h2>
	<form action="" method="post">
	<table class="form-table">
		<tr valign="top">
		<th scope="row">Search Input ID</th>
		<td>
		<input type="text" value="<?php echo get_fb_option('fb_input_id','OST'); ?>" id="fb_input_id" name="fb_input_id"/><br/>
		Default value is 'OST'.
		</td>
		</tr>
		<tr valign="top">
		<th scope="row">Max Results</th>
		<td>
		<input type="text" value="<?php echo get_fb_option('fb_maxresults','10'); ?>" id="fb_maxresults" name="fb_maxresults"/><br/>
		Maximum number of suggested results (20 by default).
		</td>
    </tr>
    <tr>
    <th scope="row">Div width for serch results</th>
		<td>
		<input type="text" value="<?php echo get_fb_option('fb_width','250'); ?>" id="fb_width" name="fb_width"/><br/>
		Default width is 250px.
		</td>
    </tr>
    <tr>
    <th scope="row">Margin-top of div results</th>
		<td>
		<input type="text" value="<?php echo get_fb_option('fb_margin','15'); ?>" id="fb_margin" name="fb_margin"/><br/>
		Default margin is 15px.
		</td>    
		</tr>

	</table>
	<p class="submit"><input type="submit" name="updatesettings" value="Update Settings" /></p>
	</form>
	</div>
<?php
} ?>

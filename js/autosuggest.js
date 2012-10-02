var result_Count = 0;
var result_Selected = -1;
var delay = 500;
var searchPage = null;
var divResultsID = 'divAutoCompleteResults';
var txtSearchBox = null;
var divResults = null;
var ajaxRequest;
var apasat = false;
var tmout;
var ttop = 15;

function setAutoComplete(_0x8005xd, _0x8005xe, _0x8005xf, _0x8005x10) {
    if (_0x8005x10 != null) {
        ttop = _0x8005x10;
    };
    divResultsID = 'divAutoCompleteResults_' + _0x8005xd;
    searchPage = _0x8005xe;
    txtSearchBox = jQuery('#' + _0x8005xd);
    txtSearchBox['attr']('autocomplete', 'off');
    txtSearchBox['attr']('searchPage', searchPage);
    createResultsDiv(_0x8005xf);
    txtSearchBox['blur'](function () {
        setTimeout('ascundeResults()', 200);
    });
    txtSearchBox['keyup'](function (_0x8005x11) {
        asociazaElement(this);
        var _0x8005x12 = _0x8005x11['keyCode'] || window['event']['keyCode'];
        if (_0x8005x12 == 27) {
            clearResults();
            return;
        };
        lastSearch = jQuery('#' + divResultsID)['attr']('ultima');
        setTimeout(function () {
            updateResults(lastSearch);
        }, delay);
        apasat = false;
        clearTimeout(tmout);
    });
    txtSearchBox['keydown'](function (_0x8005x11) {
        asociazaElement(this);
        var _0x8005x12 = _0x8005x11['keyCode'] || window['event']['keyCode'];
        if (OnUpDownClick(_0x8005x12)) {
            return;
        };
        if (_0x8005x12 == 13) {
            if (divResults['find']('.selected')['length'] > 0) {
                OnEnterClick();
                return false;
            };
        };
    });
    txtSearchBox['mouseup'](function (_0x8005x11) {
        asociazaElement(this);
        lastSearch = divResults['attr']('ultima');
        if (lastSearch == encodeURIComponent(txtSearchBox['val']())) {
            if (divResults['html']() != '') {
                arataRezultate();
            };
            return;
        };
        setTimeout(function () {
            updateResults(lastSearch);
        }, delay);
    });
    txtSearchBox['focus'](function (_0x8005x11) {
        asociazaElement(this);
        lastSearch = divResults['attr']('ultima');
        if (lastSearch == encodeURIComponent(txtSearchBox['val']())) {
            if (divResults['html']() != '') {
                arataRezultate();
            };
            return;
        };
        setTimeout(function () {
            updateResults(lastSearch);
        }, delay);
    });
};

function updateResults(_0x8005x14) {
    var _0x8005x15 = encodeURIComponent(txtSearchBox['val']());
    if (_0x8005x15 == '') {
        clearResults();
        return;
    };
    if (divResults['attr']('ultima') == encodeURIComponent(txtSearchBox['val']())) {
        return;
    };
    if (ajaxRequest != null) {
        ajaxRequest['abort']();
        ajaxRequest = null;
    };
    divResults['attr']('ultima', _0x8005x15);
    ajaxRequest = jQuery['ajax']({
        type: 'GET',
        url: searchPage + _0x8005x15,
        cache: false,
        success: function (_0x8005x16) {
            var _0x8005x17 = jQuery(_0x8005x16);
            var _0x8005x18 = _0x8005x17['length'];
            if (_0x8005x18 > 0) {
                divResults['html'](_0x8005x16);
                arataRezultate();
                var _0x8005x19 = jQuery('#' + divResultsID)['find']('#ellist');
                result_Count = _0x8005x19['size']();
                _0x8005x19['mouseover'](function () {
                    _0x8005x19['each'](function () {
                        jQuery(this)['removeClass']('selected');
                    });
                    jQuery(this)['addClass']('selected');
                });
                _0x8005x19['click'](function () {});
            } else {
                clearResults();
            };
        }
    });
};

function clearResults() {
    divResults['html']('');
    divResults['css']('display', 'none');
    divResults['attr']('ultima', '');
};

function ascundeResults() {
    divResults['css']('display', 'none');
};

function createResultsDiv(_0x8005xf) {
    if (jQuery('#' + divResultsID)['length'] == 0) {
        jQuery('body')['append']('<div class="divAutoCompleteResults" id="' + divResultsID + '"></div>');
    };
    divResults = jQuery('#' + divResultsID);
    var _0x8005x1d = txtSearchBox['offset']();
    var _0x8005x1e = _0x8005x1d['top'];
    var _0x8005x1f = _0x8005x1d['left'];
    var _0x8005x20 = txtSearchBox['height']();
    var _0x8005x21 = txtSearchBox['width']();
    divResults['css']('position', 'absolute');
    divResults['css']('left', _0x8005x1f - 2);
    divResults['css']('top', _0x8005x1e + _0x8005x20 + ttop);
    if (_0x8005xf == null) {
        _0x8005xf = _0x8005x21 * 1.5 - 2;
    };
    divResults['css']('width', _0x8005xf);
};

function OnUpDownClick(_0x8005x12) {
    if (_0x8005x12 == 40 || _0x8005x12 == 38) {
        apasat = true;
        if (_0x8005x12 == 38) {
            if (result_Selected == 0 || result_Selected == -1) {
                result_Selected = result_Count - 1;
            } else {
                result_Selected--;
            };
        } else {
            if (result_Selected == result_Count - 1) {
                result_Selected = 0;
            } else {
                result_Selected++;
            };
        };
        divResults['find']('#ellist')['each'](function (_0x8005x23) {
            if (_0x8005x23 == result_Selected) {
                jQuery(this)['addClass']('selected');
            } else {
                jQuery(this)['removeClass']('selected');
            };
        });
    } else {
        apasa = false;
        result_Selected = -1;
    };
    clearTimeout(tmout);
    if (apasat) {
        tmout = setTimeout(function () {
            OnUpDownClick(_0x8005x12);
        }, 100);
    };
};

function OnEnterClick() {
    window['location'] = divResults['find']('.selected')['find']('.ev')['attr']('href');
    clearResults();
};

function asociazaElement(_0x8005x26) {
    searchBoxID = jQuery(_0x8005x26)['attr']('id');
    divResultsID = 'divAutoCompleteResults_' + searchBoxID;
    divResults = jQuery('#' + divResultsID);
    txtSearchBox = jQuery('#' + searchBoxID);
    searchPage = txtSearchBox['attr']('searchPage');
    dimensioneazaRezultate();
};

function arataRezultate() {
    var _0x8005x19 = jQuery('.divAutoCompleteResults');
    _0x8005x19['each'](function () {
        if (this != divResults) {
            jQuery(this)['hide']();
        };
    });
    divResults['show']();
};

function dimensioneazaRezultate() {
    var _0x8005x1d = txtSearchBox['offset']();
    var _0x8005x1e = _0x8005x1d['top'];
    var _0x8005x1f = _0x8005x1d['left'];
    var _0x8005x20 = txtSearchBox['height']();
    var _0x8005x21 = txtSearchBox['width']();
    divResults['css']('left', _0x8005x1f - 2);
    divResults['css']('top', _0x8005x1e + _0x8005x20 + ttop);
    divResults['css']('z-index', 9999);
};
jQuery(window)['resize'](function () {
    if (divResultsID != '') {
        if (divResults['is'](':visible')) {
            dimensioneazaRezultate();
        };
    };
});
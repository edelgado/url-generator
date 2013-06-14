// Popover after copying
$("#copy_URL").popover({trigger: 'manual', placement: 'top', content: 'Copied!'});
// Adjust (c) year
$("#current-year").html(new Date().getFullYear());
// Allow copying generated URL
ZeroClipboard.setDefaults( { moviePath: 'other/ZeroClipboard.swf' } );
var clip = new ZeroClipboard($("#copy_URL"));
clip.on('complete', function(client, args) {
  // Trigger popover
  $("#copy_URL").popover('show');
  setTimeout(function(){
    $("#copy_URL").popover('hide');
  }, 1000);
});
$('#add-param').click(function(e){
  addParam();
  e.preventDefault();
});
$('#query-strings').click(function(e){
  var target = $(e.target);
  if (target.hasClass('remove-param')) {
    target.parents('div.controls').remove();
    console.log('I crush you!');
    e.preventDefault();
  }
});
addParam();

function addParam(){
    $('#query-strings').append(
    '<div class="controls controls-row">' + 
    '  <input class="span3" type="text" placeholder="key">' +
    '  <input class="span4" type="text" placeholder="value">' + 
    '  <a class="span1 btn remove-param" href="#"><i class="icon-remove remove-param"></i></a>' + 
    '</div>'
  );
};

// Credit: http://phpjs.org/functions/http_build_query/
function http_build_query (formdata, numeric_prefix, arg_separator) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Legaev Andrey
  // +   improved by: Michael White (http://getsprink.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +    revised by: stag019
  // +   input by: Dreamer
  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: MIO_KODUKI (http://mio-koduki.blogspot.com/)
  // %        note 1: If the value is null, key and value is skipped in http_build_query of PHP. But, phpjs is not.
  // -    depends on: urlencode
  // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
  // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
  // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
  var value, key, tmp = [],
    that = this;

  var _http_build_query_helper = function (key, val, arg_separator) {
    var k, tmp = [];
    if (val === true) {
      val = "1";
    } else if (val === false) {
      val = "0";
    }
    if (val != null) {
      if(typeof val === "object") {
        for (k in val) {
          if (val[k] != null) {
            tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
          }
        }
        return tmp.join(arg_separator);
      } else if (typeof val !== "function") {
        return that.urlencode(key) + "=" + that.urlencode(val);
      } else {
        throw new Error('There was an error processing for http_build_query().');
      }
    } else {
      return '';
    }
  };

  if (!arg_separator) {
    arg_separator = "&";
  }
  for (key in formdata) {
    value = formdata[key];
    if (numeric_prefix && !isNaN(key)) {
      key = String(numeric_prefix) + key;
    }
    var query=_http_build_query_helper(key, value, arg_separator);
    if(query !== '') {
      tmp.push(query);
    }
  }

  return tmp.join(arg_separator);
}
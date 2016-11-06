function show_pin_link()
{
    $("#pinbox").html("");
    
    if (localStorage["pin_" + afterLast(location.pathname, '/')] === "true")
    {
        unpin_link = $("<a></a>");
        unpin_link.text("unpin");
        unpin_link.attr("href", "#");
        unpin_link.click(function(ev)
        {
            ev.preventDefault();
            delete localStorage["pin_" + afterLast(location.pathname, '/')];
            show_pin_link();
        });
        
        $("#pinbox").append(unpin_link);
    }
    else
    {
        pin_link = $("<a></a>");
        pin_link.text("pin");
        pin_link.attr("href", "#");
        pin_link.click(function(ev)
        {
            ev.preventDefault();
            localStorage["pin_" + afterLast(location.pathname, '/')] = "true";
            show_pin_link();
        });
        
        $("#pinbox").append(pin_link);
    }
}

$(function()
{
    console.log(localStorage);
	
    $(".page-title").append('<span id="pinbox"></span>');
    show_pin_link();
    
    pinned_examples = $("<div></div>");
    pinned_examples.append("<h2>Pinned examples</h2>");
    
    pinned_examples.insertBefore(".page-content h2:first");
    examples_list = $("<ul></ul>");
    
    $(".page-content ul li, .page-content div ul li").each(function(index, el)
    {
        is_example_pinned = false;
        
        $(el).find("a").each(function(a_index, a_el)
        {
            if (localStorage["pin_" + afterLast(a_el.pathname, '/')] === "true" 
				&& afterLast(a_el.pathname, '/') !== afterLast(location.pathname, '_'))
                is_example_pinned = true;
        });
        
        if (is_example_pinned)
            examples_list.append($(el).clone());
    });
    
    pinned_examples.append(examples_list);
});

function afterLast(input, c) {
	var parts = input.split(c);
	return answer = parts[parts.length - 1];
}
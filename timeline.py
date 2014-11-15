# A Python program for generating HTML documents that show timelines
import csv
import colorsys

# Indexes of each column
year        = 0
event       = 1
category    = 2
description = 3

# List of HTML nodes
node_list = []
style_list = []
index_nodes = []

# Dictionary of colors
# Starts with defaults and gets changed later
category_colors = {}

# Read the CSV file
with open('events.csv', newline='') as csvfile:
	event_reader = csv.reader(csvfile, delimiter=',', quotechar='"')
	for index, row in enumerate(event_reader):
		if (index) == 0:
			year        = row.index('Year')
			event       = row.index('Event')
			category    = row.index('Category')
			description = row.index('Description')
		else:
			node_list.append("<div event-year='%s' class='event %s'>\n\t<h1>%s</h1>\n\t<span>%s</span>\n</div>\n" % (row[year], row[category], row[event], row[description]))
			category_colors[row[category]] = '#FFFFFF'

html_content = '\n'.join(node_list)

# Choose the category colors
color_div = len(category_colors.keys())
for index, key in enumerate(category_colors.keys()):
	new_hue = index / color_div
	new_rgb = colorsys.hsv_to_rgb(new_hue, 0.5, 0.5)
	hex_color = '#%02x%02x%02x' % (new_rgb[0]*255, new_rgb[1]*255, new_rgb[2]*255)
	category_colors[key] = hex_color
	style_list.append(".%s { color: %s; }" % (key, hex_color))

for key in category_colors.keys():
	index_nodes.append('<p class="%s">&squf; %s</p>' % (key, key))

# Create the page
style_content = '\n\t'.join(style_list)
css_node = "<style>\n\t%s\n</style>" % (style_content)
css_external_node = '<link rel="stylesheet" type="text/css" href="style.css"></link>'
js_jquery_node = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>'
js_external_node = '<script src="align.js" type="text/javascript"></script>'
index_node = '<div id="index">%s\n</div>' % ("\n".join(index_nodes))

html_site = "<html>\n%s\n<body>\n%s\n%s\n%s\n%s\n%s\n</body></html>" % (js_jquery_node, html_content, index_node, css_node, css_external_node, js_external_node)

# Save the page file
with open('timeline.html', 'w') as htmlfile:
	htmlfile.write(html_site)
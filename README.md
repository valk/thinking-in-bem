Thinking in BEM
===============

First, you *must enter* the css directory and run:

scss --watch presentation.scss:presentation.css

In Chrome -> Dev Tools -> Settings -> Workspace

Add the directory, then Url Prefix: localhost:1234/, and folder path: /path/to/repo


Start a webserver on port 1234, like

ruby -run -ehttpd . -p1234


Go to localhost:1234 and enjoy.



Compilation and running
=======================

With foreman:

> foreman s


Manually:

To tweak compile index.slim into index.html whenever the former changes:

> filewatcher 'index.slim' 'slimrb index.slim > index.html'

> sass --watch .:.



Writing a slideshow
===================

Slides are written in Slim format under slim/ directory. Any page can have any name, and they don't have to be numbered at all. A special debug=true parameter in URL, like in http://localhost:1234?debug=true will reveal the file name for the given slide. The order of the pages is defined in index.slim slides = [] array.

You jump to any page by adding ?page=P or ?p=P parameter to the URL, e.g. http://localhost:1234??page=1.



Disclaimer
==========

This presentation is a tweaked version, originally taken from the following repo.

Credits to http://tympanus.net/codrops/licensing/

License: Use as you wish. But add credits to this repo.

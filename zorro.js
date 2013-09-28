/*
* ZorroJS - The transparency of PNGs for the file size of JPEGs
*
* Version 1.0
*
* Visit http://quasimondo.com/ZorroJS for documentation, updates and examples.
* The latest version can be found on http://github.com/Quasimondo/ZorroJS
*
* Copyright (c) 2013 Mario Klingemann
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

// namespace:
this.zorro = this.zorro||{};

zorro.mask = function( img ) 
{
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var context = canvas.getContext("2d");
	context.drawImage(img, 0, 0);
	
	var imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
	try
	{
		var buf8 = new Uint8Array(imagedata.data.buffer);
	} catch (error)
	{
		var buf8 = imagedata.data;
	}
	var l = buf8.length>>1;
	for ( var i = l-4; i > -l; i-=4 )
	{
		buf8[i+3] = buf8[i+l];
	}
	
	canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height * 0.5;
	context = canvas.getContext("2d");
	context.putImageData( imagedata, 0, 0);
	
	img.parentNode.replaceChild(canvas, img);
}
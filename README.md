
### Installing

##### Node server

run npm install to install the node modules

run npm install -g nodemon to globally install nodemon to allow for hot reloading


##### Max
you'll need to make sure you have the OpenSoundControl Max package installed.


### Running

run nodemon index.ts to start the server

Add the livecode_midi_effect Max device to any midi track. 

Open the editor window for a clip on that track, and also open the device view beneath the clip view (only possible in Live 12).
- the device automatically acts on whatever clip is active in the clip view

Live code any function to transform the input notes in Node, and nodemon will update the node server. 

Press the "call get_all_notes_extended" button in the max for live device to trigger the transformation.


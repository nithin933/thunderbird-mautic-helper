## Mautic Thunderbird Helper

Simple addon created using the existing gmail helper plugin.

###Steps to make Add-On
1. git clone https://github.com/nithin933/thunderbird-mautic-helper.git
2. cd thunderbird-mautic-helper
3. open background.js and edit **mautic_secret**, **mautic_url**, **SENDEREMAILID**
4. Compress all the files into a zip file (not the parent folder)
5. Rename file to **.xpi** extention
6. install addon from thunderbird addon manager

###Steps to prepare Mautic
1. Enable Gmail Plugin
2. Enter the same secret used above


###Usage
Start composing a new mail and click on the **"Add Tracker"** button to add tracking url.

###Limitation
1.Apart from tracking sent mail and all subsequent reads correctly, all mails are marked read because of how thunderbird processes URL's.(This was also an issue that existed with the gmail plugin)

If some can figure out how to filter out email-read receipts from thunderbird in the server side, this would be near perfect.
2. My use case involves sending all emails from one user/email, but that being said, the plugin will work with anyone provided the secret and mautic url match.
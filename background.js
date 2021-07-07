browser.composeAction.onClicked.addListener(async (tab) => {
  let details = await browser.compose.getComposeDetails(tab.id);
  console.log(details);

  if (details.isPlainText) {
    let body = details.plainTextBody;

    console.log("this be plain text, go html");
  } else {
    let document = new DOMParser().parseFromString(details.body, "text/html");

    if (!details.to) {
      console.log("no recipient");

      return;
    } else if (!details.subject) {
      console.log("no sub");

      return;
    } else if (!document) {
      console.log("no body");
      return;
    } else {
      mautic_secret = "examplesecret";
      mautic_url = "https://mautic.example.com"; // like https://mautic.example.com

      var qs =
        "from=" +
        encodeURIComponent("SENDEREMAILID") +
        "&email=" +
        encodeURIComponent(details.to[0]) +
        "&subject=" +
        encodeURIComponent(details.subject) +
        "&body=" +
        encodeURIComponent(details.body);
      console.log("to: ", details.to[0]);
      console.log("subject: ", details.subject);

      console.log("qs: ", qs);
      var d = encodeURIComponent(btoa(pako.gzip(qs, { to: "string" })));
      console.log("d: ", d);

      var cr = CryptoJS.PHP_CRYPT_MD5(d, "$1$" + mautic_secret);

      console.log("cr: ", cr);

      var hash = crc32(cr).toString();
      while (hash.length < 8) hash = "0" + hash.toString();
      console.log("hash: ", hash);

      var trackingGif =
        '<img style="display: none;" height="1" width="1" src="' +
        mautic_url +
        "/plugin/Gmail/tracking.gif?d=" +
        d +
        "&sig=" +
        hash +
        '" ' +
        'alt="ThunderMautic">';
      console.log(trackingGif);

      if (document.getElementById("mtech")) {
        document.getElementById("mtech").remove();
      }

      let para = document.createElement("p");
      para.setAttribute("id", "mtech");
      para.innerHTML = trackingGif;
      document.body.appendChild(para);

      let html = new XMLSerializer().serializeToString(document);
      console.log(html);
      browser.compose.setComposeDetails(tab.id, { body: html });
    }
  }
});

(function () {
  window.MLL = window.MLL || {};

  window.MLL.buildViewerUrl = (uid) => {
  return `${location.origin}/view.html?uid=${uid}`;
};


  window.MLL.renderQrToCanvas = (canvas, text) =>
    new Promise((res, rej) =>
      QRCode.toCanvas(canvas, text, { width: 220 }, err =>
        err ? rej(err) : res()
      )
    );

  window.MLL.downloadCanvasPng = (canvas, name) => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = name;
    a.click();
  };
})();

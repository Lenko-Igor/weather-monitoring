function readTextFile(file, callback) {
    let rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType('application/json')
    rawFile.open('GET', file, true)
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == '200') {
            callback(rawFile.responseText)
        }
    }
    rawFile.send(null)
}

readTextFile('./data.json', function(text){
  citysData = JSON.parse(text)
  $(function () {
    $("#input").autocomplete({
      source: citysData,
      minLength: 3,
      autofocus: true,
    });
  });
});


function uploadFile(inputElement) {
    var file = inputElement.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      console.log('Encoded Base 64 File String:', reader.result);
      
      /******************* for Binary ***********************/
      var data=(reader.result).split(',')[1];
       var binaryBlob = atob(data);
       console.log('Encoded Binary File String:', binaryBlob);
    }
    reader.readAsDataURL(file);
  }

  const reader = new FileReader();
      reader.onload = (e) => {
        return e.target.result;
      };
      reader.onerror = (e) => {
        console.log("Error : " + e.type);
      };
      reader.readAsBinaryString(photo)
const plainText = document.querySelector('#plaintext')
const key = document.querySelector('#key')
const chipertext = document.querySelector('#chipertext')
const coverImage = document.querySelector('#coverImage')
const textBefore = document.querySelector('.text-before')
const textAfter = document.querySelector('.text-after')
const previewBefore = document.querySelector("#previewBefore")
const previewAfter = document.querySelector("#previewAfter")
const stegoImage = document.querySelector('#stegoImage')
const keyDecrypt = document.querySelector('#keyDecrypt')
const previewStegoImage = document.querySelector('.previewStegoImage')
const textStegoImage = document.querySelector('.textStegoImage')
const resultDecrypt = document.querySelector('#resultDecrypt')
let result

const encryptCrypto = () => {
   setTimeout(() => {
   if(plainText.value === '' || key.value === '') {
      chipertext.innerHTML = ''

      return;
   }
   const result = caesarShift(plainText.value, parseInt(key.value))
   chipertext.innerHTML = result
   }, 400);
}


var caesarShift = function (str, amount) {
   // Wrap the amount
   if (amount < 0) {
   return caesarShift(str, amount + 26);
   }
   // Make an output variable
   var output = "";

   // Go through each character
   for (var i = 0; i < str.length; i++) {
   // Get the character we'll be appending
   var c = str[i];

   // If it's a letter...
   if (c.match(/[a-z]/i)) {
      // Get its code
      var code = str.charCodeAt(i);

      // Uppercase letters
      if (code >= 65 && code <= 90) {
         c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      }

      // Lowercase letters
      else if (code >= 97 && code <= 122) {
         c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
   }

   // Append
   output += c;
   }

   // All done!
   return output;
};

const handleCoverImage = (e) => {
   let extension = coverImage.value.substring(coverImage.value.lastIndexOf('.')  + 1)
   if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
      if (e.files && e.files[0]) {
         var reader = new FileReader();
   
         reader.onload = function(e) {
            checkTextBefore()
            previewBefore.src = e.target.result;
            result = e.target.result;
         };
      }
      reader.readAsDataURL(e.files[0]);
   }
}

const checkTextBefore = () => {
   if(textBefore.value !== '') {
      return textBefore.innerHTML = 'Before'
   }
   
   return 
}

const checkTextAfter = () => {
   if(textAfter.value !== '') {
      return textAfter.innerHTML = 'After (Click right and save image)'
   }

   return
}

const handleCombine = () => {
   if(plainText.value === '') {
      chipertext.innerHTML = ''
      return alert('Plaintext masih kosong!')
   } else if(key.value === '') {
      chipertext.innerHTML = ''
      return alert('Key masih kosong!')
   } else if(coverImage.value === '') {
      return alert('Cover Image masih kosong!')
   }

   let extension = coverImage.value.substring(coverImage.value.lastIndexOf('.')  + 1)
   if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
      checkTextAfter()
      previewAfter.src = steg.encode(chipertext.value, result);

   }
}

const handleStegoImage = (e) => {
   let extension = stegoImage.value.substring(stegoImage.value.lastIndexOf('.')  + 1)
   if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
      if (e.files && e.files[0]) {
         var reader = new FileReader();
   
         reader.onload = function(e) {
            previewStegoImage.style.marginBottom = '30px'
            previewStegoImage.src = e.target.result;
         };
      }
      reader.readAsDataURL(e.files[0]);
   }
}

const alertDisplay = (strongText, info) => {
   let alertTag = document.createElement('div')
   alertTag.classList.add("alert","alert-warning", "alert-dismissible", "fade", "show")
   alertTag.setAttribute('role', 'alert')

   let strongTag = document.createElement('strong')
   strongTag.innerHTML = strongText

   let buttonTag = document.createElement('button')
   buttonTag.classList.add('close')
   buttonTag.setAttribute('type', 'button')
   buttonTag.setAttribute('data-dismiss', 'alert')
   buttonTag.setAttribute('aria-label', 'Close')

   let spanTag = document.createElement('span')
   spanTag.setAttribute('aria-hidden', 'true')
   spanTag.innerHTML = '%times;'

   let spanTagInfo = document.createElement('span')
   spanTagInfo.innerHTML = info

   alertTag.appendChild(strongTag)
   alertTag.appendChild(spanTagInfo)
   alertTag.appendChild(buttonTag)
   buttonTag.appendChild(spanTag)

   document.body.appendChild(alertTag)
}

const handleDecrypt = () => {
   if(stegoImage.value === '') return alert('upload stego image terlebih dahulu!')
   if(keyDecrypt.value === '') return alert('isi field key terlebih dahulu!')

   let extension = stegoImage.value.substring(stegoImage.value.lastIndexOf('.')  + 1)
   if (extension == "gif" || extension == "png" || extension == "bmp" || extension == "jpeg" || extension == "jpg") {
      if (stegoImage.files && stegoImage.files[0]) {
         var reader = new FileReader();
         reader.onload = function(e) {
            resultDecrypt.innerText = caesarShift(steg.decode(e.target.result), parseInt(`-${keyDecrypt.value}`))
         };
      }
      reader.readAsDataURL(stegoImage.files[0]);
   }


}

const reset = () => {
   plainText.value = ''
   key.value = ''
   chipertext.innerHTML = ''
   coverImage.value = ''
   previewBefore.src = ''
   previewAfter.src = ''
   textBefore.innerHTML = ''
   textAfter.innerHTML = ''
   
}

const resetDcrypt = () => {
   stegoImage.value = ''
   previewStegoImage.src = ''
   previewStegoImage.style.marginBottom = '0px'
   keyDecrypt.value = ''
   resultDecrypt.value = ''
}
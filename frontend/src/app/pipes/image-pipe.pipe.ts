import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; 
@Pipe({
  name: 'imagePipe'
})
export class ImagePipePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}
  transform(value: any): any{
    console.log(value);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.arrayBufferToBase64(value)}`)

    
  }
  arrayBufferToBase64( buffer:any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
}

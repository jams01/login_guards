import { Injectable } from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  fotos: Array<Photo> = [];
  constructor() { }

  async tomarfoto(){
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).then((data: Photo)=>{
      this.fotos.push(data);
      this.guardarfoto(data);
    }).catch((err)=>{
      console.log("No se tomó la foto");
    });
  }

  async guardarfoto(foto: Photo){
    const datab64 = await this.readAsBase64(foto);
    const nombrefoto = "Mifoto" + new Date().getTime()+ ".jpg";
    console.log(Directory.Data);
    const res = await Filesystem.writeFile({
      path: nombrefoto,
      data: datab64,
      directory: Directory.Data
    });
    console.log(res);
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  getfotoblob(): Promise<Blob>{
    return new Promise((resolve, reject)=>{
      fetch(this.fotos[this.fotos.length-1].webPath!).then((response)=>{
        response.blob().then((data: Blob)=>{
          resolve(data);
        });
      });
    
    });
    
  }

}

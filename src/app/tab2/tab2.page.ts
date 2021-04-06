import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../service/foto.service';

export interface fileFoto{
  name:string; //filepath
  path:string; //webviewpath
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  urlimagtestorage : string[] = [];
  constructor(private afstorage: AngularFireStorage,public fotoe:FotoService){}

  async ngOnInit(){
    await this.fotoe.loadFoto();
  }
  Foto(){
    this.fotoe.Foto();
  }

  //pencet gambar untuk upload
  upload(data){
    console.log(data);
    const imgfilepath = `imgStorage/${data.filePath}`
    this.afstorage.upload(imgfilepath, data.dataImage).then(() =>{
      this.afstorage.storage.ref().child(imgfilepath).getDownloadURL().then((url)=>{
        this.urlimagtestorage.unshift(url)
      });
    });
    alert("Berhasil upload");
  }

}

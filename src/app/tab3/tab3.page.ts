import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../service/foto.service';

export interface fileFoto{
  name:string; //filepath
  path:string; //webviewpath
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  imagestorage: fileFoto[] = [];
  urlimagtestorage : string[] = [];
  nameimagtestorage : string[];
  constructor(
    private afstorage: AngularFireStorage,
    private fotoservis : FotoService,
  ) { }

  async ngOnInit() {
    await this.fotoservis.loadFoto();
    this.tampilkandata();
  }

  tampilkandata(){
    this.urlimagtestorage=[];
    this.nameimagtestorage=[];
    var refimage = this.afstorage.storage.ref('imgStorage');
    refimage.listAll()
    .then((res)=>{
      res.items.forEach((itemRef)=>{
        console.log(itemRef.name);
        itemRef.getDownloadURL().then(url =>{
          this.imagestorage.unshift({
            name: itemRef.name,
            path: url
          })
          this.nameimagtestorage.unshift(itemRef.name);
          this.urlimagtestorage.unshift(url)
        })
      });
    }).catch((error)=>{
      console.log(error);
    });
  }
}
